import React, { useState } from 'react';

import { PropertyFormData, PropertyFormErrors } from '../types';
import { useProperty } from '../hooks';
import { validatePropertyForm, formatPropertyFormData } from '../utils/formUtils';
import LocationSection from '../components/LocationSection';
import ContactSection from '../components/ContactSection';
import PropertyDetailsSection from '../components/PropertyDetailsSection';
import AmenitiesSection from '../components/AmenitiesSection';
import AdditionalInfoSection from '../components/AdditionalInfoSection';
import DescriptionSection from '../components/DescriptionSection';
import MediaUploadSection from '../components/MediaUploadSection';
import SubmitButton from '../components/SubmitButton';
import SuccessMessage from '../components/SuccessMessage';

interface AddPropertyFormProps {
  onSubmit?: (data: PropertyFormData) => void;
}

const AddPropertyForm: React.FC<AddPropertyFormProps> = ({ onSubmit }) => {
  const initialFormData: PropertyFormData = {
    city: '',
    pincode: '',
    contactNumber: '',
    propertyName: '',
    propertyType: '',
    totalRooms: 1,
    totalRent: 0,
    securityMoney: 0,
    electricityIncluded: false,
    kitchenAvailable: false,
    kitchenShared: false,
    washroomAvailable: false,
    washroomShared: false,
    smokingAlcoholAllowed: false,
    totalMembersAllowed: 1,
    independentProperty: false,
    propertyOwner: true,
    askingForRoommate: false,
    preferredGender: 'Any',
    roWater: false,
    ac: false,
    foodServiceAvailable: false,
    description: '',
    location: '',
    images: [],
    availabilityFrom: new Date(),
    availabilityTo: new Date(),
    availableFrom: '',
    rules: [],
    nearbyPlaces: [],
    video: null // Change to single video file
  };

  const [formData, setFormData] = useState<PropertyFormData>(initialFormData);
  const [errors, setErrors] = useState<PropertyFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { submitProperty } = useProperty();

  const propertyTypes = [
    'Apartment',
    'House',
    'Villa',
    'Studio',
    'Shared Room',
    'PG',
    'Hostel',
    'Independent Floor'
  ];

  const genderOptions = [
    'No Preference',
    'Male Only',
    'Female Only',
    'Family'
  ];

  const validateForm = (): boolean => {
    const newErrors = validatePropertyForm(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error when user starts typing for the specific field
    if (errors[name as keyof PropertyFormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    // Optional: Implement logic to limit file count or size here if not handled by backend
    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    // Optional: Implement logic to limit file size here
    setFormData(prev => ({ ...prev, video: file }));
  };

  const removeVideo = (index?: number) => {
    setFormData(prev => ({ ...prev, video: null }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Format the data for API submission
      formatPropertyFormData(formData);

      // Call the API using our hook
      await submitProperty(formData);

      // If successful, show success message
      setSubmitSuccess(true);

      // Call onSubmit prop if provided (for testing purposes)
      if (onSubmit) {
        onSubmit(formData);
      }

      // Auto-hide success message and reset form after a delay
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData(initialFormData);
        setErrors({}); // Clear errors on success
      }, 3000); // Auto-hide success message after 3 seconds

    } catch (error) {
      console.error('Error submitting property:', error);
      // Optional: Set an error state to display a user-friendly error message on the form
      // setErrors({ apiError: 'Failed to submit property. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render the success message if submitted successfully
  if (submitSuccess) {
    return <SuccessMessage onListAnother={() => {
      setSubmitSuccess(false);
      // You might want to reset form state here as well if not done in the timeout
      setFormData(initialFormData);
      setErrors({});
    }} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Add A Property
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            List your property and connect with potential tenants. Fill out the form below with accurate details.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <PropertyDetailsSection
            formData={formData}
            errors={errors}
            onChange={handleChange}
            propertyTypes={propertyTypes}
            disabled={isSubmitting}
          />

          <LocationSection
            formData={formData}
            errors={errors}
            onChange={handleChange}
            disabled={isSubmitting}
          />

          <ContactSection
            formData={formData}
            errors={errors}
            onChange={handleChange}
            disabled={isSubmitting}
          />

          <AmenitiesSection
            formData={formData}
            errors={errors}
            onChange={handleChange}
            disabled={isSubmitting}
          />

          <AdditionalInfoSection
            formData={formData}
            errors={errors}
            onChange={handleChange}
            genderOptions={genderOptions}
            disabled={isSubmitting}
          />

          <DescriptionSection
            formData={formData}
            errors={errors}
            onChange={handleChange}
            disabled={isSubmitting}
          />

          <MediaUploadSection
            formData={formData}
            handleImageUpload={handleImageUpload}
            removeImage={removeImage}
            handleVideoUpload={handleVideoUpload}
            removeVideo={removeVideo}
            disabled={isSubmitting}
          />

          {/* Submit Button */}
          <SubmitButton isSubmitting={isSubmitting} />
        </form>
      </div>
    </div>
  );
};

export default AddPropertyForm;
