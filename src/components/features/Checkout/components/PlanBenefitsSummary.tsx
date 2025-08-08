import React from 'react';
import { Membership } from '../../../../types';
import { Star, CheckCircle } from 'lucide-react';

interface PlanBenefitsSummaryProps {
  selectedPlan: Membership;
}

const PlanBenefitsSummary: React.FC<PlanBenefitsSummaryProps> = ({
  selectedPlan,
}) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
        <Star className="h-5 w-5 text-yellow-500 mr-2" />
        What You Get
      </h4>
      <ul className="space-y-3">
        {selectedPlan.features.slice(0, 4).map((feature, index) => (
          <li key={index} className="flex items-start space-x-2">
            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-700">{feature}</span>
          </li>
        ))}
        {selectedPlan.features.length > 4 && (
          <li className="text-sm text-blue-600 font-medium">
            +{selectedPlan.features.length - 4} more features
          </li>
        )}
      </ul>
    </div>
  );
};

export default PlanBenefitsSummary;