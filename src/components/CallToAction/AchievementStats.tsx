import React, { type JSX } from 'react';
import { Users, Building, Globe, Star } from 'lucide-react'; // Import necessary icons

// Define a type for an achievement item
interface AchievementItem {
  number: string;
  label: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

// TODO: Achievements data should be fetched from an API
const achievements: AchievementItem[] = [
  { number: '50L+', label: 'Happy Students', icon: Users, color: 'from-blue-500 to-cyan-500', bgColor: 'from-blue-50 to-cyan-50' },
  { number: '10L+', label: 'Properties Listed', icon: Building, color: 'from-emerald-500 to-green-500', bgColor: 'from-emerald-50 to-green-50' },
  { number: '500+', label: 'Cities Covered', icon: Globe, color: 'from-purple-500 to-pink-500', bgColor: 'from-purple-50 to-pink-50' },
  { number: '99%', label: 'Satisfaction Rate', icon: Star, color: 'from-orange-500 to-red-500', bgColor: 'from-orange-50 to-red-50' },
];

const AchievementStats: React.FC = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
      {achievements.map((achievement, index) => (
        <div key={index} className="text-center group">
          <div className={`bg-gradient-to-br ${achievement.bgColor} rounded-3xl p-8 border border-white/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}>
            <div className={`w-20 h-20 bg-gradient-to-r ${achievement.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
              <achievement.icon className="h-10 w-10 text-white" />
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
              {achievement.number}
            </div>
            <div className="text-gray-600 font-medium">
              {achievement.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AchievementStats;