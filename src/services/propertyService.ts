import { api, ApiResponse, PaginatedResponse } from './api';
import { Property, FeaturedProperty, PropertyFormData, SearchFilters } from '../types';

// Property request/response types
export interface PropertySearchParams {
  page?: number;
  limit?: number;
  city?: string;
  propertyType?: string;
  genderPreference?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: string;
  amenities?: string[];
  availableFrom?: string;
  sortBy?: 'price' | 'date' | 'rating' | 'popularity';
  sortOrder?: 'asc' | 'desc';
}

export interface PropertyResponse extends Property {
  _id: string;
}

export interface PropertyStatsResponse {
  totalProperties: number;
  activeProperties: number;
  featuredProperties: number;
  verifiedProperties: number;
  totalViews: number;
  averageRating: number;
}

export interface PropertyActivationRequest {
  postId: string;
  activate: boolean;
}

export interface PropertyMediaUpload {
  postId: string;
  images: File[];
}

// Property API endpoints
export const propertyService = {
  // Get all properties with pagination and filters
  getProperties: async (params: PropertySearchParams = {}): Promise<ApiResponse<PaginatedResponse<PropertyResponse>>> => {
    return api.get<PaginatedResponse<PropertyResponse>>('/api/properties', params);
  },

  // Get property by ID
  getPropertyById: async (id: string): Promise<ApiResponse<PropertyResponse>> => {
    return api.get<PropertyResponse>(`/api/properties/${id}`);
  },

  // Get featured properties
  getFeaturedProperties: async (limit: number = 6): Promise<ApiResponse<FeaturedProperty[]>> => {
    return api.get<FeaturedProperty[]>('/api/properties/featured', { limit });
  },

  // Get popular properties
  getPopularProperties: async (limit: number = 10): Promise<ApiResponse<PropertyResponse[]>> => {
    return api.get<PropertyResponse[]>('/api/properties/popular', { limit });
  },

  // Get properties by location
  getPropertiesByLocation: async (city: string, params: PropertySearchParams = {}): Promise<ApiResponse<PaginatedResponse<PropertyResponse>>> => {
    return api.get<PaginatedResponse<PropertyResponse>>(`/api/properties/location/${city}`, params);
  },

  // Get properties by user
  getUserProperties: async (userId: string): Promise<ApiResponse<PropertyResponse[]>> => {
    return api.get<PropertyResponse[]>(`/api/properties/user/${userId}`);
  },

  // Create new property
  createProperty: async (data: PropertyFormData): Promise<ApiResponse<PropertyResponse>> => {
    const formData = new FormData();
    
    // Add property data
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'images') {
        // Handle file uploads
        (value as File[]).forEach((file) => {
          formData.append('images', file);
        });
      } else if (typeof value === 'object') {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, String(value));
      }
    });

    return api.upload<PropertyResponse>('/api/properties', formData);
  },

  // Update property
  updateProperty: async (id: string, data: Partial<PropertyFormData>): Promise<ApiResponse<PropertyResponse>> => {
    return api.put<PropertyResponse>(`/api/properties/${id}`, data);
  },

  // Delete property
  deleteProperty: async (id: string): Promise<ApiResponse<{ message: string }>> => {
    return api.delete<{ message: string }>(`/api/properties/${id}`);
  },

  // Activate/Deactivate property
  togglePropertyStatus: async (id: string, activate: boolean): Promise<ApiResponse<{ message: string }>> => {
    return api.patch<{ message: string }>(`/api/properties/${id}/status`, { activate });
  },

  // Upload additional media to property
  uploadPropertyMedia: async (id: string, images: File[]): Promise<ApiResponse<{ urls: string[] }>> => {
    const formData = new FormData();
    images.forEach((file) => {
      formData.append('images', file);
    });

    return api.upload<{ urls: string[] }>(`/api/properties/${id}/media`, formData);
  },

  // Get unique cities
  getUniqueCities: async (): Promise<ApiResponse<string[]>> => {
    return api.get<string[]>('/api/properties/cities');
  },

  // Search properties with advanced filters
  searchProperties: async (filters: SearchFilters & PropertySearchParams): Promise<ApiResponse<PaginatedResponse<PropertyResponse>>> => {
    return api.post<PaginatedResponse<PropertyResponse>>('/api/properties/search', filters);
  },

  // Get property statistics
  getPropertyStats: async (): Promise<ApiResponse<PropertyStatsResponse>> => {
    return api.get<PropertyStatsResponse>('/api/properties/stats');
  },

  // Get properties near location (with coordinates)
  getPropertiesNearby: async (lat: number, lng: number, radius: number = 5): Promise<ApiResponse<PropertyResponse[]>> => {
    return api.get<PropertyResponse[]>('/api/properties/nearby', { lat, lng, radius });
  },

  // Report property
  reportProperty: async (id: string, reason: string, description?: string): Promise<ApiResponse<{ message: string }>> => {
    return api.post<{ message: string }>(`/api/properties/${id}/report`, { reason, description });
  },

  // Bookmark property
  bookmarkProperty: async (id: string): Promise<ApiResponse<{ message: string }>> => {
    return api.post<{ message: string }>(`/api/properties/${id}/bookmark`);
  },

  // Remove bookmark
  removeBookmark: async (id: string): Promise<ApiResponse<{ message: string }>> => {
    return api.delete<{ message: string }>(`/api/properties/${id}/bookmark`);
  },

  // Get user bookmarks
  getUserBookmarks: async (): Promise<ApiResponse<PropertyResponse[]>> => {
    return api.get<PropertyResponse[]>('/api/properties/bookmarks');
  },

  // Contact property owner
  contactOwner: async (propertyId: string, message: string): Promise<ApiResponse<{ message: string }>> => {
    return api.post<{ message: string }>(`/api/properties/${propertyId}/contact`, { message });
  },

  // Schedule property visit
  scheduleVisit: async (propertyId: string, date: string, time: string, message?: string): Promise<ApiResponse<{ message: string }>> => {
    return api.post<{ message: string }>(`/api/properties/${propertyId}/visit`, { date, time, message });
  },

  // Rate property
  rateProperty: async (id: string, rating: number, review?: string): Promise<ApiResponse<{ message: string }>> => {
    return api.post<{ message: string }>(`/api/properties/${id}/rate`, { rating, review });
  },

  // Get property reviews
  getPropertyReviews: async (id: string, page: number = 1, limit: number = 10): Promise<ApiResponse<PaginatedResponse<any>>> => {
    return api.get<PaginatedResponse<any>>(`/api/properties/${id}/reviews`, { page, limit });
  },

  // Get similar properties
  getSimilarProperties: async (id: string, limit: number = 5): Promise<ApiResponse<PropertyResponse[]>> => {
    return api.get<PropertyResponse[]>(`/api/properties/${id}/similar`, { limit });
  },

  // Increment property views
  incrementViews: async (id: string): Promise<ApiResponse<{ views: number }>> => {
    return api.post<{ views: number }>(`/api/properties/${id}/view`);
  },
};