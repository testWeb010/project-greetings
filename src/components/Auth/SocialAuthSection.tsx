
import React, { useState } from 'react';
import { CheckCircle, Phone, Lock } from 'lucide-react';

interface SocialAuthSectionProps {
  mode: 'signin' | 'signup';
}

const SocialAuthSection: React.FC<SocialAuthSectionProps> = ({ mode }) => {
  const [authMethod, setAuthMethod] = useState<'social' | 'mobile'>('social');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSocialAuth = (provider: 'google' | 'facebook' | 'linkedin' | 'twitter') => {
    console.log(`Social auth with ${provider}`);
  };

  const handleSendOtp = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsOtpSent(true);
    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('OTP verified:', otp);
    setLoading(false);
  };

  const isSignIn = mode === 'signin';

  return (
    <div className="flex-1 p-8 lg:p-12 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700">
      <div className="max-w-md mx-auto">
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
              className="w-full flex items-center justify-center space-x-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 font-medium"
            >
              <div className="w-5 h-5 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">Li</span>
              </div>
              <span>LinkedIn</span>
            </button>

            <button 
              onClick={() => handleSocialAuth('twitter')}
              className="w-full flex items-center justify-center space-x-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 font-medium"
            >
              <div className="w-5 h-5 bg-black rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">@</span>
              </div>
              <span>Twitter</span>
            </button>
          </div>
        ) : (
          // Mobile OTP Section
          <div className="space-y-4">
            {!isOtpSent ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                <button
                  onClick={handleSendOtp}
                  disabled={loading || !phoneNumber}
                  className="w-full mt-4 bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                </button>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Enter OTP
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800"
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                    required
                  />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  OTP sent to {phoneNumber}
                </p>
                <button
                  onClick={handleVerifyOtp}
                  disabled={loading || otp.length !== 6}
                  className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
                <button
                  onClick={() => setIsOtpSent(false)}
                  className="w-full mt-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                >
                  Change number
                </button>
              </div>
            )}
          </div>
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
