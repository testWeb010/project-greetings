import React, { createContext, useState, useContext } from 'react';
import { PropertyFormData, PropertyFormErrors } from '../types';

interface PropertyFormContextProps {
  formData: PropertyFormData;
  setFormData: React.Dispatch<React.SetStateAction<PropertyFormData>>;
  errors: PropertyFormErrors;
  setErrors: React.Dispatch<React.SetStateAction<PropertyFormErrors>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (index: number) => void;
  handleVideoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeVideo: () => void;
}

const PropertyFormContext = createContext<PropertyFormContextProps | undefined>(undefined);

interface PropertyFormProviderProps {
  children: React.ReactNode;
  initialFormData: PropertyFormData;
}

export const PropertyFormProvider: React.FC<PropertyFormProviderProps> = ({
  children,
  initialFormData,
}) => {
  const [formData, setFormData] = useState<PropertyFormData>(initialFormData);
  const [errors, setErrors] = useState<PropertyFormErrors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name as keyof PropertyFormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, video: file }));
  };

  const removeVideo = () => {
    setFormData(prev => ({ ...prev, video: null }));
  };

  const value: PropertyFormContextProps = {
    formData,
    setFormData,
    errors,
    setErrors,
    handleChange,
    handleImageUpload,
    removeImage,
    handleVideoUpload,
    removeVideo,
  };

  return (
    <PropertyFormContext.Provider value={value}>
      {children}
    </PropertyFormContext.Provider>
  );
};

export const usePropertyForm = () => {
  const context = useContext(PropertyFormContext);
  if (!context) {
    throw new Error('usePropertyForm must be used within a PropertyFormProvider');
  }
  return context;
};
