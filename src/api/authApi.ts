// src/api/authApi.ts

// Define types for request and response data (replace with your actual API types)
interface AuthResponse {
  success: boolean;
  message: string;
  token?: string; // Example: JWT token
  user?: any; // Example: User data (replace 'any')
}

interface SignInPayload {
  email?: string;
  phone?: string;
  password?: string;
  otp?: string;
}

interface SignUpPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface ForgotPasswordPayload {
  email: string;
}

interface SendOtpPayload {
  phone: string;
}

/**
 * Calls the sign-in API endpoint.
 * @param payload - User credentials (email/password or phone/otp).
 * @returns A promise resolving to the authentication response.
 */
export const signIn = async (payload: SignInPayload): Promise<AuthResponse> => {
  console.log('Calling signIn API with payload:', payload);
  // TODO: Replace with actual API call (e.g., using fetch or axios)
  // Example: const response = await fetch('/api/auth/signin', { method: 'POST', body: JSON.stringify(payload) });
  // Example: const data = await response.json();
  // Example: return data as AuthResponse;

  // --- Simulation (Remove this section when implementing actual API call) ---
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
  if (payload.email === 'test@example.com' && payload.password === 'password123') {
    return { success: true, message: 'Sign in successful', token: 'fake-token', user: { name: 'Test User' } };
  } else if (payload.phone === '1234567890' && payload.otp === '123456') {
     return { success: true, message: 'Sign in successful', token: 'fake-token', user: { name: 'Test User Phone' } };
  } else {
    throw new Error('Invalid credentials or OTP');
  }
  // --- End Simulation ---
};

/**
 * Calls the sign-up API endpoint.
 * @param payload - User registration details.
 * @returns A promise resolving to the authentication response.
 */
export const signUp = async (payload: SignUpPayload): Promise<AuthResponse> => {
  console.log('Calling signUp API with payload:', payload);
  // TODO: Replace with actual API call
  // Example: const response = await fetch('/api/auth/signup', { method: 'POST', body: JSON.stringify(payload) });
  // Example: const data = await response.json();
  // Example: return data as AuthResponse;

  // --- Simulation (Remove this section) ---
  await new Promise(resolve => setTimeout(resolve, 1000));
  if (payload.email && payload.password && payload.password === payload.confirmPassword) {
     return { success: true, message: 'Sign up successful', user: { name: payload.name, email: payload.email } };
  } else {
     throw new Error('Sign up failed');
  }
  // --- End Simulation ---
};

/**
 * Calls the forgot password API endpoint to request a reset link.
 * @param payload - User's email address.
 * @returns A promise resolving to the authentication response.
 */
export const forgotPassword = async (payload: ForgotPasswordPayload): Promise<AuthResponse> => {
  console.log('Calling forgotPassword API with payload:', payload);
  // TODO: Replace with actual API call
  // Example: const response = await fetch('/api/auth/forgot-password', { method: 'POST', body: JSON.stringify(payload) });
  // Example: const data = await response.json();
  // Example: return data as AuthResponse;

   // --- Simulation (Remove this section) ---
  await new Promise(resolve => setTimeout(resolve, 1000));
  if (payload.email === 'test@example.com') {
     return { success: true, message: 'Password reset link sent' };
  } else {
     throw new Error('Email not found');
  }
  // --- End Simulation ---
};

/**
 * Calls the API endpoint to send an OTP to a phone number.
 * @param payload - User's phone number.
 * @returns A promise resolving to the authentication response.
 */
export const sendOtp = async (payload: SendOtpPayload): Promise<AuthResponse> => {
   console.log('Calling sendOtp API with payload:', payload);
  // TODO: Replace with actual API call
  // Example: const response = await fetch('/api/auth/send-otp', { method: 'POST', body: JSON.stringify(payload) });
  // Example: const data = await response.json();
  // Example: return data as AuthResponse;

   // --- Simulation (Remove this section) ---
   await new Promise(resolve => setTimeout(resolve, 1000));
   if (payload.phone === '1234567890') {
      return { success: true, message: 'OTP sent successfully' };
   } else {
      throw new Error('Failed to send OTP');
   }
   // --- End Simulation ---
};

/**
 * Handles social authentication initiation.
 * @param provider - The social auth provider (e.g., 'google', 'facebook').
 * @returns void (typically redirects user or opens a popup)
 */
export const socialAuth = (provider: 'google' | 'facebook' | 'linkedin' | 'twitter'): void => {
  console.log(`Initiating social auth with ${provider}`);
  // TODO: Implement actual social authentication flow (e.g., redirect to backend auth route)
  // Example: window.location.href = `/api/auth/${provider}`;
};
