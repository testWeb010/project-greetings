
import React from 'react';
import CompanyInfo from './CompanyInfo';
import FooterNavigation from './FooterNavigation';
import SocialLinks from './SocialLinks';
import NewsletterSubscription from './NewsletterSubscription';
import TrustBadges from './TrustBadges';
import Achievements from './Achievements';
import BottomBar from './BottomBar';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <CompanyInfo />
            <FooterNavigation />
            <SocialLinks />
            <NewsletterSubscription />
          </div>
        </div>

        {/* Trust Badges */}
        <TrustBadges />

        {/* Achievements */}
        <Achievements />

        {/* Bottom Bar */}
        <BottomBar />
      </div>
    </footer>
  );
};

export default Footer;
