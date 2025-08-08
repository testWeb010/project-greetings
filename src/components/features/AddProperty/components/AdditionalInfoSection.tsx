import React from 'react';
import { Users, Eye, UserCheck, AlertCircle } from 'lucide-react';
import { PropertyFormData, PropertyFormErrors } from '../types';

interface AdditionalInfoSectionProps {
  formData: PropertyFormData;
  errors: PropertyFormErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  genderOptions: string[];
  disabled?: boolean;
}

const AdditionalInfoSection: React.FC<AdditionalInfoSectionProps> = ({
  formData,
  errors,
  onChange,
  genderOptions,
  disabled = false,
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <Users className="h-5 w-5 mr-2 text-blue-600" />
        Additional Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="totalMembersAllowed" className="block text-sm font-medium text-gray-700 mb-2">
            Total Members Allowed *
          </label>
          <input
            id="totalMembersAllowed"
            type="number"
            name="totalMembersAllowed"
            min="1"
            value={formData.totalMembersAllowed}
            onChange={onChange}
            placeholder="Enter number of members allowed"
            disabled={disabled}
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
          <label htmlFor="preferredGender" className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Gender *
          </label>
          <select
            id="preferredGender"
            name="preferredGender"
            value={formData.preferredGender}
            onChange={onChange}
            disabled={disabled}
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
        <div className="space-y-3">
          <label htmlFor="independentProperty" className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
            <input
              id="independentProperty"
              name="independentProperty"
              type="checkbox"
              checked={formData.independentProperty}
              onChange={onChange}
              disabled={disabled}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Independent Property</span>
          </label>
        </div>
      </div>

      {/* Ownership */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <UserCheck className="h-5 w-5 mr-2 text-gray-600" />
          Ownership
        </h3>
        <div className="space-y-3">
          <label htmlFor="propertyOwner" className="flex items-center space-x-3">
            <input
              id="propertyOwner"
              type="radio"
              name="ownership"
              checked={formData.propertyOwner}
              onChange={(e) => {
                // Synthesize two changes: propertyOwner true, askingForRoommate false
                const fakeEventOwner = {
                  ...e,
                  target: { ...e.target, name: 'propertyOwner', value: true, checked: true, type: 'radio' }
                };
                const fakeEventRoommate = {
                  ...e,
                  target: { ...e.target, name: 'askingForRoommate', value: false, checked: false, type: 'radio' }
                };
                onChange(fakeEventOwner as any);
                onChange(fakeEventRoommate as any);
              }}
              disabled={disabled}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Property Owner</span>
          </label>
          <label htmlFor="askingForRoommate" className="flex items-center space-x-3">
            <input
              id="askingForRoommate"
              type="radio"
              name="ownership"
              checked={formData.askingForRoommate}
              onChange={(e) => {
                // Synthesize two changes: askingForRoommate true, propertyOwner false
                const fakeEventRoommate = {
                  ...e,
                  target: { ...e.target, name: 'askingForRoommate', value: true, checked: true, type: 'radio' }
                };
                const fakeEventOwner = {
                  ...e,
                  target: { ...e.target, name: 'propertyOwner', value: false, checked: false, type: 'radio' }
                };
                onChange(fakeEventRoommate as any);
                onChange(fakeEventOwner as any);
              }}
              disabled={disabled}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Asking for Roommate</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfoSection;
