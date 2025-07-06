import React, { useState } from 'react';
import { Check, Crown, Star, MessageCircle, Shield, Zap, Users, TrendingUp, Gift, ArrowRight, Sparkles } from 'lucide-react';
import { Membership } from '../types';

const MembershipPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('basic');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

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
      chatCredits: -1, // Unlimited
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
        'Everything in Premium',
        'Dedicated relationship manager',
        '24/7 priority support',
        'Property visit assistance',
        'Negotiation support',
        'Legal document review',
        'Exclusive property access',
        'Premium verified badge',
        'Featured profile',
        'Custom property requirements'
      ],
      chatCredits: -1, // Unlimited
      priority: true,
      verificationSupport: true,
      color: 'gold'
    }
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleUpgrade = (planId: string) => {
    console.log('Upgrading to plan:', planId);
    // Integrate with payment API
  };

  const getColorClasses = (color: string, variant: 'bg' | 'text' | 'border' | 'gradient') => {
    const colorMap = {
      gray: {
        bg: 'bg-gray-50',
        text: 'text-gray-600',
        border: 'border-gray-200',
        gradient: 'from-gray-500 to-gray-600'
      },
      blue: {
        bg: 'bg-blue-50',
        text: 'text-blue-600',
        border: 'border-blue-200',
        gradient: 'from-blue-500 to-blue-600'
      },
      purple: {
        bg: 'bg-purple-50',
        text: 'text-purple-600',
        border: 'border-purple-200',
        gradient: 'from-purple-500 to-purple-600'
      },
      gold: {
        bg: 'bg-yellow-50',
        text: 'text-yellow-600',
        border: 'border-yellow-200',
        gradient: 'from-yellow-500 to-orange-500'
      }
    };
    return colorMap[color as keyof typeof colorMap][variant];
  };

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const calculateSavings = (monthlyPrice: number) => {
    const yearlyEquivalent = monthlyPrice * 12;
    const actualYearlyPrice = memberships.find(m => m.name === 'Premium')?.price || 0;
    if (billingCycle === 'yearly') {
      return Math.round(((yearlyEquivalent - actualYearlyPrice) / yearlyEquivalent) * 100);
    }
    return 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-purple-500 rounded-full opacity-10 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-500 rounded-full opacity-10 animate-pulse delay-2000"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Crown className="h-4 w-4 text-yellow-400" />
              <span>Membership Plans</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Unlock Premium
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400">
                Student Benefits
              </span>
            </h1>
            
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Choose the perfect plan to enhance your property search experience with unlimited chats, priority support, and exclusive features
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span className={`text-lg font-medium ${billingCycle === 'monthly' ? 'text-white' : 'text-blue-300'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${
                  billingCycle === 'yearly' ? 'bg-green-500' : 'bg-white/20'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    billingCycle === 'yearly' ? 'translate-x-9' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-lg font-medium ${billingCycle === 'yearly' ? 'text-white' : 'text-blue-300'}`}>
                Yearly
              </span>
              {billingCycle === 'yearly' && (
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Save 17%
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Membership Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {memberships.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                selectedPlan === plan.id ? 'ring-4 ring-blue-500 transform scale-105' : ''
              } ${plan.name === 'Premium' ? 'border-2 border-purple-200' : ''}`}
            >
              {/* Popular Badge */}
              {plan.name === 'Premium' && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center space-x-1">
                    <Star className="h-4 w-4" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className={`${getColorClasses(plan.color, 'bg')} p-6 text-center`}>
                <div className={`w-16 h-16 bg-gradient-to-r ${getColorClasses(plan.color, 'gradient')} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  {plan.name === 'Free' && <Gift className="h-8 w-8 text-white" />}
                  {plan.name === 'Basic' && <Users className="h-8 w-8 text-white" />}
                  {plan.name === 'Premium' && <Crown className="h-8 w-8 text-white" />}
                  {plan.name === 'Pro' && <Sparkles className="h-8 w-8 text-white" />}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">
                    {formatPrice(plan.price)}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-gray-600">
                      /{billingCycle === 'monthly' ? 'month' : 'year'}
                    </span>
                  )}
                </div>

                {plan.chatCredits === -1 ? (
                  <div className="flex items-center justify-center space-x-2 text-green-600 font-medium">
                    <MessageCircle className="h-5 w-5" />
                    <span>Unlimited Chats</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <MessageCircle className="h-5 w-5" />
                    <span>{plan.chatCredits} Chats</span>
                  </div>
                )}
              </div>

              {/* Features List */}
              <div className="p-6">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Action Button */}
                <button
                  onClick={() => handleUpgrade(plan.id)}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                    plan.name === 'Free'
                      ? 'bg-gray-100 text-gray-600 cursor-default'
                      : selectedPlan === plan.id
                      ? `bg-gradient-to-r ${getColorClasses(plan.color, 'gradient')} text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1`
                      : `border-2 ${getColorClasses(plan.color, 'border')} ${getColorClasses(plan.color, 'text')} hover:bg-gradient-to-r hover:${getColorClasses(plan.color, 'gradient')} hover:text-white`
                  }`}
                  disabled={plan.name === 'Free'}
                >
                  {plan.name === 'Free' ? 'Current Plan' : 'Choose Plan'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Compare All Features
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Features</th>
                  {memberships.map((plan) => (
                    <th key={plan.id} className="text-center py-4 px-6 font-semibold text-gray-900">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Chat Credits', values: ['6', '50', 'Unlimited', 'Unlimited'] },
                  { feature: 'Property Search', values: ['Basic', 'Advanced', 'Premium', 'Premium'] },
                  { feature: 'Contact Details', values: ['Limited', 'Full Access', 'Instant Access', 'Instant Access'] },
                  { feature: 'Support', values: ['Email', 'Priority Email', 'Phone & Chat', '24/7 Dedicated'] },
                  { feature: 'Verification Badge', values: ['❌', 'Basic', 'Verified', 'Premium'] },
                  { feature: 'Profile Boost', values: ['❌', '❌', '✅', '✅'] },
                  { feature: 'Property Alerts', values: ['❌', 'Basic', 'Instant', 'Instant'] },
                  { feature: 'Relationship Manager', values: ['❌', '❌', '❌', '✅'] },
                ].map((row, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-4 px-6 font-medium text-gray-900">{row.feature}</td>
                    {row.values.map((value, valueIndex) => (
                      <td key={valueIndex} className="py-4 px-6 text-center text-gray-700">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Direct Communication</h3>
            <p className="text-gray-600">Chat directly with property owners without any middleman interference</p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Verified Properties</h3>
            <p className="text-gray-600">All properties are verified by our expert team for your safety and security</p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Notifications</h3>
            <p className="text-gray-600">Get instant alerts when new properties matching your criteria are listed</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What happens to unused chat credits?
              </h3>
              <p className="text-gray-600">
                Unused chat credits expire at the end of your billing cycle. We recommend using them within the month to get maximum value.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I upgrade or downgrade my plan?
              </h3>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is there a refund policy?
              </h3>
              <p className="text-gray-600">
                We offer a 7-day money-back guarantee if you're not satisfied with our premium features.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How does the verification badge work?
              </h3>
              <p className="text-gray-600">
                Verification badges help property owners identify serious tenants, increasing your chances of getting responses.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Find Your Perfect Home?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of students who found their ideal accommodation with HomeDaze
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2">
              <span>Start Free Trial</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all duration-200 font-semibold text-lg">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipPage;