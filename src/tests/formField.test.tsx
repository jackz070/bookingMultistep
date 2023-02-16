import FormField from "../components/FormField";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

const user = userEvent.setup();

describe("FormField component", () => {
  it("renders correctly and calls updateData on input", async () => {
    const mockUpdateData = vi.fn();
    render(
      <FormField
        fieldDesc="First Name"
        fieldName="firstName"
        value=""
        updateData={mockUpdateData}
        displayErrors={false}
        validation={vi.fn()}
        isValid={[]}
        setIsValid={vi.fn()}
        type="text"
      />
    );
    await user.click(screen.getByLabelText(/first name/i));
    await user.keyboard("test");
    expect(mockUpdateData).toHaveBeenCalled();
    screen.debug();
  });
});
