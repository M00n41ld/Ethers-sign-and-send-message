import React from 'react';
import { render } from '@testing-library/react';
import Header from '../../components/Header';
jest.mock("next/router", () => ({
  useRouter: () => ({
    route: "/",
    pathname: "",
    query: "",
    asPath: "",
  }),
}));

describe("Header component", () => {
  test("renders title and navigation links", () => {
    const { getByText } = render(<Header />);
    expect(getByText("SIGN AND SEND MESSAGE")).toBeInTheDocument();
    expect(getByText("using blockchain")).toBeInTheDocument();
    expect(getByText("Home")).toBeInTheDocument();
    expect(getByText("Prizes list")).toBeInTheDocument();
  });

  
  test('renders navigation links', () => {
    const { getByText } = render(<Header />);
    const homeLink = getByText('Home');
    const prizesLink = getByText('Prizes list');
    expect(homeLink).toBeInTheDocument();
    expect(prizesLink).toBeInTheDocument();
  });
});
