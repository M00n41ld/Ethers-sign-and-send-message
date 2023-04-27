import { render } from "@testing-library/react";
import Footer from "../Footer";
import React from "react";

describe("Footer", () => {
  test("renders the correct text", () => {
    const { getByText } = render(<Footer />);
    const heading = getByText("Got any questions?");
    const span = getByText("Contact me via Telegram");
    expect(heading).toBeInTheDocument();
    expect(span).toBeInTheDocument();
  });

  test("renders the correct link", () => {
    const { getByText } = render(<Footer />);
    const link = getByText("Contact me via Telegram").closest("a");
    expect(link).toHaveAttribute("href", "https://t.me/maryreznik");
  });
});
