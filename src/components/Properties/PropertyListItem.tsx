
import React from 'react';
import { MapPin, Users, Bed, Bath, Square, Heart } from 'lucide-react';
import { Property } from '../../types';

interface PropertyListItemProps {
  property: Property;
  onClick: () => void;
}

const PropertyListItem: React.FC<PropertyListItemProps> = ({ property, onClick }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden cursor-pointer" onClick={onClick}>
      <div className="flex">
        <div className="relative w-64 flex-shrink-0">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-48 object-cover"
          />
          {property.featured && (
            <div className="absolute top-3 left-3">
              <span className="px-2 py-1 bg-orange-500 text-white text-xs font-medium rounded">
                Featured
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {property.title}
              </h3>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{property.location}</span>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-50 rounded-full">
              <Heart className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          <p className="text-gray-600 mb-4 line-clamp-2">
            {property.description}
          </p>

          <div className="flex items-center space-x-6 mb-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span>{property.bedrooms} Bedrooms</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span>{property.bathrooms} Bathrooms</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{property.members || 1} Members</span>
            </div>
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1" />
              <span>{property.area} sqft</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {property.amenities.map((amenity, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
              >
                {amenity}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-gray-900">
                {formatPrice(property.price)}
              </span>
              <span className="text-gray-600">/month</span>
            </div>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyListItem;
