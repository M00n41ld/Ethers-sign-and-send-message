import verify from "../../components/helpers/Verify.js";
import { ethers } from "ethers";

describe("verify function", () => {
  let setNotify;

  beforeEach(() => {
    setNotify = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return true and set valid notification for valid signature", async () => {
    const message =
      "0xe8c45c1325a4bf29e8a8b684be26754ec3f2c7489ed3345b34ffbdbc00a8b23e";
    const address = "0x1B12784e8D035a36cA8f31e86B7143b190f37A70";
    const signature =
      "0x6ebdab30608cb0da7aaf8fdb5f1261c46c8d354ba10e76509286d370493858d14bb897d579b80bb29b4da22a617b2e0e8434e0e70cdbbd9f28573992a981c8101c";
    const result = await verify({ message, address, signature, setNotify });

    expect(result).toBe(true);
    expect(setNotify).toHaveBeenCalledWith("Signature is valid");
  });

  it("should return false and set invalid notification for invalid signature", async () => {
    const message = "Test message";
    const address = "0x1B12784e8D035a36cA8f31e86B7143b190f37A70";
    const signature =
      "0x6ebdab30608cb0da7aaf8fdb5f1261c46c8d354ba10e76509286d370493858d14bb897d579b80bb29b4da22a617b2e0e8434e0e70cdbbd9f28573992a981c8101";

    const result = await verify({ message, address, signature, setNotify });

    expect(result).toBe(false);
    expect(setNotify).toHaveBeenCalledWith("Something wrong with signature");
  });

  it("should return false and set error notification for error during verification", async () => {
    const message = "Test message";
    const address = "0x1B12784e8D035a36cA8f31e86B7143b190f37A70";
    const signature =
      "0x6ebdab30608cb0da7aaf8fdb5f1261c46c8d354ba10e76509286d370493858d14bb897d579b80bb29b4da22a617b2e0e8434e0e70cdbbd9f28573992a981c8101";
    const error = new Error("Verification error");

    jest.spyOn(ethers.utils, "verifyMessage").mockImplementationOnce(() => {
      throw error;
    });

    const result = await verify({ message, address, signature, setNotify });

    expect(result).toBe(false);
    expect(setNotify).toHaveBeenCalledWith("Something wrong with signature");
  });
});
