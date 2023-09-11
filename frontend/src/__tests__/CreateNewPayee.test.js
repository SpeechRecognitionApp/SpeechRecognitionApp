import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreateNewPayee from "../pages/CreateNewPayee";
import { MemoryRouter } from "react-router-dom";
import swal from "sweetalert";

jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),
}));
jest.mock("sweetalert", () => jest.fn());

describe("CreateNewPayee Component", () => {
  it("renders the component without crashing", () => {
    render(
      <MemoryRouter>
        <CreateNewPayee />
      </MemoryRouter>
    );
    expect(screen.getByText("Create New Payee")).toBeInTheDocument();
  });

  it("displays an error message if required fields are empty", () => {
    const { getByText } = render(
      <MemoryRouter>
        <CreateNewPayee />
      </MemoryRouter>
    );
    const confirmButton = getByText("Confirm");
    fireEvent.click(confirmButton);
    expect(swal).toHaveBeenCalledWith(
      "Oops!",
      "Please fill in all the required fields.",
      "error"
    );
  });

});
