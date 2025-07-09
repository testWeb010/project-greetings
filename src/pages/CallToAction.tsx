
import React from 'react';
import AchievementStats from '../components/CallToAction/AchievementStats';

const CallToAction: React.FC = () => {
  return (
    <div className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Ready to Find Your Perfect Home?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
            Join thousands of students who have found their ideal accommodation through our platform
          </p>
          
          <AchievementStats 
            title="Happy Students"
            value="10,000+"
            description="Students have found their perfect home"
          />
          
          <div className="mt-12">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
