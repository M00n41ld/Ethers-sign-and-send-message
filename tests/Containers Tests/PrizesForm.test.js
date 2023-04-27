import { render, screen } from "@testing-library/react";
import React from "react";
import PrizesForm from "../../components/containers/PrizesForm";

describe("PrizesForm", () => {
  it("doesnt render the component when not connected", () => {
    render(<PrizesForm address="" isConnected={false} />);
    const heading = screen.queryByRole("heading", { level: 3 });
    expect(heading).not.toBeInTheDocument();
  });

  it("renders the component with no prizes if the user is new", () => {
    const prizes = [];
    jest
      .spyOn(window.localStorage.__proto__, "getItem")
      .mockReturnValueOnce(JSON.stringify(prizes));
    render(
      <PrizesForm
        address="0x1B12784e8D035a36cA8f31e86B7143b190f37A70"
        isConnected={true}
      />
    );
    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toHaveTextContent("You have no prizes yet!");
  });

  it("renders the component with prizes when connected and address is set", async () => {
    const prizes = [
      {
        id: 1,
        name: "https://as2.ftcdn.net/v2/jpg/03/03/62/45/1000_F_303624505_u0bFT1Rnoj8CMUSs8wMCwoKlnWlh5Jiq.jpg",
      },
      {
        id: 2,
        name: "https://as2.ftcdn.net/v2/jpg/03/03/62/45/1000_F_303624505_u0bFT1Rnoj8CMUSs8wMCwoKlnWlh5Jiq.jpg",
      },
      {
        id: 3,
        name: "https://as2.ftcdn.net/v2/jpg/03/03/62/45/1000_F_303624505_u0bFT1Rnoj8CMUSs8wMCwoKlnWlh5Jiq.jpg",
      },
    ];
    jest
      .spyOn(window.localStorage.__proto__, "getItem")
      .mockReturnValueOnce(JSON.stringify(prizes));
    render(<PrizesForm address="test-address" isConnected={true} />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("See the collection of your prizes:");
    const prizeListItems = screen.getAllByRole("list");
    expect(prizeListItems).toHaveLength(1);
  });

  it("updates the localIsConnected state when the isConnected prop changes", () => {
    const { rerender } = render(
      <PrizesForm address="test-address" isConnected={false} />
    );
    expect(screen.queryByText("See the collection of your prizes:")).toBeNull();
    expect(screen.queryByText("You have no prizes yet!")).toBeNull();

    rerender(<PrizesForm address="test-address" isConnected={true} />);
    expect(
      screen.getByText("See the collection of your prizes:")
    ).toBeInTheDocument();
    expect(screen.queryByText("You have no prizes yet!")).toBeInTheDocument();
  });

  it("updates the prizes state when the address prop changes", async () => {
    const prizes = [
      {
        id: 1,
        name: "https://as2.ftcdn.net/v2/jpg/03/03/62/45/1000_F_303624505_u0bFT1Rnoj8CMUSs8wMCwoKlnWlh5Jiq.jpg",
      },
      {
        id: 2,
        name: "https://as2.ftcdn.net/v2/jpg/03/03/62/45/1000_F_303624505_u0bFT1Rnoj8CMUSs8wMCwoKlnWlh5Jiq.jpg",
      },
      {
        id: 3,
        name: "https://as2.ftcdn.net/v2/jpg/03/03/62/45/1000_F_303624505_u0bFT1Rnoj8CMUSs8wMCwoKlnWlh5Jiq.jpg",
      },
    ];
    jest
      .spyOn(window.localStorage.__proto__, "getItem")
      .mockReturnValueOnce(JSON.stringify(prizes));

    const { rerender } = render(
      <PrizesForm address="test-address-1" isConnected={true} />
    );
    expect(
      screen.getByText("See the collection of your prizes:")
    ).toBeInTheDocument();
    expect(screen.queryByText("You have no prizes yet!")).toBeNull();
    expect(screen.getAllByRole("list")).toHaveLength(1);

    jest
      .spyOn(window.localStorage.__proto__, "getItem")
      .mockReturnValueOnce(JSON.stringify([]));
    rerender(<PrizesForm address="test-address-2" isConnected={true} />);
    expect(
      screen.queryByText("See the collection of your prizes:")
    ).toBeInTheDocument();
    expect(screen.getByText("You have no prizes yet!")).toBeInTheDocument();
    expect(screen.queryAllByRole("list")).toHaveLength(0);
  });
});
