import React from 'react';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock,
  Phone
} from 'lucide-react';

interface SignInFormProps {
  formData: any; // Replace 'any' with a specific type if available
  setFormData: React.Dispatch<React.SetStateAction<any>>; // Replace 'any'
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  onModeChange: (mode: 'signin' | 'signup' | 'forgot') => void;
  authMethod: 'email' | 'phone';
  setAuthMethod: React.Dispatch<React.SetStateAction<'email' | 'phone'>>;
  isOtpSent: boolean;
  setIsOtpSent: React.Dispatch<React.SetStateAction<boolean>>;
  handleSendOtp: () => void;
  showPassword?: boolean; // Make optional if managed in parent
  setShowPassword?: React.Dispatch<React.SetStateAction<boolean>>; // Make optional
}

const SignInForm: React.FC<SignInFormProps> = ({
  formData,
  setFormData,
  handleSubmit,
  isLoading,
  onModeChange,
  authMethod,
  setAuthMethod,
  isOtpSent,
  setIsOtpSent,
  handleSendOtp,
  showPassword = false, // Default value if not provided
  setShowPassword = () => {}, // Default empty function
}) => {

  return (
    <div className="p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-sm mx-auto w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back!</h2>
          <p className="text-gray-600 dark:text-gray-400">Sign in to your account</p>
        </div>

        {/* Email/Phone Toggle */}
        <div className="flex bg-white/50 dark:bg-gray-700/50 rounded-xl p-1 mb-6">
          <button
            onClick={() => {
              setAuthMethod('email');
              setIsOtpSent(false);
            }}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${authMethod === 'email' ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' : 'text-gray-600 dark:text-gray-400'}`}
          >
            Email
          </button>
          <button
            onClick={() => {
              setAuthMethod('phone');
              setIsOtpSent(false);
            }}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${authMethod === 'phone' ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' : 'text-gray-600 dark:text-gray-400'}`}
          >
            Phone
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {authMethod === 'email' ? (
            <>
              <div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white transition-all backdrop-blur-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white transition-all backdrop-blur-sm"
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
            </>
          ) : (
            <>
              {!isOtpSent ? (
                <div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white transition-all backdrop-blur-sm"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={isLoading}
                    className="w-full mt-4 bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50"
                  >
                    {isLoading ? 'Sending OTP...' : 'Send OTP'}
                  </button>
                </div>
              ) : (
                <div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      value={formData.otp}
                      onChange={(e) => setFormData({...formData, otp: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white transition-all backdrop-blur-sm"
                      required
                    />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    OTP sent to {formData.phone}
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsOtpSent(false)}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium mt-2"
                  >
                    Change number
                  </button>
                </div>
              )}
            </>
          )}

          {(authMethod === 'email' || isOtpSent) && (
            <>
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                </label>
                {authMethod === 'email' && (
                  <button
                    type="button"
                    onClick={() => onModeChange('forgot')}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                  >
                    Forgot password?
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </>
          )}
        </form>

        <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
          Don't have an account?{' '}
          <button
            onClick={() => onModeChange('signup')}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
