import React, { useState } from 'react';
import { Search, MapPin, Home, DollarSign, TrendingUp, Users, Award, Shield, Play, ChevronRight, Star, CheckCircle, MessageCircle, Zap, Heart, Crown, Filter, Calendar, Building, Sparkles } from 'lucide-react';
import { SearchFilters } from '../types';

const Hero: React.FC = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    priceRange: { min: 0, max: 50000 },
    propertyType: 'all',
    genderPreference: 'all',
    amenities: [],
  });

  const [activeTab, setActiveTab] = useState<'pg' | 'shared' | 'single' | 'apartment'>('pg');

  const handleSearch = () => {
    console.log('Search filters:', filters);
  };

  const popularCities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Ahmedabad'
  ];

  const propertyTypes = {
    pg: ['Boys PG', 'Girls PG', 'Co-ed PG', 'Executive PG'],
    shared: ['2 Sharing', '3 Sharing', '4 Sharing', 'Dormitory'],
    single: ['Single Room', 'Studio', '1 BHK', 'Independent Room'],
    apartment: ['1 BHK', '2 BHK', '3 BHK', 'Furnished Apartment', 'Unfurnished Apartment']
  };

  const priceRanges = {
    pg: ['Under ₹5K', '₹5K-₹10K', '₹10K-₹15K', '₹15K+'],
    shared: ['Under ₹8K', '₹8K-₹15K', '₹15K-₹25K', '₹25K+'],
    single: ['Under ₹15K', '₹15K-₹25K', '₹25K-₹40K', '₹40K+'],
    apartment: ['Under ₹20K', '₹20K-₹35K', '₹35K-₹50K', '₹50K+']
  };

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
          <div className="flex flex-wrap justify-center items-center gap-6 mb-16">
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/20 shadow-lg">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-white">100% Verified</div>
                <div className="text-xs text-gray-300">Properties</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/20 shadow-lg">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-white">Direct Chat</div>
                <div className="text-xs text-gray-300">With Owners</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/20 shadow-lg">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-white">50L+ Students</div>
                <div className="text-xs text-gray-300">Trust Us</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/20 shadow-lg">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <Award className="h-5 w-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-white">Zero Brokerage</div>
                <div className="text-xs text-gray-300">Guaranteed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Search Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
            {/* Search Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Start Your Search</h2>
              <p className="text-gray-600">Find the perfect accommodation that matches your needs</p>
            </div>

            {/* Property Type Tabs */}
            <div className="flex justify-center mb-8">
              <div className="bg-gray-100 rounded-2xl p-1.5 flex flex-wrap justify-center">
                {(['pg', 'shared', 'single', 'apartment'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      activeTab === tab
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-white/50'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {tab === 'pg' && <Building className="h-4 w-4" />}
                      {tab === 'shared' && <Users className="h-4 w-4" />}
                      {tab === 'single' && <Home className="h-4 w-4" />}
                      {tab === 'apartment' && <Building className="h-4 w-4" />}
                      <span>
                        {tab === 'pg' ? 'PG/Hostel' : 
                         tab === 'shared' ? 'Shared Room' : 
                         tab === 'single' ? 'Single Room' : 
                         'Apartment'}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Search Form */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
              {/* Location Search */}
              <div className="lg:col-span-5">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Where do you want to stay?
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter city, area, or landmark"
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg bg-white transition-all duration-200"
                  />
                </div>
              </div>

              {/* Property Type */}
              <div className="lg:col-span-3">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Property Type
                </label>
                <div className="relative">
                  <Home className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    value={filters.propertyType}
                    onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none text-lg bg-white transition-all duration-200"
                  >
                    <option value="all">All Types</option>
                    {propertyTypes[activeTab].map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Budget Range */}
              <div className="lg:col-span-3">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Budget Range
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none text-lg bg-white transition-all duration-200">
                    <option>Select Budget</option>
                    {priceRanges[activeTab].map(range => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <div className="lg:col-span-1 flex items-end">
                <button
                  onClick={handleSearch}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Search className="h-6 w-6 mx-auto" />
                </button>
              </div>
            </div>

            {/* Advanced Filters */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <Filter className="h-4 w-4" />
                  <span className="text-sm font-medium">Advanced Filters</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm font-medium">Move-in Date</span>
                </button>
              </div>
              
              <div className="text-sm text-gray-500">
                <span className="font-medium text-green-600">10,000+</span> properties available
              </div>
            </div>

            {/* Popular Cities */}
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-4">Popular Cities:</p>
              <div className="flex flex-wrap gap-3">
                {popularCities.map(city => (
                  <button
                    key={city}
                    onClick={() => setFilters({ ...filters, location: city })}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 text-sm font-medium border border-gray-200 hover:border-blue-300"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Free Chat Credits Banner */}
            <div className="mt-8 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-6 border border-emerald-200">
              <div className="flex items-center justify-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-emerald-700 text-lg">6 Free Chats with Property Owners</span>
              </div>
              <p className="text-center text-gray-600 text-sm">
                Start conversations immediately. No membership required to begin your search!
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            { number: '10L+', label: 'Properties Listed', icon: Building, color: 'from-blue-500 to-cyan-500' },
            { number: '50L+', label: 'Happy Students', icon: Users, color: 'from-emerald-500 to-green-500' },
            { number: '500+', label: 'Cities Covered', icon: MapPin, color: 'from-purple-500 to-pink-500' },
            { number: '99%', label: 'Satisfaction Rate', icon: Star, color: 'from-orange-500 to-red-500' }
          ].map((stat, index) => (
            <div key={index} className="group">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
                <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                  {stat.number}
                </div>
                <div className="text-gray-200 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: MessageCircle,
              title: 'Direct Chat with Owners',
              description: 'Skip the middleman and chat directly with property owners for faster responses',
              color: 'from-blue-500 to-purple-500'
            },
            {
              icon: Shield,
              title: '100% Verified Properties',
              description: 'Every property is thoroughly verified by our expert team for your safety',
              color: 'from-emerald-500 to-green-500'
            },
            {
              icon: Users,
              title: 'Find Perfect Roommates',
              description: 'Connect with like-minded students and professionals for shared living',
              color: 'from-orange-500 to-pink-500'
            }
          ].map((feature, index) => (
            <div key={index} className="group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
                <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;