import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';
import { SignUpFormData } from '../types';

type SignUpFormProps = {
  onSubmit: (formData: SignUpFormData) => Promise<void>;
  onModeChange: (mode: 'signin' | 'signup' | 'phone' | 'forgot') => void;
};

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit, onModeChange }) => {
  const [formData, setFormData] = useState<SignUpFormData>({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: keyof SignUpFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(formData);
    setLoading(false);
  };

  return (
    // <form onSubmit={handleSubmit} className="w-full p-6 flex flex-col justify-between h-full">
    <form onSubmit={handleSubmit} className="w-full p-6 flex flex-col justify-between h-full">
      <div className="space-y-4 mb-6">
        <div>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 dark:bg-gray-800/80"
              placeholder="Enter your name"
              required
            />
          </div>
        </div>

        <div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 dark:bg-gray-800/80"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        <div>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 dark:bg-gray-800/80"
              placeholder="Enter your phone number"
              required
            />
          </div>
        </div>

        <div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 dark:bg-gray-800/80"
              placeholder="Create a password"
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

        <div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 dark:bg-gray-800/80"
              placeholder="Confirm your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            required
          />
          <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            I agree to the Terms and Privacy Policy
          </label>
        </div>
      </div>

      <div className="mt-auto">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </div>

      {/* Add the "Already have an account?" section here */}
      <div className="text-center mt-4 text-gray-600 dark:text-gray-400">
        Already have an account?{' '}
        <button
          type="button" // Use type="button" to prevent form submission
          onClick={() => onModeChange('signin')}
          className="text-blue-600 hover:underline dark:text-blue-400 focus:outline-none"
        >
          Sign in
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
