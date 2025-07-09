
import React from 'react';
import PropertyCard from '../../Properties/PropertyCard';
import { Property } from '../../../types';

interface PropertyGridProps {
  properties: Property[];
  onPropertyClick?: (property: Property) => void;
}

const PropertyGrid: React.FC<PropertyGridProps> = ({ properties, onPropertyClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard 
          key={property.id} 
          property={property} 
          onClick={() => onPropertyClick?.(property)}
        />
      ))}
    </div>
  );
};

export default PropertyGrid;
