import React from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import { ForgotPasswordFormProps } from '../types';

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  formData,
  setFormData,
  handleSubmit,
  isLoading,
  onModeChange,
}) => {
  return (
    <div className="max-w-md mx-auto p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Reset Password</h2>
        <p className="text-gray-600 dark:text-gray-400">Enter your email to receive reset instructions</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Sending...</span>
            </div>
          ) : (
            'Send Reset Link'
          )}
        </button>
      </form>

      <div className="text-center mt-6">
        <button
          onClick={() => onModeChange('signin')}
          className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium mx-auto"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Sign In</span>
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
