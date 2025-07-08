import { body, param, query, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';

// Validation error handler
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
};

// User registration validation
export const validateUserRegistration = [
  body('username')
    .isLength({ min: 3, max: 30 })
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username must be 3-30 characters and contain only letters, numbers, and underscores'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 8 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must be at least 8 characters with uppercase, lowercase, number, and special character'),
  body('phone')
    .optional()
    .isMobilePhone('en-IN')
    .withMessage('Valid Indian phone number is required'),
  handleValidationErrors
];

// Property validation
export const validateProperty = [
  body('propertyName')
    .isLength({ min: 3, max: 100 })
    .trim()
    .escape()
    .withMessage('Property name must be 3-100 characters'),
  body('city')
    .isLength({ min: 2, max: 50 })
    .trim()
    .escape()
    .withMessage('City must be 2-50 characters'),
  body('pincode')
    .matches(/^[1-9][0-9]{5}$/)
    .withMessage('Valid 6-digit Indian pincode is required'),
  body('totalRent')
    .isFloat({ min: 1000, max: 1000000 })
    .withMessage('Rent must be between ₹1,000 and ₹10,00,000'),
  body('securityMoney')
    .isFloat({ min: 0, max: 1000000 })
    .withMessage('Security deposit must be between ₹0 and ₹10,00,000'),
  body('contactNumber')
    .isMobilePhone('en-IN')
    .withMessage('Valid Indian phone number is required'),
  body('description')
    .isLength({ max: 1000 })
    .trim()
    .escape()
    .withMessage('Description must not exceed 1000 characters'),
  handleValidationErrors
];

// Contact form validation
export const validateContact = [
  body('name')
    .isLength({ min: 2, max: 50 })
    .trim()
    .escape()
    .withMessage('Name must be 2-50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('message')
    .isLength({ min: 10, max: 1000 })
    .trim()
    .escape()
    .withMessage('Message must be 10-1000 characters'),
  body('phone')
    .optional()
    .isMobilePhone('en-IN')
    .withMessage('Valid Indian phone number is required'),
  handleValidationErrors
];

// ID parameter validation
export const validateObjectId = [
  param('id')
    .isMongoId()
    .withMessage('Valid MongoDB ObjectId is required'),
  handleValidationErrors
];

// Search query validation
export const validateSearch = [
  query('city')
    .optional()
    .isLength({ min: 2, max: 50 })
    .trim()
    .escape(),
  query('minPrice')
    .optional()
    .isFloat({ min: 0 }),
  query('maxPrice')
    .optional()
    .isFloat({ min: 0 }),
  query('page')
    .optional()
    .isInt({ min: 1 }),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }),
  handleValidationErrors
];

// File upload validation
export const validateFileUpload = (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'At least one file is required' });
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  for (const file of req.files) {
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({ 
        error: 'Only JPEG, PNG, and WebP images are allowed' 
      });
    }
    
    if (file.size > maxSize) {
      return res.status(400).json({ 
        error: 'File size must be less than 5MB' 
      });
    }
  }

  next();
};