
import { api, ApiResponse } from './api';

export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const contactService = {
  // Submit contact form
  submitForm: async (data: ContactSubmission): Promise<ApiResponse<{ id: string }>> => {
    return api.post<{ id: string }>('/api/contact/submit', data);
  },

  // Get all contact submissions (admin only)
  getSubmissions: async (): Promise<ApiResponse<ContactSubmission[]>> => {
    return api.get<ContactSubmission[]>('/api/contact/submissions');
  },
};
