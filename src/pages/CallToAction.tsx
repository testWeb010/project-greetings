import React from 'react';
import MainCTA from '../components/CallToAction/MainCTA';
import FeaturesGrid from '../components/CallToAction/FeaturesGrid';
import AchievementStats from '../components/CallToAction/AchievementStats';
import ContactMethods from '../components/CallToAction/ContactMethods';
import AppFeatures from '../components/CallToAction/AppFeatures';
import FinalCTA from '../components/CallToAction/FinalCTA';

const CallToAction: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to Find Your Perfect Home?
          </h2>
          <p className="mt-4 text-xl text-blue-100">
            Join thousands of students who have found their ideal accommodation through our platform.
          </p>
          <div className="mt-8">
            <button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
              Start Your Search
            </button>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <AchievementStats
            title="Properties Listed"
            value="10,000+"
            description="Verified properties across India"
          />
          <AchievementStats
            title="Happy Students"
            value="25,000+"
            description="Students found their perfect home"
          />
          <AchievementStats
            title="Cities Covered"
            value="50+"
            description="Major cities across India"
          />
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
