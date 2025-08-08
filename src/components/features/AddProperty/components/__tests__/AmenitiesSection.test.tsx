import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AmenitiesSection from '../AmenitiesSection';

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

const mockOnChange = jest.fn();

describe('AmenitiesSection', () => {
  beforeEach(() => {
    render(
      <AmenitiesSection 
        formData={formData} 
        errors={{}} 
        onChange={mockOnChange} 
      />
    );
  });

  it('renders all fields and values correctly', () => {
    expect(screen.getByLabelText('Electricity Included')).not.toBeChecked();
    expect(screen.getByLabelText('Kitchen Available')).not.toBeChecked();
    expect(screen.getByLabelText('Kitchen Shared')).not.toBeChecked();
    expect(screen.getByLabelText('Washroom Available')).not.toBeChecked();
    expect(screen.getByLabelText('Washroom Shared')).not.toBeChecked();
    expect(screen.getByLabelText('Smoking & Alcohol Allowed')).not.toBeChecked();
    expect(screen.getByLabelText('RO Water')).not.toBeChecked();
    expect(screen.getByLabelText('AC')).not.toBeChecked();
    expect(screen.getByLabelText('Food Service Available')).not.toBeChecked();
  });

  it('calls onChange when input values change', () => {
    fireEvent.click(screen.getByLabelText('Electricity Included'));
    expect(mockOnChange).toHaveBeenCalled();
    
    fireEvent.click(screen.getByLabelText('Kitchen Available'));
    expect(mockOnChange).toHaveBeenCalled();
    
    fireEvent.click(screen.getByLabelText('Washroom Available'));
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('displays error messages if provided', () => {
    render(
      <AmenitiesSection
        formData={formData}
        errors={{ electricityIncluded: 'Required field', kitchenAvailable: 'Required field' }}
        onChange={mockOnChange}
      />
    );
    expect(screen.getAllByText('Required field').length).toBe(2);
  });
});
