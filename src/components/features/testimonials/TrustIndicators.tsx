
import React from 'react';
import { Shield, Award, Users, CheckCircle } from 'lucide-react';

const TrustIndicators: React.FC = () => {
  const indicators = [
    {
      icon: Shield,
      title: '100% Verified',
      description: 'All properties verified'
    },
    {
      icon: Award,
      title: 'Award Winner',
      description: 'Best Student Platform 2024'
    },
    {
      icon: Users,
      title: '50K+ Students',
      description: 'Trust our platform'
    },
    {
      icon: CheckCircle,
      title: '99% Satisfaction',
      description: 'Customer satisfaction rate'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
      {indicators.map((indicator, index) => (
        <div key={index} className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
            <indicator.icon className="h-8 w-8 text-white" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            {indicator.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {indicator.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TrustIndicators;
