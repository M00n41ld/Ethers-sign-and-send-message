import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import SendForm from "../../components/containers/SendForm";

const mockedSetContext = jest.fn();
const mockedSetVerified = jest.fn();
const mockedContextObj = { address: "mockedAddress", message: "mockedMessage", signature: "mockedSignature" };
const mockedSigner = "mockedSigner";

describe("SendForm component", () => {
  it("should render correctly", () => {
    const { getByText } = render(<SendForm signer={mockedSigner} verified={true} setVerified={mockedSetVerified} setContext={mockedSetContext} contextObj={mockedContextObj} />);
    expect(getByText("Send message to the smart contract")).toBeInTheDocument();
  });

  it("should not be able to submit if verified is false", () => {
    const { getByRole } = render(<SendForm signer={mockedSigner} verified={false} setVerified={mockedSetVerified} setContext={mockedSetContext} contextObj={mockedContextObj} />);
    const button = getByRole("button");
    expect(button).toBeDisabled();
  });

  it("should be able to submit if verified is true", () => {
    const { getByRole } = render(<SendForm signer={mockedSigner} verified={true} setVerified={mockedSetVerified} setContext={mockedSetContext} contextObj={mockedContextObj} />);
    const button = getByRole("button");
    expect(button).toBeEnabled();
  });

  test("should call handleSend function on submit", async () => {
    const { getByText } = render(
      <SendForm
        signer={null}
        verified={true}
        setVerified={mockedSetVerified}
        setContext={mockedSetContext}
        contextObj={{}}
      />
    );

    const button = getByText("Send message to the smart contract");
    fireEvent.click(button);

    await waitFor(() => expect(mockedSetContext).toHaveBeenCalledTimes(1));
    expect(mockedSetVerified).toHaveBeenCalledWith(false);
  });
});
