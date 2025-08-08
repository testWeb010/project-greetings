import { useState } from 'react';
import { PropertyFormData } from '../types';

/**
 * Hook for managing property form data and submission
 */
export const useProperty = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [lastSubmission, setLastSubmission] = useState<number>(0);
  const RATE_LIMIT_MS = 10000; // 10 seconds rate limit between submissions

  const submitProperty = async (formData: PropertyFormData) => {
    const now = Date.now();
    if (now - lastSubmission < RATE_LIMIT_MS) {
      const errorMessage = new Error('Submission rate limit exceeded. Please wait a few seconds before trying again.');
      setError(errorMessage);
      throw errorMessage;
    }
    
    setIsLoading(true);
    setError(null);
    try {
      // This would be replaced with an actual API call using fetch or axios
      // For now, we'll simulate the API call
      console.log('Submitting property to API:', formData);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setLastSubmission(now);
      // Return simulated response
      return { success: true, data: { id: 'sim-' + Date.now().toString() } };
    } catch (err) {
      const errorMessage = err instanceof Error ? err : new Error('Failed to submit property');
      setError(errorMessage);
      throw errorMessage;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submitProperty,
    isLoading,
    error
  };
};
