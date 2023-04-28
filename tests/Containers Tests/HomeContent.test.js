import { render, screen } from "@testing-library/react";
import HomeContent from "../../components/containers/HomeContent";

describe("HomeContent", () => {
  const signerMock = {
    address: "0x123",
    signMessage: jest.fn(),
  };

  it("renders nothing when not connected", () => {
    render(<HomeContent signer={signerMock} isConnected={false} />);
    expect(screen.queryByText(/Sign Form:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Verify Form:/i)).not.toBeInTheDocument();
  });

  it("renders SignForm and VerifyForm when connected", () => {
    render(<HomeContent signer={signerMock} isConnected={true} />);
    expect(screen.getByText(/Sign Form:/i)).toBeInTheDocument();
    expect(screen.getByText(/Verify Form:/i)).toBeInTheDocument();
  });
});
