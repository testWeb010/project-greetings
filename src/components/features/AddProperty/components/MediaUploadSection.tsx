import React from 'react';
import { X } from 'lucide-react';
import { PropertyFormData } from '../types';

interface MediaUploadSectionProps {
  formData: PropertyFormData;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (index: number) => void;
  handleVideoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeVideo: () => void;
  disabled: boolean;
}

const MediaUploadSection: React.FC<MediaUploadSectionProps> = ({
  formData,
  handleImageUpload,
  removeImage,
  handleVideoUpload,
  removeVideo,
  disabled,
}) => {
  return (
    <div className="space-y-6 bg-gray-50 rounded-lg p-6 border border-gray-200 min-h-[400px]">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Media Upload</h2>
        <p className="text-sm text-gray-500 mb-4">Upload images and a video to showcase your property</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image Upload Section */}
        <div className="border-r-0 md:border-r border-gray-200 pr-0 md:pr-6 flex flex-col justify-between items-center">
          <div className="w-full text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Images (Max 5, 2MB each)</h3>
          </div>
          {/* Image Previews */}
          {formData.images.length > 0 && (
            <div className="mt-6 grid grid-cols-2 gap-4 w-full mb-auto">
              {formData.images.map((image, index) => (
                <div key={index} className="relative group border border-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Property ${index + 1}`}
                    className="w-full h-32 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="w-full text-center mt-auto pt-4">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              disabled={disabled}
              className="hidden"
              id="image-upload"
              data-testid="image-upload-input"
            />
            <label
              htmlFor="image-upload"
              className={`px-6 py-2 rounded-lg transition-colors cursor-pointer inline-block mb-6 ${
                disabled ? 'bg-gray-400 text-gray-600' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Choose Images
            </label>
          </div>
        </div>

        {/* Video Upload Section */}
        <div className="flex flex-col justify-between items-center">
          <div className="w-full text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Video (Max 1, 20MB)</h3>
          </div>
          {/* Video Preview */}
          {formData.video && (
            <div className="mt-6 w-full mb-auto">
              <div className="relative group">
                <video controls width="100%" className="rounded-lg h-32 object-cover">
                  <source src={URL.createObjectURL(formData.video)} type={formData.video.type} />
                  Your browser does not support the video tag.
                </video>
                <button
                  type="button"
                  onClick={() => removeVideo()}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
          <div className="w-full text-center mt-auto pt-4">
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoUpload}
              disabled={disabled}
              className="hidden"
              id="video-upload"
              data-testid="video-upload-input"
            />
            <label
              htmlFor="video-upload"
              className={`px-6 py-2 rounded-lg transition-colors cursor-pointer inline-block mb-6 ${
                disabled ? 'bg-gray-400 text-gray-600' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Choose Video
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaUploadSection;
