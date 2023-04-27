import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input from '../../components/Input';

describe('Input', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText } = render(
      <Input placeholder="Type here" required={true} id="input" onChange={() => {}} text="test" />
    );

    expect(getByPlaceholderText('Type here')).toBeInTheDocument();
    expect(getByPlaceholderText('Type here')).toHaveAttribute('required');
    expect(getByPlaceholderText('Type here')).toHaveAttribute('id', 'input');
    expect(getByPlaceholderText('Type here')).toHaveValue('test');
  });

  it('calls onChange handler when text is changed', () => {
    const handleChange = jest.fn();
    const { getByPlaceholderText } = render(
      <Input placeholder="Type here" required={true} id="input" onChange={handleChange} text="test" />
    );

    fireEvent.change(getByPlaceholderText('Type here'), { target: { value: 'new text' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
