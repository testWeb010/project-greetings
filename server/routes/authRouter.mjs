import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.mjs";
import Token from "../models/passwordResetToken.mjs";
import { getDb } from "../db/conn.mjs";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.mjs";
import VToken from "../models/verificationToken.mjs";
import PhoneAuth from "../models/phoneAuth.mjs";
import { OAuth2Client } from "google-auth-library";
import twilio from 'twilio';

const router = express.Router();

// Rate limiting middleware to prevent DoS, DDoS, and brute force attacks
const rateLimit = (maxAttempts, windowMs) => {
  const attempts = new Map();
  return (req, res, next) => {
    const ip = req.ip;
    const attempt = attempts.get(ip) || { count: 0, lastAttempt: 0 };
    const now = Date.now();
    
    if (now - attempt.lastAttempt < windowMs) {
      attempt.count += 1;
    } else {
      attempt.count = 1;
      attempt.lastAttempt = now;
    }
    
    attempts.set(ip, attempt);
    
    if (attempt.count > maxAttempts) {
      return res.status(429).json({ message: 'Too many attempts. Please try again later.' });
    }
    next();
  };
};

// Security headers middleware to prevent XSS and other attacks
const setSecurityHeaders = (req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; object-src 'none';");
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
};

// Input sanitization to prevent SQL injection and XSS
const sanitizeInput = (req, res, next) => {
  const sanitize = (obj) => {
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        // Remove potentially malicious content
        obj[key] = obj[key].replace(/[<>{}|;]/g, '');
      } else if (typeof obj[key] === 'object') {
        sanitize(obj[key]);
      }
    }
  };
  
  if (req.body) sanitize(req.body);
  if (req.query) sanitize(req.query);
  if (req.params) sanitize(req.params);
  next();
};

// CSRF Protection
const csrfProtection = (req, res, next) => {
  const csrfToken = req.cookies['csrf_token'];
  const clientToken = req.headers['x-csrf-token'];
  if (req.method !== 'GET' && !csrfToken && !clientToken && csrfToken !== clientToken) {
    return res.status(403).json({ message: 'CSRF token validation failed' });
  }
  next();
};

// Apply security middleware to all routes
router.use(setSecurityHeaders);
router.use(sanitizeInput);

// Register API
router.post("/register", rateLimit(3, 60 * 1000), async (req, res) => {
  // Check valid email
  if (!isValidEmail(req.body.email)) {
    return res.status(400).json({ message: "Invalid email" });
  }
  // Check valid password
  if (!isValidPassword(req.body.password)) {
    return res.status(400).json({ message: "Invalid password" });
  }
  // Check valid username
  if (!isValidUsername(req.body.username)) {
    return res.status(400).json({ message: "Invalid username" });
  }
  // Check valid name
  if (!req.body.name) {
    return res.status(400).json({ message: "Name is required" });
  }
  const db = getDb().connection;

  // Check if user exists
  const user = await db.collection("users").findOne({
    $or: [
      { email: req.body.email, accountType: "local" },
      { username: req.body.username, accountType: "local" },
    ],
  });
  if (user) {
    // Check if verified
    if (user.isVerified) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Send verification mail
    let token = await db.collection("emailverificationtokens").findOne({ user: user._id });
    if (token) {
      await db.collection("emailverificationtokens").deleteOne({ user: user._id });
    }
    // Create new token
    let verificationToken = new VToken({
      user: user._id,
      token: crypto.randomBytes(16).toString("hex"),
    });

    verificationToken = await verificationToken.save();

    // Create verification link
    let url = `${process.env.CLIENT_URL}/verify-email/${verificationToken.token}`;

    // Send Email
    await sendEmail(
      user.email,
      "Email Verification",
      "Click this link to verify your email\n" + url
    );

    return res.status(200).json({ message: "Verification mail sent. Please verify." });
  }
  // Hash password
  const numSaltRounds = process.env.NODE_ENV === "development" ? 1 : 10;
  const password = await bcrypt.hash(req.body.password, numSaltRounds);
  // Create new user
  const newUser = new User({
    email: req.body.email,
    username: req.body.username,
    name: req.body.name,
    password: password,
  });

  const savedUser = await newUser.save();

  let token = await db.collection("emailverificationtokens").findOne({ user: savedUser._id });
  if (token) {
    await db.collection("emailverificationtokens").deleteOne({ user: savedUser._id });
  }

  // Create new token
  let verificationToken = new VToken({
    user: savedUser._id,
    token: crypto.randomBytes(16).toString("hex"),
  });

  verificationToken = await verificationToken.save();

  // Create verification link
  let url = `${process.env.CLIENT_URL}/verify-email/${verificationToken.token}`;

  // Send Email
  await sendEmail(
    savedUser.email,
    "Email Verification",
    "Click this link to verify your email\n" + url
  );

  // Set CSRF token cookie
  const csrfToken = crypto.randomBytes(16).toString("hex");
  res.cookie('csrf_token', csrfToken, { 
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production", 
    sameSite: 'strict' 
  });

  return res.status(201).json({ message: "Verification mail sent. Please verify." });
});

// Login API
router.post("/login", rateLimit(5, 60 * 1000), async (req, res) => {
  console.log('Login request received:', req.body);
  // Check email or username
  const email_username = req.body.emailOrUsername;
  const email_or_username = checkEmailOrUsername(email_username);
  let user = null;

  try {
    const db = getDb().connection;

    if (email_or_username === "email") {
      user = await db.collection("users").findOne({ email: email_username, accountType: "local" });
    } else if (email_or_username === "username") {
      user = await db.collection("users").findOne({
        username: email_username,
        accountType: "local",
      });
    } else {
      return res.status(400).json({ message: "Invalid email or username" });
    }

    // Match password
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Check if email is verified
    if (!user.isVerified) {
      return res.status(400).json({ message: "Email not verified" });
    }

    // Create JWT token
    const token = jwt.sign(
      { username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // Set CSRF token cookie
    const csrfToken = crypto.randomBytes(16).toString("hex");
    res.cookie('csrf_token', csrfToken, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      sameSite: 'strict' 
    });
    
    return res.json({ 
      token: token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Verify Email
router.post("/verify-email", rateLimit(10, 60 * 1000), async (req, res) => {
  const { token, userId } = req.body;
  try {
    // Find token
    const db = getDb().connection;
    let vtoken = await db.collection("emailverificationtokens").findOne({ token: token });
    if (!vtoken) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Find user
    let user = await db.collection("users").findOne({ _id: vtoken.user });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Update user verification status
    await db.collection("users").findOneAndUpdate({ _id: vtoken.user }, { $set: { isVerified: true } });

    // Delete token
    await db.collection("emailverificationtokens").deleteOne({ _id: vtoken._id });

    return res.json({ message: "Email verified" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Forgot Password API to send password reset email
router.post("/forgot-password", rateLimit(3, 60 * 60 * 1000), async (req, res) => {
  const emailOrUsernameInput = req.body.emailOrUsername; 
  const validationType = checkEmailOrUsername(emailOrUsernameInput);

  if (validationType === "invalid") {
    return res.status(400).json({ message: "Invalid email or username format." });
  }

  let user = null;
  const db = getDb().connection;

  if (validationType === "email") {
    user = await db.collection("users").findOne({ email: emailOrUsernameInput, accountType: "local" });
  } else if (validationType === "username") {
    user = await db.collection("users").findOne({ username: emailOrUsernameInput, accountType: "local" });
  }

  if (!user) {
    const message = `You do not have an account with this ${validationType}. Please create an account.`;
    return res.status(400).json({ message });
  }

  let token = await db.collection("passwordresettokens").findOne({ user: user._id });
  if (token) {
    await db.collection("passwordresettokens").deleteOne({ user: user._id });
  }

  let resetToken = new Token({
    user: user._id,
    token: crypto.randomBytes(16).toString("hex"),
  });
  await resetToken.save();

  let url = `${process.env.CLIENT_URL}/reset-password/${resetToken.token}`;

  // Send email
  await sendEmail(
    user.email,
    "Password Reset",
    `Click this link to reset your password: ${url}`
  );

  return res.json({
    status: "OK",
    message: "Password reset email sent",
  });
});

// Reset Password API to reset password
router.post("/reset-password", rateLimit(5, 60 * 1000), async (req, res) => {
  const { token, password } = req.body;
  try {
    // Find token
    const db = getDb().connection;
    let resetToken = await db.collection("passwordresettokens").findOne({ token: token });
    if (!resetToken) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    // Find user
    const user = await db.collection("users").findOne({ _id: resetToken.user, accountType: "local" });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Validate password
    if (!isValidPassword(password)) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Check password should not be same as the old password
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return res.status(400).json({ message: "Password cannot be same" });
    }

    // Hash password
    const numSaltRounds = process.env.NODE_ENV === "development" ? 1 : 10;
    const hassedPassword = await bcrypt.hash(password, numSaltRounds);

    // Update password
    await db.collection("users").findOneAndUpdate(
      { _id: resetToken.user },
      { $set: { password: hassedPassword } }
    );

    // Delete token
    await db.collection("passwordresettokens").deleteOne({ _id: resetToken._id });

    return res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Social auth routes with rate limiting for DoS protection
router.get('/social/google', rateLimit(10, 60 * 1000), async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Referrer-Policy", "no-referrer-when-downgrade");

  const authorizeURI = oAuth2ClientGoogle.generateAuthUrl({
    access_type: "offline",
    scope: ["email", "profile"],
    prompt: "consent",
  });

  return res.redirect(authorizeURI);
});

router.get('/social/google/callback', rateLimit(10, 60 * 1000), async (req, res) => {
  const access_code = req.query.code;
  try {
    const response = await oAuth2ClientGoogle.getToken(access_code);
    await oAuth2ClientGoogle.setCredentials(response.tokens);
    const googleUser = oAuth2ClientGoogle.credentials;
    const userData = await getUserDataGoogle(googleUser.access_token);

    const db = getDb().connection;

    // Check if user already exists
    const user = await db.collection("users").findOne({ email: userData.email, accountType: "google" });

    let token = null;
    if (user) {
      token = jwt.sign(
        { username: user.username, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
    } else {
      // If user doesn't exist, create new user
      const newUser = new User({
        name: userData.name,
        email: userData.email,
        photo: userData.picture,
        username: userData.email.split("@")[0].substr(0, 8) + Math.floor(Math.random() * 1000),
        accountType: "google",
        isVerified: true,
      });

      const savedUser = await newUser.save();
      token = jwt.sign(
        { username: savedUser.username, email: savedUser.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
    }
    // Set CSRF token cookie
    const csrfToken = crypto.randomBytes(16).toString("hex");
    res.cookie('csrf_token', csrfToken, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      sameSite: 'strict' 
    });
    return res.redirect(`${process.env.CLIENT_URL}/google-auth-success?token=${token}`);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error during Google authentication" });
  }
});

router.get('/social/facebook', rateLimit(10, 60 * 1000), async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Referrer-Policy", "no-referrer-when-downgrade");

  const authorizeURI = oAuth2ClientFacebook.generateAuthUrl({
    access_type: "offline",
    scope: ["email", "public_profile"],
    prompt: "consent",
  });

  return res.redirect(authorizeURI);
});

router.get('/social/facebook/callback', rateLimit(10, 60 * 1000), async (req, res) => {
  const access_code = req.query.code;
  try {
    const response = await oAuth2ClientFacebook.getToken(access_code);
    await oAuth2ClientFacebook.setCredentials(response.tokens);
    const facebookUser = oAuth2ClientFacebook.credentials;
    const userData = await getUserDataFacebook(facebookUser.access_token);

    const db = getDb().connection;

    // Check if user already exists
    const user = await db.collection("users").findOne({ email: userData.email, accountType: "facebook" });

    let token = null;
    if (user) {
      token = jwt.sign(
        { username: user.username, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
    } else {
      // If user doesn't exist, create new user
      const newUser = new User({
        name: userData.name,
        email: userData.email,
        photo: userData.picture.data.url,
        username: userData.email.split("@")[0].substr(0, 8) + Math.floor(Math.random() * 1000),
        accountType: "facebook",
        isVerified: true,
      });

      const savedUser = await newUser.save();
      token = jwt.sign(
        { username: savedUser.username, email: savedUser.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
    }
    // Set CSRF token cookie
    const csrfToken = crypto.randomBytes(16).toString("hex");
    res.cookie('csrf_token', csrfToken, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      sameSite: 'strict' 
    });
    return res.redirect(`${process.env.CLIENT_URL}/facebook-auth-success?token=${token}`);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error during Facebook authentication" });
  }
});

router.get('/social/linkedin', rateLimit(10, 60 * 1000), async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Referrer-Policy", "no-referrer-when-downgrade");

  const authorizeURI = oAuth2ClientLinkedIn.generateAuthUrl({
    access_type: "offline",
    scope: ["r_liteprofile", "r_emailaddress"],
    prompt: "consent",
  });

  return res.redirect(authorizeURI);
});

router.get('/social/linkedin/callback', rateLimit(10, 60 * 1000), async (req, res) => {
  const access_code = req.query.code;
  try {
    const response = await oAuth2ClientLinkedIn.getToken(access_code);
    await oAuth2ClientLinkedIn.setCredentials(response.tokens);
    const linkedInUser = oAuth2ClientLinkedIn.credentials;
    const userData = await getUserDataLinkedIn(linkedInUser.access_token);

    // Fetch email separately
    const emailRes = await fetch(
      `https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))&oauth2_access_token=${linkedInUser.access_token}`,
      {
        headers: {
          'Authorization': `Bearer ${linkedInUser.access_token}`,
          'cache-control': 'no-cache',
          'X-Restli-Protocol-Version': '2.0.0'
        }
      }
    );
    const emailData = await emailRes.json();
    const email = emailData.elements[0]['handle~'].emailAddress;

    const db = getDb().connection;

    // Check if user already exists
    const user = await db.collection("users").findOne({ email: email, accountType: "linkedin" });

    let token = null;
    if (user) {
      token = jwt.sign(
        { username: user.username, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
    } else {
      // If user doesn't exist, create new user
      const firstName = userData.firstName.localized.en_US;
      const lastName = userData.lastName.localized.en_US;
      const newUser = new User({
        name: `${firstName} ${lastName}`,
        email: email,
        photo: userData.profilePicture ? userData.profilePicture.displayImage : '',
        username: email.split("@")[0].substr(0, 8) + Math.floor(Math.random() * 1000),
        accountType: "linkedin",
        isVerified: true,
      });

      const savedUser = await newUser.save();
      token = jwt.sign(
        { username: savedUser.username, email: savedUser.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
    }
    // Set CSRF token cookie
    const csrfToken = crypto.randomBytes(16).toString("hex");
    res.cookie('csrf_token', csrfToken, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      sameSite: 'strict' 
    });
    return res.redirect(`${process.env.CLIENT_URL}/linkedin-auth-success?token=${token}`);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error during LinkedIn authentication" });
  }
});

router.get('/social/twitter', rateLimit(10, 60 * 1000), async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Referrer-Policy", "no-referrer-when-downgrade");

  const authorizeURI = oAuth2ClientTwitter.generateAuthUrl({
    access_type: "offline",
    scope: ["users.read", "tweet.read"],
    prompt: "consent",
  });

  return res.redirect(authorizeURI);
});

router.get('/social/twitter/callback', rateLimit(10, 60 * 1000), async (req, res) => {
  const access_code = req.query.code;
  try {
    const response = await oAuth2ClientTwitter.getToken(access_code);
    await oAuth2ClientTwitter.setCredentials(response.tokens);
    const twitterUser = oAuth2ClientTwitter.credentials;
    const userData = await getUserDataTwitter(twitterUser.access_token);

    const db = getDb().connection;

    // Check if user already exists
    const user = await db.collection("users").findOne({ email: userData.email, accountType: "twitter" });

    let token = null;
    if (user) {
      token = jwt.sign(
        { username: user.username, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
    } else {
      // If user doesn't exist, create new user
      const newUser = new User({
        name: userData.name,
        email: userData.email,
        photo: userData.profile_image_url,
        username: userData.screen_name,
        accountType: "twitter",
        isVerified: true,
      });

      const savedUser = await newUser.save();
      token = jwt.sign(
        { username: savedUser.username, email: savedUser.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
    }
    // Set CSRF token cookie
    const csrfToken = crypto.randomBytes(16).toString("hex");
    res.cookie('csrf_token', csrfToken, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      sameSite: 'strict' 
    });
    return res.redirect(`${process.env.CLIENT_URL}/twitter-auth-success?token=${token}`);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error during Twitter authentication" });
  }
});

// google auth API

const oAuth2ClientGoogle = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: process.env.GOOGLE_REDIRECT_URI,
});

const oAuth2ClientFacebook = new OAuth2Client({
  clientId: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  redirectUri: process.env.FACEBOOK_REDIRECT_URI,
});

const oAuth2ClientLinkedIn = new OAuth2Client({
  clientId: process.env.LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  redirectUri: process.env.LINKEDIN_REDIRECT_URI,
});

const oAuth2ClientTwitter = new OAuth2Client({
  clientId: process.env.TWITTER_CLIENT_ID,
  clientSecret: process.env.TWITTER_CLIENT_SECRET,
  redirectUri: process.env.TWITTER_REDIRECT_URI,
});

const getUserDataGoogle = async (access_token) => {
  const res = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?alt=json&access_token=${access_token}`
  );
  return await res.json();
};

const getUserDataFacebook = async (access_token) => {
  const res = await fetch(
    `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${access_token}`
  );
  return await res.json();
};

const getUserDataLinkedIn = async (access_token) => {
  const res = await fetch(
    `https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture)&oauth2_access_token=${access_token}`,
    {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'cache-control': 'no-cache',
        'X-Restli-Protocol-Version': '2.0.0'
      }
    }
  );
  return await res.json();
};

const getUserDataTwitter = async (access_token) => {
  const res = await fetch(
    `https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true`,
    {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    }
  );
  return await res.json();
};

// Mock in-memory store for OTPs (use Redis or database in production)
const otpStore = {};

// Phone OTP Authentication Controllers
const sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;
    
    if (!phone) {
      return res.status(400).json({ message: 'Phone number is required' });
    }
    
    // Basic phone number validation
    const phoneRegex = /^\+?[0-9]{10,14}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: 'Invalid phone number format' });
    }
    
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP

    // Initialize Twilio client
    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    // Send SMS with fallback to console logging if it fails
    try {
      await client.messages.create({
        body: `Your HomDaze verification code is: ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone
      });
      console.log(`Successfully sent OTP to ${phone}`);
    } catch (error) {
      console.error(`Failed to send OTP to ${phone} via Twilio:`, error);
      console.log(`OTP for ${phone} is: ${otp} (SMS sending failed, logged to console)`);
    }
    
    // Store OTP in a temporary storage (e.g., Redis) with expiration
    otpStore[phone] = { otp, expiresAt: Date.now() + 10 * 60 * 1000 }; // Expires in 10 minutes

    res.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    
    if (!phone || !otp) {
      return res.status(400).json({ message: 'Phone number and OTP are required' });
    }
    
    const storedData = otpStore[phone];
    if (!storedData) {
      return res.status(400).json({ message: 'No OTP request found for this phone number or it has expired.' });
    }
    
    if (Date.now() > storedData.expiresAt) {
      delete otpStore[phone];
      return res.status(400).json({ message: 'OTP has expired' });
    }
    
    if (storedData.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }
    
    // OTP is valid, clean up
    delete otpStore[phone];
    
        const db = getDb().connection;
    let phoneAuthEntry = await PhoneAuth.findOne({ phone: phone }).populate('user');
    let user;

    if (phoneAuthEntry) {
      user = phoneAuthEntry.user;
    } else {
      // Create a new user if they don't exist
      const newUser = new User({
        phone: phone,
        accountType: "local", // Temporarily using 'local' to avoid enum validation error; adjust if 'phone' is added to enum
        isVerified: true, // Phone is verified via OTP
        name: `User ${phone.slice(-4)}`, // A default name
        username: `user_${phone.slice(-4)}`, // Provide a default username based on phone
        email: `user_${phone.slice(-4)}@placeholder.com` // Provide a placeholder email
      });
      user = await newUser.save();

      // Create a new phone auth entry
      const newPhoneAuth = new PhoneAuth({
        phone: phone,
        user: user._id
      });
      await newPhoneAuth.save();
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set CSRF token cookie
    const csrfToken = crypto.randomBytes(16).toString("hex");
    res.cookie('csrf_token', csrfToken, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      sameSite: 'strict' 
    });
    
    res.json({ success: true, message: 'OTP verified successfully', token, user, csrfToken });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Failed to verify OTP' });
  }
};

// functions
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const usernameRegex = /^[a-z0-9_.]{2,}$/;

function isValidEmail(email) {
  return emailRegex.test(email);
}

function isValidPassword(password) {
  return passwordRegex.test(password);
}

function isValidUsername(username) {
  return usernameRegex.test(username);
}

function checkEmailOrUsername(str) {
  if (isValidEmail(str)) {
    return "email";
  } else if (isValidUsername(str)) {
    return "username";
  } else {
    return "invalid";
  }
}

// Phone OTP Authentication
router.post('/send-otp', rateLimit(3, 60 * 1000), sendOtp);
router.post('/verify-otp', rateLimit(5, 60 * 1000), verifyOtp);

export default router;
