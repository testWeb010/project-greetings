import React from 'react';
import { Tag, X } from 'lucide-react';

interface CouponCode {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  description: string;
  validUntil: string;
}

interface CouponSectionProps {
  couponCode: string;
  appliedCoupon: CouponCode | null;
  showCouponInput: boolean;
  errors: Record<string, string>;
  setCouponCode: (code: string) => void;
  setShowCouponInput: (show: boolean) => void;
  handleCouponApply: () => void;
  handleCouponRemove: () => void;
}

const CouponSection: React.FC<CouponSectionProps> = ({
  couponCode,
  appliedCoupon,
  showCouponInput,
  errors,
  setCouponCode,
  setShowCouponInput,
  handleCouponApply,
  handleCouponRemove,
}) => {
  return (
    <div className="mt-6 pt-6 border-t">
      {!showCouponInput ? (
        <button
          onClick={() => setShowCouponInput(true)}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          <Tag className="h-4 w-4" />
          <span>Apply Coupon Code</span>
        </button>
      ) : (
        <div className="space-y-3">
          <div className="flex space-x-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleCouponApply}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Apply
            </button>
          </div>
          {errors.coupon && (
            <p className="text-sm text-red-600">{errors.coupon}</p>
          )}
          {appliedCoupon && (
            <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
              <div>
                <div className="text-sm font-medium text-green-800">{appliedCoupon.code}</div>
                <div className="text-xs text-green-600">{appliedCoupon.description}</div>
              </div>
              <button
                onClick={handleCouponRemove}
                className="text-green-600 hover:text-green-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CouponSection;