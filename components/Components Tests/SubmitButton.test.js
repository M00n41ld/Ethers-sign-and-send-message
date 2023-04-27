import React from 'react';
import { render, screen } from '@testing-library/react';
import SubmitButton from '../SubmitButton';

describe('SubmitButton', () => {
  it('renders with text and without disabled prop', () => {
    const mockOnClick = jest.fn();
    const buttonText = 'Submit';
    render(<SubmitButton onClick={mockOnClick} text={buttonText} />);
    const buttonElement = screen.getByRole('button', { name: buttonText });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toBeEnabled();
  });

  it('renders with disabled prop', () => {
    const mockOnClick = jest.fn();
    const buttonText = 'Submit';
    render(<SubmitButton onClick={mockOnClick} text={buttonText} disabled />);
    const buttonElement = screen.getByRole('button', { name: buttonText });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toBeDisabled();
  });

  it('renders with type prop', () => {
    const mockOnClick = jest.fn();
    const buttonText = 'Submit';
    const buttonType = 'submit';
    render(<SubmitButton onClick={mockOnClick} text={buttonText} type={buttonType} />);
    const buttonElement = screen.getByRole('button', { name: buttonText });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement.type).toBe(buttonType);
  });
});
