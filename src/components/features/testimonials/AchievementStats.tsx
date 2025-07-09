
import React from 'react';

interface Achievement {
  number: string;
  label: string;
  icon: React.ElementType;
  color: string;
  bgColor?: string;
}

interface AchievementStatsProps {
  title?: string;
  value?: string;
  description?: string;
  achievements?: Achievement[];
}

const AchievementStats: React.FC<AchievementStatsProps> = ({ 
  title = "Success Stories", 
  value = "50,000+", 
  description = "Students have found their perfect home through our platform",
  achievements: propAchievements
}) => {
  const defaultStats = [
    { number: '50K+', label: 'Happy Students', color: 'from-blue-600 to-blue-700' },
    { number: '10K+', label: 'Properties Listed', color: 'from-purple-600 to-purple-700' },
    { number: '25+', label: 'Cities Covered', color: 'from-green-600 to-green-700' },
    { number: '4.8/5', label: 'Customer Rating', color: 'from-orange-600 to-orange-700' }
  ];

  const stats = propAchievements || defaultStats;

  return (
    <div className="text-center mb-16">
      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
        {value}
      </div>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
        {description}
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
              {stat.number}
            </div>
            <div className="text-gray-600 dark:text-gray-400 font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementStats;
