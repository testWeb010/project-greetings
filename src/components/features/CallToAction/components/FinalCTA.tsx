import React from 'react';
import { Crown, MessageCircle } from 'lucide-react'; // Import necessary icons

// TODO: All text content and button actions could be fetched from an API
const sectionTagline = "Limited Time Offer";
const sectionTitle = "Start Your Journey Today";
const sectionDescription = "Get 6 free chats and find your perfect home within minutes. No hidden charges, no brokerage fees!";
const primaryButtonText = "Start Free Chat";
const secondaryButtonText = "View Membership Plans";

const FinalCTA: React.FC = () => {
  // TODO: Implement actual button actions (e.g., API calls, navigation)
  const handlePrimaryAction = () => {
    console.log('Primary CTA button clicked');
  };

  const handleSecondaryAction = () => {
    console.log('Secondary CTA button clicked');
  };

  return (
    <div className="text-center">
      <div className="bg-white rounded-3xl p-12 border border-gray-100 shadow-xl">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-100 to-blue-100 text-emerald-600 px-6 py-3 rounded-full text-sm font-semibold mb-6">
          <Crown className="h-4 w-4" />
          <span>{sectionTagline}</span>
        </div>
        <h3 className="text-4xl font-bold text-gray-900 mb-4">
          {sectionTitle}
        </h3>
        <p className="text-xl text-gray-600 mb-8">
          {sectionDescription}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handlePrimaryAction}
            className="bg-gradient-to-r from-emerald-600 to-green-700 text-white px-10 py-4 rounded-2xl hover:from-emerald-700 hover:to-green-800 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-2"
          >
            <MessageCircle className="h-5 w-5" />
            <span>{primaryButtonText}</span>
          </button>
          <button
            onClick={handleSecondaryAction}
            className="border-2 border-gray-300 text-gray-700 px-10 py-4 rounded-2xl hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-semibold text-lg"
          >
            {secondaryButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinalCTA;