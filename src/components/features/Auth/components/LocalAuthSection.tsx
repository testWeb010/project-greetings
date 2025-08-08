import React from 'react';
import { LocalAuthSectionProps, SignInFormData, SignUpFormData } from '../types';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const LocalAuthSection: React.FC<LocalAuthSectionProps> = ({ mode, onModeChange, onSubmit }) => {
  // Provide a default empty function if onSubmit is undefined
  const handleSubmit = onSubmit || (async () => {});

  return (
    <div className="relative overflow-hidden"> {/* Removed w-3/5, rounded-l-2xl, bg classes */} {/* Removed Close Button */}


      {/* Header */}
      <div className="text-center mb-8 mt-6"> {/* Adjusted margin-top */} 
        {/* Removed profile icon div */}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {mode === 'signin' ? 'Welcome Back!' : 'Create Account'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {mode === 'signin'
            ? 'Sign in with your local account'
            : 'Create your local account'}
        </p>
      </div>

      {/* Form Container - Added div for consistent padding/margin around form */}
      <div className="px-6"> {/* Added horizontal padding */}
        {mode === 'signin' && <SignInForm onSubmit={handleSubmit as (data: SignInFormData) => Promise<void>} onModeChange={onModeChange} />}
        {mode === 'signup' && <SignUpForm onSubmit={handleSubmit as (data: SignUpFormData) => Promise<void>} onModeChange={onModeChange} />}
      </div>

      {/* Add the "Don't have an account?" section here */}
      {mode === 'signin' && (
        <div className="text-center mt-4 text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <button
            type="button" // Use type="button" to prevent form submission
            className="text-blue-600 hover:underline dark:text-blue-400 focus:outline-none"
            onClick={() => onModeChange('signup')}
          >
            Sign up
          </button>
        </div>
      )}
    </div>
  );
};

export default LocalAuthSection;
