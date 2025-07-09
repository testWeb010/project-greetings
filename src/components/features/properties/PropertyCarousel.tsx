
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PropertyCard from './PropertyCard';

const PropertyCarousel: React.FC = () => {
  // Mock data - replace with actual data from API
  const properties = [
    {
      id: '1',
      title: 'Modern PG in Koramangala',
      price: 12000,
      location: 'Koramangala, Bangalore',
      type: 'rent' as const,
      bedrooms: 1,
      bathrooms: 1,
      area: 450,
      image: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg',
      featured: true,
      verified: true,
      owner: {
        id: '1',
        name: 'John Doe',
        phone: '+91 9876543210',
        email: 'john@example.com',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
        verified: true,
        responseTime: '2 hours',
        rating: 4.8
      },
      deposit: 24000,
      totalCost: 36000,
      location_details: {
        address: 'Koramangala 5th Block, Bangalore',
        coordinates: { lat: 12.9352, lng: 77.6245 }
      },
      reviews: {
        overall: 4.8,
        cleanliness: 4.9,
        location: 4.7,
        valueForMoney: 4.6,
        count: 24
      },
      amenities: [
        { icon: 'Wifi', name: 'WiFi', available: true },
        { icon: 'Car', name: 'Parking', available: true }
      ],
      description: 'Modern PG accommodation with all amenities',
      propertyType: 'PG',
      genderPreference: 'Male',
      availability: { available: true, availableFrom: '2024-01-15' },
      members: 4,
      currentOccupancy: 2,
      rules: ['No smoking', 'No pets'],
      nearbyPlaces: ['Metro Station', 'Shopping Mall'],
      createdAt: '2024-01-01',
      isActive: true
    },
    {
      id: '2',
      title: 'Cozy Hostel Near University',
      price: 8000,
      location: 'HSR Layout, Bangalore',
      type: 'rent' as const,
      bedrooms: 1,
      bathrooms: 1,
      area: 300,
      image: 'https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg',
      featured: true,
      verified: true,
      owner: {
        id: '2',
        name: 'Jane Smith',
        phone: '+91 9876543211',
        email: 'jane@example.com',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
        verified: true,
        responseTime: '1 hour',
        rating: 4.9
      },
      deposit: 16000,
      totalCost: 24000,
      location_details: {
        address: 'HSR Layout Sector 2, Bangalore',
        coordinates: { lat: 12.9116, lng: 77.6473 }
      },
      reviews: {
        overall: 4.7,
        cleanliness: 4.8,
        location: 4.9,
        valueForMoney: 4.5,
        count: 18
      },
      amenities: [
        { icon: 'Wifi', name: 'WiFi', available: true },
        { icon: 'Utensils', name: 'Kitchen', available: true }
      ],
      description: 'Cozy hostel accommodation near university',
      propertyType: 'Hostel',
      genderPreference: 'Female',
      availability: { available: true, availableFrom: '2024-01-20' },
      members: 6,
      currentOccupancy: 4,
      rules: ['No smoking', 'Quiet hours after 10 PM'],
      nearbyPlaces: ['University', 'Bus Stop'],
      createdAt: '2024-01-02',
      isActive: true
    },
    {
      id: '3',
      title: 'Shared Room with Amenities',
      price: 6000,
      location: 'Indiranagar, Bangalore',
      type: 'rent' as const,
      bedrooms: 1,
      bathrooms: 1,
      area: 250,
      image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
      featured: true,
      verified: true,
      owner: {
        id: '3',
        name: 'Mike Johnson',
        phone: '+91 9876543212',
        email: 'mike@example.com',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg',
        verified: true,
        responseTime: '3 hours',
        rating: 4.6
      },
      deposit: 12000,
      totalCost: 18000,
      location_details: {
        address: 'Indiranagar 100 Feet Road, Bangalore',
        coordinates: { lat: 12.9719, lng: 77.6412 }
      },
      reviews: {
        overall: 4.5,
        cleanliness: 4.6,
        location: 4.8,
        valueForMoney: 4.7,
        count: 12
      },
      amenities: [
        { icon: 'Wifi', name: 'WiFi', available: true },
        { icon: 'Tv', name: 'TV', available: true }
      ],
      description: 'Shared room with modern amenities',
      propertyType: 'Shared Room',
      genderPreference: 'Any',
      availability: { available: true, availableFrom: '2024-01-25' },
      members: 2,
      currentOccupancy: 1,
      rules: ['No smoking'],
      nearbyPlaces: ['Metro Station', 'Restaurant'],
      createdAt: '2024-01-03',
      isActive: true
    }
  ];

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Trending Properties
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onPropertyClick={(id) => console.log('Property clicked:', id)}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyCarousel;
