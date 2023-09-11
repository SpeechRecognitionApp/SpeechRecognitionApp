import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SelectContact from "../pages/SelectContact";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";

jest.mock("axios");

jest.mock("sweetalert", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("socket.io-client", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    on: jest.fn(),
    disconnect: jest.fn(),
  })),
}));

describe("SelectContact Component", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: [] });
  });

  it("renders the component without crashing", () => {
    render(
      <MemoryRouter>
        <SelectContact />
      </MemoryRouter>
    );
    expect(screen.getByText("Choose Contact")).toBeInTheDocument();
  });

  it("displays an error message if no contact is selected", () => {
    const { getByText } = render(
      <MemoryRouter>
        <SelectContact />
      </MemoryRouter>
    );
    const selectButton = getByText("Select");
    fireEvent.click(selectButton);
    expect(swal).toHaveBeenCalledWith(
      "Oops!",
      "Please select a contact first!",
      "error"
    );
  });
});
