import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  MapPin, 
  Users, 
  Bed, 
  Bath, 
  Square, 
  Phone, 
  Mail, 
  MessageCircle,
  Star,
  ChevronLeft,
  ChevronRight,
  Wifi,
  Car,
  Zap,
  Droplets,
  Wind,
  Shield,
  Camera,
  Play,
  CheckCircle,
  X,
  Calendar,
  Clock,
  IndianRupee
} from 'lucide-react';

interface PropertyDetail {
  id: string;
  title: string;
  location: string;
  price: number;
  deposit: number;
  totalCost: number;
  members: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  amenities: {
    icon: React.ElementType;
    name: string;
    available: boolean;
  }[];
  description: string;
  propertyType: string;
  genderPreference: string;
  verified: boolean;
  featured: boolean;
  owner: {
    name: string;
    phone: string;
    email: string;
    avatar: string;
    verified: boolean;
  };
  location_details: {
    address: string;
    coordinates: { lat: number; lng: number };
  };
  reviews: {
    overall: number;
    cleanliness: number;
    location: number;
    valueForMoney: number;
    count: number;
  };
  availability: {
    available: boolean;
    availableFrom: string;
  };
}

const PropertyDetailPage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  const property: PropertyDetail = {
    id: '1',
    title: 'Bagga house | apartment',
    location: 'Phagwara, 144400',
    price: 20000,
    deposit: 10000,
    totalCost: 30000,
    members: 8,
    bedrooms: 3,
    bathrooms: 2,
    area: 1200,
    images: [
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg',
      'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg',
      'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg',
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'
    ],
    amenities: [
      { icon: Users, name: '4 Roomies', available: true },
      { icon: Zap, name: 'Electricity Included', available: true },
      { icon: Bed, name: 'Kitchen Available', available: true },
      { icon: Bath, name: 'Washroom Available', available: true },
      { icon: CheckCircle, name: 'Smoking Allowed', available: true },
      { icon: Shield, name: 'Independent Property', available: true },
      { icon: Users, name: 'Capacity 8', available: true },
      { icon: Wifi, name: 'WiFi', available: true },
      { icon: Car, name: 'Parking', available: false },
      { icon: Wind, name: 'AC', available: true },
      { icon: Droplets, name: 'RO Water', available: true }
    ],
    description: 'Nice apartment in phagwara, all facilities available. Perfect for students and working professionals. The property is well-maintained with modern amenities and excellent connectivity to major areas.',
    propertyType: 'Apartment',
    genderPreference: 'Female Only',
    verified: true,
    featured: true,
    owner: {
      name: 'Kunal Singh',
      phone: '+91 98765 43210',
      email: 'kunal.singh@email.com',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      verified: true
    },
    location_details: {
      address: 'Near Bus Stand, Phagwara, Punjab 144400',
      coordinates: { lat: 31.2338, lng: 75.7745 }
    },
    reviews: {
      overall: 4.5,
      cleanliness: 4.2,
      location: 4.8,
      valueForMoney: 4.3,
      count: 12
    },
    availability: {
      available: true,
      availableFrom: '2024-01-15'
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(rating) 
                ? 'text-yellow-400 fill-current' 
                : i < rating 
                ? 'text-yellow-400 fill-current opacity-50'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">({rating})</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-lg font-semibold text-gray-900 truncate max-w-md">
                  {property.title}
                </h1>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{property.location}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setIsFavorited(!isFavorited)}
                className={`p-2 rounded-full transition-colors ${
                  isFavorited ? 'bg-red-50 text-red-600' : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Share2 className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="relative">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={property.images[currentImageIndex]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Navigation Arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {property.images.length}
                  </div>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex space-x-2">
                    {property.verified && (
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Verified
                      </span>
                    )}
                    {property.featured && (
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                {/* Thumbnail Strip */}
                <div className="p-4 bg-gray-50">
                  <div className="flex space-x-2 overflow-x-auto">
                    {property.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          index === currentImageIndex 
                            ? 'border-blue-500 ring-2 ring-blue-200' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`View ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {property.title}
                  </h2>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span className="text-lg">{property.location_details.address}</span>
                  </div>
                  
                  {/* Property Type & Gender Badge */}
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {property.propertyType}
                    </span>
                    <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">
                      {property.genderPreference}
                    </span>
                  </div>
                </div>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Bed className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{property.bedrooms}</div>
                  <div className="text-sm text-gray-600">Bedrooms</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Bath className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{property.bathrooms}</div>
                  <div className="text-sm text-gray-600">Bathrooms</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{property.members}</div>
                  <div className="text-sm text-gray-600">Max Members</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Square className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{property.area}</div>
                  <div className="text-sm text-gray-600">Sq Ft</div>
                </div>
              </div>

              {/* Rent Includes & Excludes */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Rent Includes & Excludes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {property.amenities.slice(0, showAllAmenities ? property.amenities.length : 6).map((amenity, index) => (
                    <div
                      key={index}
                      className={`flex items-center p-3 rounded-lg border ${
                        amenity.available 
                          ? 'bg-green-50 border-green-200 text-green-800' 
                          : 'bg-red-50 border-red-200 text-red-800'
                      }`}
                    >
                      <amenity.icon className="h-5 w-5 mr-3" />
                      <span className="font-medium">{amenity.name}</span>
                      {amenity.available ? (
                        <CheckCircle className="h-4 w-4 ml-auto" />
                      ) : (
                        <X className="h-4 w-4 ml-auto" />
                      )}
                    </div>
                  ))}
                </div>
                {property.amenities.length > 6 && (
                  <button
                    onClick={() => setShowAllAmenities(!showAllAmenities)}
                    className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {showAllAmenities ? 'Show Less' : `Show All ${property.amenities.length} Amenities`}
                  </button>
                )}
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Description</h3>
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </div>

              {/* Availability */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Availability</h3>
                <div className="flex items-center space-x-4">
                  <div className={`flex items-center px-4 py-2 rounded-lg ${
                    property.availability.available 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    <Calendar className="h-5 w-5 mr-2" />
                    <span className="font-medium">
                      {property.availability.available ? 'Available' : 'Not Available'}
                    </span>
                  </div>
                  {property.availability.available && (
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-5 w-5 mr-2" />
                      <span>Available from {new Date(property.availability.availableFrom).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Location Map */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Location</h3>
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Interactive Map View</p>
                  <p className="text-sm text-gray-500">{property.location_details.address}</p>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Property Reviews</h3>
              
              {/* Overall Rating */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {property.reviews.overall}
                  </div>
                  {renderStars(property.reviews.overall)}
                  <p className="text-sm text-gray-600 mt-2">
                    Based on {property.reviews.count} reviews
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Cleanliness</span>
                    <div className="flex items-center">
                      {renderStars(property.reviews.cleanliness)}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Location</span>
                    <div className="flex items-center">
                      {renderStars(property.reviews.location)}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Value for Money</span>
                    <div className="flex items-center">
                      {renderStars(property.reviews.valueForMoney)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">No reviews yet. Be the first to review this property!</p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Write a Review
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Pricing Card */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {formatPrice(property.price)}
                    <span className="text-lg font-normal text-gray-600">/Month</span>
                  </div>
                  <p className="text-sm text-gray-600">All utilities are included</p>
                </div>

                {/* Cost Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Average monthly rent</span>
                    <span className="font-semibold">{formatPrice(property.price)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Deposit / Security Money</span>
                    <span className="font-semibold">{formatPrice(property.deposit)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">Total costs</span>
                      <span className="font-bold text-lg">{formatPrice(property.totalCost)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowContactModal(true)}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold mb-3"
                >
                  Get Contact Details
                </button>
                
                <button className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
                  Schedule Visit
                </button>
              </div>

              {/* Owner Details */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Details</h3>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative">
                    <img
                      src={property.owner.avatar}
                      alt={property.owner.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {property.owner.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{property.owner.name}</h4>
                    <p className="text-sm text-gray-600">Property Owner</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-3" />
                    <span className="text-sm">+91 ••••• ••••0</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-4 w-4 mr-3" />
                    <span className="text-sm">••••••@email.com</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowContactModal(true)}
                  className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Reveal Contact Info
                </button>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    <span>Chat with Owner</span>
                  </button>
                  
                  <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <Calendar className="h-4 w-4" />
                    <span>Book Site Visit</span>
                  </button>
                  
                  <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <Share2 className="h-4 w-4" />
                    <span>Share Property</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Contact Details</h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            <div className="text-center mb-6">
              <img
                src={property.owner.avatar}
                alt={property.owner.name}
                className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
              />
              <h4 className="text-lg font-semibold text-gray-900">{property.owner.name}</h4>
              <p className="text-gray-600">Property Owner</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-600 mr-3" />
                  <span className="font-medium">{property.owner.phone}</span>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Call
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-600 mr-3" />
                  <span className="font-medium">{property.owner.email}</span>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Email
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowContactModal(false)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailPage;