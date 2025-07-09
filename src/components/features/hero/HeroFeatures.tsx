
import React from 'react';
import { Shield, MessageCircle, Home, Star } from 'lucide-react';

const HeroFeatures: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Verified Properties',
      description: '100% verified listings with authentic photos'
    },
    {
      icon: MessageCircle,
      title: 'Direct Communication',
      description: 'Chat directly with property owners'
    },
    {
      icon: Home,
      title: 'Zero Brokerage',
      description: 'No hidden charges or broker commissions'
    },
    {
      icon: Star,
      title: 'Trusted Reviews',
      description: 'Genuine reviews from verified students'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
      {features.map((feature, index) => (
        <div
          key={index}
          className="text-center group cursor-pointer"
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            <feature.icon className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {feature.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default HeroFeatures;
