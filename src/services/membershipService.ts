
import { api, ApiResponse } from './api';

export interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
}

export interface UserMembership {
  id: string;
  userId: string;
  planId: string;
  status: string;
  startDate: string;
  endDate?: string;
}

export const membershipService = {
  // Get all membership plans
  getPlans: async (): Promise<ApiResponse<MembershipPlan[]>> => {
    return api.get<MembershipPlan[]>('/api/membership/plans');
  },

  // Get user membership
  getUserMembership: async (userId: string): Promise<ApiResponse<UserMembership>> => {
    return api.get<UserMembership>(`/api/membership/user/${userId}`);
  },

  // Subscribe to membership plan
  subscribe: async (planId: string, paymentMethodId: string): Promise<ApiResponse<UserMembership>> => {
    return api.post<UserMembership>('/api/membership/subscribe', { planId, paymentMethodId });
  },
};
