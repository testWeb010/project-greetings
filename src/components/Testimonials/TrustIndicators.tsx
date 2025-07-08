import React from 'react';
import { Shield, CheckCircle, MessageCircle, Heart } from 'lucide-react';

interface TrustIndicator {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface TrustIndicatorsProps {
  indicators: TrustIndicator[];
}

const TrustIndicators: React.FC<TrustIndicatorsProps> = ({
  indicators
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white mb-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-semibold mb-6">
          <Shield className="h-4 w-4" />
          <span>Why Students Trust HomeDaze</span>
        </div>
        <h3 className="text-3xl sm:text-4xl font-bold mb-4">
          Built Specifically for Students
        </h3>
        <p className="text-xl text-blue-100">
          Every feature designed with student needs and safety in mind
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {indicators.map((indicator, index) => (
          <div key={index} className="text-center">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <indicator.icon className="h-10 w-10 text-white" />
            </div>
            <h4 className="text-2xl font-bold mb-4">{indicator.title}</h4>
            <p className="text-blue-100 leading-relaxed">{indicator.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustIndicators;
