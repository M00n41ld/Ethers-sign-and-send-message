import { render, screen } from '@testing-library/react';
import { Connector } from '../Connector';

jest.mock('@web3modal/react', () => ({
  Web3Button: () => <button>Mock Web3Button</button>,
}));

jest.mock('wagmi', () => ({
  useAccount: () => ({
    isConnected: false,
  }),
}));

describe('Connector component', () => {
  it('renders correctly when not connected', () => {
    render(<Connector />);
    expect(screen.getByText('First Connect your wallet')).toBeInTheDocument();
    expect(screen.getByText('Mock Web3Button')).toBeInTheDocument();
  });

  it('renders correctly when connected', () => {
    jest.mock('wagmi', () => ({
      useAccount: () => ({
        isConnected: true,
      }),
    }));
    render(<Connector />);
    expect(screen.getByText('Successfully connected!')).toBeInTheDocument();
    expect(screen.queryByText('First Connect your wallet')).not.toBeInTheDocument();
    expect(screen.getByText('Mock Web3Button')).toBeInTheDocument();
  });
});
