import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import DescriptionSection from '../DescriptionSection';
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

describe('DescriptionSection', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  test('renders description textarea field', () => {
    render(
      <DescriptionSection 
        formData={mockFormData} 
        errors={mockErrors} 
        onChange={mockOnChange} 
      />
    );
    expect(screen.getByPlaceholderText('Tell us more about your property...')).toBeInTheDocument();
  });

  test('displays description label', () => {
    render(
      <DescriptionSection 
        formData={mockFormData} 
        errors={mockErrors} 
        onChange={mockOnChange} 
      />
    );
    expect(screen.getByText('Description *')).toBeInTheDocument();
  });

  test('calls onChange when description input changes', () => {
    render(
      <DescriptionSection 
        formData={mockFormData} 
        errors={mockErrors} 
        onChange={mockOnChange} 
      />
    );
    const textarea = screen.getByPlaceholderText('Tell us more about your property...');
    fireEvent.change(textarea, { target: { value: 'This is a great property.' } });
    expect(mockOnChange).toHaveBeenCalled();
  });

  test('displays error message when description error exists', () => {
    const errorMessage = 'Description is required';
    const errorsWithDescriptionError = { ...mockErrors, description: errorMessage };
    render(
      <DescriptionSection 
        formData={mockFormData} 
        errors={errorsWithDescriptionError} 
        onChange={mockOnChange} 
      />
    );
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('textarea has error styling when error exists', () => {
    const errorsWithDescriptionError = { ...mockErrors, description: 'Invalid description' };
    render(
      <DescriptionSection 
        formData={mockFormData} 
        errors={errorsWithDescriptionError} 
        onChange={mockOnChange} 
      />
    );
    const textarea = screen.getByPlaceholderText('Tell us more about your property...');
    expect(textarea).toHaveClass('border-red-500');
  });

  test('textarea has default styling when no error exists', () => {
    render(
      <DescriptionSection 
        formData={mockFormData} 
        errors={mockErrors} 
        onChange={mockOnChange} 
      />
    );
    const textarea = screen.getByPlaceholderText('Tell us more about your property...');
    expect(textarea).toHaveClass('border-gray-300');
  });

  test('displays character count', () => {
    render(
      <DescriptionSection 
        formData={mockFormData} 
        errors={mockErrors} 
        onChange={mockOnChange} 
      />
    );
    expect(screen.getByText('0/500 characters')).toBeInTheDocument();
  });

  test('updates character count when description changes', () => {
    const updatedFormData = { ...mockFormData, description: 'Test description' };
    render(
      <DescriptionSection 
        formData={updatedFormData} 
        errors={mockErrors} 
        onChange={mockOnChange} 
      />
    );
    expect(screen.getByText('16/500 characters')).toBeInTheDocument();
  });
});
