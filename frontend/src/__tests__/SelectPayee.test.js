import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SelectPayee from "../pages/SelectPayee";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),
}));

describe("SelectPayee component", () => {
  test("renders SelectPayee component", () => {
    render(<SelectPayee />);
    expect(screen.getByText(/Pay or Move Money/i)).toBeInTheDocument();
  });

  test('clicking "Someone You\'ve Paid Before" button', () => {
    const { getByText } = render(<SelectPayee />);
    const button = getByText("Someone You've Paid Before");
    fireEvent.click(button);
  });

  test('clicking "A new person or company" button', () => {
    const { getByText } = render(<SelectPayee />);
    const button = getByText("A new person or company");
    fireEvent.click(button);
  });
});
