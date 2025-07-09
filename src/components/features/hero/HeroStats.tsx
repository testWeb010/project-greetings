
import React from 'react';

const HeroStats: React.FC = () => {
  const stats = [
    { number: '50K+', label: 'Happy Students' },
    { number: '10K+', label: 'Properties Listed' },
    { number: '25+', label: 'Cities Covered' },
    { number: '4.8/5', label: 'Customer Rating' }
  ];

  return (
    <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {stat.number}
          </div>
          <div className="text-gray-600 dark:text-gray-400 font-medium">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroStats;
