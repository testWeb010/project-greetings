import { useState, useEffect } from 'react';
import { SignInFormData, SignUpFormData, ForgotPasswordFormData } from '../types';
import { validateSignIn, validateSignUp, validateForgotPassword } from '../utils/validation';
import { API_ENDPOINTS, API_LIMITS } from '../config/apiEndpoints';
import Cookies from 'js-cookie';

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  error: string | null;
  loading: boolean;
  rateLimitExceeded: boolean;
  lastLoginAttempt: number; // Timestamp for tracking login attempts
}

const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    error: null,
    loading: false,
    rateLimitExceeded: false,
    lastLoginAttempt: 0
  });
  const [attempts, setAttempts] = useState({
    login: 0,
    register: 0,
    forgotPassword: 0,
    socialAuth: 0
  });

  // Reset rate limits after a specified time (e.g., every minute for login)
  useEffect(() => {
    const interval = setInterval(() => {
      if (authState.lastLoginAttempt > 0 && Date.now() - authState.lastLoginAttempt > 60000) {
        setAttempts(prev => ({ ...prev, login: 0, socialAuth: 0, register: 0 }));
        setAuthState(prev => ({ ...prev, rateLimitExceeded: false }));
      }
      // Reset forgotPassword counter every hour
      if (attempts.forgotPassword > 0) {
        setAttempts(prev => ({ ...prev, forgotPassword: 0 }));
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [authState.lastLoginAttempt, attempts.forgotPassword]);

  // Function to check rate limits
  const checkRateLimit = (type: 'login' | 'register' | 'forgotPassword' | 'socialAuth') => {
    const limit = type === 'login' ? API_LIMITS.LOGIN_ATTEMPTS :
                 type === 'register' ? API_LIMITS.REGISTER_ATTEMPTS :
                 type === 'forgotPassword' ? API_LIMITS.FORGOT_PASSWORD_ATTEMPTS :
                 API_LIMITS.SOCIAL_AUTH_ATTEMPTS;
    return attempts[type] >= limit;
  };

  // Function to increment attempt counter
  const incrementAttempt = (type: 'login' | 'register' | 'forgotPassword' | 'socialAuth') => {
    setAttempts(prev => ({ ...prev, [type]: prev[type] + 1 }));
    if (type === 'login') {
      setAuthState(prev => ({ ...prev, lastLoginAttempt: Date.now() }));
    }
  };

  // Reset rate limit counters (could be called after a time period)
  const resetRateLimits = () => {
    setAttempts({
      login: 0,
      register: 0,
      forgotPassword: 0,
      socialAuth: 0
    });
    setAuthState(prev => ({ ...prev, rateLimitExceeded: false, lastLoginAttempt: 0 }));
  };

  // Function to sanitize input to prevent XSS and SQL injection
  const sanitizeInput = (input: string): string => {
    // Remove potentially dangerous characters and script tags
    return input.replace(/[<>{}|;]/g, '').replace(/script/gi, '');
  };

  const handleApiError = (error: unknown, action: string): string => {
    console.error(`API error during ${action}:`, error);
    if (error instanceof Error) {
      if (error.message.includes('Network Error')) {
        return 'Network error. Please check your internet connection.';
      }
      try {
        const parsedError = JSON.parse(error.message);
        if (parsedError.message) {
          return parsedError.message;
        }
      } catch (e) {
        // Not a JSON error, continue with other checks
      }
      return error.message || `Failed to ${action}. Please try again.`;
    } else if (typeof error === 'string') {
      return error;
    }
    return `Failed to ${action}. Please try again.`;
  };

  // Local authentication - Sign In
  const signIn = async (formData: SignInFormData) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    // Client-side rate limiting to prevent DoS/DDoS and brute force attacks
    if (checkRateLimit('login')) {
      setAuthState({
        ...authState,
        loading: false,
        error: 'Too many login attempts. Please try again later.',
        rateLimitExceeded: true,
        lastLoginAttempt: authState.lastLoginAttempt
      });
      return false;
    }

    const validationErrors = validateSignIn(formData);
    if (Object.keys(validationErrors).length > 0) {
      setAuthState({
        ...authState,
        loading: false,
        error: 'Please correct the form errors before submitting.',
        lastLoginAttempt: authState.lastLoginAttempt
      });
      return false;
    }

    try {
      incrementAttempt('login');
      const sanitizedFormData = {
        ...formData,
        email: sanitizeInput(formData.email),
        password: sanitizeInput(formData.password)
      };
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': Cookies.get('csrf_token') || ''
          // Removed Referrer-Policy header to resolve CORS issue
        },
        body: JSON.stringify(sanitizedFormData),
        credentials: 'include'
      });

      const data = await response.json();
      if (response.ok) {
        const token = data.token;
        if (token) {
          // Secure cookie storage to prevent phishing and trojan access
          Cookies.set('auth_token', token, { expires: 7, secure: true, sameSite: 'strict', path: '/' });
        }
        setAuthState({
          isAuthenticated: true,
          user: data.user,
          error: null,
          loading: false,
          rateLimitExceeded: false,
          lastLoginAttempt: Date.now()
        });
        setAttempts(prev => ({ ...prev, login: 0 }));
        return true;
      } else {
        setAuthState({
          ...authState,
          error: data.message || 'Login failed',
          loading: false,
          lastLoginAttempt: authState.lastLoginAttempt
        });
        return false;
      }
    } catch (error) {
      setAuthState({
        ...authState,
        error: handleApiError(error, 'login'),
        loading: false,
        lastLoginAttempt: authState.lastLoginAttempt
      });
      return false;
    }
  };

  // Phone OTP authentication - Send OTP
  const sendPhoneOtp = async (phoneNumber: string) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    if (checkRateLimit('socialAuth')) {
      setAuthState({
        ...authState,
        loading: false,
        error: 'Too many attempts. Please try again later.',
        rateLimitExceeded: true,
        lastLoginAttempt: authState.lastLoginAttempt
      });
      return false;
    }

    try {
      incrementAttempt('socialAuth');
      console.log('Sending OTP request for phone:', phoneNumber);
      const sanitizedPhone = sanitizeInput(phoneNumber);
      const response = await fetch(API_ENDPOINTS.SEND_OTP, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': Cookies.get('csrf_token') || ''
        },
        body: JSON.stringify({ phone: sanitizedPhone }),
        credentials: 'include'
      });

      const data = await response.json();
      if (response.ok) {
        setAuthState({
          ...authState,
          error: null,
          loading: false
        });
        return data;
      } else {
        setAuthState({
          ...authState,
          error: data.message || 'Failed to send OTP',
          loading: false
        });
        return false;
      }
    } catch (error) {
      setAuthState({
        ...authState,
        error: handleApiError(error, 'send OTP'),
        loading: false
      });
      return false;
    }
  };

  // Phone OTP authentication - Verify OTP
  const verifyPhoneOtp = async (phoneNumber: string, otp: string) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    if (checkRateLimit('socialAuth')) {
      setAuthState({
        ...authState,
        loading: false,
        error: 'Too many attempts. Please try again later.',
        rateLimitExceeded: true,
        lastLoginAttempt: authState.lastLoginAttempt
      });
      return false;
    }

    try {
      incrementAttempt('socialAuth');
      const sanitizedPhone = sanitizeInput(phoneNumber);
      const sanitizedOtp = sanitizeInput(otp);
      const response = await fetch(API_ENDPOINTS.VERIFY_OTP, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': Cookies.get('csrf_token') || ''
        },
        body: JSON.stringify({ phone: sanitizedPhone, otp: sanitizedOtp }),
        credentials: 'include'
      });

      const data = await response.json();
      if (response.ok) {
        const token = data.token;
        if (token) {
          Cookies.set('auth_token', token, { expires: 7, secure: true, sameSite: 'strict', path: '/' });
        }
        setAuthState({
          isAuthenticated: true,
          user: data.user,
          error: null,
          loading: false,
          rateLimitExceeded: false,
          lastLoginAttempt: Date.now()
        });
        setAttempts(prev => ({ ...prev, socialAuth: 0 }));
        return true;
      } else {
        setAuthState({
          ...authState,
          error: data.message || 'OTP verification failed',
          loading: false
        });
        return false;
      }
    } catch (error) {
      setAuthState({
        ...authState,
        error: handleApiError(error, 'verify OTP'),
        loading: false
      });
      return false;
    }
  };

  // Local authentication - Sign Up
  const signUp = async (formData: SignUpFormData) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    // Client-side rate limiting to prevent DoS/DDoS and brute force attacks
    if (checkRateLimit('register')) {
      setAuthState({
        ...authState,
        loading: false,
        error: 'Too many registration attempts. Please try again later.',
        rateLimitExceeded: true,
        lastLoginAttempt: authState.lastLoginAttempt
      });
      return false;
    }

    const validationErrors = validateSignUp(formData);
    if (Object.keys(validationErrors).length > 0) {
      setAuthState({
        ...authState,
        loading: false,
        error: 'Please correct the form errors before submitting.',
        lastLoginAttempt: authState.lastLoginAttempt
      });
      return false;
    }

    try {
      incrementAttempt('register');
      const sanitizedFormData = {
        ...formData,
        name: sanitizeInput(formData.username),
        email: sanitizeInput(formData.email),
        password: sanitizeInput(formData.password),
        confirmPassword: sanitizeInput(formData.confirmPassword)
      };
      const response = await fetch(API_ENDPOINTS.REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': Cookies.get('csrf_token') || '',
          // Security headers to mitigate XSS and phishing
          'Referrer-Policy': 'no-referrer-when-downgrade'
        },
        body: JSON.stringify(sanitizedFormData),
        credentials: 'include'
      });

      const data = await response.json();
      if (response.ok) {
        const token = data.token;
        if (token) {
          // Secure cookie storage to prevent phishing and trojan access
          Cookies.set('auth_token', token, { expires: 7, secure: true, sameSite: 'strict', path: '/' });
        }
        setAuthState({
          isAuthenticated: true,
          user: data.user,
          error: null,
          loading: false,
          rateLimitExceeded: false,
          lastLoginAttempt: Date.now()
        });
        setAttempts(prev => ({ ...prev, register: 0 }));
        return true;
      } else {
        setAuthState({
          ...authState,
          error: data.message || 'Registration failed',
          loading: false,
          lastLoginAttempt: authState.lastLoginAttempt
        });
        return false;
      }
    } catch (error) {
      setAuthState({
        ...authState,
        error: handleApiError(error, 'register'),
        loading: false,
        lastLoginAttempt: authState.lastLoginAttempt
      });
      return false;
    }
  };

  // Forgot Password
  const forgotPassword = async (formData: ForgotPasswordFormData) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    // Client-side rate limiting to prevent DoS/DDoS and brute force attacks
    if (checkRateLimit('forgotPassword')) {
      setAuthState({
        ...authState,
        loading: false,
        error: 'Too many password reset attempts. Please try again later.',
        rateLimitExceeded: true,
        lastLoginAttempt: authState.lastLoginAttempt
      });
      return false;
    }

    const validationErrors = validateForgotPassword(formData);
    if (Object.keys(validationErrors).length > 0) {
      setAuthState({
        ...authState,
        loading: false,
        error: 'Please enter a valid email address.',
        lastLoginAttempt: authState.lastLoginAttempt
      });
      return false;
    }

    try {
      incrementAttempt('forgotPassword');
      const sanitizedFormData = {
        ...formData,
        email: sanitizeInput(formData.email)
      };
      const response = await fetch(API_ENDPOINTS.FORGOT_PASSWORD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': Cookies.get('csrf_token') || '',
          // Security headers to mitigate XSS and phishing
          'Referrer-Policy': 'no-referrer-when-downgrade'
        },
        body: JSON.stringify(sanitizedFormData),
        credentials: 'include'
      });

      const data = await response.json();
      if (response.ok) {
        setAuthState({
          ...authState,
          error: null,
          loading: false,
          lastLoginAttempt: authState.lastLoginAttempt
        });
        setAttempts(prev => ({ ...prev, forgotPassword: 0 }));
        return true;
      } else {
        setAuthState({
          ...authState,
          error: data.message || 'Password reset failed',
          loading: false,
          lastLoginAttempt: authState.lastLoginAttempt
        });
        return false;
      }
    } catch (error) {
      setAuthState({
        ...authState,
        error: handleApiError(error, 'reset password'),
        loading: false,
        lastLoginAttempt: authState.lastLoginAttempt
      });
      return false;
    }
  };

  // Social authentication
  const socialAuth = async (provider: 'google' | 'facebook' | 'linkedin' | 'twitter') => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    // Client-side rate limiting to prevent DoS/DDoS and brute force attacks
    if (checkRateLimit('socialAuth')) {
      setAuthState({
        ...authState,
        loading: false,
        error: 'Too many social login attempts. Please try again later.',
        rateLimitExceeded: true,
        lastLoginAttempt: authState.lastLoginAttempt
      });
      return false;
    }

    try {
      incrementAttempt('socialAuth');
      const endpoint = provider === 'google' ? API_ENDPOINTS.SOCIAL_AUTH.GOOGLE :
                      provider === 'facebook' ? API_ENDPOINTS.SOCIAL_AUTH.FACEBOOK :
                      provider === 'linkedin' ? API_ENDPOINTS.SOCIAL_AUTH.LINKEDIN :
                      API_ENDPOINTS.SOCIAL_AUTH.TWITTER;
      // Secure redirect to prevent phishing and DNS spoofing
      window.location.href = endpoint;
      return true;
    } catch (error) {
      setAuthState({
        ...authState,
        error: handleApiError(error, `${provider} authentication`),
        loading: false,
        lastLoginAttempt: authState.lastLoginAttempt
      });
      return false;
    }
  };

  // Logout
  const logout = async () => {
    Cookies.remove('auth_token', { path: '/' });
    Cookies.remove('csrf_token', { path: '/' });
    setAuthState({
      isAuthenticated: false,
      user: null,
      error: null,
      loading: false,
      rateLimitExceeded: false,
      lastLoginAttempt: 0
    });
  };

  return {
    ...authState,
    signIn,
    signUp,
    forgotPassword,
    socialAuth,
    logout,
    resetRateLimits,
    sendPhoneOtp,
    verifyPhoneOtp
  };
};

export default useAuth;
