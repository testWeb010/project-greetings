import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Assuming react-router is used for routing and getting ID
import PropertyHeader from '../components/PropertyDetailPageComponents/PropertyHeader';
import ImageGallery from '../components/PropertyDetailPageComponents/ImageGallery';
import PropertyDetails from '../components/PropertyDetailPageComponents/PropertyDetails';
import LocationMap from '../components/PropertyDetailPageComponents/LocationMap';
import ReviewsSection from '../components/PropertyDetailPageComponents/ReviewsSection';
import PricingCard from '../components/PropertyDetailPageComponents/PricingCard';
import OwnerDetails from '../components/PropertyDetailPageComponents/OwnerDetails';
import QuickActions from '../components/PropertyDetailPageComponents/QuickActions';
import ContactModal from '../components/PropertyDetailPageComponents/ContactModal';
import { Property } from '../types'; // Import the updated Property interface

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get property ID from URL params
  const [property, setProperty] = useState<Property | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch property data from API
    const fetchProperty = async () => {
      try {
        setLoading(true);
        // Replace with your actual API call endpoint
        // The endpoint is likely something like /api/posts/get-post-by-id/:id
        const response = await fetch(`/api/posts/get-post-by-id/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Property = await response.json();
        setProperty(data);
      } catch (err) {
        console.error('Error fetching property data:', err);
        setError('Failed to load property data.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }

  }, [id]); // Refetch when ID changes

  const nextImage = () => {
    if (property?.images?.length) {
      setCurrentImageIndex((prev) =>
        prev === property.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
     if (property?.images?.length) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? property.images.length - 1 : prev - 1
      );
    }
  };

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
    // TODO: Implement API call to update favorite status
  };

  const handleShareClick = () => {
    // TODO: Implement share functionality
    console.log('Share clicked');
  };

  const handleGetContactDetailsClick = () => {
    setShowContactModal(true);
  };

  const handleScheduleVisitClick = () => {
    // TODO: Implement schedule visit logic
    console.log('Schedule Visit clicked');
  };

  const handleChatWithOwnerClick = () => {
    // TODO: Implement chat functionality
    console.log('Chat with owner clicked');
  };

  const handleBookSiteVisitClick = () => {
    // TODO: Implement book site visit functionality
    console.log('Book Site Visit clicked');
  };

  // Assuming share property from Quick Actions does the same as header share
  const handleSharePropertyClick = () => {
     handleShareClick();
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-600">{error}</div>;
  }

  if (!property) {
    return <div className="flex justify-center items-center min-h-screen">Property not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Property Images */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="relative">
              <img
                src={property.images?.[0] || property.image}
                alt={property.title}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {property.images?.slice(1, 5).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Property ${index + 2}`}
                  className="w-full h-44 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>

          {/* Header */}
          <PropertyHeader
            title={property.title}
            location={property.location}
            isFavorited={isFavorited}
            onBackClick={() => window.history.back()} // Example back navigation
            onFavoriteClick={handleFavoriteClick}
            onShareClick={handleShareClick}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Image Gallery */}
                {property.images && property.images.length > 0 && (
                     <ImageGallery
                        images={property.images}
                        currentImageIndex={currentImageIndex}
                        title={property.title}
                        verified={property.verified || false}
                        featured={property.featured || false}
                        nextImage={nextImage}
                        prevImage={prevImage}
                        setCurrentImageIndex={setCurrentImageIndex}
                    />
                )}

                {/* Property Details */}
                <PropertyDetails
                    property={property}
                    showAllAmenities={showAllAmenities}
                    setShowAllAmenities={setShowAllAmenities}
                 />

                {/* Location Map */}
                {property.location_details && (
                    <LocationMap
                        address={property.location_details.address}
                        coordinates={property.location_details.coordinates}
                    />
                )}

                {/* Reviews */}
                {property.reviews && (
                  <ReviewsSection
                    reviews={property.reviews}
                  />
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Pricing Card */}
                   <PricingCard
                      price={property.price}
                      deposit={property.deposit}
                      totalCost={property.totalCost}
                      onGetContactDetailsClick={handleGetContactDetailsClick}
                      onScheduleVisitClick={handleScheduleVisitClick}
                  />

                  {/* Owner Details */}
                  {property.owner && (
                    <OwnerDetails
                      owner={property.owner}
                      onRevealContactInfoClick={handleGetContactDetailsClick} // Uses the same modal trigger
                    />
                  )}

                  {/* Quick Actions */}
                   <QuickActions
                    onChatWithOwnerClick={handleChatWithOwnerClick}
                    onBookSiteVisitClick={handleBookSiteVisitClick}
                    onSharePropertyClick={handleSharePropertyClick}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Modal */}
          {showContactModal && property?.owner && (
            <ContactModal
              show={showContactModal}
              onClose={() => setShowContactModal(false)}
              owner={property.owner}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
