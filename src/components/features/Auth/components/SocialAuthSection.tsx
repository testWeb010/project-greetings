import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { SocialAuthSectionProps } from '../types';
import SocialAuthButtons from './SocialAuthButtons';
import MobileOtpSection from './MobileOtpSection';

const SocialAuthSection: React.FC<SocialAuthSectionProps> = ({ handleSocialAuth, mode }) => {
  const [authMethod, setAuthMethod] = useState<'social' | 'mobile'>('social');

  const isSignIn = mode === 'signin';

  return (
    <div className="p-8 lg:p-12 flex flex-col justify-center bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700">
      <div className="max-w-lg mx-auto w-full">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Quick {isSignIn ? 'Sign In' : 'Sign Up'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Use social accounts or mobile number
          </p>
        </div>

        {/* Toggle Between Social and Mobile */}
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1 mb-6">
          <button
            onClick={() => setAuthMethod('social')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              authMethod === 'social' 
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            Social Login
          </button>
          <button
            onClick={() => setAuthMethod('mobile')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              authMethod === 'mobile' 
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            Mobile OTP
          </button>
        </div>

        {authMethod === 'social' ? (
          // Social Login Section
          <div className="space-y-4">
            <SocialAuthButtons handleSocialAuth={handleSocialAuth} mode={mode} />
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">More options</span>
              </div>
            </div>
          </div>
        ) : (
          // Mobile OTP Section
          <MobileOtpSection handleSocialAuth={handleSocialAuth} mode={mode} />
        )}

        {/* Benefits Section */}
        <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl border border-blue-200 dark:border-blue-700">
          <div className="flex items-center space-x-2 text-blue-700 dark:text-blue-300 mb-2">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">
              {isSignIn ? 'Why use quick login?' : 'Student Benefits'}
            </span>
          </div>
          <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
            {isSignIn ? (
              <>
                <li>• Faster login process</li>
                <li>• No need to remember passwords</li>
                <li>• Secure authentication</li>
                <li>• Auto-fill profile information</li>
              </>
            ) : (
              <>
                <li>• 6 free chats with property owners</li>
                <li>• Verified student badge</li>
                <li>• Priority customer support</li>
                <li>• Exclusive student discounts</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SocialAuthSection;
