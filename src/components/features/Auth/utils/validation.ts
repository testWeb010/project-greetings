import { SignInFormData, SignUpFormData, ForgotPasswordFormData, AuthFormErrors } from '../types';

/**
 * Validate sign in form data
 */
export const validateSignIn = (formData: SignInFormData): AuthFormErrors => {
  const errors: AuthFormErrors = {};

  if (!formData.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
    errors.email = 'Invalid email address';
  }

  if (!formData.password) {
    errors.password = 'Password is required';
  } else if (formData.password.length < 8) {
    errors.password = 'Password must be at least 8 characters long';
  } else if (!/[A-Z]/.test(formData.password)) {
    errors.password = 'Password must contain at least one uppercase letter';
  } else if (!/[0-9]/.test(formData.password)) {
    errors.password = 'Password must contain at least one number';
  } else if (!/[!@#$%^&*]/.test(formData.password)) {
    errors.password = 'Password must contain at least one special character';
  }

  return errors;
};

/**
 * Validate sign up form data
 */
export const validateSignUp = (formData: SignUpFormData): AuthFormErrors => {
  const errors: AuthFormErrors = {};

  if (!formData.username) {
    errors.username = 'Username is required';
  } else if (formData.username.length < 2) {
    errors.username = 'Username must be at least 2 characters long';
  }

  if (!formData.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
    errors.email = 'Invalid email address';
  }

  if (!formData.password) {
    errors.password = 'Password is required';
  } else if (formData.password.length < 8) {
    errors.password = 'Password must be at least 8 characters long';
  } else if (!/[A-Z]/.test(formData.password)) {
    errors.password = 'Password must contain at least one uppercase letter';
  } else if (!/[0-9]/.test(formData.password)) {
    errors.password = 'Password must contain at least one number';
  } else if (!/[!@#$%^&*]/.test(formData.password)) {
    errors.password = 'Password must contain at least one special character';
  }

  if (!formData.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  if (!formData.agreeToTerms) {
    errors.agreeToTerms = 'You must agree to the terms and conditions';
  }

  return errors;
};

/**
 * Validate forgot password form data
 */
export const validateForgotPassword = (formData: ForgotPasswordFormData): AuthFormErrors => {
  const errors: AuthFormErrors = {};

  if (!formData.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};
