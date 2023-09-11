import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import WelcomePage from "../pages/Welcome";

test("renders WelcomePage with all elements", () => {
  render(
    <MemoryRouter initialEntries={["/welcome"]}>
      <Route path="/welcome" component={WelcomePage} />
    </MemoryRouter>
  );
  expect(screen.getByText(/Accessibility Modes:/i)).toBeInTheDocument();
  expect(
    screen.getByRole("checkbox", { name: /Keyboard and mouse/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("checkbox", { name: /Facial navigation/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("checkbox", { name: /Voice navigation/i })
  ).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Confirm/i })).toBeInTheDocument();
});

test("navigates to /dashboard when Confirm button is clicked", () => {
  let testHistory, testLocation;
  render(
    <MemoryRouter initialEntries={["/welcome"]}>
      <WelcomePage />
      <Route
        path="*"
        render={({ history, location }) => {
          testHistory = history;
          testLocation = location;
          return null;
        }}
      />
    </MemoryRouter>
  );

  fireEvent.click(screen.getByRole("button", { name: /Confirm/i }));
  expect(testLocation.pathname).toBe("/dashboard");
});
