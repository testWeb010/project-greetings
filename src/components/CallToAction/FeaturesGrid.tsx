import React from 'react';
import { Shield, MessageCircle, Crown } from 'lucide-react'; // Import necessary icons

// Define a type for a feature item
interface FeatureItem {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

// TODO: Features data should be fetched from an API
const features: FeatureItem[] = [
  {
    icon: Shield,
    title: '100% Verified Properties',
    description: 'Every property is verified by our expert team for your safety and security',
    color: 'from-emerald-500 to-green-600',
    bgColor: 'from-emerald-50 to-green-50'
  },
  {
    icon: MessageCircle,
    title: 'Direct Chat with Owners',
    description: 'Chat directly without any middleman interference or hidden charges',
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'from-blue-50 to-cyan-50'
  },
  {
    icon: Crown,
    title: 'Premium Student Experience',
    description: 'Designed specifically for students and young professionals across India',
    color: 'from-purple-500 to-pink-600',
    bgColor: 'from-purple-50 to-pink-50'
  },
];

const FeaturesGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
      {features.map((feature, index) => (
        <div key={index} className="group">
          <div className={`bg-gradient-to-br ${feature.bgColor} rounded-3xl p-8 border border-white/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 text-center`}>
            <div className={`mx-auto w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
              <feature.icon className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturesGrid;