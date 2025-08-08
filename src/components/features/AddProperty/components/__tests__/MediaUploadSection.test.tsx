import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MediaUploadSection from '../MediaUploadSection';
import { PropertyFormData } from '../../types';

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
  location: '',
  images: [],
  availableFrom: '',
  preferredGender: 'Any',
  rules: [],
  nearbyPlaces: [],
  video: null
};

const mockHandleImageUpload = jest.fn();
const mockRemoveImage = jest.fn();
const mockHandleVideoUpload = jest.fn();
const mockRemoveVideo = jest.fn();

describe('MediaUploadSection', () => {
  let container: HTMLElement;
  beforeEach(() => {
    const result = render(
      <MediaUploadSection
        formData={mockFormData}
        handleImageUpload={mockHandleImageUpload}
        removeImage={mockRemoveImage}
        handleVideoUpload={mockHandleVideoUpload}
        removeVideo={mockRemoveVideo}
        disabled={false}
      />
    );
    container = result.container;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders Media Upload section with title and description', () => {
    expect(screen.getByText('Media Upload')).toBeInTheDocument();
    expect(screen.getByText('Upload images and a video to showcase your property')).toBeInTheDocument();
  });

  test('renders image and video upload sections with buttons', () => {
    expect(screen.getByText('Images (Max 5, 2MB each)')).toBeInTheDocument();
    expect(screen.getByText('Video (Max 1, 20MB)')).toBeInTheDocument();
    expect(screen.getByText('Choose Images')).toBeInTheDocument();
    expect(screen.getByText('Choose Video')).toBeInTheDocument();
  });

  test('calls handleImageUpload when image file is selected', () => {
    const imageInput = container.querySelector('input[id="image-upload"]') as HTMLInputElement;
    fireEvent.change(imageInput, { target: { files: [new File([''], 'test-image.jpg', { type: 'image/jpeg' })] } });
    expect(mockHandleImageUpload).toHaveBeenCalled();
  });

  test('calls handleVideoUpload when video file is selected', () => {
    const videoInput = container.querySelector('input[id="video-upload"]') as HTMLInputElement;
    fireEvent.change(videoInput, { target: { files: [new File([''], 'test-video.mp4', { type: 'video/mp4' })] } });
    expect(mockHandleVideoUpload).toHaveBeenCalled();
  });

  test('disables upload buttons when disabled prop is true', () => {
    const result = render(
      <MediaUploadSection
        formData={mockFormData}
        handleImageUpload={mockHandleImageUpload}
        removeImage={mockRemoveImage}
        handleVideoUpload={mockHandleVideoUpload}
        removeVideo={mockRemoveVideo}
        disabled={true}
      />
    );
    const disableContainer = result.container;
    const imageInput = disableContainer.querySelector('input[id="image-upload"]') as HTMLInputElement;
    const videoInput = disableContainer.querySelector('input[id="video-upload"]') as HTMLInputElement;
    expect(imageInput).toBeDisabled();
    expect(videoInput).toBeDisabled();
  });
});
