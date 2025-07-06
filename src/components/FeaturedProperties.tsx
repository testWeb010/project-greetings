import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Users, MessageCircle, Star, Eye, Heart, TrendingUp, CheckCircle, Crown, Building, Wifi, Car, Zap, Shield, Calendar, Phone } from 'lucide-react';

interface FeaturedProperty {
  id: string;
  title: string;
  price: number;
  location: string;
  totalMembers: number;
  currentOccupancy: number;
  image: string;
  verified: boolean;
  featured: boolean;
  genderPreference: string;
  propertyType: string;
  owner: {
    name: string;
    responseTime: string;
    rating: number;
    verified: boolean;
  };
  amenities: string[];
  views: number;
  availableFrom: string;
  discount?: number;
}

const FeaturedProperties: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');

  const featuredProperties: FeaturedProperty[] = [
    {
      id: '1',
      title: 'Premium Co-living Space in Koramangala',
      price: 12000,
      location: 'Koramangala, Bangalore',
      totalMembers: 4,
      currentOccupancy: 2,
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
      verified: true,
      featured: true,
      genderPreference: 'Female Only',
      propertyType: 'PG',
      owner: {
        name: 'Priya Sharma',
        responseTime: '2 mins',
        rating: 4.8,
        verified: true
      },
      amenities: ['WiFi', 'AC', 'Food', 'Laundry', 'Security', 'Gym'],
      views: 245,
      availableFrom: '2024-01-15',
      discount: 15
    },
    {
      id: '2',
      title: 'Modern Shared Room near IIT Delhi',
      price: 8000,
      location: 'Hauz Khas, Delhi',
      totalMembers: 2,
      currentOccupancy: 1,
      image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg',
      verified: true,
      featured: true,
      genderPreference: 'Male Only',
      propertyType: 'Shared Room',
      owner: {
        name: 'Rahul Gupta',
        responseTime: '5 mins',
        rating: 4.6,
        verified: true
      },
      amenities: ['WiFi', 'Kitchen', 'Study Area', 'Parking'],
      views: 189,
      availableFrom: '2024-01-20'
    },
    {
      id: '3',
      title: 'Luxury Single Room in Bandra West',
      price: 15000,
      location: 'Bandra West, Mumbai',
      totalMembers: 1,
      currentOccupancy: 0,
      image: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg',
      verified: true,
      featured: true,
      genderPreference: 'Any',
      propertyType: 'Single Room',
      owner: {
        name: 'Anjali Reddy',
        responseTime: '1 min',
        rating: 4.9,
        verified: true
      },
      amenities: ['AC', 'Attached Bathroom', 'Balcony', 'WiFi', 'Parking'],
      views: 312,
      availableFrom: '2024-01-10',
      discount: 10
    },
    {
      id: '4',
      title: 'Executive Co-living in Whitefield',
      price: 18000,
      location: 'Whitefield, Bangalore',
      totalMembers: 6,
      currentOccupancy: 4,
      image: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg',
      verified: true,
      featured: true,
      genderPreference: 'Mixed',
      propertyType: 'Co-living',
      owner: {
        name: 'Vikram Singh',
        responseTime: '3 mins',
        rating: 4.7,
        verified: true
      },
      amenities: ['Gym', 'Pool', 'Cafeteria', 'Events', 'Cleaning', 'Security'],
      views: 156,
      availableFrom: '2024-02-01'
    },
    {
      id: '5',
      title: 'Budget-Friendly PG near Cyber City',
      price: 9000,
      location: 'Cyber City, Gurgaon',
      totalMembers: 3,
      currentOccupancy: 1,
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      verified: true,
      featured: false,
      genderPreference: 'Male Only',
      propertyType: 'PG',
      owner: {
        name: 'Sneha Patel',
        responseTime: '10 mins',
        rating: 4.4,
        verified: true
      },
      amenities: ['WiFi', 'Food', 'Laundry', 'Security'],
      views: 98,
      availableFrom: '2024-01-25'
    },
    {
      id: '6',
      title: 'Premium Apartment Share in Hitech City',
      price: 22000,
      location: 'Hitech City, Hyderabad',
      totalMembers: 4,
      currentOccupancy: 2,
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      verified: true,
      featured: true,
      genderPreference: 'Female Only',
      propertyType: 'Apartment',
      owner: {
        name: 'Amit Kumar',
        responseTime: '1 min',
        rating: 4.9,
        verified: true
      },
      amenities: ['AC', 'Gym', 'Pool', 'Parking', 'Security', 'Housekeeping'],
      views: 267,
      availableFrom: '2024-01-18',
      discount: 20
    },
  ];

  const filters = [
    { key: 'all', label: 'All Properties', count: featuredProperties.length },
    { key: 'PG', label: 'PG/Hostels', count: featuredProperties.filter(p => p.propertyType === 'PG').length },
    { key: 'Shared Room', label: 'Shared Rooms', count: featuredProperties.filter(p => p.propertyType === 'Shared Room').length },
    { key: 'Single Room', label: 'Single Rooms', count: featuredProperties.filter(p => p.propertyType === 'Single Room').length },
    { key: 'Co-living', label: 'Co-living', count: featuredProperties.filter(p => p.propertyType === 'Co-living').length },
  ];

  const filteredProperties = activeFilter === 'all' 
    ? featuredProperties 
    : featuredProperties.filter(p => p.propertyType === activeFilter);

  const handleFavorite = (id: string) => {
    console.log('Favorited property:', id);
  };

  const handleChat = (id: string) => {
    console.log('Start chat for property:', id);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(filteredProperties.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(filteredProperties.length / 3)) % Math.ceil(filteredProperties.length / 3));
  };

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-3 w-3 ${
              i < Math.floor(rating) 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-xs text-gray-600 font-medium">({rating})</span>
      </div>
    );
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 px-6 py-3 rounded-full text-sm font-semibold mb-6 border border-blue-200">
            <TrendingUp className="h-4 w-4" />
            <span>Featured Properties</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Premium Student
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Accommodations
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Handpicked verified properties with direct owner contact, instant chat facility, and student-friendly amenities
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
            <div className="flex flex-wrap justify-center gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => {
                    setActiveFilter(filter.key);
                    setCurrentSlide(0);
                  }}
                  className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    activeFilter === filter.key
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span>{filter.label}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      activeFilter === filter.key
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {filter.count}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Properties Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-110 border border-gray-100"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-110 border border-gray-100"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>

          {/* Properties Grid */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(filteredProperties.length / 3) }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProperties
                      .slice(slideIndex * 3, slideIndex * 3 + 3)
                      .map((property) => (
                        <div key={property.id} className="group">
                          <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 border border-gray-100">
                            {/* Image Container */}
                            <div className="relative overflow-hidden">
                              <img
                                src={property.image}
                                alt={property.title}
                                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              
                              {/* Overlay Badges */}
                              <div className="absolute top-4 left-4 flex flex-col space-y-2">
                                {property.verified && (
                                  <span className="bg-emerald-500 text-white px-3 py-1 text-xs font-bold rounded-full flex items-center shadow-lg">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Verified
                                  </span>
                                )}
                                {property.featured && (
                                  <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 text-xs font-bold rounded-full flex items-center shadow-lg">
                                    <Crown className="h-3 w-3 mr-1" />
                                    Featured
                                  </span>
                                )}
                                {property.discount && (
                                  <span className="bg-red-500 text-white px-3 py-1 text-xs font-bold rounded-full shadow-lg">
                                    {property.discount}% OFF
                                  </span>
                                )}
                              </div>

                              {/* Gender Preference Badge */}
                              <div className="absolute top-4 right-4">
                                <span className={`px-3 py-1 text-xs font-bold rounded-full shadow-lg ${
                                  property.genderPreference === 'Female Only' 
                                    ? 'bg-pink-500 text-white' 
                                    : property.genderPreference === 'Male Only'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-purple-500 text-white'
                                }`}>
                                  {property.genderPreference}
                                </span>
                              </div>

                              {/* Favorite Button */}
                              <button
                                onClick={() => handleFavorite(property.id)}
                                className="absolute bottom-4 right-4 p-3 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors group"
                              >
                                <Heart className="h-5 w-5 text-gray-600 group-hover:text-red-500 transition-colors" />
                              </button>

                              {/* View Count & Availability */}
                              <div className="absolute bottom-4 left-4 flex space-x-2">
                                <div className="bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
                                  <Eye className="h-3 w-3" />
                                  <span>{property.views}</span>
                                </div>
                                <div className="bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                  {property.totalMembers - property.currentOccupancy} Available
                                </div>
                              </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                              {/* Price & Property Type */}
                              <div className="flex items-center justify-between mb-3">
                                <div>
                                  <span className="text-2xl font-bold text-gray-900">
                                    {formatPrice(property.price)}
                                  </span>
                                  <span className="text-gray-600 text-sm">/month</span>
                                  {property.discount && (
                                    <div className="text-xs text-gray-500 line-through">
                                      {formatPrice(Math.round(property.price / (1 - property.discount / 100)))}
                                    </div>
                                  )}
                                </div>
                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                                  {property.propertyType}
                                </span>
                              </div>

                              {/* Title */}
                              <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                {property.title}
                              </h3>

                              {/* Location */}
                              <div className="flex items-center text-gray-600 mb-4">
                                <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                                <span className="text-sm">{property.location}</span>
                              </div>

                              {/* Occupancy & Availability */}
                              <div className="flex items-center justify-between text-gray-600 mb-4">
                                <div className="flex items-center space-x-1">
                                  <Users className="h-4 w-4 text-blue-500" />
                                  <span className="text-sm font-medium">{property.currentOccupancy}/{property.totalMembers} occupied</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Calendar className="h-4 w-4 text-green-500" />
                                  <span className="text-xs text-green-600 font-medium">Available Now</span>
                                </div>
                              </div>

                              {/* Amenities */}
                              <div className="flex flex-wrap gap-1 mb-4">
                                {property.amenities.slice(0, 4).map(amenity => (
                                  <span
                                    key={amenity}
                                    className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium"
                                  >
                                    {amenity}
                                  </span>
                                ))}
                                {property.amenities.length > 4 && (
                                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                    +{property.amenities.length - 4} more
                                  </span>
                                )}
                              </div>

                              {/* Owner Info */}
                              <div className="border-t pt-4">
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center space-x-3">
                                    <div className="relative">
                                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                        <span className="text-white font-semibold text-sm">
                                          {property.owner.name.charAt(0)}
                                        </span>
                                      </div>
                                      {property.owner.verified && (
                                        <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-0.5">
                                          <CheckCircle className="h-3 w-3 text-white" />
                                        </div>
                                      )}
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-900">{property.owner.name}</p>
                                      <div className="flex items-center space-x-2">
                                        {renderStars(property.owner.rating)}
                                        <span className="text-xs text-gray-500">• Responds in {property.owner.responseTime}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex space-x-2">
                                  <button 
                                    onClick={() => handleChat(property.id)}
                                    className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-4 py-3 rounded-xl hover:from-emerald-700 hover:to-green-700 transition-all text-sm font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                                  >
                                    <MessageCircle className="h-4 w-4" />
                                    <span>Chat Now</span>
                                  </button>
                                  <button className="flex-1 border-2 border-blue-600 text-blue-600 px-4 py-3 rounded-xl hover:bg-blue-50 transition-colors text-sm font-semibold flex items-center justify-center space-x-2">
                                    <Phone className="h-4 w-4" />
                                    <span>Call</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(filteredProperties.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentSlide ? 'bg-blue-600 w-8' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-3 mx-auto">
            <Building className="h-5 w-5" />
            <span>View All Properties</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Chat Credits Info */}
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
      </div>
    </section>
  );
};

export default FeaturedProperties;