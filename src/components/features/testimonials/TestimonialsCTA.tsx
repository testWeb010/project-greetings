
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '../../ui/Button';

const TestimonialsCTA: React.FC = () => {
  return (
    <div className="text-center bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-2xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Ready to Join Thousands of Happy Students?
      </h3>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
        Start your journey to finding the perfect student accommodation today
      </p>
      <Button
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-flex items-center space-x-2"
      >
        <span>Get Started Now</span>
        <ArrowRight className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default TestimonialsCTA;
