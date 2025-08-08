import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import { SocialAuthSectionProps } from '../types';
import useAuth from '../hooks/useAuth';

const MobileOtpSection: React.FC<SocialAuthSectionProps> = ({ handleSocialAuth }) => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const { sendPhoneOtp, verifyPhoneOtp } = useAuth();

  const handleSendOtp = async () => {
    // Use the actual sendPhoneOtp function from useAuth
    const result = await sendPhoneOtp(phoneNumber);
    if (result) {
      setIsOtpSent(true);
    }
  };

  const handleVerifyOtp = async () => {
    // Use the actual verifyPhoneOtp function from useAuth
    const result = await verifyPhoneOtp(phoneNumber, otp);
    if (result) {
      handleSocialAuth('phone');
    }
  };

  return (
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
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all"
              placeholder="Enter your phone number"
              required
            />
          </div>
          <button
            onClick={handleSendOtp}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-200 font-medium"
          >
            Send OTP
          </button>
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Enter OTP
          </label>
          <div className="relative">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all"
              placeholder="Enter OTP"
              required
            />
          </div>
          <button
            onClick={handleVerifyOtp}
            className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition-all duration-200 font-medium"
          >
            Verify OTP
          </button>
          <div className="mt-2 text-center">
            <button
              onClick={() => setIsOtpSent(false)}
              className="text-blue-600 hover:underline dark:text-blue-400 text-sm focus:outline-none"
            >
              Change number
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileOtpSection;
