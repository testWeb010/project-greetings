import crypto from 'crypto';

// Generate a CSRF token
export const generateCSRFToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Middleware to check CSRF token
export const checkCSRFToken = (req, res, next) => {
  const csrfToken = req.headers['x-csrf-token'];
  const cookieToken = req.cookies['csrf_token'];
  
  if (!csrfToken || csrfToken !== cookieToken) {
    return res.status(403).json({ message: 'CSRF token validation failed' });
  }
  next();
};
