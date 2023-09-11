import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import InsertCard from "../pages/InsertYourCard";
import { MemoryRouter, Route } from "react-router-dom";

jest.mock("axios");

test("renders InsertCard with all elements", () => {
  render(
    <MemoryRouter initialEntries={["/insertcard"]}>
      <Route path="/insertcard" component={InsertCard} />
    </MemoryRouter>
  );
  expect(screen.getByText("Please Insert Your Card")).toBeInTheDocument();
  expect(screen.getByAltText("Insert Card")).toBeInTheDocument();
  expect(screen.getByText("Confirm")).toBeInTheDocument();
});

test("makes logout API call on mount", async () => {
  axios.delete.mockResolvedValue({});

  render(<InsertCard />);

  await waitFor(() => {
    expect(axios.delete).toHaveBeenCalledWith("http://127.0.0.1:5000/logout");
  });
});

test("makes insert card API call when Confirm is clicked", async () => {
  axios.post.mockResolvedValue({});

  render(<InsertCard />);

  fireEvent.click(screen.getByText("Confirm"));

  await waitFor(() => {
    expect(axios.post).toHaveBeenCalledWith(
      "http://127.0.0.1:5000/insert_card",
      expect.any(Object)
    );
  });
});
