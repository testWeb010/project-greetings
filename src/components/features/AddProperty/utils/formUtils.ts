import { PropertyFormData, PropertyFormErrors } from '../types';

/**
 * Validates the property form data and returns any errors
 */
export const validatePropertyForm = (formData: PropertyFormData): PropertyFormErrors => {
  const errors: PropertyFormErrors = {};

  if (!formData.city.trim()) {
    errors.city = 'City is required';
  }

  if (!formData.pincode.trim()) {
    errors.pincode = 'Pincode is required';
  } else if (!/^\d{6}$/.test(formData.pincode)) {
    errors.pincode = 'Please enter a valid 6-digit pincode';
  }

  if (!formData.contactNumber.trim()) {
    errors.contactNumber = 'Contact number is required';
  } else if (!/^\d{10}$/.test(formData.contactNumber.replace(/\D/g, ''))) {
    errors.contactNumber = 'Please enter a valid 10-digit phone number';
  }

  if (!formData.propertyName.trim()) {
    errors.propertyName = 'Property name is required';
  }

  if (!formData.propertyType) {
    errors.propertyType = 'Please select a property type';
  }

  if (formData.totalRooms < 1) {
    errors.totalRooms = 'Total rooms must be at least 1';
  }

  if (formData.totalRent <= 0) {
    errors.totalRent = 'Rent amount is required';
  }

  if (formData.totalMembersAllowed < 1) {
    errors.totalMembersAllowed = 'At least 1 member must be allowed';
  }

  if (!formData.preferredGender) {
    errors.preferredGender = 'Please select preferred gender';
  }

  if (!formData.description.trim()) {
    errors.description = 'Property description is required';
  } else if (formData.description.length < 50) {
    errors.description = 'Description must be at least 50 characters';
  }

  return errors;
};

/**
 * Converts form data to a format suitable for API submission
 */
export const formatPropertyFormData = (formData: PropertyFormData): any => {
  // Create a new object with only the fields we want to send to the API
  const apiData = {
    title: formData.propertyName,
    location: `${formData.city} ${formData.pincode}`,
    price: formData.totalRent,
    deposit: formData.securityMoney,
    propertyType: formData.propertyType,
    genderPreference: formData.preferredGender,
    description: formData.description,
    bedrooms: formData.totalRooms,
    members: formData.totalMembersAllowed,
    amenities: [] as string[],
    rules: formData.rules,
    nearbyPlaces: formData.nearbyPlaces,
    availableFrom: formData.availableFrom,
    owner: {
      phone: formData.contactNumber
    }
  };

  // Add amenities based on form data
  if (formData.electricityIncluded) apiData.amenities.push('Electricity Included');
  if (formData.kitchenAvailable) apiData.amenities.push(formData.kitchenShared ? 'Shared Kitchen' : 'Private Kitchen');
  if (formData.washroomAvailable) apiData.amenities.push(formData.washroomShared ? 'Shared Washroom' : 'Private Washroom');
  if (formData.roWater) apiData.amenities.push('RO Water');
  if (formData.ac) apiData.amenities.push('Air Conditioning');
  if (formData.foodServiceAvailable) apiData.amenities.push('Food Service');
  if (formData.smokingAlcoholAllowed) apiData.amenities.push('Smoking/Alcohol Allowed');
  if (formData.independentProperty) apiData.amenities.push('Independent Property');

  return apiData;
};
