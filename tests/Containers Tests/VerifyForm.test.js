import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignContext from '../../components/helpers/SignContext';
import VerifyForm from '../../components/containers/VerifyForm';

describe('VerifyForm', () => {
    it('renders VerifyForm component', () => {
      const signer = jest.fn();
      const { getByText } = render(
        <SignContext.Provider value={{ signInfo: {}, setSignInfo: () => {} }}>
          <VerifyForm signer={signer} />
        </SignContext.Provider>
      );
      expect(getByText(/verify form:/i)).toBeInTheDocument();
    });
  
    it('handles user input', () => {
      const signer = jest.fn();
      const { getByPlaceholderText } = render(
        <SignContext.Provider value={{ signInfo: {}, setSignInfo: () => {} }}>
          <VerifyForm signer={signer} />
        </SignContext.Provider>
      );
      const messageInput = getByPlaceholderText(/type the message/i);
      const addressInput = getByPlaceholderText(/type the address/i);
      const signatureInput = getByPlaceholderText(/type the signature/i);
      fireEvent.change(messageInput, { target: { value: 'test message' } });
      fireEvent.change(addressInput, { target: { value: 'test address' } });
      fireEvent.change(signatureInput, { target: { value: 'test signature' } });
      expect(messageInput.value).toBe('test message');
      expect(addressInput.value).toBe('test address');
      expect(signatureInput.value).toBe('test signature');
    });
  });