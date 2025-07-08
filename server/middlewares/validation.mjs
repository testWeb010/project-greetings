import { body, param, query, validationResult } from 'express-validator';
import { ObjectId } from 'mongodb';

// Helper function to handle validation errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      error: 'Validation errors',
      details: errors.array()
    });
  }
  next();
};

// User registration validation
export const validateUserRegistration = [
  body('username')
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  
  body('name')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  
  body('terms')
    .isBoolean()
    .withMessage('Terms acceptance is required')
    .custom((value) => {
      if (!value) {
        throw new Error('You must accept the terms and conditions');
      }
      return true;
    }),
  
  handleValidationErrors
];

// User login validation
export const validateUserLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  
  handleValidationErrors
];

// Property validation
export const validateProperty = [
  body('propertyName')
    .isLength({ min: 5, max: 100 })
    .withMessage('Property name must be between 5 and 100 characters'),
  
  body('city')
    .isLength({ min: 2, max: 50 })
    .withMessage('City must be between 2 and 50 characters'),
  
  body('pincode')
    .isLength({ min: 6, max: 6 })
    .isNumeric()
    .withMessage('Pincode must be 6 digits'),
  
  body('contactNumber')
    .isMobilePhone('en-IN')
    .withMessage('Please provide a valid Indian mobile number'),
  
  body('propertyType')
    .isIn(['Apartment', 'Single Room', 'PG', 'House', 'Villa', 'Studio'])
    .withMessage('Invalid property type'),
  
  body('totalRooms')
    .isInt({ min: 1, max: 20 })
    .withMessage('Total rooms must be between 1 and 20'),
  
  body('totalRent')
    .isFloat({ min: 1000, max: 100000 })
    .withMessage('Total rent must be between ₹1,000 and ₹1,00,000'),
  
  body('securityMoney')
    .isFloat({ min: 0, max: 200000 })
    .withMessage('Security money must be between ₹0 and ₹2,00,000'),
  
  body('totalMembersAllowed')
    .isInt({ min: 1, max: 20 })
    .withMessage('Total members allowed must be between 1 and 20'),
  
  body('preferredGender')
    .isIn(['Male', 'Female', 'Family', 'No Preference'])
    .withMessage('Invalid gender preference'),
  
  body('description')
    .isLength({ min: 20, max: 1000 })
    .withMessage('Description must be between 20 and 1000 characters'),
  
  body('availableFrom')
    .isISO8601()
    .withMessage('Please provide a valid available from date'),
  
  body('rules')
    .optional()
    .isArray()
    .withMessage('Rules must be an array'),
  
  body('nearbyPlaces')
    .optional()
    .isArray()
    .withMessage('Nearby places must be an array'),
  
  handleValidationErrors
];

// Search validation
export const validateSearch = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50'),
  
  query('minPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Minimum price must be a positive number'),
  
  query('maxPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Maximum price must be a positive number'),
  
  query('propertyType')
    .optional()
    .isIn(['Apartment', 'Single Room', 'PG', 'House', 'Villa', 'Studio'])
    .withMessage('Invalid property type'),
  
  query('genderPreference')
    .optional()
    .isIn(['Male', 'Female', 'Family', 'No Preference', 'any'])
    .withMessage('Invalid gender preference'),
  
  query('sortBy')
    .optional()
    .isIn(['createdAt', 'totalRent', 'views', 'rating'])
    .withMessage('Invalid sort field'),
  
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc'),
  
  handleValidationErrors
];

// Object ID validation
export const validateObjectId = [
  param('id')
    .custom((value) => {
      if (!ObjectId.isValid(value)) {
        throw new Error('Invalid ID format');
      }
      return true;
    }),
  
  handleValidationErrors
];

// User ID validation for params
export const validateUserId = [
  param('userId')
    .custom((value) => {
      if (!ObjectId.isValid(value)) {
        throw new Error('Invalid user ID format');
      }
      return true;
    }),
  
  handleValidationErrors
];

// Password reset validation
export const validatePasswordReset = [
  body('token')
    .notEmpty()
    .withMessage('Reset token is required'),
  
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
  
  handleValidationErrors
];

// Change password validation
export const validateChangePassword = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('New password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('Password confirmation does not match new password');
      }
      return true;
    }),
  
  handleValidationErrors
];

// Contact form validation
export const validateContact = [
  body('name')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('subject')
    .isLength({ min: 5, max: 100 })
    .withMessage('Subject must be between 5 and 100 characters'),
  
  body('message')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters'),
  
  handleValidationErrors
];

// Review validation
export const validateReview = [
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  
  body('review')
    .optional()
    .isLength({ min: 10, max: 500 })
    .withMessage('Review must be between 10 and 500 characters'),
  
  handleValidationErrors
];

// Report validation
export const validateReport = [
  body('reason')
    .isIn(['Fake Listing', 'Inappropriate Content', 'Spam', 'Fraud', 'Other'])
    .withMessage('Invalid report reason'),
  
  body('description')
    .optional()
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters'),
  
  handleValidationErrors
];

// Visit schedule validation
export const validateVisitSchedule = [
  body('date')
    .isISO8601()
    .withMessage('Please provide a valid date'),
  
  body('time')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Please provide a valid time in HH:MM format'),
  
  body('message')
    .optional()
    .isLength({ max: 300 })
    .withMessage('Message cannot exceed 300 characters'),
  
  handleValidationErrors
];

// File upload validation
export const validateFileUpload = (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'No files uploaded',
      error: 'File upload required'
    });
  }
  
  // Validate file types
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const invalidFiles = req.files.filter(file => !allowedTypes.includes(file.mimetype));
  
  if (invalidFiles.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Invalid file type',
      error: 'Only JPEG, PNG, and WebP images are allowed'
    });
  }
  
  // Validate file sizes (5MB max)
  const maxSize = 5 * 1024 * 1024; // 5MB
  const oversizedFiles = req.files.filter(file => file.size > maxSize);
  
  if (oversizedFiles.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'File size too large',
      error: 'Files must be smaller than 5MB'
    });
  }
  
  next();
};