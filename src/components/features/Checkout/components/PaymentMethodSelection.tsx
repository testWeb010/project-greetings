import React from 'react';
import { CreditCard, Smartphone, Building, Wallet, Lock, Eye, EyeOff, Calendar } from 'lucide-react';

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  processingTime: string; // Not used in this component's render, but good to keep the type definition complete
  fees: string; // Not used in this component's render
  popular?: boolean;
}

interface PaymentMethodSelectionProps {
  paymentMethods: PaymentMethod[];
  selectedPaymentMethod: string;
  setSelectedPaymentMethod: (methodId: string) => void;
  formData: {
    email: string;
    fullName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardName: string;
    upiId: string;
    saveCard: boolean;
    agreeTerms: boolean;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    email: string;
    fullName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardName: string;
    upiId: string;
    saveCard: boolean;
    agreeTerms: boolean;
  }>>;
  errors: Record<string, string>;
  showCvv: boolean;
  setShowCvv: React.Dispatch<React.SetStateAction<boolean>>;
}

const PaymentMethodSelection: React.FC<PaymentMethodSelectionProps> = ({
  paymentMethods,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  formData,
  setFormData,
  errors,
  showCvv,
  setShowCvv,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>

      {/* Payment Method Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => setSelectedPaymentMethod(method.id)}
            className={`relative p-4 border-2 rounded-xl transition-all ${
              selectedPaymentMethod === method.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {method.popular && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                Popular
              </span>
            )}
            <div className="flex items-center space-x-3">
              <method.icon className={`h-6 w-6 ${
                selectedPaymentMethod === method.id ? 'text-blue-600' : 'text-gray-600'
              }`} />
              <div className="text-left">
                <div className={`font-medium ${
                  selectedPaymentMethod === method.id ? 'text-blue-900' : 'text-gray-900'
                }`}>
                  {method.name}
                </div>
                <div className="text-sm text-gray-600">{method.description}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Payment Details */}
      {selectedPaymentMethod === 'card' && (
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
                onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
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
                  onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
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
                  onChange={(e) => setFormData({...formData, cvv: e.target.value})}
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
              onChange={(e) => setFormData({...formData, cardName: e.target.value})}
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
              onChange={(e) => setFormData({...formData, saveCard: e.target.checked})}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Save card for future payments</span>
          </label>
        </div>
      )}

      {selectedPaymentMethod === 'upi' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            UPI ID *
          </label>
          <div className="relative">
            <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={formData.upiId}
              onChange={(e) => setFormData({...formData, upiId: e.target.value})}
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
      )}

      {selectedPaymentMethod === 'netbanking' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Bank
          </label>
          <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">Choose your bank</option>
            <option value="sbi">State Bank of India</option>
            <option value="hdfc">HDFC Bank</option>
            <option value="icici">ICICI Bank</option>
            <option value="axis">Axis Bank</option>
            <option value="kotak">Kotak Mahindra Bank</option>
          </select>
        </div>
      )}

      {selectedPaymentMethod === 'wallet' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Wallet
          </label>
          <div className="grid grid-cols-3 gap-4">
            {['Paytm', 'PhonePe', 'Amazon Pay'].map((wallet) => (
              <button
                key={wallet}
                className="p-4 border border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
              >
                <Wallet className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                <div className="text-sm font-medium text-gray-900">{wallet}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodSelection;
