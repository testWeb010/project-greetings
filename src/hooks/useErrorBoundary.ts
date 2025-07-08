import { useCallback } from 'react';
import { useErrorBoundary } from 'react-error-boundary';

interface ErrorInfo {
  message: string;
  stack?: string;
  componentStack?: string;
  errorBoundary?: string;
}

export const useErrorHandler = () => {
  const { showBoundary } = useErrorBoundary();

  const handleError = useCallback((error: Error, errorInfo?: ErrorInfo) => {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error);
      console.error('Error info:', errorInfo);
    }

    // Send error to monitoring service (e.g., Sentry)
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error, { extra: errorInfo });
    }

    // Show error boundary
    showBoundary(error);
  }, [showBoundary]);

  const handleAsyncError = useCallback((error: Error) => {
    // Handle async errors that might not be caught by error boundaries
    setTimeout(() => {
      throw error;
    });
  }, []);

  return {
    handleError,
    handleAsyncError
  };
};