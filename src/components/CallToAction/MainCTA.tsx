import React from 'react';
import { ArrowRight, TrendingUp, MessageCircle, Download } from 'lucide-react';

// TODO: All text content, button labels, and app store links could be fetched from an API
const MainCTA: React.FC = () => {
  return (
    <div className="text-center mb-20">
      <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-blue-200">
        <TrendingUp className="h-4 w-4" />
        {/* TODO: Dynamic number */}
        <span>Join 50L+ Happy Students</span>
      </div>

      <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
        Ready to Find Your
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
          Perfect Home?
        </span>
      </h2>

      <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
        Join thousands of satisfied students who found their dream homes with India's most trusted rental platform
      </p>

      <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
        <button className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 flex items-center justify-center space-x-3">
          <MessageCircle className="h-6 w-6" />
          <span>Start Free Chat</span>
          <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
        </button>
        <button className="group border-2 border-gray-300 text-gray-700 px-10 py-5 rounded-2xl hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 font-bold text-lg flex items-center justify-center space-x-3">
          <Download className="h-6 w-6" />
          <span>Download App</span>
        </button>
      </div>

      {/* App Store Badges */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
        {/* TODO: App store badge links and text should be dynamic */}
        <div className="bg-black rounded-2xl p-4 hover:bg-gray-800 transition-colors cursor-pointer group transform hover:scale-105">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <span className="text-black font-bold text-lg">📱</span>
            </div>
            <div className="text-left">
              <div className="text-xs text-gray-300">Download on the</div>
              <div className="text-white font-semibold text-lg">App Store</div>
            </div>
          </div>
        </div>
        <div className="bg-black rounded-2xl p-4 hover:bg-gray-800 transition-colors cursor-pointer group transform hover:scale-105">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <span className="text-black font-bold text-lg">🤖</span>
            </div>
            <div className="text-left">
              <div className="text-xs text-gray-300">Get it on</div>
              <div className="text-white font-semibold text-lg">Google Play</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCTA;