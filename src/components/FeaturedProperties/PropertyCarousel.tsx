import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Users, MessageCircle, Star, Eye, Heart, Building, Calendar, Phone } from 'lucide-react';
import { FeaturedProperty } from '../../types';
import PropertyCard from './PropertyCard'; 

interface PropertyCarouselProps {
  properties: FeaturedProperty[];
  onFavorite: (id: string) => void;
  onChat: (id: string) => void;
}

const PropertyCarousel: React.FC<PropertyCarouselProps> = ({ properties, onFavorite, onChat }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(properties.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(properties.length / 3)) % Math.ceil(properties.length / 3));
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
          {Array.from({ length: Math.ceil(properties.length / 3) }).map((_, slideIndex) => (
            <div key={slideIndex} className="w-full flex-shrink-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties
                  .slice(slideIndex * 3, slideIndex * 3 + 3)
                  .map((property) => (
                    <PropertyCard 
                      key={property.id} 
                      property={property} 
                      onFavorite={onFavorite} 
                      onChat={onChat} // Pass onChat prop
                      formatPrice={formatPrice} // Pass formatPrice prop
                      renderStars={renderStars} // Pass renderStars prop
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: Math.ceil(properties.length / 3) }).map((_, index) => (
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
  );
};

export default PropertyCarousel;
