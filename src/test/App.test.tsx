import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from '../App';

// Mock LoadingSpinner component since we're lazy loading
vi.mock('../components/LoadingSpinner', () => ({
  default: () => <div data-testid="loading">Loading...</div>
}));

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <HelmetProvider>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </HelmetProvider>
  );
};

describe('App', () => {
  it('renders without crashing', () => {
    renderWithProviders(<App />);
    expect(screen.getByTestId('loading')).toBeDefined();
  });

  it('has correct document title', () => {
    renderWithProviders(<App />);
    expect(document.title).toContain('HomeDaze');
  });
});