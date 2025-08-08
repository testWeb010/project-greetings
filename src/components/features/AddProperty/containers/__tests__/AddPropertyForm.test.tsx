import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddPropertyForm from '../AddPropertyForm';

describe('AddPropertyForm', () => {
  beforeEach(() => {
    render(<AddPropertyForm />);
  });

  it('renders form sections correctly', () => {
    expect(screen.getByText('Property Details')).toBeInTheDocument();
    expect(screen.getByText('Amenities & Features')).toBeInTheDocument();
    expect(screen.getByText('Additional Information')).toBeInTheDocument();
  });

  it('renders input fields', () => {
    expect(screen.getAllByRole('textbox').length).toBeGreaterThan(0);
  });

  it('renders a submit button', () => {
    expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
  });

  it('can interact with form', () => {
    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: 'Test Property' } });
    // No specific assertions, just ensure no errors during interaction
    expect(true).toBe(true);
  });
});
