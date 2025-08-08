import React from 'react';
import { Lock } from 'lucide-react';

interface PaymentButtonProps {
  isProcessing: boolean;
  getFinalPrice: () => number;
  formatPrice: (price: number) => string;
  handlePayment: () => void;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  isProcessing,
  getFinalPrice,
  formatPrice,
  handlePayment,
}) => {
  return (
    <button
      onClick={handlePayment}
      disabled={isProcessing}
      className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isProcessing ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          <span>Processing...</span>
        </div>
      ) : (
        <div className="flex items-center justify-center space-x-2">
          <Lock className="h-5 w-5" />
          <span>Pay {formatPrice(getFinalPrice())}</span>
        </div>
      )}
    </button>
  );
};

export default PaymentButton;