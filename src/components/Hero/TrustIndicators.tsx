import React from 'react';
import { Shield, MessageCircle, Users, Award } from 'lucide-react';

const TrustIndicators: React.FC = () => {
  const indicators = [
    {
      icon: Shield,
      title: '100% Verified',
      subtitle: 'Properties',
      color: 'from-emerald-500 to-green-500'
    },
    {
      icon: MessageCircle,
      title: 'Direct Chat',
      subtitle: 'With Owners',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: '50L+ Students',
      subtitle: 'Trust Us',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Award,
      title: 'Zero Brokerage',
      subtitle: 'Guaranteed',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="flex flex-wrap justify-center items-center gap-6 mb-16">
      {indicators.map((indicator, index) => (
        <div key={index} className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/20 shadow-lg">
          <div className={`w-10 h-10 bg-gradient-to-r ${indicator.color} rounded-xl flex items-center justify-center`}>
            <indicator.icon className="h-5 w-5 text-white" />
          </div>
          <div className="text-left">
            <div className="text-sm font-bold text-white">{indicator.title}</div>
            <div className="text-xs text-gray-300">{indicator.subtitle}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrustIndicators;