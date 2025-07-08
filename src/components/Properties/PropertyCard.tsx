import React from 'react';
import { Heart, MessageSquare, Bed, Bath, MapPin, Star } from 'lucide-react';
import { Property } from '../../types';

interface PropertyCardProps {
  property: Property;
  onFavorite?: (id: string) => void;
  onChat?: (id: string) => void;
  formatPrice?: (price: number) => string;
  renderStars?: (rating: number) => React.ReactNode;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const amenities = [
    { icon: '🏠', name: 'Electricity', available: property.electricityIncluded },
    { icon: '🍽️', name: 'Kitchen', available: property.kitchenAvailable },
    { icon: '🚿', name: 'Washroom', available: property.washroomAvailable },
    { icon: '❄️', name: 'AC', available: property.ac },
    { icon: '💧', name: 'RO Water', available: property.roWater },
    { icon: '🍽️', name: 'Food Service', available: property.foodServiceAvailable }
  ];

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
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-56 object-cover"
      />
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
          <div className="flex items-center space-x-2">
            <button className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
              <Heart className="h-5 w-5" />
            </button>
            <button className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
              <MessageSquare className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-gray-600 mb-3">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{property.location}</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-xl font-bold text-blue-600">{formatPrice(property.price)}</span>
            <span className="text-gray-600">/month</span>
          </div>
          {renderStars(4.5)}
        </div>

        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-1 text-gray-600">
            <Bed className="h-4 w-4" />
            <span className="text-sm">{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-600">
            <Bath className="h-4 w-4" />
            <span className="text-sm">{property.bathrooms} Baths</span>
          </div>
        </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {amenities.slice(0, 3).map((amenity, index) => (
          <div
            key={index}
            className={`flex items-center space-x-1 px-2 py-1 rounded text-xs ${
              amenity.available
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            <span>{amenity.icon}</span>
            <span>{amenity.name}</span>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default PropertyCard;
