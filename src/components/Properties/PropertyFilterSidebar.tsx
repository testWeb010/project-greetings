import React from 'react';
import { Filter, X } from 'lucide-react';
import { SearchFilters } from '../../types'; // Using SearchFilters from types/index.ts

interface PropertyFilterSidebarProps {
  showFilters: boolean;
  filters: SearchFilters;
  propertyTypes: string[];
  genderOptions: string[];
  bedroomOptions: string[];
  amenityOptions: string[];
  handleFilterChange: (key: keyof SearchFilters, value: any) => void;
  handleAmenityToggle: (amenity: string) => void;
  clearFilters: () => void;
}

const PropertyFilterSidebar: React.FC<PropertyFilterSidebarProps> = ({
  showFilters,
  filters,
  propertyTypes,
  genderOptions,
  bedroomOptions,
  amenityOptions,
  handleFilterChange,
  handleAmenityToggle,
  clearFilters,
}) => {
  return (
    <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-80 flex-shrink-0`}>
      <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Remove filters
          </button>
        </div>

        <div className="space-y-6">
          {/* Property Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Property Type
            </label>
            <select
              value={filters.propertyType}
              onChange={(e) => handleFilterChange('propertyType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              {propertyTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Gender
            </label>
            <select
              value={filters.genderPreference} // Use genderPreference to match SearchFilters
              onChange={(e) => handleFilterChange('genderPreference', e.target.value)} // Use genderPreference
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All</option>
              {genderOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* Bedrooms */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Bedrooms
            </label>
            <select
              value={filters.bedrooms}
              onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Any</option>
              {bedroomOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Price Range
            </label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.priceRange.min}
                  onChange={(e) => handleFilterChange('priceRange', {
                    ...filters.priceRange,
                    min: parseInt(e.target.value) || 0
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.priceRange.max}
                  onChange={(e) => handleFilterChange('priceRange', {
                    ...filters.priceRange,
                    max: parseInt(e.target.value) || 50000
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <input
                type="range"
                min="0"
                max="50000"
                step="1000"
                value={filters.priceRange.max}
                onChange={(e) => handleFilterChange('priceRange', {
                  ...filters.priceRange,
                  max: parseInt(e.target.value)
                })}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>₹0</span>
                <span>₹50,000+</span>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Amenities
            </label>
            <div className="space-y-2">
              {amenityOptions.map(amenity => (
                <label key={amenity} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.amenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}                 
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{amenity}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyFilterSidebar;
