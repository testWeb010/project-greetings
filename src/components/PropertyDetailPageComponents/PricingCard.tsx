import React from 'react';
import { IndianRupee } from 'lucide-react';

interface PricingCardProps {
  price: number;
  deposit: number;
  totalCost: number;
  onGetContactDetailsClick: () => void;
  onScheduleVisitClick: () => void;
}

const PricingCard: React.FC<PricingCardProps> = ({
  price,
  deposit,
  totalCost,
  onGetContactDetailsClick,
  onScheduleVisitClick,
}) => {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="text-center mb-6">
        <div className="text-3xl font-bold text-gray-900 mb-2">
          {formatPrice(price)}
          <span className="text-lg font-normal text-gray-600">/Month</span>
        </div>
        <p className="text-sm text-gray-600">All utilities are included</p>
      </div>

      {/* Cost Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Average monthly rent</span>
          <span className="font-semibold">{formatPrice(price)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Deposit / Security Money</span>
          <span className="font-semibold">{formatPrice(deposit)}</span>
        </div>
        <div className="border-t pt-3">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-900">Total costs</span>
            <span className="font-bold text-lg">{formatPrice(totalCost)}</span>
          </div>
        </div>
      </div>

      <button
        onClick={onGetContactDetailsClick}
        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold mb-3"
      >
        Get Contact Details
      </button>

      <button
        onClick={onScheduleVisitClick}
        className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
      >
        Schedule Visit
      </button>
    </div>
  );
};

export default PricingCard;
