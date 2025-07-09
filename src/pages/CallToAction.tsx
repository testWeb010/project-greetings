
import React from 'react';
import AchievementStats from '../components/CallToAction/AchievementStats';

const CallToAction: React.FC = () => {
  return (
    <div className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Ready to Find Your Perfect Home?
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Join thousands of students who have found their ideal accommodation through our platform
          </p>
          
          <AchievementStats 
            title="Happy Students"
            value="10,000+"
            description="Students have found their perfect home"
          />
          
          <div className="mt-12">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
