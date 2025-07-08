import React, { useState } from 'react';
import { Search, MapPin, Home, DollarSign, Users, Filter, Calendar, Building, MessageCircle } from 'lucide-react';
import { SearchFilters } from '../../types';

const HeroSearch: React.FC = () => {
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
    pg: ['Under ₹5K', '₹5K-10K', '₹10K-₹15K', '₹15K+'],
    shared: ['Under ₹8K', '₹8K-₹15K', '₹15K-₹25K', '₹25K+'],
    single: ['Under ₹15K', '₹15K-₹25K', '₹25K-₹40K', '₹40K+'],
    apartment: ['Under ₹20K', '₹20K-₹35K', '₹35K-₹50K', '₹50K+']
  };

  return (
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
                className={`px-6 py-4 rounded-xl font-semibold text-sm transition-all duration-300 ${activeTab === tab ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105' : 'text-gray-600 hover:text-blue-600 hover:bg-white/50'}`}
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
  );
};

export default HeroSearch;
