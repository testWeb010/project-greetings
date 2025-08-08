import React, { useState } from 'react';
import { TrendingUp, Building, ChevronRight } from 'lucide-react';
import PropertyFilterTabs from './PropertyFilterTabs';
import PropertyCarousel from './PropertyCarousel';
import FeaturedPropertiesCTA from './FeaturedPropertiesCTA';
import { FeaturedProperty } from '../../../../types';

const FeaturedProperties: React.FC = () => {
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

  const propertiesCount = {
    all: featuredProperties.length,
    PG: featuredProperties.filter(p => p.propertyType === 'PG').length,
    'Shared Room': featuredProperties.filter(p => p.propertyType === 'Shared Room').length,
    'Single Room': featuredProperties.filter(p => p.propertyType === 'Single Room').length,
    'Co-living': featuredProperties.filter(p => p.propertyType === 'Co-living').length,
  };

  const filteredProperties = activeFilter === 'all'
    ? featuredProperties
    : featuredProperties.filter(p => p.propertyType === activeFilter);

  const handleFavorite = (id: string) => {
    console.log('Favorited property:', id);
  };

  const handleChat = (id: string) => {
    console.log('Start chat for property:', id);
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
        <PropertyFilterTabs
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          propertiesCount={propertiesCount}
        />

        {/* Properties Carousel */}
        <PropertyCarousel
          properties={filteredProperties}
          onFavorite={handleFavorite}
          onChat={handleChat}
        />

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-3 mx-auto">
            <Building className="h-5 w-5" />
            <span>View All Properties</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Chat Credits Info */}
        <FeaturedPropertiesCTA />
      </div>
    </section>
  );
};

export default FeaturedProperties;
