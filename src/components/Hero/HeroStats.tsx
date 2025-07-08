import React from 'react';
import { Building, Users, MapPin, Star } from 'lucide-react';

const HeroStats: React.FC = () => {
  const stats = [
    { number: '10L+', label: 'Properties Listed', icon: Building, color: 'from-blue-500 to-cyan-500' },
    { number: '50L+', label: 'Happy Students', icon: Users, color: 'from-emerald-500 to-green-500' },
    { number: '500+', label: 'Cities Covered', icon: MapPin, color: 'from-purple-500 to-pink-500' },
    { number: '99%', label: 'Satisfaction Rate', icon: Star, color: 'from-orange-500 to-red-500' }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
      {stats.map((stat, index) => (
        <div key={index} className="group">
          <div className="backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
            <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
              <stat.icon className="h-8 w-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
              {stat.number}
            </div>
            <div className="text-gray-200 text-sm font-medium">
              {stat.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroStats;
