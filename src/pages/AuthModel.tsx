import React, { useState } from 'react';
import { X, User } from 'lucide-react';
import SignInForm from '../components/Auth/SignInForm';
import SignUpForm from '../components/Auth/SignUpForm';
import ForgotPasswordForm from '../components/Auth/ForgotPasswordForm';
import SocialAuthButtons from '../components/Auth/SocialAuthButtons';
import { signIn, signUp, forgotPassword, sendOtp, socialAuth } from '../api/authApi'; // Import API functions

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'signin' | 'signup' | 'forgot';
  onModeChange: (mode: 'signin' | 'signup' | 'forgot') => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, mode, onModeChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    otp: ''
  });
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let response;
      if (mode === 'signin') {
        response = await signIn({
          email: authMethod === 'email' ? formData.email : undefined,
          phone: authMethod === 'phone' ? formData.phone : undefined,
          password: authMethod === 'email' ? formData.password : undefined,
          otp: authMethod === 'phone' ? formData.otp : undefined,
        });
      } else if (mode === 'signup') {
        response = await signUp(formData);
      } else if (mode === 'forgot') {
        response = await forgotPassword({ email: formData.email });
      }

      console.log(`${mode} successful:`, response);
      // TODO: Handle successful authentication (e.g., store token, redirect, show success message)
      onClose(); // Close modal on success for now

    } catch (error: any) {
      console.error(`${mode} failed:`, error);
      // TODO: Handle authentication errors (e.g., display error message to user)
      alert(`Authentication failed: ${error.message}`); // Basic error display
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = (provider: 'google' | 'facebook' | 'linkedin' | 'twitter') => {
    // Call the imported socialAuth API function
    socialAuth(provider);
    // TODO: Handle potential errors or callbacks from social auth initiation if necessary
  };

  const handleSendOtp = async () => {
    setIsLoading(true);
    try {
      // Call the imported sendOtp API function
      const response = await sendOtp({ phone: formData.phone });
      console.log('Send OTP successful:', response);
      setIsOtpSent(true);
      // TODO: Show a success message to the user
    } catch (error: any) {
      console.error('Send OTP failed:', error);
      // TODO: Handle error (e.g., display error message)
      alert(`Failed to send OTP: ${error.message}`); // Basic error display
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-5xl w-full shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">HomeDaze</span>
              <div className="text-xs text-gray-500 dark:text-gray-400">Student Rentals</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-hidden">
          {mode === 'signin' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
              <SignInForm
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                onModeChange={onModeChange}
                authMethod={authMethod}
                setAuthMethod={setAuthMethod}
                isOtpSent={isOtpSent}
                setIsOtpSent={setIsOtpSent}
                handleSendOtp={handleSendOtp}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
              <SocialAuthButtons handleSocialAuth={handleSocialAuth} mode="signin" />
            </div>
          )}
          {mode === 'signup' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[700px]">
               <SignUpForm
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                onModeChange={onModeChange}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
              <SocialAuthButtons handleSocialAuth={handleSocialAuth} mode="signup" />
            </div>
          )}
          {mode === 'forgot' && (
            <ForgotPasswordForm
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              onModeChange={onModeChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;