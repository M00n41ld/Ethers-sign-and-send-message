import { sendToContract } from "../sendToContract"

test("sendToContract sets prize if response is true", async () => {

  const form = {
    signature: "0xb7eb667155a31a4add720c1ecd8781d0f8e4161940af630d08062ce03f9880a47dc78f87c87e3abc42b68fe486ddf3eac0f169e523317b06d434ba481bd70fde1c",
    message: "привет",
    address: "0x1B12784e8D035a36cA8f31e86B7143b190f37A70",
  };
  const prizeResponse = "prizeResponse";
  const signer = "signer";
  const setPrize = jest.fn();
  const setNotify = jest.fn();
  const contractMock = {
    verify: jest.fn().mockResolvedValue(true),
    getPrize: jest.fn().mockResolvedValue(prizeResponse),
  };
  const ethersMock = {
    Contract: jest.fn().mockReturnValue(contractMock),
  };

 
  const result = await sendToContract(form, setPrize, setNotify, signer);

  expect(result).toBe(true);
  expect(ethersMock.Contract).toHaveBeenCalledWith(CONTRACT_ADDRESS, abi, signer);
  expect(contractMock.verify).toHaveBeenCalledWith(form.message.trim(), form.signature.trim());
  expect(contractMock.getPrize).toHaveBeenCalledWith(form.message.trim(), form.signature.trim());
  expect(setPrize).toHaveBeenCalledWith(prizeResponse);
  expect(setNotify).toHaveBeenCalledWith("Message successfully sent!");
});
