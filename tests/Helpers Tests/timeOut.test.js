import { handleTimeout } from "../../components/helpers/timeOut.js";

jest.useFakeTimers();

describe("handleTimeout function", () => {
  test("should call callback function after 7000 milliseconds", () => {
    const mockCallback = jest.fn();
    const mockSetIsVisible = jest.fn();

    handleTimeout(mockCallback, mockSetIsVisible);

    jest.advanceTimersByTime(7000);

    expect(mockCallback).toHaveBeenCalledTimes(1);

    expect(mockSetIsVisible).toHaveBeenCalledTimes(1);
    expect(mockSetIsVisible).toHaveBeenCalledWith(false);
  });

  test("should not call callback function if cleared before timeout", () => {
    const mockCallback = jest.fn();
    const mockSetIsVisible = jest.fn();

    const timeoutId = handleTimeout(mockCallback, mockSetIsVisible);

    clearTimeout(timeoutId);

    jest.clearAllTimers();

    expect(mockCallback).not.toHaveBeenCalled();

    expect(mockSetIsVisible).not.toHaveBeenCalled();
  });
});
