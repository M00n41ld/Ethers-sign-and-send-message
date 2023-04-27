import React from 'react';
import { render, screen, act } from '@testing-library/react';
import PrizesList from '../PrizesList';

describe('PrizesList', () => {
  const prizes = [
    'https://example.com/prize1',
    'https://example.com/prize2',
  ];

  it('should render loading message', () => {
    render(<PrizesList prizes={prizes} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
