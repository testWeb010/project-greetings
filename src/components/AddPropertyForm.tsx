import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Home, 
  Users, 
  DollarSign, 
  Shield, 
  Zap, 
  ChefHat, 
  Bath, 
  Cigarette, 
  Eye, 
  UserCheck, 
  Droplets, 
  Wind, 
  UtensilsCrossed,
  Upload,
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { PropertyFormData, PropertyFormErrors } from '../types';

const AddPropertyForm: React.FC = () => {
  const [formData, setFormData] = useState<PropertyFormData>({
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
    roWater: false,
    ac: false,
    foodServiceAvailable: false,
    preferredGender: '',
    description: '',
    images: []
  });

  const [errors, setErrors] = useState<PropertyFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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
    const newErrors: PropertyFormErrors = {};

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (!/^\d{10}$/.test(formData.contactNumber.replace(/\D/g, ''))) {
      newErrors.contactNumber = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.propertyName.trim()) {
      newErrors.propertyName = 'Property name is required';
    }

    if (!formData.propertyType) {
      newErrors.propertyType = 'Please select a property type';
    }

    if (formData.totalRooms < 1) {
      newErrors.totalRooms = 'Total rooms must be at least 1';
    }

    if (formData.totalRent <= 0) {
      newErrors.totalRent = 'Rent amount is required';
    }

    if (formData.totalMembersAllowed < 1) {
      newErrors.totalMembersAllowed = 'At least 1 member must be allowed';
    }

    if (!formData.preferredGender) {
      newErrors.preferredGender = 'Please select preferred gender';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Property description is required';
    } else if (formData.description.length < 50) {
      newErrors.description = 'Description must be at least 50 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof PropertyFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field as keyof PropertyFormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitSuccess(true);
      console.log('Property submitted:', formData);
      
      // Reset form after successful submission
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
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
          roWater: false,
          ac: false,
          foodServiceAvailable: false,
          preferredGender: '',
          description: '',
          images: []
        });
      }, 3000);
    } catch (error) {
      console.error('Error submitting property:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Property Listed Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Your property has been submitted for review. We'll notify you once it's approved and live on the platform.
          </p>
          <button
            onClick={() => setSubmitSuccess(false)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            List Another Property
          </button>
        </div>
      </div>
    );
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

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
          {/* Location Information */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-blue-600" />
              Location Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="Enter City"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.city ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.city}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pincode *
                </label>
                <input
                  type="text"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange('pincode', e.target.value)}
                  placeholder="Enter Your Pincode"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.pincode ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.pincode && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.pincode}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Phone className="h-5 w-5 mr-2 text-blue-600" />
              Contact Information
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Number *
              </label>
              <input
                type="tel"
                value={formData.contactNumber}
                onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                placeholder="Enter Your Contact Number"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.contactNumber ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.contactNumber && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.contactNumber}
                </p>
              )}
            </div>
          </div>

          {/* Property Details */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Home className="h-5 w-5 mr-2 text-blue-600" />
              Property Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Name *
                </label>
                <input
                  type="text"
                  value={formData.propertyName}
                  onChange={(e) => handleInputChange('propertyName', e.target.value)}
                  placeholder="Enter Property Name"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.propertyName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.propertyName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.propertyName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type *
                </label>
                <select
                  value={formData.propertyType}
                  onChange={(e) => handleInputChange('propertyType', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.propertyType ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Property Type</option>
                  {propertyTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.propertyType && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.propertyType}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Rooms *
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.totalRooms}
                  onChange={(e) => handleInputChange('totalRooms', parseInt(e.target.value))}
                  placeholder="Enter total number of rooms"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.totalRooms ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.totalRooms && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.totalRooms}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Rent *
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.totalRent}
                  onChange={(e) => handleInputChange('totalRent', parseInt(e.target.value))}
                  placeholder="Enter total rent"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.totalRent ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.totalRent && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.totalRent}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Security Money
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.securityMoney}
                  onChange={(e) => handleInputChange('securityMoney', parseInt(e.target.value))}
                  placeholder="Enter Security Money"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Zap className="h-5 w-5 mr-2 text-blue-600" />
              Amenities & Features
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={formData.electricityIncluded}
                  onChange={(e) => handleInputChange('electricityIncluded', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <Zap className="h-5 w-5 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700">Electricity Included</span>
              </label>

              <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={formData.kitchenAvailable}
                  onChange={(e) => handleInputChange('kitchenAvailable', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <ChefHat className="h-5 w-5 text-orange-500" />
                <span className="text-sm font-medium text-gray-700">Kitchen Available</span>
              </label>

              <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={formData.kitchenShared}
                  onChange={(e) => handleInputChange('kitchenShared', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <Users className="h-5 w-5 text-purple-500" />
                <span className="text-sm font-medium text-gray-700">Kitchen Shared</span>
              </label>

              <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={formData.washroomAvailable}
                  onChange={(e) => handleInputChange('washroomAvailable', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <Bath className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-medium text-gray-700">Washroom Available</span>
              </label>

              <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={formData.washroomShared}
                  onChange={(e) => handleInputChange('washroomShared', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <Users className="h-5 w-5 text-teal-500" />
                <span className="text-sm font-medium text-gray-700">Washroom Shared</span>
              </label>

              <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={formData.smokingAlcoholAllowed}
                  onChange={(e) => handleInputChange('smokingAlcoholAllowed', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <Cigarette className="h-5 w-5 text-red-500" />
                <span className="text-sm font-medium text-gray-700">Smoking & Alcohol Allowed</span>
              </label>

              <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={formData.roWater}
                  onChange={(e) => handleInputChange('roWater', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <Droplets className="h-5 w-5 text-blue-400" />
                <span className="text-sm font-medium text-gray-700">RO Water</span>
              </label>

              <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={formData.ac}
                  onChange={(e) => handleInputChange('ac', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <Wind className="h-5 w-5 text-cyan-500" />
                <span className="text-sm font-medium text-gray-700">AC</span>
              </label>

              <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={formData.foodServiceAvailable}
                  onChange={(e) => handleInputChange('foodServiceAvailable', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <UtensilsCrossed className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium text-gray-700">Food Service Available</span>
              </label>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-600" />
              Additional Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Members Allowed *
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.totalMembersAllowed}
                  onChange={(e) => handleInputChange('totalMembersAllowed', parseInt(e.target.value))}
                  placeholder="Enter number of members allowed"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.totalMembersAllowed ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.totalMembersAllowed && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.totalMembersAllowed}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Gender *
                </label>
                <select
                  value={formData.preferredGender}
                  onChange={(e) => handleInputChange('preferredGender', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.preferredGender ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Gender</option>
                  {genderOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.preferredGender && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.preferredGender}
                  </p>
                )}
              </div>
            </div>

            {/* Property Surveillance */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Eye className="h-5 w-5 mr-2 text-gray-600" />
                Property Surveillance
              </h3>
              <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={formData.independentProperty}
                  onChange={(e) => handleInputChange('independentProperty', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Independent Property</span>
              </label>
            </div>

            {/* Ownership */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <UserCheck className="h-5 w-5 mr-2 text-gray-600" />
                Ownership
              </h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="ownership"
                    checked={formData.propertyOwner}
                    onChange={() => {
                      handleInputChange('propertyOwner', true);
                      handleInputChange('askingForRoommate', false);
                    }}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Property Owner</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="ownership"
                    checked={formData.askingForRoommate}
                    onChange={() => {
                      handleInputChange('askingForRoommate', true);
                      handleInputChange('propertyOwner', false);
                    }}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Asking for Roommate</span>
                </label>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Tell us more about your property..."
              rows={6}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <div className="flex justify-between items-center mt-2">
              {errors.description && (
                <p className="text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.description}
                </p>
              )}
              <p className="text-sm text-gray-500 ml-auto">
                {formData.description.length}/500 characters
              </p>
            </div>
          </div>

          {/* Image Upload */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Upload className="h-5 w-5 mr-2 text-blue-600" />
              Property Images
            </h2>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-700 mb-2">Upload Property Images</p>
              <p className="text-sm text-gray-500 mb-4">
                Add photos to showcase your property (Max 10 images, 5MB each)
              </p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer inline-block"
              >
                Choose Images
              </label>
            </div>

            {/* Image Preview */}
            {formData.images.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Selected Images</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Property ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-3 rounded-lg font-medium text-white transition-all duration-200 ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 hover:shadow-lg transform hover:-translate-y-0.5'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Adding Property...</span>
                </div>
              ) : (
                'Add Property'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPropertyForm;