// Type definitions for AddProperty feature
// This file can be used to define specific types related to the AddProperty components

export interface AddPropertyFormProps {
  // Define props if needed for the form component
}

export interface PropertyFormData {
  city: string;
  pincode: string;
  contactNumber: string;
  propertyName: string;
  propertyType: string;
  totalRooms: number;
  totalRent: number;
  securityMoney: number;
  electricityIncluded: boolean;
  kitchenAvailable: boolean;
  kitchenShared: boolean;
  washroomAvailable: boolean;
  washroomShared: boolean;
  smokingAlcoholAllowed: boolean;
  totalMembersAllowed: number;
  independentProperty: boolean;
  propertyOwner: boolean;
  askingForRoommate: boolean;
  roWater: boolean;
  ac: boolean;
  foodServiceAvailable: boolean;
  preferredGender: string;
  description: string;
  location: string;
  images: File[];
  video: File | null; // Change to single video file or null
  availableFrom: string;
  availabilityFrom: Date;
  availabilityTo: Date;
  rules: string[];
  nearbyPlaces: string[];
}

export interface PropertyFormErrors {
  city?: string;
  pincode?: string;
  contactNumber?: string;
  propertyName?: string;
  propertyType?: string;
  totalRooms?: string;
  totalRent?: string;
  securityMoney?: string;
  electricityIncluded?: string;
  kitchenAvailable?: string;
  kitchenShared?: string;
  washroomAvailable?: string;
  washroomShared?: string;
  smokingAlcoholAllowed?: string;
  totalMembersAllowed?: string;
  independentProperty?: string;
  propertyOwner?: string;
  askingForRoommate?: string;
  preferredGender?: string;
  images?: string;
  video?: string;
  roWater?: string;
  ac?: string;
  foodServiceAvailable?: string;
  description?: string;
  location?: string;
  availabilityFrom?: string;
  availabilityTo?: string;
  availableFrom?: string;
  rules?: string;
  nearbyPlaces?: string;
}