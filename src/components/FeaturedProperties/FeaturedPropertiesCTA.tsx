import React from 'react';
import { MessageCircle } from 'lucide-react';

const FeaturedPropertiesCTA: React.FC = () => {
  return (
    <div className="mt-16 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-3xl p-8 border border-emerald-200">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <MessageCircle className="h-10 w-10 text-white" />
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Start Chatting for Free!</h3>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
          Get 6 free chats with property owners. No membership required to start your conversation and find your perfect home.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-8 py-4 rounded-xl hover:from-emerald-700 hover:to-green-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Start Free Chat
          </button>
          <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors font-semibold text-lg">
            View Membership Plans
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPropertiesCTA;

