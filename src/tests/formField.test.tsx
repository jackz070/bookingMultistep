import FormField from "../components/FormField";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

afterEach(() => {
  vi.clearAllMocks();
});

describe("FormField component", () => {
  const mockProps = {
    fieldDesc: "Field Description",
    fieldName: "field_name",
    value: "test value",
    updateData: vi.fn(),
    displayErrors: true,
    isValid: {},
    setIsValid: vi.fn(),
    validation: vi.fn(),
    type: "text",
    globalValidate: false,
    setGlobalValidationError: vi.fn(),
    min: undefined,
    max: undefined,
    notice: undefined,
  };

  it("renders input and label correctly", async () => {
    render(<FormField {...mockProps} />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "text");
    expect(inputElement).toHaveAttribute("value", "test value");
  });

  it("calls updateData and validation when input value is changed", async () => {
    const user = userEvent.setup();
    const testValue = "test";

    render(<FormField {...mockProps} />);
    const inputElement = screen.getByRole("textbox");
    await user.click(inputElement);
    await user.keyboard(testValue);
    expect(mockProps.updateData).toHaveBeenCalledTimes(testValue.length + 1);
    expect(mockProps.validation).toHaveBeenCalledTimes(testValue.length + 1);
  });

  it("displays error if value is invalid", () => {
    mockProps.validation.mockReturnValue(false);
    const modifiedMockProps = { ...mockProps, value: "" };
    render(<FormField {...modifiedMockProps} />);
    expect(screen.getByRole("textbox")).toHaveValue("");
    expect(screen.getByText(/please enter valid field description/i));
  });

  it("displays no error if value is valid and calls setIsValid to let the form know that it's valid", () => {
    mockProps.validation.mockReturnValue(true);
    render(<FormField {...mockProps} />);
    expect(
      screen.queryByText(/please enter valid field description/i)
    ).toBeNull();
    expect(screen.getByRole("textbox")).toHaveValue(mockProps.value);
    expect(mockProps.setIsValid).toHaveBeenCalled();
  });

  it("has role of spinbutton if input type is number and its value is of type number", () => {
    const modifiedMockProps = { ...mockProps, value: "2", type: "number" };
    render(<FormField {...modifiedMockProps} />);
    expect(screen.getByRole("spinbutton")).toHaveValue(2);
    expect(screen.getByRole("spinbutton")).toHaveAttribute("type", "number");
  });
});
