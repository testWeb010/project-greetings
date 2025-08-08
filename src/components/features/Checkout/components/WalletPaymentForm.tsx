import React from 'react';
import { Wallet } from 'lucide-react';

interface WalletPaymentFormProps {
  // Add any necessary props here, e.g., for handling wallet selection
}

const WalletPaymentForm: React.FC<WalletPaymentFormProps> = () => {
  // Assuming wallet selection logic is simple or handled internally for now
  const wallets = ['Paytm', 'PhonePe', 'Amazon Pay'];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Wallet
      </label>
      <div className="grid grid-cols-3 gap-4">
        {wallets.map((wallet) => (
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
  );
};

export default WalletPaymentForm;