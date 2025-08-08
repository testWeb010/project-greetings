import React from 'react';

import { SocialAuthButtonsProps } from '../types';

const SocialAuthButtons: React.FC<SocialAuthButtonsProps> = ({
  handleSocialAuth,
  mode,
}) => {
  const isSignIn = mode === 'signin';

  return (
    
      <div className="max-w-sm mx-auto w-full">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Quick {isSignIn ? 'Sign In' : 'Sign Up'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Use your social accounts
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleSocialAuth('google')}
            className="w-full flex items-center justify-center space-x-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-red-300 dark:hover:border-red-500 transition-all duration-200 font-medium shadow-sm hover:shadow-md group"
          >
            <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-white text-sm font-bold">G</span>
            </div>
            <span>{isSignIn ? 'Continue' : 'Sign up'} with Google</span>
          </button>

          <button
            onClick={() => handleSocialAuth('facebook')}
            className="w-full flex items-center justify-center space-x-3 bg-blue-600 text-white px-6 py-4 rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md group"
          >
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-blue-600 text-sm font-bold">f</span>
            </div>
            <span>{isSignIn ? 'Continue' : 'Sign up'} with Facebook</span>
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">More options</span>
            </div>
          </div>

          <button 
            onClick={() => handleSocialAuth('linkedin')}
            className="w-full flex items-center justify-center space-x-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 font-medium">
            <div className="w-5 h-5 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">Li</span>
            </div>
            <span>LinkedIn</span>
          </button>

          <button 
            onClick={() => handleSocialAuth('twitter')}
            className="w-full flex items-center justify-center space-x-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 font-medium">
            <div className="w-5 h-5 bg-black rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">@</span>
            </div>
            <span>Twitter</span>
          </button>
        </div>
      </div>
    
  );
};

export default SocialAuthButtons;
