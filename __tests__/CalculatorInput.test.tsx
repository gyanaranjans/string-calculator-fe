import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { CalculatorInput } from "@/components/CalculatorInput";

describe("CalculatorInput", () => {
  it("renders input field", () => {
    const onChange = jest.fn();
    render(<CalculatorInput value="" onChange={onChange} />);

    expect(
      screen.getByPlaceholderText("Enter numbers in comma separated format")
    ).toBeInTheDocument();
  });

  it("calls onChange with input value", () => {
    const onChange = jest.fn();
    render(<CalculatorInput value="" onChange={onChange} />);

    const input = screen.getByPlaceholderText(
      "Enter numbers in comma separated format"
    );
    fireEvent.change(input, { target: { value: "1,2,3" } });

    expect(onChange).toHaveBeenCalledWith("1,2,3");
  });
});
