import React, { type JSX } from 'react';
import { MapPin, Heart, MessageCircle, CheckCircle, Phone, Users, Calendar, Eye, Crown } from 'lucide-react';
import { FeaturedProperty } from '../../types';

interface PropertyCardProps {
  property: FeaturedProperty;
  onFavorite?: (id: string) => void;
  onChat: (id: string) => void;
  formatPrice: (price: number) => string;
  renderStars: (rating: number) => JSX.Element;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onFavorite, onChat, formatPrice, renderStars }) => {
  return (
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
          {property.discount !== undefined && property.discount > 0 && (
            <span className="bg-red-500 text-white px-3 py-1 text-xs font-bold rounded-full shadow-lg">
              {property.discount}% OFF
            </span>
          )}
        </div>

        {/* Gender Preference Badge */}
        {property.genderPreference && (
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
        )}

        {/* Favorite Button */}
        <button
          onClick={() => onFavorite?.(property.id)}
          className="absolute bottom-4 right-4 p-3 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors group"
        >
          <Heart className="h-5 w-5 text-gray-600 group-hover:text-red-500 transition-colors" />
        </button>

        {/* View Count & Availability */}
        {(property.views !== undefined || (property.totalMembers !== undefined && property.currentOccupancy !== undefined)) && (
          <div className="absolute bottom-4 left-4 flex space-x-2">
            {property.views !== undefined && (
              <div className="bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
                <Eye className="h-3 w-3" />
                <span>{property.views}</span>
              </div>
            )}
            {property.totalMembers !== undefined && property.currentOccupancy !== undefined && (property.totalMembers - property.currentOccupancy > 0) && (
              <div className="bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                {property.totalMembers - property.currentOccupancy} Available
              </div>
            )}
          </div>
        )}
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
            {property.discount !== undefined && property.discount > 0 && (
              <div className="text-xs text-gray-500 line-through">
                {formatPrice(Math.round(property.price / (1 - property.discount / 100)))}
              </div>
            )}
          </div>
          {property.propertyType && (
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
              {property.propertyType}
            </span>
          )}
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
        {/* Redundant with overlay, but keeping for now based on original structure */}
        {property.totalMembers !== undefined && property.currentOccupancy !== undefined && (
          <div className="flex items-center justify-between text-gray-600 mb-4">
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">{property.currentOccupancy}/{property.totalMembers} occupied</span>
            </div>
            {property.availableFrom && (
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4 text-green-500" />
                <span className="text-xs text-green-600 font-medium">Available Now</span>{/* Or format the date */}
              </div>
            )}
          </div>
        )}

        {/* Amenities */}
        {property.amenities && property.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {property.amenities.slice(0, 4).map((amenity: string) => (
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
        )}

        {/* Owner Info */}
        {property.owner && (property.owner.name || property.owner.rating !== undefined || property.owner.responseTime || property.owner.phone) && (
          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                {property.owner.name && (
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
                )}
                <div>
                  {property.owner.name && (
                    <p className="text-sm font-medium text-gray-900">{property.owner.name}</p>
                  )}
                  {property.owner.rating !== undefined && property.owner.responseTime && (
                    <div className="flex items-center space-x-2">
                      {renderStars(property.owner.rating)}
                      <span className="text-xs text-gray-500">• Responds in {property.owner.responseTime}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              {onChat && (
                <button 
                  onClick={() => onChat(property.id)}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-4 py-3 rounded-xl hover:from-emerald-700 hover:to-green-700 transition-all text-sm font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Chat Now</span>
                </button>
              )}
              {property.owner.phone && property.owner.phone !== '' && (
                <a 
                  href={`tel:${property.owner.phone}`}
                  className="flex-1 border-2 border-blue-600 text-blue-600 px-4 py-3 rounded-xl hover:bg-blue-50 transition-colors text-sm font-semibold flex items-center justify-center space-x-2"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call</span>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;
