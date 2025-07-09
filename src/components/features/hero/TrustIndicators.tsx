
import React from 'react';
import { CheckCircle, Users, Award } from 'lucide-react';

const TrustIndicators: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 mt-8 mb-8">
      <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
        <CheckCircle className="h-5 w-5" />
        <span className="font-medium">Verified Properties</span>
      </div>
      <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
        <Users className="h-5 w-5" />
        <span className="font-medium">50,000+ Students Trust Us</span>
      </div>
      <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400">
        <Award className="h-5 w-5" />
        <span className="font-medium">Award Winning Platform</span>
      </div>
    </div>
  );
};

export default TrustIndicators;
