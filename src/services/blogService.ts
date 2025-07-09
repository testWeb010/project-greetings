
import { api, ApiResponse, PaginatedResponse } from './api';
import { BlogPost } from '../types';

export interface BlogSearchParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  featured?: boolean;
}

export const blogService = {
  // Get all blog posts with pagination and filters
  getPosts: async (params: BlogSearchParams = {}): Promise<ApiResponse<PaginatedResponse<BlogPost>>> => {
    return api.get<PaginatedResponse<BlogPost>>('/api/blog/posts', params);
  },

  // Get blog post by ID
  getPostById: async (id: string): Promise<ApiResponse<BlogPost>> => {
    return api.get<BlogPost>(`/api/blog/posts/${id}`);
  },

  // Get all categories
  getCategories: async (): Promise<ApiResponse<string[]>> => {
    return api.get<string[]>('/api/blog/categories');
  },

  // Create new blog post (admin only)
  createPost: async (data: Partial<BlogPost>): Promise<ApiResponse<BlogPost>> => {
    return api.post<BlogPost>('/api/blog/posts', data);
  },
};
