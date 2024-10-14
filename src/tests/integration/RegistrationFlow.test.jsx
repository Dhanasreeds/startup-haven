import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from '../../App';

jest.mock('@/components/ui/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}));

describe('Registration Flow', () => {
  test('completes registration process and navigates to dashboard', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Navigate to registration page
    fireEvent.click(screen.getByText('Get Started'));

    // Fill out registration form
    await userEvent.type(screen.getByPlaceholderText('Company Name'), 'Test Company');
    await userEvent.type(screen.getByPlaceholderText('Business Email'), 'test@example.com');
    await userEvent.type(screen.getByPlaceholderText('Phone Number'), '1234567890');
    fireEvent.click(screen.getByText('Next'));

    await userEvent.type(screen.getByPlaceholderText('AYUSH Category'), 'Ayurveda');
    await userEvent.type(screen.getByPlaceholderText('Number of Employees'), '10');
    await userEvent.type(screen.getByPlaceholderText('Business Registration Number'), 'REG123456');
    fireEvent.click(screen.getByText('Next'));

    const file = new File(['dummy content'], 'test.pdf', { type: 'application/pdf' });
    await userEvent.upload(screen.getByLabelText(/Upload your business plan/), file);
    await userEvent.upload(screen.getByLabelText(/Upload your AYUSH certification/), file);
    
    fireEvent.click(screen.getByText('Submit'));

    // Check if registration was successful and user is redirected to dashboard
    await waitFor(() => {
      expect(screen.getByText('Welcome to Your Dashboard')).toBeInTheDocument();
    });

    // Check if uploaded documents are displayed in the dashboard
    expect(screen.getByText('Uploaded Documents')).toBeInTheDocument();
    expect(screen.getByText('test.pdf')).toBeInTheDocument();
  });
});