import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { SignInFormData } from '../types';

type SignInFormProps = {
  onSubmit: (formData: SignInFormData) => Promise<void>;
  onModeChange: (mode: 'signin' | 'signup' | 'phone' | 'forgot') => void;
};

interface SignInSpecificData {
  email: string;
  password: string;
}

const SignInForm: React.FC<SignInFormProps> = ({ onSubmit, onModeChange }) => {
  const [formData, setFormData] = useState<SignInSpecificData>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: keyof SignInSpecificData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4"> {/* Removed padding and flex classes, added space-y */} 

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all"
            placeholder="Enter your email"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all"
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>
      
      {/* Added Forgot Password link and Remember me checkbox based on AuthModal */} 
      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500" />
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
        </label>
        {/* Note: Forgot password logic is in AuthContainer's handleLocalAuth or can be added here if mode is passed */}
         {/* Temporarily added a placeholder button for Forgot password - functional link needs implementation based on mode logic */}
         {/* The actual navigation to 'forgot' mode is handled by the onModeChange prop in LocalAuthSection */}
        <button
          type="button"
          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
          onClick={() => { /* Add navigation to forgot password mode */ }}
        >
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Signing in...</span>
          </div>
        ) : (
          'Sign In'
        )}
      </button>
    </form>
  );
};

export default SignInForm;
