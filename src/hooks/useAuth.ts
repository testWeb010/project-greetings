import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { useApi, useMutation } from './useApi';
import { authService, LoginRequest, RegisterRequest } from '../services/authService';
import { User } from '../types';

// Auth context types
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<any>;
  register: (data: RegisterRequest) => Promise<any>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<any>;
  checkAuth: () => void;
}

// Auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider hook
export function useAuthProvider() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Auth mutations
  const loginMutation = useMutation(authService.login, {
    onSuccess: (data) => {
      setUser(data.user);
    },
  });

  const registerMutation = useMutation(authService.register, {
    onSuccess: (data) => {
      setUser(data.user);
    },
  });

  const refreshMutation = useMutation(authService.refreshToken);

  // Check authentication status on mount
  const checkAuth = useCallback(() => {
    setIsLoading(true);
    const currentUser = authService.getCurrentUser();
    const isAuth = authService.isAuthenticated();
    
    if (isAuth && currentUser) {
      setUser(currentUser);
    } else {
      setUser(null);
    }
    
    setIsLoading(false);
  }, []);

  // Login function
  const login = useCallback(async (credentials: LoginRequest) => {
    const result = await loginMutation.execute(credentials);
    return result;
  }, [loginMutation]);

  // Register function
  const register = useCallback(async (data: RegisterRequest) => {
    const result = await registerMutation.execute(data);
    return result;
  }, [registerMutation]);

  // Logout function
  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
    }
  }, []);

  // Refresh token function
  const refreshToken = useCallback(async () => {
    const result = await refreshMutation.execute();
    return result;
  }, [refreshMutation]);

  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Auto-refresh token before expiry
  useEffect(() => {
    if (user) {
      const interval = setInterval(() => {
        refreshToken();
      }, 50 * 60 * 1000); // Refresh every 50 minutes

      return () => clearInterval(interval);
    }
  }, [user, refreshToken]);

  return {
    user,
    isAuthenticated: !!user,
    isLoading: isLoading || loginMutation.loading || registerMutation.loading,
    login,
    register,
    logout,
    refreshToken,
    checkAuth,
  };
}

// Hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Auth provider component
export const AuthProvider = AuthContext.Provider;

// Individual auth hooks
export function useLogin() {
  return useMutation(authService.login, {
    onSuccess: (data) => {
      // Auto-update user in auth context would be handled by the provider
      console.log('Login successful:', data.user.name);
    },
  });
}

export function useRegister() {
  return useMutation(authService.register, {
    onSuccess: (data) => {
      console.log('Registration successful:', data.user.name);
    },
  });
}

export function useLogout() {
  const [isLoading, setIsLoading] = useState(false);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { logout, isLoading };
}

export function useForgotPassword() {
  return useMutation(authService.forgotPassword);
}

export function useResetPassword() {
  return useMutation(authService.resetPassword);
}

export function useChangePassword() {
  return useMutation(authService.changePassword);
}

export function useVerifyEmail() {
  return useMutation(authService.verifyEmail);
}

export function useGoogleAuth() {
  const getAuthUrl = useApi(authService.getGoogleAuthUrl);
  const handleCallback = useMutation(authService.handleGoogleAuth);

  return {
    getAuthUrl: getAuthUrl.execute,
    handleCallback: handleCallback.execute,
    loading: getAuthUrl.loading || handleCallback.loading,
    error: getAuthUrl.error || handleCallback.error,
  };
}

export function useCheckUsername() {
  return useApi(authService.checkUsername);
}

// Protected route hook
export function useRequireAuth() {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      window.location.href = '/login';
    }
  }, [isAuthenticated, isLoading]);

  return { isAuthenticated, isLoading };
}

// Admin auth hook
export function useRequireAdmin() {
  const { user, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        window.location.href = '/login';
      } else if (user && user.membershipTier !== 'admin') {
        window.location.href = '/';
      }
    }
  }, [user, isAuthenticated, isLoading]);

  return { 
    isAuthenticated, 
    isAdmin: user?.membershipTier === 'admin',
    isLoading 
  };
}