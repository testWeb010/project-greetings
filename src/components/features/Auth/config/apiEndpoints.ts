/*
 * API Endpoints Configuration
 * This file contains sensitive API endpoint information and should not be exposed publicly.
 */

// Base URL for API requests
const BASE_URL = 'http://localhost:3001/api/auth';

// Authentication endpoints
export const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/login`,
  REGISTER: `${BASE_URL}/register`,
  FORGOT_PASSWORD: `${BASE_URL}/forgot-password`,
  RESET_PASSWORD: `${BASE_URL}/reset-password`,
  VERIFY_EMAIL: `${BASE_URL}/verify-email`,
  SEND_OTP: `${BASE_URL}/send-otp`,
  VERIFY_OTP: `${BASE_URL}/verify-otp`,
  SOCIAL_AUTH: {
    GOOGLE: `${BASE_URL}/social/google`,
    FACEBOOK: `${BASE_URL}/social/facebook`,
    LINKEDIN: `${BASE_URL}/social/linkedin`,
    TWITTER: `${BASE_URL}/social/twitter`
  }
};

// Rate limiting configuration for client-side protection
export const API_LIMITS = {
  LOGIN_ATTEMPTS: 5,
  REGISTER_ATTEMPTS: 3,
  FORGOT_PASSWORD_ATTEMPTS: 3,
  SOCIAL_AUTH_ATTEMPTS: 10,
  LOGIN_RATE_LIMIT_MS: 60000, // 1 minute
  SIGNUP_RATE_LIMIT_MS: 60000, // 1 minute
  FORGOT_PASSWORD_RATE_LIMIT_MS: 3600000 // 1 hour
};
