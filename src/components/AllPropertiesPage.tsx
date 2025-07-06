import React, { useState } from 'react';
import { Search, Filter, Grid, List, MapPin, Users, Bed, Bath, Square, Heart, ChevronDown, X } from 'lucide-react';

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  members: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  amenities: string[];
  description: string;
  verified: boolean;
  featured: boolean;
}

interface Filters {
  propertyType: string;
  gender: string;
  bedrooms: string;
  priceRange: { min: number; max: number };
  location: string;
  amenities: string[];
}

interface AllPropertiesPageProps {
  onPropertyClick: () => void;
}

const AllPropertiesPage: React.FC<AllPropertiesPageProps> = ({ onPropertyClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    propertyType: '',
    gender: '',
    bedrooms: '',
    priceRange: { min: 0, max: 50000 },
    location: '',
    amenities: []
  });

  const properties: Property[] = [
    {
      id: '1',
      title: 'Single Room in Kharar | 2 Members',
      location: 'Kharar',
      price: 7000,
      members: 2,
      bedrooms: 1,
      bathrooms: 1,
      area: 300,
      image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg',
      amenities: ['Verified', 'Smoking & Drinking', 'Independent', 'Electricity'],
      description: 'Modern valley mall furnished room is 30% fully furnished 0% for 1 room fully furnished.',
      verified: true,
      featured: false
    },
    {
      id: '2',
      title: 'Apartment in Phagwara | 8 Members',
      location: 'Phagwara',
      price: 20000,
      members: 8,
      bedrooms: 3,
      bathrooms: 2,
      area: 1200,
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
      amenities: ['Verified', 'Smoking & Drinking', 'Independent', 'Electricity'],
      description: 'Nice apartment in phagwara, all facilities available',
      verified: true,
      featured: true
    },
    {
      id: '3',
      title: 'Apartment in Jalandhar | 6 Members',
      location: 'Jalandhar',
      price: 18000,
      members: 6,
      bedrooms: 2,
      bathrooms: 2,
      area: 900,
      image: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg',
      amenities: ['Verified', 'Smoking & Drinking', 'Independent', 'Electricity'],
      description: 'Near jalandhar bus stand ji, all facilities available',
      verified: true,
      featured: false
    },
    {
      id: '4',
      title: 'Apartment in Kharar | 12 Members',
      location: 'Kharar',
      price: 25000,
      members: 12,
      bedrooms: 4,
      bathrooms: 3,
      area: 1500,
      image: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg',
      amenities: ['Verified', 'Smoking & Drinking', 'Independent', 'Electricity'],
      description: 'Only for girls, gate will close after 8 pm, no friends allowed',
      verified: true,
      featured: false
    },
    {
      id: '5',
      title: 'Apartment in Kota | 8 Members',
      location: 'Kota',
      price: 20000,
      members: 8,
      bedrooms: 3,
      bathrooms: 2,
      area: 1100,
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      amenities: ['Verified', 'Smoking & Drinking', 'Independent', 'Electricity'],
      description: 'Near allen samiksha building',
      verified: true,
      featured: false
    },
    {
      id: '6',
      title: 'Single Room in Lawgata | 2 Members',
      location: 'Lawgata',
      price: 6000,
      members: 2,
      bedrooms: 1,
      bathrooms: 1,
      area: 250,
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      amenities: ['Verified', 'Smoking & Drinking', 'Electricity'],
      description: 'Everything is available',
      verified: true,
      featured: false
    }
  ];

  const propertyTypes = ['Apartment', 'Single Room', 'PG', 'House', 'Villa'];
  const genderOptions = ['Male', 'Female', 'Family', 'No Preference'];
  const bedroomOptions = ['1', '2', '3', '4', '5+'];
  const amenityOptions = ['Verified', 'Smoking & Drinking', 'Independent', 'Electricity', 'AC', 'WiFi', 'Parking'];

  const handleFilterChange = (key: keyof Filters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const clearFilters = () => {
    setFilters({
      propertyType: '',
      gender: '',
      bedrooms: '',
      priceRange: { min: 0, max: 50000 },
      location: '',
      amenities: []
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* View Controls */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </button>

              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>

              <span className="text-sm text-gray-600">
                {properties.length} properties found
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
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
                    value={filters.gender}
                    onChange={(e) => handleFilterChange('gender', e.target.value)}
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

          {/* Properties Grid/List */}
          <div className="flex-1">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {properties.map(property => (
                  <PropertyCard key={property.id} property={property} onClick={onPropertyClick} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {properties.map(property => (
                  <PropertyListItem key={property.id} property={property} onClick={onPropertyClick} />
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center items-center space-x-2 mt-12">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600">
                Previous
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600">2</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600">3</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Property Card Component
const PropertyCard: React.FC<{ property: Property; onClick: () => void }> = ({ property, onClick }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden cursor-pointer" onClick={onClick}>
      <div className="relative">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
          <Heart className="h-4 w-4 text-gray-600" />
        </button>
        {property.featured && (
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 bg-orange-500 text-white text-xs font-medium rounded">
              Featured
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {property.title}
        </h3>

        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span>{property.bathrooms}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{property.members}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {property.amenities.slice(0, 3).map(amenity => (
            <span
              key={amenity}
              className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
            >
              {amenity}
            </span>
          ))}
          {property.amenities.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{property.amenities.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(property.price)}
            </span>
            <span className="text-sm text-gray-600">/month</span>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

// Property List Item Component
const PropertyListItem: React.FC<{ property: Property; onClick: () => void }> = ({ property, onClick }) => {
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
              <span>{property.members} Members</span>
            </div>
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1" />
              <span>{property.area} sqft</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {property.amenities.map(amenity => (
              <span
                key={amenity}
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

export default AllPropertiesPage;