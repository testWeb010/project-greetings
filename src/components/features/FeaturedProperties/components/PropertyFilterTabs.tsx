
import React from 'react';

interface PropertyFilterTabsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  propertiesCount?: { [key: string]: number };
}

const PropertyFilterTabs: React.FC<PropertyFilterTabsProps> = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: 'all', label: 'All Properties' },
    { id: 'pg', label: 'PG' },
    { id: 'hostel', label: 'Hostel' },
    { id: 'flat', label: 'Flat' },
    { id: 'room', label: 'Room' }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeFilter === filter.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default PropertyFilterTabs;
