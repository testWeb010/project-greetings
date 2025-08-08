import React from 'react';
import { MessageCircle, Shield, Users } from 'lucide-react';

const HeroFeatures: React.FC = () => {
  const features = [
    {
      icon: MessageCircle,
      title: 'Direct Chat with Owners',
      description: 'Skip the middleman and chat directly with property owners for faster responses',
      color: 'from-blue-500 to-purple-500'
    },
    {
      icon: Shield,
      title: '100% Verified Properties',
      description: 'Every property is thoroughly verified by our expert team for your safety',
      color: 'from-emerald-500 to-green-500'
    },
    {
      icon: Users,
      title: 'Find Perfect Roommates',
      description: 'Connect with like-minded students and professionals for shared living',
      color: 'from-orange-500 to-pink-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <div key={index} className="group">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
            <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
              <feature.icon className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
            <p className="text-gray-300 leading-relaxed">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroFeatures;
