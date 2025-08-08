import React from 'react';
import { AuthContainerProps, SignInFormData, SignUpFormData } from '../types';
import LocalAuthSection from '../components/LocalAuthSection';
import SocialAuthSection from '../components/SocialAuthSection';
import useAuth from '../hooks/useAuth';
import { X, User } from 'lucide-react'; // Import icons used in AuthModal header

const AuthContainer: React.FC<AuthContainerProps> = ({
  isOpen,
  onClose,
  mode,
  onModeChange
}) => {
  const { socialAuth, signIn, signUp } = useAuth();

  if (!isOpen) return null;

  const handleSocialAuth = async (provider: 'google' | 'facebook' | 'linkedin' | 'twitter' | 'phone') => {
    // Simulate social auth API call
    if (provider === 'phone') {
      console.log('Phone authentication');
      // Here you would handle phone authentication differently
      return;
    }
    socialAuth(provider);
  };

  const handleLocalAuth = async (formData: SignInFormData | SignUpFormData) => {
    if (mode === 'signin' || mode === 'phone') {
      await signIn(formData as SignInFormData);
    } else if (mode === 'signup') {
      await signUp(formData as SignUpFormData);
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
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px"> {/* Added min-h like in AuthModal */}
          {/* Local Auth Section - Left Side Column */}
          {/* Local Auth Section - Left Side Column */}
          <div className={`p-8 lg:p-12 flex flex-col justify-start ${mode === 'signup' ? 'bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900'}`}> 
             <div className="max-w-sm mx-auto w-full mt-4">
               <LocalAuthSection
                mode={mode}
                onModeChange={onModeChange}
                onClose={onClose}
                onSubmit={handleLocalAuth}
              />
             </div>
          </div>

          {/* Social Auth Section - Right Side Column */}
          <div className="flex flex-col justify-center bg-white dark:bg-gray-900">
             <div className="max-w-2xl mx-auto w-full">
                <SocialAuthSection
                  handleSocialAuth={handleSocialAuth}
                  mode={mode}
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
