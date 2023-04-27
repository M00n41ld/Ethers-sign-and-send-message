import { savePrizeToLocalStorage, getPrizesFromLocalStorage } from "../../components/storage/storage";

describe("savePrizeToLocalStorage", () => {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
      },
      writable: true,
    });
  });

  test("it should save a prize to local storage", () => {
    const address = "test_address";
    const prize = "Test Prize";
    const mockSetNotify = jest.fn();

    window.localStorage.getItem.mockReturnValueOnce(JSON.stringify([]));

    savePrizeToLocalStorage(prize, address, mockSetNotify);

    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      "test_address",
      JSON.stringify(["Test Prize"])
    );

    expect(mockSetNotify).not.toHaveBeenCalled();
  });

  test("it should handle errors and notify user", () => {
    const address = "test_address";
    const prize = "Test Prize";
    const mockSetNotify = jest.fn();
    const mockConsoleError = jest.spyOn(console, "error");

    window.localStorage.setItem.mockImplementationOnce(() => {
      throw new Error("Local storage error");
    });

    savePrizeToLocalStorage(prize, address, mockSetNotify);

    expect(mockSetNotify).toHaveBeenCalledWith("Error saving prizes");
    expect(mockConsoleError).toHaveBeenCalled();
  });
});

describe("getPrizesFromLocalStorage", () => {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
      },
      writable: true,
    });
  });

  test("returns an empty array when no prizes are stored in local storage", () => {
    const address = "test_address";

    window.localStorage.getItem.mockReturnValueOnce(undefined);

    const prizes = getPrizesFromLocalStorage(address);

    expect(prizes).toEqual([]);
  });

  test("returns an array of prizes when prizes are stored in local storage", () => {
    const address = "test_address";
    const prize = "Test Prize";

    window.localStorage.getItem.mockReturnValueOnce(JSON.stringify([prize]));

    const prizes = getPrizesFromLocalStorage(address);

    expect(prizes).toEqual([prize]);
  });
});
