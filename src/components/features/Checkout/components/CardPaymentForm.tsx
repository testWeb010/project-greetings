import React, { useState } from 'react';
import { CreditCard, Calendar, Lock, Eye, EyeOff } from 'lucide-react';

interface CardPaymentFormProps {
  formData: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardName: string;
    saveCard: boolean;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  errors: Record<string, string>;
}

const CardPaymentForm: React.FC<CardPaymentFormProps> = ({
  formData,
  setFormData,
  errors,
}) => {
  const [showCvv, setShowCvv] = useState(false);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Number *
        </label>
        <div className="relative">
          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={formData.cardNumber}
            onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.cardNumber ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
          />
        </div>
        {errors.cardNumber && (
          <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expiry Date *
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={formData.expiryDate}
              onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.expiryDate ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="MM/YY"
              maxLength={5}
            />
          </div>
          {errors.expiryDate && (
            <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CVV *
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type={showCvv ? 'text' : 'password'}
              value={formData.cvv}
              onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
              className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.cvv ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="123"
              maxLength={4}
            />
            <button
              type="button"
              onClick={() => setShowCvv(!showCvv)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showCvv ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.cvv && (
            <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cardholder Name *
        </label>
        <input
          type="text"
          value={formData.cardName}
          onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.cardName ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Name as on card"
        />
        {errors.cardName && (
          <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>
        )}
      </div>

      <label className="flex items-center">
        <input
          type="checkbox"
          checked={formData.saveCard}
          onChange={(e) => setFormData({ ...formData, saveCard: e.target.checked })}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span className="ml-2 text-sm text-gray-700">Save card for future payments</span>
      </label>
    </div>
  );
};

export default CardPaymentForm;