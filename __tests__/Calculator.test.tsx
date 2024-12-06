import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Calculator from "@/components/CalculatorUI";

const mockSetInput = jest.fn();
const mockHandleCalculation = jest.fn();

// Mock the useCalculator hook
const mockUseCalculator = jest.fn();

jest.mock("../src/hooks/useCalculator", () => ({
  useCalculator: () => mockUseCalculator(),
}));

describe("Calculator", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Default mock implementation
    mockUseCalculator.mockReturnValue({
      input: "",
      setInput: mockSetInput,
      result: null,
      error: null,
      handleCalculation: mockHandleCalculation,
    });
  });

  it("renders calculator components", () => {
    render(<Calculator />);

    expect(screen.getByRole("heading")).toHaveTextContent("String Calculator");
    expect(
      screen.getByPlaceholderText("Enter numbers in comma separated format")
    ).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("handles calculation with basic input", () => {
    mockUseCalculator.mockReturnValue({
      input: "1,2,3",
      setInput: mockSetInput,
      result: 6,
      error: null,
      handleCalculation: mockHandleCalculation,
    });

    render(<Calculator />);
    fireEvent.click(screen.getByText("Submit"));

    expect(mockHandleCalculation).toHaveBeenCalled();
    expect(screen.getByText("Result: 6")).toBeInTheDocument();
  });

  it("handles calculation with newline delimiter", () => {
    mockUseCalculator.mockReturnValue({
      input: "10\\n20\\n30",
      setInput: mockSetInput,
      result: 60,
      error: null,
      handleCalculation: mockHandleCalculation,
    });

    render(<Calculator />);
    fireEvent.click(screen.getByText("Submit"));

    expect(mockHandleCalculation).toHaveBeenCalled();
    expect(screen.getByText("Result: 60")).toBeInTheDocument();
  });

  it("handles calculation with custom delimiter", () => {
    mockUseCalculator.mockReturnValue({
      input: "//;\\n1;2;3",
      setInput: mockSetInput,
      result: 6,
      error: null,
      handleCalculation: mockHandleCalculation,
    });

    render(<Calculator />);
    fireEvent.click(screen.getByText("Submit"));

    expect(mockHandleCalculation).toHaveBeenCalled();
    expect(screen.getByText("Result: 6")).toBeInTheDocument();
  });

  it("displays error for negative numbers", () => {
    mockUseCalculator.mockReturnValue({
      input: "1,-2,3",
      setInput: mockSetInput,
      result: null,
      error: "negative numbers not allowed: -2",
      handleCalculation: mockHandleCalculation,
    });

    render(<Calculator />);
    fireEvent.click(screen.getByText("Submit"));

    expect(mockHandleCalculation).toHaveBeenCalled();
    expect(
      screen.getByText("negative numbers not allowed: -2")
    ).toBeInTheDocument();
  });

  it("handles empty input", () => {
    mockUseCalculator.mockReturnValue({
      input: "",
      setInput: mockSetInput,
      result: 0,
      error: null,
      handleCalculation: mockHandleCalculation,
    });

    render(<Calculator />);
    fireEvent.click(screen.getByText("Submit"));

    expect(mockHandleCalculation).toHaveBeenCalled();
    expect(screen.getByText("Result: 0")).toBeInTheDocument();
  });

  it("handles input change", () => {
    render(<Calculator />);
    const input = screen.getByPlaceholderText(
      "Enter numbers in comma separated format"
    );

    fireEvent.change(input, { target: { value: "1,2,3" } });
    expect(mockSetInput).toHaveBeenCalledWith("1,2,3");
  });
});
