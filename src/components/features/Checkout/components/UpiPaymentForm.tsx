import React from 'react';
import { Smartphone } from 'lucide-react';

interface UpiPaymentFormProps {
  formData: { upiId: string };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  errors: Record<string, string>;
}

const UpiPaymentForm: React.FC<UpiPaymentFormProps> = ({
  formData,
  setFormData,
  errors,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        UPI ID *
      </label>
      <div className="relative">
        <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={formData.upiId}
          onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
          className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.upiId ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="yourname@paytm"
        />
      </div>
      {errors.upiId && (
        <p className="mt-1 text-sm text-red-600">{errors.upiId}</p>
      )}
    </div>
  );
};

export default UpiPaymentForm;