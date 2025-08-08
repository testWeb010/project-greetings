import React from 'react';
import { Home, AlertCircle } from 'lucide-react';
import { PropertyFormData, PropertyFormErrors } from '../types';

interface PropertyDetailsSectionProps {
  formData: PropertyFormData;
  errors: PropertyFormErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  propertyTypes: string[];
  disabled?: boolean;
}

const PropertyDetailsSection: React.FC<PropertyDetailsSectionProps> = ({
  formData,
  errors,
  onChange,
  propertyTypes,
  disabled = false,
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <Home className="h-5 w-5 mr-2 text-blue-600" />
        Property Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="propertyName" className="block text-sm font-medium text-gray-700 mb-2">
            Property Name *
          </label>
          <input
            id="propertyName"
            type="text"
            name="propertyName"
            value={formData.propertyName}
            onChange={onChange}
            placeholder="Enter Property Name"
            disabled={disabled}
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
          <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-2">
            Property Type *
          </label>
          <select
            id="propertyType"
            name="propertyType"
            value={formData.propertyType}
            onChange={onChange}
            disabled={disabled}
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
          <label htmlFor="totalRooms" className="block text-sm font-medium text-gray-700 mb-2">
            Total Rooms *
          </label>
          <input
            id="totalRooms"
            type="number"
            name="totalRooms"
            min="1"
            value={formData.totalRooms}
            onChange={onChange}
            placeholder="Enter total number of rooms"
            disabled={disabled}
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
          <label htmlFor="totalRent" className="block text-sm font-medium text-gray-700 mb-2">
            Total Rent *
          </label>
          <input
            id="totalRent"
            type="number"
            name="totalRent"
            min="0"
            value={formData.totalRent}
            onChange={onChange}
            placeholder="Enter total rent"
            disabled={disabled}
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
          <label htmlFor="securityMoney" className="block text-sm font-medium text-gray-700 mb-2">
            Security Money
          </label>
          <input
            id="securityMoney"
            type="number"
            name="securityMoney"
            min="0"
            value={formData.securityMoney}
            onChange={onChange}
            placeholder="Enter Security Money"
            disabled={disabled}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsSection;
