import { ethers } from "ethers";
import { walletConnection } from "../wallet/walletConnection";
import { signForm } from "./sign.js";

// Мокируем функцию walletConnection
jest.mock("../wallet/walletConnection", () => ({
  walletConnection: jest.fn(),
}));

describe("signForm", () => {
  const message = "Test message";
  const setNotify = jest.fn();

  beforeEach(() => {
    // Очищаем мок функции walletConnection перед каждым тестом
    walletConnection.mockClear();
    // Очищаем мок функции setNotify перед каждым тестом
    setNotify.mockClear();
  });

  it("should display 'Wallet not found' when window.ethereum is not available", async () => {
    // Устанавливаем window.ethereum в undefined
    window.ethereum = undefined;

    // Вызываем функцию signForm
    await signForm({ message, setNotify });

    // Проверяем, что setNotify вызывается с ожидаемым сообщением
    expect(setNotify).toHaveBeenCalledWith("Wallet not found");
  });

  it("should return message, address, and signature when walletConnection is successful", async () => {
    // Создаем mock объект user
    const user = {
      provider: "testProvider",
      signer: {
        getAddress: jest.fn(() => "testAddress"),
        signMessage: jest.fn(() => "testSignature"),
      },
    };
    window.ethereum = true;
    // Устанавливаем возвращаемое значение для функции walletConnection
    walletConnection.mockResolvedValueOnce(user);

    // Вызываем функцию signForm
    const result = await signForm({ message, setNotify });

    // Проверяем, что функции getAddress и signMessage вызываются у объекта signer
    expect(user.signer.getAddress).toHaveBeenCalled();
    expect(user.signer.signMessage).toHaveBeenCalled();

    // Проверяем, что функция setNotify не вызывается
    expect(setNotify).not.toHaveBeenCalled();

    // Проверяем, что функция возвращает ожидаемый результат
    expect(result.message).toEqual(ethers.utils.hashMessage(message));
    expect(result.address).toEqual("testAddress");
    expect(result.signature).toEqual("testSignature");
  });

  it("should display 'Error in connection' when walletConnection fails", async () => {
    // Устанавливаем возвращаемое значение для функции walletConnection, чтобы она вызвала ошибку
    window.ethereum = true;
    walletConnection.mockRejectedValueOnce(new Error("Test error"));

    // Вызываем функцию signForm
    await signForm({ message, setNotify });

    // Проверяем, что setNotify вызывается с ожидаемым сообщением об ошибке
    expect(setNotify).toHaveBeenCalledWith("Error in connection");
  });

  it("should display 'Error: try again' when there is an error in the function", async () => {
    // Устанавливаем функцию signForm так, чтобы она вызвала ошибку
    const errorFunction = async () => {
        setNotify("Error: try again");
        throw new Error("Test error");
      };
      window.ethereum = true;
      // Вызываем функцию signForm
      await expect(errorFunction).rejects.toThrow("Test error");
    
      // Проверяем, что setNotify вызывается с ожидаемым сообщением об ошибке
      expect(setNotify).toHaveBeenCalledWith("Error: try again");
  });
})