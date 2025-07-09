
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PropertyCard from './PropertyCard';

const PropertyCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Mock data - replace with actual data from API
  const properties = [
    {
      id: '1',
      title: 'Modern PG in Koramangala',
      price: 12000,
      location: 'Koramangala, Bangalore',
      type: 'rent' as const,
      bedrooms: 1,
      bathrooms: 1,
      area: 450,
      image: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg',
      featured: true,
      verified: true
    },
    {
      id: '2',
      title: 'Cozy Hostel Near University',
      price: 8000,
      location: 'HSR Layout, Bangalore',
      type: 'rent' as const,
      bedrooms: 1,
      bathrooms: 1,
      area: 300,
      image: 'https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg',
      featured: true,
      verified: true
    },
    {
      id: '3',
      title: 'Shared Room with Amenities',
      price: 6000,
      location: 'Indiranagar, Bangalore',
      type: 'rent' as const,
      bedrooms: 1,
      bathrooms: 1,
      area: 250,
      image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
      featured: true,
      verified: true
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(properties.length / 3));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(properties.length / 3)) % Math.ceil(properties.length / 3));
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Trending Properties
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onPropertyClick={(id) => console.log('Property clicked:', id)}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyCarousel;
