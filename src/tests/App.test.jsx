import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { faker } from "@faker-js/faker";
import App from "../App";

describe("Multistep form component", () => {
  it("renders a step correctly with header and the 'next' button", () => {
    render(<App />);
    expect(screen.getByText(/select tickets/i));
    expect(screen.getByLabelText(/full price/i));
    expect(screen.getByLabelText(/reduced price/i));
    expect(screen.getByRole("button")).toHaveTextContent(/next/i);
  });

  it("allows to go through all the steps when inputs are valid", async () => {
    const user = userEvent.setup();
    render(<App />);
    //step 1 renders as expected
    expect(screen.getByRole("button")).toHaveTextContent(/next/i);
    expect(screen.getByText("1 / 4"));
    await user.click(screen.getByLabelText(/full price/i), { exact: false });
    await user.keyboard("2");
    await user.click(screen.getByText(/next/i));
    //step 2 renders as expected
    expect(screen.getByText("2 / 4"));
    await user.click(screen.getByLabelText("16"));
    await user.click(screen.getByLabelText("17"));
    await user.click(screen.getByText(/next/i));

    //step 3 renders as expected
    expect(screen.getByText("3 / 4"));


    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const emailAdress = faker.internet.email();

    await user.click(screen.getByLabelText(/first name/i));
    await user.keyboard(firstName);

    await user.click(screen.getByLabelText(/last name/i));
    await user.keyboard(lastName);

    await user.click(screen.getByLabelText(/email/i));
    await user.keyboard(emailAdress);
    await user.click(screen.getByText(/next/i));

    //step 4 renders as expected
    expect(screen.getByText("4 / 4"));
    let confirmButton = screen.getByRole("button", { name: /confirm/i });
    await user.click(confirmButton);

    //confirm button changes to success on click and wait
    await waitFor(() =>
      expect(screen.getByRole("button", { name: /success/i }))
    );
  });
});
