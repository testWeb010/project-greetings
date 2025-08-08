import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PropertyDetailsSection from '../PropertyDetailsSection';
import { PropertyFormData, PropertyFormErrors } from '../../types';

describe('PropertyDetailsSection', () => {
  const mockOnChange = jest.fn();
  const propertyTypes = ['Apartment', 'House', 'PG'];
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
    nearbyPlaces: []
  };
  const errors: PropertyFormErrors = {};

  it('renders all fields and values correctly', () => {
    render(
      <PropertyDetailsSection
        formData={formData}
        errors={errors}
        onChange={mockOnChange}
        propertyTypes={propertyTypes}
      />
    );
    expect(screen.getByLabelText(/Property Name/i)).toHaveValue('');
    expect(screen.getByLabelText(/Property Type/i)).toHaveValue('');
    expect(screen.getByLabelText(/Total Rooms/i)).toHaveValue(1);
    expect(screen.getByLabelText(/Total Rent/i)).toHaveValue(0);
    expect(screen.getByLabelText(/Security Money/i)).toHaveValue(0);
  });

  it('calls onChange when input values change', () => {
    render(
      <PropertyDetailsSection
        formData={formData}
        errors={errors}
        onChange={mockOnChange}
        propertyTypes={propertyTypes}
      />
    );
    fireEvent.change(screen.getByLabelText(/Property Name/i), { target: { value: 'New Name', name: 'propertyName' } });
    expect(mockOnChange).toHaveBeenCalled();
    fireEvent.change(screen.getByLabelText(/Total Rooms/i), { target: { value: 5, name: 'totalRooms' } });
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('displays error messages if provided', () => {
    render(
      <PropertyDetailsSection
        formData={formData}
        errors={{ propertyName: 'Required', totalRooms: 'Invalid' }}
        onChange={mockOnChange}
        propertyTypes={propertyTypes}
      />
    );
    expect(screen.getByText('Required')).toBeInTheDocument();
    expect(screen.getByText('Invalid')).toBeInTheDocument();
  });
});
