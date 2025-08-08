import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactSection from '../ContactSection';
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

describe('ContactSection', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  test('renders contact number input field', () => {
    render(
      <ContactSection 
        formData={mockFormData} 
        errors={mockErrors} 
        onChange={mockOnChange} 
      />
    );
    const inputs = screen.getAllByPlaceholderText('Enter Your Contact Number');
    expect(inputs[0]).toBeInTheDocument();
  });

  test('displays contact section heading', () => {
    render(
      <ContactSection 
        formData={mockFormData} 
        errors={mockErrors} 
        onChange={mockOnChange} 
      />
    );
    expect(screen.getByText('Contact Information')).toBeInTheDocument();
  });

  test('calls onChange when contact number input changes', () => {
    render(
      <ContactSection 
        formData={mockFormData} 
        errors={mockErrors} 
        onChange={mockOnChange} 
      />
    );
    const inputs = screen.getAllByPlaceholderText('Enter Your Contact Number');
    fireEvent.change(inputs[0], { target: { value: '1234567890' } });
    expect(mockOnChange).toHaveBeenCalled();
  });

  test('displays error message when contactNumber error exists', () => {
    const errorMessage = 'Contact number is required';
    const errorsWithContactError = { ...mockErrors, contactNumber: errorMessage };
    render(
      <ContactSection 
        formData={mockFormData} 
        errors={errorsWithContactError} 
        onChange={mockOnChange} 
      />
    );
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('input field has error styling when error exists', () => {
    const errorsWithContactError = { ...mockErrors, contactNumber: 'Invalid number' };
    render(
      <ContactSection 
        formData={mockFormData} 
        errors={errorsWithContactError} 
        onChange={mockOnChange} 
      />
    );
    const inputs = screen.getAllByPlaceholderText('Enter Your Contact Number');
    expect(inputs[0]).toHaveClass('border-red-500');
  });

  test('input field has default styling when no error exists', () => {
    render(
      <ContactSection 
        formData={mockFormData} 
        errors={mockErrors} 
        onChange={mockOnChange} 
      />
    );
    const inputs = screen.getAllByPlaceholderText('Enter Your Contact Number');
    expect(inputs[0]).toHaveClass('border-gray-300');
  });
});
