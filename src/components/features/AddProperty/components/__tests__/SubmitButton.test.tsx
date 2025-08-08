import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import SubmitButton from '../SubmitButton';

describe('SubmitButton', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  test('renders submit button with correct text when not submitting', () => {
    render(<SubmitButton isSubmitting={false} />);
    expect(screen.getByText('Add Property')).toBeInTheDocument();
  });

  test('renders submit button with loading text and spinner when submitting', () => {
    render(<SubmitButton isSubmitting={true} />);
    expect(screen.getByText('Adding Property...')).toBeInTheDocument();
    // Check for the spinner element by its class
    expect(screen.getByTestId('spinner')).toHaveClass('animate-spin');
  });

  test('button is disabled when submitting', () => {
    render(<SubmitButton isSubmitting={true} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('button is enabled when not submitting', () => {
    render(<SubmitButton isSubmitting={false} />);
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  test('button has correct styling when submitting', () => {
    render(<SubmitButton isSubmitting={true} />);
    expect(screen.getByRole('button')).toHaveClass('bg-gray-400');
    expect(screen.getByRole('button')).toHaveClass('cursor-not-allowed');
  });

  test('button has correct styling when not submitting', () => {
    render(<SubmitButton isSubmitting={false} />);
    expect(screen.getByRole('button')).toHaveClass('bg-green-600');
    expect(screen.getByRole('button')).toHaveClass('hover:bg-green-700');
  });
});
