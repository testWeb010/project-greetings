import React from 'react';
import { ArrowLeft, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CheckoutHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/membership')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Checkout</h1>
              <p className="text-sm text-gray-600">Complete your membership purchase</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-green-600" />
            <span className="text-sm text-gray-600">Secure Payment</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutHeader;
