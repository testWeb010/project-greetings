import React from 'react';
import { MessageCircle, ArrowRight, TrendingUp } from 'lucide-react';

const TestimonialsCTA: React.FC = () => {
  return (
    <div className="text-center">
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-12 border border-white/50 shadow-2xl">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-100 to-blue-100 text-emerald-600 px-6 py-3 rounded-full text-sm font-semibold mb-8">
          <TrendingUp className="h-4 w-4" />
          <span>Join the Success Stories</span>
        </div>
        <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
          Ready to Write Your Success Story?
        </h3>
        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
          Start your journey with 6 free chats and find your perfect home today. Join thousands of happy students!
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-3">
            <MessageCircle className="h-5 w-5" />
            <span>Start Free Chat</span>
            <ArrowRight className="h-5 w-5" />
          </button>
          <button className="border-2 border-gray-300 text-gray-700 px-10 py-4 rounded-2xl hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-semibold text-lg">
            Share Your Story
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCTA;
