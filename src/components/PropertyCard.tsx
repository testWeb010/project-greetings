import React from 'react';
import { MapPin, Bed, Bath, Square, Heart } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  onFavorite?: (id: string) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onFavorite }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Favorite Button */}
        <button
          onClick={() => onFavorite?.(property.id)}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors duration-200"
        >
          <Heart className="h-5 w-5 text-gray-600 hover:text-red-500" />
        </button>

        {/* Property Type Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            property.type === 'sale' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-blue-100 text-blue-800'
          }`}>
            For {property.type === 'sale' ? 'Sale' : 'Rent'}
          </span>
        </div>

        {/* Featured Badge */}
        {property.featured && (
          <div className="absolute bottom-3 left-3">
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Price */}
        <div className="mb-2">
          <span className="text-2xl font-bold text-gray-900">
            {formatPrice(property.price)}
          </span>
          {property.type === 'rent' && (
            <span className="text-gray-600 text-sm">/month</span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>

        {/* Property Details */}
        <div className="flex items-center justify-between text-gray-600 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.bedrooms}</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.bathrooms}</span>
            </div>
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.area} sqft</span>
            </div>
          </div>
        </div>

        {/* Agent Info */}
        {property.agent && (
          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{property.agent.name}</p>
                <p className="text-sm text-gray-600">{property.agent.phone}</p>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;