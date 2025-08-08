import React from 'react';
import {
  Zap,
  ChefHat,
  Bath,
  Cigarette,
  Droplets,
  Wind,
  UtensilsCrossed,
  Users // Added Users icon
} from 'lucide-react';
import { PropertyFormData, PropertyFormErrors } from '../types';

interface AmenitiesSectionProps {
  formData: PropertyFormData;
  errors: PropertyFormErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  disabled?: boolean;
}

const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({
  formData,
  errors,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <Zap className="h-5 w-5 mr-2 text-blue-600" />
        Amenities & Features
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <label htmlFor="electricityIncluded" className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
          <input
            id="electricityIncluded"
            name="electricityIncluded"
            type="checkbox"
            checked={formData.electricityIncluded}
            onChange={onChange}
            disabled={disabled}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <Zap className="h-5 w-5 text-yellow-500" />
          <span className="text-sm font-medium text-gray-700">Electricity Included</span>
        </label>
        {errors.electricityIncluded && (
          <p className="text-red-500 text-xs mt-1">{errors.electricityIncluded}</p>
        )}

        <label htmlFor="kitchenAvailable" className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
          <input
            id="kitchenAvailable"
            name="kitchenAvailable"
            type="checkbox"
            checked={formData.kitchenAvailable}
            onChange={onChange}
            disabled={disabled}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <ChefHat className="h-5 w-5 text-orange-500" />
          <span className="text-sm font-medium text-gray-700">Kitchen Available</span>
        </label>
        {errors.kitchenAvailable && (
          <p className="text-red-500 text-xs mt-1">{errors.kitchenAvailable}</p>
        )}

        <label htmlFor="kitchenShared" className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
          <input
            id="kitchenShared"
            name="kitchenShared"
            type="checkbox"
            checked={formData.kitchenShared}
            onChange={onChange}
            disabled={disabled}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <Users className="h-5 w-5 text-purple-500" />
          <span className="text-sm font-medium text-gray-700">Kitchen Shared</span>
        </label>
        {errors.kitchenShared && (
          <p className="text-red-500 text-xs mt-1">{errors.kitchenShared}</p>
        )}

        <label htmlFor="washroomAvailable" className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
          <input
            id="washroomAvailable"
            name="washroomAvailable"
            type="checkbox"
            checked={formData.washroomAvailable}
            onChange={onChange}
            disabled={disabled}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <Bath className="h-5 w-5 text-blue-500" />
          <span className="text-sm font-medium text-gray-700">Washroom Available</span>
        </label>
        {errors.washroomAvailable && (
          <p className="text-red-500 text-xs mt-1">{errors.washroomAvailable}</p>
        )}

        <label htmlFor="washroomShared" className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
          <input
            id="washroomShared"
            name="washroomShared"
            type="checkbox"
            checked={formData.washroomShared}
            onChange={onChange}
            disabled={disabled}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <Users className="h-5 w-5 text-teal-500" />
          <span className="text-sm font-medium text-gray-700">Washroom Shared</span>
        </label>
        {errors.washroomShared && (
          <p className="text-red-500 text-xs mt-1">{errors.washroomShared}</p>
        )}

        <label htmlFor="smokingAlcoholAllowed" className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
          <input
            id="smokingAlcoholAllowed"
            name="smokingAlcoholAllowed"
            type="checkbox"
            checked={formData.smokingAlcoholAllowed}
            onChange={onChange}
            disabled={disabled}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <Cigarette className="h-5 w-5 text-red-500" />
          <span className="text-sm font-medium text-gray-700">Smoking & Alcohol Allowed</span>
        </label>
        {errors.smokingAlcoholAllowed && (
          <p className="text-red-500 text-xs mt-1">{errors.smokingAlcoholAllowed}</p>
        )}

        <label htmlFor="roWater" className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
          <input
            id="roWater"
            name="roWater"
            type="checkbox"
            checked={formData.roWater}
            onChange={onChange}
            disabled={disabled}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <Droplets className="h-5 w-5 text-blue-400" />
          <span className="text-sm font-medium text-gray-700">RO Water</span>
        </label>
        {errors.roWater && (
          <p className="text-red-500 text-xs mt-1">{errors.roWater}</p>
        )}

        <label htmlFor="ac" className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
          <input
            id="ac"
            name="ac"
            type="checkbox"
            checked={formData.ac}
            onChange={onChange}
            disabled={disabled}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <Wind className="h-5 w-5 text-cyan-500" />
          <span className="text-sm font-medium text-gray-700">AC</span>
        </label>
        {errors.ac && (
          <p className="text-red-500 text-xs mt-1">{errors.ac}</p>
        )}

        <label htmlFor="foodServiceAvailable" className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
          <input
            id="foodServiceAvailable"
            name="foodServiceAvailable"
            type="checkbox"
            checked={formData.foodServiceAvailable}
            onChange={onChange}
            disabled={disabled}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <UtensilsCrossed className="h-5 w-5 text-green-500" />
          <span className="text-sm font-medium text-gray-700">Food Service Available</span>
        </label>
        {errors.foodServiceAvailable && (
          <p className="text-red-500 text-xs mt-1">{errors.foodServiceAvailable}</p>
        )}
      </div>
    </div>
  );
};

export default AmenitiesSection;
