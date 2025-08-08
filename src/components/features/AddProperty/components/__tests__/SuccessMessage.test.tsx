import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import SuccessMessage from '../SuccessMessage';

const mockOnListAnother = jest.fn();

describe('SuccessMessage', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  test('renders success message heading', () => {
    render(<SuccessMessage onListAnother={mockOnListAnother} />);
    expect(screen.getByText('Property Listed Successfully!')).toBeInTheDocument();
  });

  test('renders success message description', () => {
    render(<SuccessMessage onListAnother={mockOnListAnother} />);
    expect(screen.getByText(/Your property has been submitted for review/)).toBeInTheDocument();
  });

  test('renders list another property button', () => {
    render(<SuccessMessage onListAnother={mockOnListAnother} />);
    expect(screen.getByText('List Another Property')).toBeInTheDocument();
  });

  test('calls onListAnother when button is clicked', () => {
    render(<SuccessMessage onListAnother={mockOnListAnother} />);
    const button = screen.getByText('List Another Property');
    fireEvent.click(button);
    expect(mockOnListAnother).toHaveBeenCalled();
  });

  test('has correct styling for the container', () => {
    render(<SuccessMessage onListAnother={mockOnListAnother} />);
    const container = screen.getByText('Property Listed Successfully!').parentElement;
    expect(container).toHaveClass('bg-white');
    expect(container).toHaveClass('rounded-lg');
    expect(container).toHaveClass('shadow-lg');
  });

  test('button has correct styling', () => {
    render(<SuccessMessage onListAnother={mockOnListAnother} />);
    const button = screen.getByText('List Another Property');
    expect(button).toHaveClass('bg-blue-600');
    expect(button).toHaveClass('text-white');
    expect(button).toHaveClass('hover:bg-blue-700');
  });
});
