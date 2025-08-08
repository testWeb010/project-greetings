import React from 'react';
import { Membership } from '../../../../types';
import CouponSection from './CouponSection';

interface CouponCode {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  description: string;
  validUntil: string;
}

interface OrderSummaryProps {
  selectedPlan: Membership | null;
  billingCycle: 'monthly' | 'yearly';
  appliedCoupon: CouponCode | null;
  couponCode: string;
  showCouponInput: boolean;
  errors: Record<string, string>;
  formatPrice: (price: number) => string;
  calculateDiscount: () => number;
  getFinalPrice: () => number;
  setCouponCode: (code: string) => void;
  setShowCouponInput: (show: boolean) => void;
  handleCouponApply: () => void;
  handleCouponRemove: () => void;
  handlePayment: () => Promise<void>; // Or adjust return type based on actual function
  isProcessing: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  selectedPlan,
  billingCycle,
  appliedCoupon,
  couponCode,
  showCouponInput,
  errors,
  formatPrice,
  calculateDiscount,
  getFinalPrice,
  setCouponCode,
  setShowCouponInput,
  handleCouponApply,
  handleCouponRemove,
  handlePayment,
  isProcessing,
}) => {
  if (!selectedPlan) {
    return null; // Or a loading state/skeleton
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Plan</span>
          <span className="font-medium text-gray-900">{selectedPlan.name}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Billing</span>
          <span className="font-medium text-gray-900 capitalize">{billingCycle}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-gray-900">{formatPrice(selectedPlan.price)}</span>
        </div>

        {appliedCoupon && (
          <div className="flex items-center justify-between text-green-600">
            <span>Discount ({appliedCoupon.code})</span>
            <span>-{formatPrice(calculateDiscount())}</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Taxes</span>
          <span className="font-medium text-gray-900">₹0</span>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-gray-900">{formatPrice(getFinalPrice())}</span>
          </div>
        </div>
      </div>

      {/* Coupon Code */}
      <CouponSection
        couponCode={couponCode}
        appliedCoupon={appliedCoupon}
        showCouponInput={showCouponInput}
        errors={errors}
        setCouponCode={setCouponCode}
        setShowCouponInput={setShowCouponInput}
        handleCouponApply={handleCouponApply}
        handleCouponRemove={handleCouponRemove}
      />
    </div>
  );
};

export default OrderSummary;