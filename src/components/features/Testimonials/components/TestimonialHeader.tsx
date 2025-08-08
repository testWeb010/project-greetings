import React from 'react';
import { Sparkles } from 'lucide-react';

const TestimonialHeader: React.FC = () => {
  return (
    <div className="text-center mb-16">
      <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-blue-200">
        <Sparkles className="h-4 w-4" />
        <span>Student Success Stories</span>
      </div>
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-8">
        What Students
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
          Say About Us
        </span>
      </h2>
      <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
        Join thousands of satisfied students who found their perfect home with HomeDaze's trusted platform
      </p>
    </div>
  );
};

export default TestimonialHeader;