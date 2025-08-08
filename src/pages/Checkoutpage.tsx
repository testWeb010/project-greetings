import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  CreditCard, 
  Smartphone, 
  Building, 
  Wallet 
} from 'lucide-react';
import { Membership } from '../components/features/Checkout/types';
import CheckoutContainer from '../components/features/Checkout/containers/CheckoutContainer';

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  processingTime: string;
  fees: string;
  popular?: boolean;
}

interface CouponCode {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  description: string;
  validUntil: string;
}

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const planId = searchParams.get('plan') || 'premium';
  
  const [selectedPlan, setSelectedPlan] = useState<Membership | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<CouponCode | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    upiId: '',
    saveCard: false,
    agreeTerms: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showCvv, setShowCvv] = useState(false);

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, Rupay',
      processingTime: 'Instant',
      fees: 'No fees',
      popular: true
    },
    {
      id: 'upi',
      name: 'UPI',
      icon: Smartphone,
      description: 'Google Pay, PhonePe, Paytm',
      processingTime: 'Instant',
      fees: 'No fees',
      popular: true
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: Building,
      description: 'All major banks supported',
      processingTime: '1-2 minutes',
      fees: 'No fees'
    },
    {
      id: 'wallet',
      name: 'Wallet',
      icon: Wallet,
      description: 'Paytm, Mobikwik, Freecharge',
      processingTime: 'Instant',
      fees: 'No fees'
    }
  ];

  const couponCodes: CouponCode[] = [
    {
      code: 'SAVE10',
      discount: 10,
      type: 'percentage',
      description: '10% off any plan',
      validUntil: '2024-12-31'
    },
    {
      code: 'STUDENT20',
      discount: 20,
      type: 'percentage',
      description: '20% off for students',
      validUntil: '2024-12-31'
    },
    {
      code: 'FIRST100',
      discount: 100,
      type: 'fixed',
      description: '₹100 off on first purchase',
      validUntil: '2024-12-31'
    },
    {
      code: 'YEARLY50',
      discount: 50,
      type: 'percentage',
      description: '50% off on yearly plans',
      validUntil: '2024-12-31'
    }
  ];

  useEffect(() => {
    const plan = memberships.find(m => m.id === planId);
    if (plan) {
      setSelectedPlan(plan);
    } else {
      setSelectedPlan(memberships.find(m => m.id === 'premium') || memberships[1]);
    }
  }, [planId]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const calculateDiscount = () => {
    if (!appliedCoupon || !selectedPlan) return 0;
    if (appliedCoupon.type === 'percentage') {
      return (selectedPlan.price * appliedCoupon.discount) / 100;
    }
    return appliedCoupon.discount;
  };

  const getFinalPrice = () => {
    if (!selectedPlan) return 0;
    return selectedPlan.price - calculateDiscount();
  };

  const handleCouponApply = () => {
    const coupon = couponCodes.find(c => c.code === couponCode.toUpperCase());
    if (coupon) {
      setAppliedCoupon(coupon);
      setErrors(prev => ({ ...prev, coupon: '' }));
    } else {
      setErrors(prev => ({ ...prev, coupon: 'Invalid coupon code' }));
    }
  };

  const handleCouponRemove = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.agreeTerms) newErrors.agreeTerms = 'Please accept terms and conditions';

    if (selectedPaymentMethod === 'card') {
      if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
      if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
      if (!formData.cvv) newErrors.cvv = 'CVV is required';
      if (!formData.cardName) newErrors.cardName = 'Cardholder name is required';
    }

    if (selectedPaymentMethod === 'upi') {
      if (!formData.upiId) newErrors.upiId = 'UPI ID is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      navigate('/payment-success', { 
        state: { 
          plan: selectedPlan, 
          amount: getFinalPrice(),
          coupon: appliedCoupon 
        } 
      });
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'purple':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const memberships: Membership[] = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      duration: 30,
      features: [
        '6 free chats with property owners',
        'Basic property search',
        'View contact details (limited)',
        'Email support',
        'Basic property filters'
      ],
      chatCredits: 6,
      priority: false,
      verificationSupport: false,
      color: 'gray'
    },
    {
      id: 'basic',
      name: 'Basic',
      price: billingCycle === 'monthly' ? 299 : 2999,
      duration: billingCycle === 'monthly' ? 30 : 365,
      features: [
        '50 chats with property owners',
        'Advanced property search',
        'Full contact details access',
        'Priority email support',
        'Advanced filters & sorting',
        'Save favorite properties',
        'Property alerts',
        'Basic verification badge'
      ],
      chatCredits: 50,
      priority: true,
      verificationSupport: false,
      color: 'blue'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: billingCycle === 'monthly' ? 599 : 5999,
      duration: billingCycle === 'monthly' ? 30 : 365,
      features: [
        'Unlimited chats with property owners',
        'Premium property search',
        'Instant contact details access',
        'Priority phone & chat support',
        'All premium filters',
        'Unlimited favorites',
        'Instant property alerts',
        'Verified student badge',
        'Profile boost',
        'Early access to new properties'
      ],
      chatCredits: -1,
      priority: true,
      verificationSupport: true,
      color: 'purple'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: billingCycle === 'monthly' ? 999 : 9999,
      duration: billingCycle === 'monthly' ? 30 : 365,
      features: [
        'Unlimited chats with property owners',
        'Elite property search',
        'Instant contact details access',
        '24/7 dedicated support',
        'All elite filters',
        'Unlimited favorites',
        'Instant property alerts',
        'Verified elite badge',
        'Profile boost',
        'Early access to new properties',
        'Personalized recommendations',
        'Dedicated account manager'
      ],
      chatCredits: -1,
      priority: true,
      verificationSupport: true,
      color: 'purple'
    }
  ];


  useEffect(() => {
    const plan = memberships.find(m => m.id === planId);
    if (plan) {
      setSelectedPlan(plan);
      console.log('Selected plan on Checkout page:', plan);
    } else {
      // Fallback or error handling if planId from URL doesn't match any static plan
      console.log('Plan with ID', planId, 'not found. Falling back to premium or first plan.');
      setSelectedPlan(memberships.find(m => m.id === 'premium') || memberships[1]);
    }
  }, [planId]); // Re-run effect when planId changes

  if (!selectedPlan) {
    return <div>Loading...</div>;
  }

  console.log('Rendering CheckoutContainer with selected plan:', selectedPlan);


  return (
    <CheckoutContainer
      selectedPlan={selectedPlan}
      billingCycle={billingCycle}
      setBillingCycle={setBillingCycle}
      formatPrice={formatPrice}
      getColorClasses={getColorClasses}
      formData={formData}
      setFormData={setFormData as (data: Record<string, any>) => void}
      errors={errors}
      selectedPaymentMethod={selectedPaymentMethod}
      setSelectedPaymentMethod={setSelectedPaymentMethod}
      isProcessing={isProcessing}
      handlePayment={handlePayment}
      showCouponInput={showCouponInput}
      setShowCouponInput={setShowCouponInput}
      couponCode={couponCode}
      setCouponCode={setCouponCode}
      appliedCoupon={appliedCoupon}
      handleCouponApply={handleCouponApply}
      handleCouponRemove={handleCouponRemove}
      getFinalPrice={getFinalPrice}
      showCvv={showCvv}
      setShowCvv={setShowCvv}
      paymentMethods={paymentMethods}
    />
  );
};
export default CheckoutPage;