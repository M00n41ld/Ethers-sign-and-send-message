import { handleTimeout } from '../timeOut.js';

jest.useFakeTimers();

// Test suite for handleTimeout function
describe('handleTimeout function', () => {
  // Test case: should call callback function after 7000 milliseconds
  test('should call callback function after 7000 milliseconds', () => {
    // Mock callback function and setIsVisible function
    const mockCallback = jest.fn();
    const mockSetIsVisible = jest.fn();

    // Call handleTimeout function with mocked callback and setIsVisible functions
    handleTimeout(mockCallback, mockSetIsVisible);

    // Fast-forward time by 7000 milliseconds
    jest.advanceTimersByTime(7000);

    // Assert that the callback function was called once
    expect(mockCallback).toHaveBeenCalledTimes(1);

    // Assert that the setIsVisible function was called once
    expect(mockSetIsVisible).toHaveBeenCalledTimes(1);
    expect(mockSetIsVisible).toHaveBeenCalledWith(false);
  });

  // Test case: should not call callback function if cleared before timeout
  test('should not call callback function if cleared before timeout', () => {
    // Mock callback function and setIsVisible function
    const mockCallback = jest.fn();
    const mockSetIsVisible = jest.fn();

    // Call handleTimeout function with mocked callback and setIsVisible functions
    const timeoutId = handleTimeout(mockCallback, mockSetIsVisible);

    // Clear the timeout before it reaches 7000 milliseconds
    clearTimeout(timeoutId);

    // Clear all timers
    jest.clearAllTimers();

    // Assert that the callback function was not called
    expect(mockCallback).not.toHaveBeenCalled();

    // Assert that the setIsVisible function was not called
    expect(mockSetIsVisible).not.toHaveBeenCalled();
  });
});
