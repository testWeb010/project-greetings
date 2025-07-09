
import React from 'react';
import { Shield, Award, Verified, Star } from 'lucide-react';

const TrustBadges: React.FC = () => {
  const badges = [
    { icon: Shield, title: 'Verified Properties', desc: '100% Verified Listings' },
    { icon: Award, title: 'Trusted Platform', desc: '50,000+ Happy Students' },
    { icon: Verified, title: 'Secure Payments', desc: 'SSL Encrypted Transactions' },
    { icon: Star, title: 'Top Rated', desc: '4.8/5 Customer Rating' }
  ];

  return (
    <div className="border-t border-gray-800 pt-8 pb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {badges.map((badge) => (
          <div key={badge.title} className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg flex items-center justify-center">
              <badge.icon className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <div className="font-semibold text-sm">{badge.title}</div>
              <div className="text-xs text-gray-400">{badge.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustBadges;
