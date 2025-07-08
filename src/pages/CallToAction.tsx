import React from 'react';
import MainCTA from '../components/CallToAction/MainCTA';
import FeaturesGrid from '../components/CallToAction/FeaturesGrid';
import AchievementStats from '../components/CallToAction/AchievementStats';
import ContactMethods from '../components/CallToAction/ContactMethods';
import AppFeatures from '../components/CallToAction/AppFeatures';
import FinalCTA from '../components/CallToAction/FinalCTA';

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-2xl blur-3xl animate-pulse delay-1000 transform rotate-12"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-gradient-to-r from-orange-400/20 to-pink-400/20 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main CTA Section */}
        <MainCTA />

        {/* Features Grid */}
        <FeaturesGrid />

        {/* Achievement Stats */}
        <AchievementStats />

        {/* Contact Methods */}
        <ContactMethods />

        {/* App Features Section */}
        <AppFeatures />

        {/* Final CTA */}
        <FinalCTA />
      </div>
    </section>
  );
};

export default CallToAction;
