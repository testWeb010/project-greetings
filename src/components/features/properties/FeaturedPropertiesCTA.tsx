
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '../../ui/Button';

const FeaturedPropertiesCTA: React.FC = () => {
  return (
    <div className="mt-16 text-center">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl p-12">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Can't Find What You're Looking For?
        </h3>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Browse our complete collection of verified properties across 25+ cities in India
        </p>
        <Button
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-flex items-center space-x-2"
        >
          <span>View All Properties</span>
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default FeaturedPropertiesCTA;
