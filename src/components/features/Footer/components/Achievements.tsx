import React from 'react';
import { Users, Building, MapPin, Star } from 'lucide-react';

// Define a type for achievements
interface Achievement {
  icon: React.ElementType;
  number: string;
  label: string;
}

// TODO: Achievements data should be fetched from an API
const achievements: Achievement[] = [
  { icon: Users, number: '50L+', label: 'Happy Students' },
  { icon: Building, number: '10L+', label: 'Properties' },
  { icon: MapPin, number: '500+', label: 'Cities' },
  { icon: Star, number: '4.8/5', label: 'Rating' }
];

// TODO: Section title and description could be from an API
const sectionTitle = "Trusted by Students Nationwide";
const sectionDescription = "Join the largest student community in India";

const Achievements: React.FC = () => {
  return (
    <div className="mt-16 pt-12 border-t border-white/10">
      <div className="text-center mb-12">
        <h3 className="text-2xl font-bold text-white mb-4">{sectionTitle}</h3>
        <p className="text-gray-300">{sectionDescription}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {achievements.map((achievement, index) => (
          <div key={index} className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <achievement.icon className="h-8 w-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
              {achievement.number}
            </div>
            <div className="text-gray-300 font-medium">
              {achievement.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;