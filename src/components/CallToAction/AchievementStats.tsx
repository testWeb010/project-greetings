import React from 'react';

interface AchievementStatsProps {
  title: string;
  value: string;
  description: string;
}

const AchievementStats: React.FC<AchievementStatsProps> = ({ title, value, description }) => {
  return (
    <div className="text-center">
      <dt className="text-base font-semibold text-gray-900">{title}</dt>
      <dd className="mt-2 text-3xl font-extrabold text-indigo-500 tracking-tight">{value}</dd>
      <dd className="mt-1 text-base text-gray-500">{description}</dd>
    </div>
  );
};

export default AchievementStats;
