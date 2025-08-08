import React from 'react';
import { Shield } from 'lucide-react';

interface MoneyBackGuaranteeProps {
  // No specific props needed based on the current structure
}

const MoneyBackGuarantee: React.FC<MoneyBackGuaranteeProps> = () => {
  return (
    <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
          <Shield className="h-5 w-5 text-white" />
        </div>
        <div>
          <h4 className="font-semibold text-green-800">7-Day Money Back</h4>
          <p className="text-sm text-green-600">100% satisfaction guaranteed</p>
        </div>
      </div>
      <p className="text-sm text-green-700">
        Not satisfied? Get a full refund within 7 days, no questions asked.
      </p>
    </div>
  );
};

export default MoneyBackGuarantee;