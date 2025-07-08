import { api, ApiResponse } from './api';
import { User } from '../types';

// Auth request/response types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  phone?: string;
  terms: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface VerifyEmailRequest {
  token: string;
}

export interface GoogleAuthResponse {
  url: string;
}

// Authentication API endpoints
export const authService = {
  // Register new user
  register: async (data: RegisterRequest): Promise<ApiResponse<AuthResponse>> => {
    return api.post('/api/auth/register', data);
  },

  // Login user
  login: async (data: LoginRequest): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post<AuthResponse>('/api/auth/login', data);
    
    // Store auth data in localStorage
    if (response.success && response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      if (response.data.refreshToken) {
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }
    }
    
    return response;
  },

  // Logout user
  logout: async (): Promise<void> => {
    try {
      await api.post('/api/auth/logout');
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Logout API error:', error);
    } finally {
      // Clear local storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      localStorage.removeItem('refreshToken');
    }
  },

  // Verify email
  verifyEmail: async (data: VerifyEmailRequest): Promise<ApiResponse<{ message: string }>> => {
    return api.post('/api/auth/verify-email', data);
  },

  // Forgot password
  forgotPassword: async (data: ForgotPasswordRequest): Promise<ApiResponse<{ message: string }>> => {
    return api.post('/api/auth/forgot-password', data);
  },

  // Reset password
  resetPassword: async (data: ResetPasswordRequest): Promise<ApiResponse<{ message: string }>> => {
    return api.post('/api/auth/reset-password', data);
  },

  // Change password (authenticated user)
  changePassword: async (data: ChangePasswordRequest): Promise<ApiResponse<{ message: string }>> => {
    return api.put('/api/user/change-password', data);
  },

  // Google OAuth - get auth URL
  getGoogleAuthUrl: async (): Promise<ApiResponse<GoogleAuthResponse>> => {
    return api.get('/api/auth/google-request');
  },

  // Google OAuth - handle callback
  handleGoogleAuth: async (code: string): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post<AuthResponse>('/api/auth/google', { code });
    
    // Store auth data in localStorage
    if (response.success && response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      if (response.data.refreshToken) {
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }
    }
    
    return response;
  },

  // Refresh token
  refreshToken: async (): Promise<ApiResponse<{ token: string }>> => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    
    const response = await api.post<{ token: string }>('/api/auth/refresh', { refreshToken });
    
    if (response.success && response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    
    return response;
  },

  // Get current user
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
    return null;
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('authToken');
  },

  // Get auth token
  getToken: (): string | null => {
    return localStorage.getItem('authToken');
  },

  // Check username availability
  checkUsername: async (username: string): Promise<ApiResponse<{ available: boolean }>> => {
    return api.get('/api/user/check-username', { username });
  },

  // Resend verification email
  resendVerification: async (email: string): Promise<ApiResponse<{ message: string }>> => {
    return api.post('/api/auth/resend-verification', { email });
  },
};