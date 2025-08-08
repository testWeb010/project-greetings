import React from 'react';
import { MapPin, AlertCircle } from 'lucide-react';
import { PropertyFormData, PropertyFormErrors } from '../types';

/**
 * LocationSection Props
 */
export interface LocationSectionProps {
  /**
   * Property form data
   */
  formData: PropertyFormData;
  /**
   * Property form errors
   */
  errors: PropertyFormErrors;
  /**
   * Handle input change event
   * @param e - Change event
   */
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  /**
   * Disable input fields
   */
  disabled?: boolean;
}

/**
 * LocationSection component
 */
const LocationSection: React.FC<LocationSectionProps> = ({
  formData,
  errors,
  onChange,
  disabled = false,
}) => {
  return (
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
            name="city"
            value={formData.city}
            onChange={onChange}
            placeholder="Enter City"
            disabled={disabled}
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
            name="pincode"
            value={formData.pincode}
            onChange={(e) => {
              console.log('Pincode input change attempted', e.target.value);
              onChange(e);
            }}
            placeholder="Enter Your Pincode"
            disabled={disabled}
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
  );
};

export default LocationSection;
