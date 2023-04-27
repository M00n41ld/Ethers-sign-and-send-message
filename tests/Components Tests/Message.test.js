import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Message from '../../components/Message';
import styles from '../../styles/message.module.scss';

describe('Message component', () => {
  test('renders with text and is visible', () => {
    const messageText = 'Hello, world!';
    const { getByText, container } = render(<Message text={messageText} isVisible />);
    const messageElement = getByText(messageText);
    expect(messageElement).toBeInTheDocument();
    expect(container.firstChild).toHaveClass(styles.messageContainer);
    expect(container.firstChild).toHaveClass(styles.messageVisible);
  });

  test('renders with text and is not visible', () => {
    const messageText = 'Hello, world!';
    const { getByText, container } = render(<Message text={messageText} isVisible={false} />);
    const messageElement = getByText(messageText);
    expect(messageElement).toBeInTheDocument();
    expect(container.firstChild).toHaveClass(styles.messageContainer);
    expect(container.firstChild).not.toHaveClass(styles.messageVisible);
  });
});
