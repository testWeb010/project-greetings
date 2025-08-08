import React from 'react';
import CheckoutHeader from '../components/CheckoutHeader';
import PlanSelectionSection from '../components/PlanSelectionSection';
import ContactInformationForm from '../components/ContactInformationForm';
import PaymentMethodSelection from '../components/PaymentMethodSelection';
import TermsAndConditions from '../components/TermsAndConditions';
import { Membership } from '../types';

// Define specific form data type to match structure in CheckoutPage
interface FormData {
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
}

interface CouponCode {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  description: string;
  validUntil: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  processingTime: string;
  fees: string;
  popular?: boolean;
}

interface CheckoutContainerProps {
  selectedPlan: Membership | null;
  billingCycle: 'monthly' | 'yearly';
  setBillingCycle: (cycle: 'monthly' | 'yearly') => void;
  formatPrice: (price: number) => string;
  getColorClasses: (color: string) => string;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  errors: Record<string, string>;
  selectedPaymentMethod: string;
  setSelectedPaymentMethod: (method: string) => void;
  isProcessing: boolean;
  handlePayment: () => void;
  showCouponInput: boolean;
  setShowCouponInput: React.Dispatch<React.SetStateAction<boolean>>;
  couponCode: string;
  setCouponCode: (code: string) => void;
  appliedCoupon: CouponCode | null;
  handleCouponApply: () => void;
  handleCouponRemove: () => void;
  getFinalPrice: () => number;
  showCvv: boolean;
  setShowCvv: React.Dispatch<React.SetStateAction<boolean>>;
  paymentMethods?: PaymentMethod[];
}

const CheckoutContainer: React.FC<CheckoutContainerProps> = ({
  selectedPlan,
  billingCycle,
  setBillingCycle,
  formatPrice,
  getColorClasses,
  formData,
  setFormData,
  errors,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  isProcessing,
  handlePayment,
  showCouponInput,
  setShowCouponInput,
  couponCode,
  setCouponCode,
  appliedCoupon,
  handleCouponApply,
  handleCouponRemove,
  getFinalPrice,
  showCvv,
  setShowCvv,
  paymentMethods = []
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <CheckoutHeader />
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Plan & Payment */}
          <div className="lg:col-span-2 space-y-6">
            <PlanSelectionSection 
              selectedPlan={selectedPlan}
              billingCycle={billingCycle}
              setBillingCycle={setBillingCycle}
              formatPrice={formatPrice}
              getColorClasses={getColorClasses}
            />
            
            <ContactInformationForm
              formData={formData}
              setFormData={setFormData}
              errors={errors}
            />
            
            <PaymentMethodSelection
              selectedPaymentMethod={selectedPaymentMethod}
              setSelectedPaymentMethod={setSelectedPaymentMethod}
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              showCvv={showCvv}
              setShowCvv={setShowCvv}
              paymentMethods={paymentMethods}
            />
          </div>
          
          {/* Right Column - Summary & Checkout */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              {selectedPlan && (
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>{selectedPlan.name} Plan ({billingCycle})</span>
                    <span>{formatPrice(selectedPlan.price)}</span>
                  </div>
                  
                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600">
                      <span>Coupon ({appliedCoupon.code})</span>
                      <span>
                        -{appliedCoupon.type === 'percentage' ? `${appliedCoupon.discount}%` : formatPrice(appliedCoupon.discount)}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span>{formatPrice(getFinalPrice())}</span>
                  </div>
                </div>
              )}
              
              {!showCouponInput ? (
                <button 
                  className="text-blue-600 hover:text-blue-800 text-sm mt-4"
                  onClick={() => setShowCouponInput(true)}
                >
                  Add Coupon Code
                </button>
              ) : (
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                      onClick={handleCouponApply}
                    >
                      Apply
                    </button>
                    {appliedCoupon && (
                      <button
                        className="bg-red-100 text-red-600 px-4 py-2 rounded-md hover:bg-red-200"
                        onClick={handleCouponRemove}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              )}
              
              <button
                className={`w-full mt-6 py-3 text-lg font-semibold rounded-md text-white ${isProcessing ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} transition-colors`}
                onClick={handlePayment}
                disabled={isProcessing || !formData.agreeTerms}
              >
                {isProcessing ? 'Processing...' : 'Complete Payment'}
              </button>
              
              <p className="text-xs text-gray-500 mt-2 text-center">
                By clicking 'Complete Payment', you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
            
            <TermsAndConditions
              agreeTerms={formData.agreeTerms}
              setFormData={setFormData}
              errors={errors}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutContainer;
