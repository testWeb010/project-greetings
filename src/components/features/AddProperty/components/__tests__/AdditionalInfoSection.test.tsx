import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdditionalInfoSection from '../AdditionalInfoSection';

import { PropertyFormData } from '../../types';

const formData: PropertyFormData = {
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
  totalMembersAllowed: 2,
  independentProperty: false,
  propertyOwner: true,
  askingForRoommate: false,
  preferredGender: 'Any',
  images: [],
  roWater: false,
  ac: false,
  foodServiceAvailable: false,
  description: '',
  location: '',
  availabilityFrom: new Date(),
  availabilityTo: new Date(),
  availableFrom: '',
  rules: [],
  nearbyPlaces: [],
  video: null
};

const genderOptions = ['Any', 'Male', 'Female'];

const mockOnChange = jest.fn();

describe('AdditionalInfoSection', () => {
  beforeEach(() => {
    render(
      <AdditionalInfoSection 
        formData={formData} 
        errors={{}} 
        onChange={mockOnChange} 
        genderOptions={genderOptions} 
      />
    );
  });

  it('renders all fields and values correctly', () => {
    expect(screen.getByLabelText(/Total Members Allowed/i)).toHaveValue(2);
    expect(screen.getByLabelText(/Preferred Gender/i)).toHaveValue('Any');
    expect(screen.getByLabelText(/Independent Property/i)).not.toBeChecked();
    expect(screen.getByLabelText(/Property Owner/i)).toBeChecked();
    expect(screen.getByLabelText(/Asking for Roommate/i)).not.toBeChecked();
  });

  it('calls onChange when input values change', () => {
    fireEvent.change(screen.getByLabelText(/Total Members Allowed/i), { target: { value: 3, name: 'totalMembersAllowed' } });
    expect(mockOnChange).toHaveBeenCalled();
    
    fireEvent.change(screen.getByLabelText(/Preferred Gender/i), { target: { value: 'Male', name: 'preferredGender' } });
    expect(mockOnChange).toHaveBeenCalled();
    
    fireEvent.click(screen.getByLabelText(/Independent Property/i));
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('displays error messages if provided', () => {
    render(
      <AdditionalInfoSection
        formData={formData}
        errors={{ totalMembersAllowed: 'Invalid number', preferredGender: 'Required' }}
        onChange={mockOnChange}
        genderOptions={genderOptions}
      />
    );
    expect(screen.getByText('Invalid number')).toBeInTheDocument();
    expect(screen.getByText('Required')).toBeInTheDocument();
  });
});
