import React from 'react';
import { Shield, Award, Star, Heart } from 'lucide-react';

// Define a type for trust badges
interface TrustBadge {
  icon: React.ElementType;
  text: string;
}

// TODO: Trust badges data should be fetched from an API
const trustBadges: TrustBadge[] = [
  { icon: Shield, text: 'SSL Secured' },
  { icon: Award, text: 'ISO Certified' },
  { icon: Star, text: 'Top Rated' },
  { icon: Heart, text: 'Student Loved' }
];

const TrustBadges: React.FC = () => {
  return (
    <div className="mt-12 pt-8 border-t border-white/10">
      <div className="flex flex-wrap justify-center items-center gap-6">
        {trustBadges.map((badge, index) => (
          <div key={index} className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
            <badge.icon className="h-5 w-5 text-green-400" />
            <span className="text-gray-300 text-sm font-medium">{badge.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustBadges;