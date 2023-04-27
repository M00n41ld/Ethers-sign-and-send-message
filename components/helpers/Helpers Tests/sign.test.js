import { sign } from "../sign.js";

jest.useFakeTimers();

describe("sign function", () => {
  let setNotify;
  let setIsNotifyVisible;
  let signer;

  beforeEach(() => {
    setNotify = jest.fn();
    setIsNotifyVisible = jest.fn();
    signer = {
      getAddress: jest.fn(),
      signMessage: jest.fn(),
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllTimers();
  });

  it("should return the correct result when signing is successful", async () => {
    const message = "привет";
    // const hashedMessage = "0xe8c45c1325a4bf29e8a8b684be26754ec3f2c7489ed3345b34ffbdbc00a8b23e";
    const signature = "0x6ebdab30608cb0da7aaf8fdb5f1261c46c8d354ba10e76509286d370493858d14bb897d579b80bb29b4da22a617b2e0e8434e0e70cdbbd9f28573992a981c8101c";

    signer.getAddress.mockResolvedValueOnce("0x1B12784e8D035a36cA8f31e86B7143b190f37A70");
    signer.signMessage.mockResolvedValueOnce(signature);

    const result = await sign({
      message,
      setNotify,
      setIsNotifyVisible,
      signer,
    });

    expect(result).toEqual({
      message,
      address: "0x1B12784e8D035a36cA8f31e86B7143b190f37A70",
      signature,
    });
    expect(signer.getAddress).toHaveBeenCalled();
    expect(signer.signMessage).toHaveBeenCalled();
    expect(setNotify).not.toHaveBeenCalled();
    expect(setIsNotifyVisible).not.toHaveBeenCalled();
  });

  it("should handle errors and show notification when signing fails", async () => {
    const message = "Test message";
    const error = new Error("Signing error");
    signer.getAddress.mockResolvedValueOnce("0x1B12784e8D035a36cA8f31e86B7143b190f37A70");
    signer.signMessage.mockRejectedValueOnce(error);

    await sign({
      message,
      setNotify,
      setIsNotifyVisible,
      signer,
    });

    expect(signer.getAddress).toHaveBeenCalled();
    expect(signer.signMessage).toHaveBeenCalled();
    expect(setNotify).toHaveBeenCalledWith("Error in signing");
    expect(setIsNotifyVisible).toHaveBeenCalledWith(true);
    jest.runAllTimers();
  });
});
