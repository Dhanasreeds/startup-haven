import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegistrationPortal from './RegistrationPortal';

// Mock the useToast hook
jest.mock('@/components/ui/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}));

describe('RegistrationPortal', () => {
  test('renders all steps and progresses through them', async () => {
    render(<RegistrationPortal />);

    // Step 1
    expect(screen.getByText('AYUSH Startup Registration - Step 1 of 3')).toBeInTheDocument();
    await userEvent.type(screen.getByPlaceholderText('Company Name'), 'Test Company');
    await userEvent.type(screen.getByPlaceholderText('Business Email'), 'test@example.com');
    await userEvent.type(screen.getByPlaceholderText('Phone Number'), '1234567890');
    fireEvent.click(screen.getByText('Next'));

    // Step 2
    await waitFor(() => {
      expect(screen.getByText('AYUSH Startup Registration - Step 2 of 3')).toBeInTheDocument();
    });
    await userEvent.type(screen.getByPlaceholderText('AYUSH Category'), 'Ayurveda');
    await userEvent.type(screen.getByPlaceholderText('Number of Employees'), '10');
    await userEvent.type(screen.getByPlaceholderText('Business Registration Number'), 'REG123456');
    fireEvent.click(screen.getByText('Next'));

    // Step 3
    await waitFor(() => {
      expect(screen.getByText('AYUSH Startup Registration - Step 3 of 3')).toBeInTheDocument();
    });
    const file = new File(['dummy content'], 'test.pdf', { type: 'application/pdf' });
    await userEvent.upload(screen.getByLabelText(/Upload your business plan/), file);
    await userEvent.upload(screen.getByLabelText(/Upload your AYUSH certification/), file);
    
    fireEvent.click(screen.getByText('Submit'));

    // Check if the submission was successful
    await waitFor(() => {
      expect(screen.getByText('Registration Submitted')).toBeInTheDocument();
    });
  });

  test('displays error messages for invalid inputs', async () => {
    render(<RegistrationPortal />);

    fireEvent.click(screen.getByText('Next'));

    await waitFor(() => {
      expect(screen.getByText('Company Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Phone Number is required')).toBeInTheDocument();
    });
  });

  test('validates file uploads', async () => {
    render(<RegistrationPortal />);

    // Navigate to step 3
    await userEvent.type(screen.getByPlaceholderText('Company Name'), 'Test Company');
    await userEvent.type(screen.getByPlaceholderText('Business Email'), 'test@example.com');
    await userEvent.type(screen.getByPlaceholderText('Phone Number'), '1234567890');
    fireEvent.click(screen.getByText('Next'));
    await userEvent.type(screen.getByPlaceholderText('AYUSH Category'), 'Ayurveda');
    await userEvent.type(screen.getByPlaceholderText('Number of Employees'), '10');
    await userEvent.type(screen.getByPlaceholderText('Business Registration Number'), 'REG123456');
    fireEvent.click(screen.getByText('Next'));

    // Try to submit without uploading files
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText('Business Plan is required')).toBeInTheDocument();
      expect(screen.getByText('AYUSH Certification is required')).toBeInTheDocument();
    });

    // Upload an invalid file type
    const invalidFile = new File(['dummy content'], 'test.txt', { type: 'text/plain' });
    await userEvent.upload(screen.getByLabelText(/Upload your business plan/), invalidFile);

    await waitFor(() => {
      expect(screen.getByText('Invalid file format. Please upload a application/pdf or application/msword or application/vnd.openxmlformats-officedocument.wordprocessingml.document file.')).toBeInTheDocument();
    });
  });
});