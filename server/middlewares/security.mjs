import helmet from 'helmet';
import cors from 'cors';
import { createHash } from 'crypto';

// Generate CSP nonce
export const generateNonce = (req, res, next) => {
  res.locals.nonce = createHash('sha256').update(Math.random().toString()).digest('hex');
  next();
};

// Enhanced CORS configuration
export const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'https://thehomedaze.com',
      'https://www.thehomedaze.com',
      'https://api.thehomedaze.com',
      ...(process.env.NODE_ENV === 'development' ? [
        'http://localhost:3000',
        'http://localhost:5173',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:5173'
      ] : [])
    ];

    // Allow requests with no origin (mobile apps, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'Cache-Control',
    'X-CSRF-Token'
  ],
  exposedHeaders: ['X-Total-Count'],
  maxAge: 86400 // 24 hours
};

// Security headers configuration
export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: [
        "'self'",
        "'unsafe-inline'", // Required for inline styles
        "https://fonts.googleapis.com",
        "https://cdn.jsdelivr.net"
      ],
      scriptSrc: [
        "'self'",
        (req, res) => `'nonce-${res.locals.nonce}'`,
        "https://js.stripe.com",
        "https://checkout.stripe.com"
      ],
      fontSrc: [
        "'self'",
        "https://fonts.gstatic.com",
        "data:"
      ],
      imgSrc: [
        "'self'",
        "data:",
        "https:",
        "blob:"
      ],
      connectSrc: [
        "'self'",
        "https://api.thehomedaze.com",
        "https://api.stripe.com"
      ],
      frameSrc: [
        "'self'",
        "https://js.stripe.com",
        "https://checkout.stripe.com"
      ],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'", "https:"],
      upgradeInsecureRequests: process.env.NODE_ENV === 'production' ? [] : null
    }
  },
  crossOriginEmbedderPolicy: false, // Required for some third-party services
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
});

// Request sanitization
export const sanitizeRequest = (req, res, next) => {
  // Remove potentially dangerous properties
  delete req.body.__proto__;
  delete req.body.constructor;
  delete req.body.prototype;
  
  // Limit request size
  const maxBodySize = 10 * 1024 * 1024; // 10MB
  if (req.get('content-length') > maxBodySize) {
    return res.status(413).json({ error: 'Request entity too large' });
  }
  
  next();
};

// IP whitelist for admin routes (optional)
export const ipWhitelist = (allowedIPs = []) => {
  return (req, res, next) => {
    if (allowedIPs.length === 0) return next();
    
    const clientIP = req.ip || req.connection.remoteAddress;
    
    if (allowedIPs.includes(clientIP)) {
      next();
    } else {
      res.status(403).json({ error: 'Access denied from this IP' });
    }
  };
};

// Request logging for security monitoring
export const securityLogger = (req, res, next) => {
  const startTime = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const logData = {
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.url,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      statusCode: res.statusCode,
      duration,
      contentLength: res.get('Content-Length') || 0
    };
    
    // Log suspicious activity
    if (res.statusCode >= 400 || duration > 5000) {
      console.warn('Security Alert:', logData);
    }
  });
  
  next();
};