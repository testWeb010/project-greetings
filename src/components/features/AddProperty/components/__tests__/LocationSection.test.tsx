import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import LocationSection from '../LocationSection';
import { PropertyFormData, PropertyFormErrors } from '../../types';

const mockFormData: PropertyFormData = {
  propertyName: '',
  totalRent: 0,
  propertyType: '',
  description: '',
  city: '',
  pincode: '',
  contactNumber: '',
  totalRooms: 1,
  securityMoney: 0,
  availabilityFrom: new Date(),
  availabilityTo: new Date(),
  electricityIncluded: false,
  kitchenAvailable: false,
  kitchenShared: false,
  washroomAvailable: false,
  washroomShared: false,
  smokingAlcoholAllowed: false,
  totalMembersAllowed: 1,
  independentProperty: false,
  propertyOwner: false,
  askingForRoommate: false,
  roWater: false,
  ac: false,
  foodServiceAvailable: false,
  preferredGender: 'Any',
  location: '',
  images: [],
  availableFrom: '',
  rules: [],
  nearbyPlaces: [],
  video: null
};

const mockErrors: PropertyFormErrors = {
  propertyName: '',
  totalRent: '',
  propertyType: '',
  description: '',
  city: '',
  pincode: '',
  contactNumber: '',
  totalRooms: '',
  securityMoney: '',
  availabilityFrom: '',
  availabilityTo: '',
  preferredGender: '',
  location: ''
};

const mockOnChange = jest.fn();

describe('LocationSection', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  test('renders city input field', () => {
    render(
      <LocationSection 
        formData={mockFormData} 
        errors={mockErrors} 
        onChange={mockOnChange} 
      />
    );
    const cityInputs = screen.getAllByPlaceholderText('Enter City');
    expect(cityInputs[0]).toBeInTheDocument();
  });

  test('renders pincode input field', () => {
    render(
      <LocationSection 
        formData={mockFormData} 
        errors={mockErrors} 
        onChange={mockOnChange} 
      />
    );
    const pincodeInputs = screen.getAllByPlaceholderText('Enter Your Pincode');
    expect(pincodeInputs[0]).toBeInTheDocument();
  });

  test('displays location section heading', () => {
    render(
      <LocationSection 
        formData={mockFormData} 
        errors={mockErrors} 
        onChange={mockOnChange} 
      />
    );
    expect(screen.getByText('Location Information')).toBeInTheDocument();
  });

  test('calls onChange when city input changes', () => {
    render(
      <LocationSection 
        formData={mockFormData} 
        errors={mockErrors} 
        onChange={mockOnChange} 
      />
    );
    const cityInputs = screen.getAllByPlaceholderText('Enter City');
    fireEvent.change(cityInputs[0], { target: { value: 'New York' } });
    expect(mockOnChange).toHaveBeenCalled();
  });

  test('calls onChange when pincode input changes', () => {
    render(
      <LocationSection 
        formData={mockFormData} 
        errors={mockErrors} 
        onChange={mockOnChange} 
      />
    );
    const pincodeInputs = screen.getAllByPlaceholderText('Enter Your Pincode');
    fireEvent.change(pincodeInputs[0], { target: { value: '12345' } });
    expect(mockOnChange).toHaveBeenCalled();
  });

  test('displays error message when city error exists', () => {
    const errorMessage = 'City is required';
    const errorsWithCityError = { ...mockErrors, city: errorMessage };
    render(
      <LocationSection 
        formData={mockFormData} 
        errors={errorsWithCityError} 
        onChange={mockOnChange} 
      />
    );
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('displays error message when pincode error exists', () => {
    const errorMessage = 'Pincode is required';
    const errorsWithPincodeError = { ...mockErrors, pincode: errorMessage };
    render(
      <LocationSection 
        formData={mockFormData} 
        errors={errorsWithPincodeError} 
        onChange={mockOnChange} 
      />
    );
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('city input field has error styling when error exists', () => {
    const errorsWithCityError = { ...mockErrors, city: 'Invalid city' };
    render(
      <LocationSection 
        formData={mockFormData} 
        errors={errorsWithCityError} 
        onChange={mockOnChange} 
      />
    );
    const cityInputs = screen.getAllByPlaceholderText('Enter City');
    expect(cityInputs[0]).toHaveClass('border-red-500');
  });

  test('pincode input field has error styling when error exists', () => {
    const errorsWithPincodeError = { ...mockErrors, pincode: 'Invalid pincode' };
    render(
      <LocationSection 
        formData={mockFormData} 
        errors={errorsWithPincodeError} 
        onChange={mockOnChange} 
      />
    );
    const pincodeInputs = screen.getAllByPlaceholderText('Enter Your Pincode');
    expect(pincodeInputs[0]).toHaveClass('border-red-500');
  });

  test('city input field has default styling when no error exists', () => {
    render(
      <LocationSection 
        formData={mockFormData} 
        errors={mockErrors} 
        onChange={mockOnChange} 
      />
    );
    const cityInputs = screen.getAllByPlaceholderText('Enter City');
    expect(cityInputs[0]).toHaveClass('border-gray-300');
  });

  test('pincode input field has default styling when no error exists', () => {
    render(
      <LocationSection 
        formData={mockFormData} 
        errors={mockErrors} 
        onChange={mockOnChange} 
      />
    );
    const pincodeInputs = screen.getAllByPlaceholderText('Enter Your Pincode');
    expect(pincodeInputs[0]).toHaveClass('border-gray-300');
  });
});
