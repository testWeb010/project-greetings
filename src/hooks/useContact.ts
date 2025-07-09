
import { useMutation } from './useApi';
import { contactService, ContactSubmission } from '../services/contactService';

export function useContactForm() {
  return useMutation<{ id: string }>(contactService.submitForm, {
    onSuccess: () => {
      console.log('Contact form submitted successfully');
    },
  });
}
