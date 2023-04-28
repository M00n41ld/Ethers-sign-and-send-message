import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignForm from "../../components/containers/SignForm";

describe("SignForm", () => {
  test("should display an error message when signing fails", async () => {
    const signer = jest.fn(() => {
      throw new Error("Failed to sign");
    });
    const setSignInfo = jest.fn();
    const { container } = render(
      <SignForm signer={signer} setSignInfo={setSignInfo} />
    );

    const messageInput = screen.getByPlaceholderText(
      "Type the message you want to sign"
    );
    const signButton = screen.getByText("Sign");

    const message = "Test message";
    fireEvent.change(messageInput, { target: { value: message } });
    fireEvent.click(signButton);

    const errorMessage = await screen.findByText(/Error in signing/);
    expect(errorMessage).toBeInTheDocument();
  });

  test("should display an error message when signing returns undefined", async () => {
    const signer = jest.fn(() => undefined);
    const setSignInfo = jest.fn();
    const { container } = render(
      <SignForm signer={signer} setSignInfo={setSignInfo} />
    );

    const messageInput = screen.getByPlaceholderText(
      "Type the message you want to sign"
    );
    const signButton = screen.getByText("Sign");

    const message = "Test message";
    fireEvent.change(messageInput, { target: { value: message } });
    fireEvent.click(signButton);

    const errorMessage = await screen.findByText(/Error in signing/);
    expect(errorMessage).toBeInTheDocument();
  });

  test("should disable the button while signing", async () => {
    const signer = jest.fn(() => new Promise((resolve) => setTimeout(resolve, 500)));
    const setSignInfo = jest.fn();
    const { container } = render(
      <SignForm signer={signer} setSignInfo={setSignInfo} />
    );

    const messageInput = screen.getByPlaceholderText(
      "Type the message you want to sign"
    );
    const signButton = screen.getByText("Sign");

    const message = "Test message";
    fireEvent.change(messageInput, { target: { value: message } });
    fireEvent.click(signButton);

    expect(signButton).toBeDisabled();
    await waitFor(() => expect(signButton).toBeEnabled());
  });
});
