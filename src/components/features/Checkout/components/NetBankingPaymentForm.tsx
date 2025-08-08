import React from 'react';

interface NetBankingPaymentFormProps {
  // Add any necessary props here, e.g., for handling bank selection
}

const NetBankingPaymentForm: React.FC<NetBankingPaymentFormProps> = () => {
  return (
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
  );
};

export default NetBankingPaymentForm;