
import React from 'react';

const Achievements: React.FC = () => {
  const stats = [
    { number: '50K+', label: 'Happy Students' },
    { number: '10K+', label: 'Properties Listed' },
    { number: '25+', label: 'Cities Covered' },
    { number: '4.8/5', label: 'Customer Rating' }
  ];

  return (
    <div className="border-t border-gray-800 pt-8 pb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className="text-2xl font-bold text-blue-400">{stat.number}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
