import { render, screen } from "@testing-library/react";
import React from "react";
import App from "./App";

test("renders header", () => {
  render(<App />);
  const headerElement = screen.getByText(/Contacts/i);
  expect(headerElement).toBeInTheDocument();
});
