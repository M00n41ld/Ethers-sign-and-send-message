import { render, screen } from '@testing-library/react';
import Navigation from '../Navigation';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Navigation component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render link with text and href prop', () => {
    const href = '/about';
    const text = 'About';
    useRouter.mockImplementation(() => ({ asPath: '/' }));

    render(<Navigation href={href} text={text} />);

    const linkElement = screen.getByText(text);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', href);
  });

  it('should add "active" class to the link element when href matches the current route', () => {
    const href = '/about';
    const text = 'About';
    useRouter.mockImplementation(() => ({ asPath: href }));

    render(<Navigation href={href} text={text} />);

    const linkElement = screen.getByText(text);
    expect(linkElement).toHaveClass('active');
  });

  it('should not add "active" class to the link element when href does not match the current route', () => {
    const href = '/about';
    const text = 'About';
    useRouter.mockImplementation(() => ({ asPath: '/' }));

    render(<Navigation href={href} text={text} />);

    const linkElement = screen.getByText(text);
    expect(linkElement).not.toHaveClass('active');
  });
});
