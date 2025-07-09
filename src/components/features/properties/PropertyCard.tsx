
import React, { useState } from 'react';
import { MapPin, Heart, Verified, Star } from 'lucide-react';
import { Property } from '../../../types';

interface PropertyCardProps {
  property: Property;
  onPropertyClick: (id: string) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onPropertyClick }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden border border-gray-200 dark:border-gray-700"
      onClick={() => onPropertyClick(property.id)}
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={property.image || 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg'}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex space-x-2">
          {property.featured && (
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Featured
            </span>
          )}
          {property.verified && (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
              <Verified className="h-3 w-3" />
              <span>Verified</span>
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
            isFavorited 
              ? 'bg-red-500 text-white' 
              : 'bg-white/90 text-gray-600 hover:bg-white'
          }`}
        >
          <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {property.title}
          </h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              ₹{property.price.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">per month</div>
          </div>
        </div>

        <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="text-sm">{property.location}</span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <span>{property.bedrooms} Bed</span>
            <span>{property.bathrooms} Bath</span>
            <span>{property.area} sq ft</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="font-medium">4.8</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
