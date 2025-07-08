import React, { useState } from 'react';
import { TrendingUp, Building, Users, MapPin, Star } from 'lucide-react';

interface PropertyFilterTabsProps {
  onFilterChange: (filter: string) => void;
  propertiesCount: {
    all: number;
    PG: number;
    'Shared Room': number;
    'Single Room': number;
    'Co-living': number;
  };
}

const PropertyFilterTabs: React.FC<PropertyFilterTabsProps> = ({ onFilterChange, propertiesCount }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { key: 'all', label: 'All Properties', count: propertiesCount.all },
    { key: 'PG', label: 'PG/Hostels', count: propertiesCount.PG },
    { key: 'Shared Room', label: 'Shared Rooms', count: propertiesCount['Shared Room'] },
    { key: 'Single Room', label: 'Single Rooms', count: propertiesCount['Single Room'] },
    { key: 'Co-living', label: 'Co-living', count: propertiesCount['Co-living'] },
  ];

  const handleFilterClick = (filterKey: string) => {
    setActiveFilter(filterKey);
    onFilterChange(filterKey);
  };

  return (
    <div className="flex justify-center mb-12">
      <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
        <div className="flex flex-wrap justify-center gap-2">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => handleFilterClick(filter.key)}
              className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                activeFilter === filter.key
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span>{filter.label}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  activeFilter === filter.key
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {filter.count}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyFilterTabs;
