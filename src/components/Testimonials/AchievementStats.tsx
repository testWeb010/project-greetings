import React from 'react';

interface Achievement {
  number: string;
  label: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

interface AchievementStatsProps {
  achievements: Achievement[];
}

const AchievementStats: React.FC<AchievementStatsProps> = ({
  achievements
}) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
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
