import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Gift, Users, Crown, Sparkles } from 'lucide-react';
import { Membership } from '../types'; // Assuming types are in a common location

interface PlanSelectionSectionProps {
  selectedPlan: Membership | null;
  billingCycle: 'monthly' | 'yearly';
  setBillingCycle: (cycle: 'monthly' | 'yearly') => void;
  formatPrice: (price: number) => string;
  getColorClasses: (color: string) => string;
}

const PlanSelectionSection: React.FC<PlanSelectionSectionProps> = ({
  selectedPlan,
  billingCycle,
  setBillingCycle,
  formatPrice,
  getColorClasses,
}) => {
  const navigate = useNavigate();

  if (!selectedPlan) {
    return null; // Or a loading state if preferred
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Selected Plan</h2>
        <button
          onClick={() => navigate('/membership')}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          Change Plan
        </button>
      </div>

      <div className="border border-blue-200 rounded-xl p-6 bg-blue-50">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 bg-gradient-to-r ${getColorClasses(selectedPlan.color)} rounded-xl flex items-center justify-center`}>
              {selectedPlan.name === 'Free' && <Gift className="h-6 w-6 text-white" />}
              {selectedPlan.name === 'Basic' && <Users className="h-6 w-6 text-white" />}
              {selectedPlan.name === 'Premium' && <Crown className="h-6 w-6 text-white" />}
              {selectedPlan.name === 'Pro' && <Sparkles className="h-6 w-6 text-white" />}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{selectedPlan.name}</h3>
              <p className="text-blue-600 font-semibold">
                {formatPrice(selectedPlan.price)} / {billingCycle === 'monthly' ? 'month' : 'year'}
              </p>
            </div>
          </div>

          {selectedPlan.name === 'Premium' && (
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Most Popular
            </span>
          )}
        </div>

        {/* Billing Cycle Toggle */}
        <div className="mt-6 pt-6 border-t border-blue-200">
          <div className="flex items-center justify-between">
            <span className="text-gray-700 font-medium">Billing Cycle</span>
            <div className="flex items-center space-x-4">
              <span className={`text-sm ${billingCycle === 'monthly' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  billingCycle === 'yearly' ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm ${billingCycle === 'yearly' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                Yearly
              </span>
              {billingCycle === 'yearly' && (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  Save 17%
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanSelectionSection;
