import { render, screen } from "@testing-library/react";

import App from "../App";

describe("First step", () => {
  it("renders first step correctly with header, two inputs for both types of tickets and next button", () => {
    render(<App />);
    expect(screen.getByText(/select tickets/i));
    expect(screen.getByLabelText(/full price/i));
    expect(screen.getByLabelText(/reduced price/i));
    expect(screen.getByRole("button")).toHaveTextContent(/next/i);
  });
});
