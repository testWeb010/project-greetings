import { api, ApiResponse, PaginatedResponse } from './api';
import { User } from '../types';

// User request/response types
export interface UserUpdateRequest {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: File;
  preferences?: {
    budget: { min: number; max: number };
    location: string[];
    propertyType: string[];
    genderPreference: string;
  };
}

export interface UserResponse extends User {
  _id: string;
}

export interface UserProfileResponse extends UserResponse {
  totalProperties: number;
  totalBookmarks: number;
  joinedDate: string;
  lastLogin: string;
  isOnline: boolean;
}

export interface UserStatsResponse {
  totalUsers: number;
  activeUsers: number;
  verifiedUsers: number;
  newUsersThisMonth: number;
}

export interface UserSearchParams {
  page?: number;
  limit?: number;
  verified?: boolean;
  membershipTier?: string;
  search?: string;
  sortBy?: 'name' | 'joinedDate' | 'lastLogin';
  sortOrder?: 'asc' | 'desc';
}

export interface NotificationResponse {
  id: string;
  type: 'property' | 'chat' | 'payment' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  data?: any;
}

export interface NotificationPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  propertyUpdates: boolean;
  chatMessages: boolean;
  paymentUpdates: boolean;
  marketingEmails: boolean;
}

// User API endpoints
export const userService = {
  // Get current user profile
  getCurrentUser: async (): Promise<ApiResponse<UserProfileResponse>> => {
    return api.get<UserProfileResponse>('/api/user/profile');
  },

  // Get user by ID
  getUserById: async (id: string): Promise<ApiResponse<UserResponse>> => {
    return api.get<UserResponse>(`/api/user/${id}`);
  },

  // Update user profile
  updateProfile: async (data: UserUpdateRequest): Promise<ApiResponse<UserResponse>> => {
    if (data.avatar) {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'avatar' && value instanceof File) {
          formData.append('avatar', value);
        } else if (typeof value === 'object') {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
      });
      return api.upload<UserResponse>('/api/user/profile', formData);
    } else {
      return api.put<UserResponse>('/api/user/profile', data);
    }
  },

  // Upload avatar
  uploadAvatar: async (file: File): Promise<ApiResponse<{ avatarUrl: string }>> => {
    const formData = new FormData();
    formData.append('avatar', file);
    return api.upload<{ avatarUrl: string }>('/api/user/avatar', formData);
  },

  // Delete user account
  deleteAccount: async (password: string): Promise<ApiResponse<{ message: string }>> => {
    return api.post<{ message: string }>('/api/user/account/delete', { password });
  },

  // Get user statistics
  getUserStats: async (): Promise<ApiResponse<UserStatsResponse>> => {
    return api.get<UserStatsResponse>('/api/user/stats');
  },

  // Search users (admin function)
  searchUsers: async (params: UserSearchParams = {}): Promise<ApiResponse<PaginatedResponse<UserResponse>>> => {
    return api.get<PaginatedResponse<UserResponse>>('/api/user/search', params);
  },

  // Get user's properties
  getUserProperties: async (userId?: string): Promise<ApiResponse<any[]>> => {
    const endpoint = userId ? `/api/user/${userId}/properties` : '/api/user/properties';
    return api.get<any[]>(endpoint);
  },

  // Get user's bookmarks
  getUserBookmarks: async (): Promise<ApiResponse<any[]>> => {
    return api.get<any[]>('/api/user/bookmarks');
  },

  // Get user's chat history
  getUserChats: async (): Promise<ApiResponse<any[]>> => {
    return api.get<any[]>('/api/user/chats');
  },

  // Get user notifications
  getNotifications: async (page: number = 1, limit: number = 20): Promise<ApiResponse<PaginatedResponse<NotificationResponse>>> => {
    return api.get<PaginatedResponse<NotificationResponse>>('/api/user/notifications', { page, limit });
  },

  // Mark notification as read
  markNotificationRead: async (notificationId: string): Promise<ApiResponse<{ message: string }>> => {
    return api.patch<{ message: string }>(`/api/user/notifications/${notificationId}/read`);
  },

  // Mark all notifications as read
  markAllNotificationsRead: async (): Promise<ApiResponse<{ message: string }>> => {
    return api.patch<{ message: string }>('/api/user/notifications/read-all');
  },

  // Delete notification
  deleteNotification: async (notificationId: string): Promise<ApiResponse<{ message: string }>> => {
    return api.delete<{ message: string }>(`/api/user/notifications/${notificationId}`);
  },

  // Get notification preferences
  getNotificationPreferences: async (): Promise<ApiResponse<NotificationPreferences>> => {
    return api.get<NotificationPreferences>('/api/user/preferences/notifications');
  },

  // Update notification preferences
  updateNotificationPreferences: async (preferences: Partial<NotificationPreferences>): Promise<ApiResponse<NotificationPreferences>> => {
    return api.put<NotificationPreferences>('/api/user/preferences/notifications', preferences);
  },

  // Verify user account
  verifyAccount: async (userId: string): Promise<ApiResponse<{ message: string }>> => {
    return api.post<{ message: string }>(`/api/user/${userId}/verify`);
  },

  // Block/Unblock user
  toggleUserBlock: async (userId: string, block: boolean): Promise<ApiResponse<{ message: string }>> => {
    return api.patch<{ message: string }>(`/api/user/${userId}/block`, { block });
  },

  // Report user
  reportUser: async (userId: string, reason: string, description?: string): Promise<ApiResponse<{ message: string }>> => {
    return api.post<{ message: string }>(`/api/user/${userId}/report`, { reason, description });
  },

  // Get user's reviews and ratings
  getUserReviews: async (userId: string, page: number = 1, limit: number = 10): Promise<ApiResponse<PaginatedResponse<any>>> => {
    return api.get<PaginatedResponse<any>>(`/api/user/${userId}/reviews`, { page, limit });
  },

  // Follow/Unfollow user
  toggleFollow: async (userId: string, follow: boolean): Promise<ApiResponse<{ message: string }>> => {
    return api.patch<{ message: string }>(`/api/user/${userId}/follow`, { follow });
  },

  // Get user's followers
  getUserFollowers: async (userId: string): Promise<ApiResponse<UserResponse[]>> => {
    return api.get<UserResponse[]>(`/api/user/${userId}/followers`);
  },

  // Get user's following
  getUserFollowing: async (userId: string): Promise<ApiResponse<UserResponse[]>> => {
    return api.get<UserResponse[]>(`/api/user/${userId}/following`);
  },

  // Request account verification
  requestVerification: async (documents: File[]): Promise<ApiResponse<{ message: string }>> => {
    const formData = new FormData();
    documents.forEach((file, index) => {
      formData.append(`document_${index}`, file);
    });
    return api.upload<{ message: string }>('/api/user/verification/request', formData);
  },

  // Get user's payment history
  getPaymentHistory: async (page: number = 1, limit: number = 10): Promise<ApiResponse<PaginatedResponse<any>>> => {
    return api.get<PaginatedResponse<any>>('/api/user/payments', { page, limit });
  },

  // Update user activity status
  updateActivityStatus: async (isOnline: boolean): Promise<ApiResponse<{ message: string }>> => {
    return api.patch<{ message: string }>('/api/user/activity', { isOnline });
  },

  // Get user's dashboard data
  getDashboardData: async (): Promise<ApiResponse<any>> => {
    return api.get<any>('/api/user/dashboard');
  },
};