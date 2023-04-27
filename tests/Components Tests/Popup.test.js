import React from 'react';
import { render, screen } from '@testing-library/react';
import Popup from '../../components/Popup';

describe('Popup', () => {
  test('renders with an image when the media prop is an object with type "image"', () => {
    const media = 'https://example.com/image.jpg'
    render(<Popup media={media} />);
    const imageElement = screen.getByRole('img');
    expect(imageElement).toHaveAttribute('src', media.url);
  });

  test('renders a message when the media prop is an empty object', () => {
    const media = '';
    render(<Popup media={media} />);
    const messageElement = screen.getByText('Nothing to render');
    expect(messageElement).toBeInTheDocument();
  });
});
