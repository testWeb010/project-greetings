import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import { SignInFormData } from '../types';

type SignInViaPhoneFormProps = {
  onSubmit: (formData: SignInFormData) => Promise<void>;
};

const SignInViaPhoneForm: React.FC<SignInViaPhoneFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<SignInFormData>({
    email: '',
    password: '',
    phone: '',
    name: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: keyof SignInFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(formData);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full p-6 flex flex-col justify-between h-full">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Sign In with Phone</h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">Enter your phone number to receive a verification code.</p>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
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
      </div>

      <div className="mt-auto">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Sending Code...' : 'Send Verification Code'}
        </button>
      </div>
    </form>
  );
};

export default SignInViaPhoneForm;
