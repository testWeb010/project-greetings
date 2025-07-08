
import React, { useState } from 'react';
import LocalAuthSection from './LocalAuthSection';
import SocialAuthSection from './SocialAuthSection';

interface AuthContainerProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'signin' | 'signup';
  onModeChange: (mode: 'signin' | 'signup') => void;
}

const AuthContainer: React.FC<AuthContainerProps> = ({ 
  isOpen, 
  onClose, 
  mode, 
  onModeChange 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-6xl h-[600px] flex overflow-hidden">
        {/* Local Auth Section - Left Side */}
        <LocalAuthSection 
          mode={mode}
          onModeChange={onModeChange}
          onClose={onClose}
        />
        
        {/* Social Auth Section - Right Side */}
        <SocialAuthSection 
          mode={mode}
        />
      </div>
    </div>
  );
};

export default AuthContainer;
