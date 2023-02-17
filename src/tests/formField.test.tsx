import FormField from "../components/FormField";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

afterEach(() => {
  vi.clearAllMocks();
});

const user = userEvent.setup();

describe("FormField component", () => {
  it("renders textbox with label and calls updateData on input", async () => {
    const mockUpdateData = vi.fn();
    render(
      <FormField
        fieldDesc="Text Field"
        fieldName="textField"
        value=""
        updateData={mockUpdateData}
        displayErrors={false}
        validation={vi.fn()}
        isValid={[]}
        setIsValid={vi.fn()}
        type="text"
      />
    );
    expect(screen.getByText(/text field/i));
    expect(screen.getByRole("textbox"));
    await user.click(screen.getByLabelText(/text field/i));
    await user.keyboard("test");
    expect(mockUpdateData).toHaveBeenCalled();
  });

  it("displays error if value is invalid", () => {
    render(
      <FormField
        fieldDesc="Text Field"
        fieldName="textField"
        value=""
        updateData={vi.fn()}
        displayErrors={true}
        validation={vi.fn(() => false)}
        isValid={[]}
        setIsValid={vi.fn()}
        type="text"
      />
    );
    expect(screen.getByRole("textbox")).toHaveValue("");
    expect(screen.getByText(/please enter valid text field/i));
  });

  it("displays no error if value is valid and calls setIsValid to let the form know that it's valid", () => {
    const mockSetIsValid = vi.fn();
    render(
      <FormField
        fieldDesc="Text Field"
        fieldName="textField"
        value="text value"
        updateData={vi.fn()}
        displayErrors={true}
        validation={vi.fn(() => true)}
        isValid={[]}
        setIsValid={mockSetIsValid}
        type="text"
      />
    );
    expect(screen.queryByText(/please enter valid text field/i)).toBeNull();
    expect(screen.getByRole("textbox")).toHaveValue("text value");
    expect(mockSetIsValid).toHaveBeenCalled();
  });

  it("has role of spinbutton if input type is number and its value is of type number", () => {
    render(
      <FormField
        fieldDesc="Text Field"
        fieldName="textField"
        value="2"
        updateData={vi.fn()}
        displayErrors={true}
        validation={vi.fn()}
        isValid={[]}
        setIsValid={vi.fn()}
        type="number"
      />
    );

    expect(screen.getByRole("spinbutton")).toHaveValue(2);
  });
});
