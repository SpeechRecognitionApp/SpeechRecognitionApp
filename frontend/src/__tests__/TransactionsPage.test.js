import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import TransactionsPage from "../pages/Transactions";

jest.mock("axios");

describe("TransactionsPage Component", () => {
  it("renders the component without crashing", async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          timestamp: { $date: "2023-08-25T00:00:00Z" },
          type: "Transfer",
          receiver: "John Doe",
          description: "Test",
          reference: "12345",
          amount: 100,
        },
      ],
    });

    render(<TransactionsPage />);
    await waitFor(() => screen.getByText("Transactions History"));

    expect(screen.getByText("Transactions History")).toBeInTheDocument();
    expect(screen.getByText("Transfer")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Test")).toBeInTheDocument();
    expect(screen.getByText("12345")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });
});
