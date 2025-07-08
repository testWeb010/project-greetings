import React from 'react';
import { Play, Sparkles, Star } from 'lucide-react';
import TrustIndicators from './TrustIndicators';
import HeroSearch from './HeroSearch';
import HeroStats from './HeroStats';
import HeroFeatures from './HeroFeatures';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* House Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg"
          alt="Modern house background"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlays for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-[8%] w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl animate-pulse transform rotate-12"></div>
        <div className="absolute top-40 right-[12%] w-24 h-24 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-[15%] w-20 h-20 bg-gradient-to-r from-orange-400/20 to-pink-500/20 rounded-2xl blur-2xl animate-pulse delay-2000 transform -rotate-12"></div>
        <div className="absolute bottom-20 right-[20%] w-16 h-16 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full blur-xl animate-pulse delay-3000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          {/* Premium Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-white/20">
            <Sparkles className="h-4 w-4 text-yellow-300" />
            <span>India's Most Trusted Student Rental Platform</span>
            <Star className="h-4 w-4 text-yellow-300" />
          </div>
          
          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            Find Your Dream
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400">
              Student Home
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-gray-200 max-w-4xl mx-auto mb-12 leading-relaxed">
            Connect directly with verified property owners, explore thousands of student-friendly accommodations, and find your perfect home with zero brokerage
          </p>

          {/* Trust Indicators */}
          <TrustIndicators />
        </div>

        {/* Advanced Search Section */}
        <HeroSearch />

        {/* Stats Section */}
        <HeroStats />

        {/* Video CTA */}
        <div className="text-center mb-20">
          <button className="group inline-flex items-center space-x-4 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-2xl hover:bg-white/20 transition-all duration-300 border border-white/20 shadow-lg hover:shadow-xl">
            <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="h-7 w-7 text-white ml-1" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-lg">Watch How It Works</div>
              <div className="text-sm text-gray-300">See how students find their perfect home</div>
            </div>
          </button>
        </div>

        {/* Bottom Features */}
        <HeroFeatures />
      </div>
    </div>
  );
};

export default Hero;
