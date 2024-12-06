import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Calculator from "./CalculatorUI";

describe("Calculator", () => {
  it("renders all UI elements", () => {
    render(<Calculator />);

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter numbers (use \\n for newline)")
    ).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("handles basic number addition", () => {
    render(<Calculator />);
    const input = screen.getByPlaceholderText(
      "Enter numbers (use \\n for newline)"
    );
    const button = screen.getByText("Submit");

    fireEvent.change(input, { target: { value: "1,2,3" } });
    fireEvent.click(button);

    expect(screen.getByText("Result: 6")).toBeInTheDocument();
  });

  it("handles newline separated numbers", () => {
    render(<Calculator />);
    const input = screen.getByPlaceholderText(
      "Enter numbers (use \\n for newline)"
    );
    const button = screen.getByText("Submit");

    fireEvent.change(input, { target: { value: "10\\n20\\n30" } });
    fireEvent.click(button);

    expect(screen.getByText("Result: 60")).toBeInTheDocument();
  });

  it("handles custom delimiters", () => {
    render(<Calculator />);
    const input = screen.getByPlaceholderText(
      "Enter numbers (use \\n for newline)"
    );
    const button = screen.getByText("Submit");

    fireEvent.change(input, { target: { value: "//;\\n1;2;3" } });
    fireEvent.click(button);

    expect(screen.getByText("Result: 6")).toBeInTheDocument();
  });

  it("shows error for negative numbers", () => {
    render(<Calculator />);
    const input = screen.getByPlaceholderText(
      "Enter numbers (use \\n for newline)"
    );
    const button = screen.getByText("Submit");

    fireEvent.change(input, { target: { value: "1,-2,3" } });
    fireEvent.click(button);

    expect(
      screen.getByText("negative numbers not allowed: -2")
    ).toBeInTheDocument();
  });

  it("handles empty input", () => {
    render(<Calculator />);
    const input = screen.getByPlaceholderText(
      "Enter numbers (use \\n for newline)"
    );
    const button = screen.getByText("Submit");

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(button);

    expect(screen.getByText("Result: 0")).toBeInTheDocument();
  });

  it("ignores numbers greater than 1000", () => {
    render(<Calculator />);
    const input = screen.getByPlaceholderText(
      "Enter numbers (use \\n for newline)"
    );
    const button = screen.getByText("Submit");

    fireEvent.change(input, { target: { value: "2,1001,3" } });
    fireEvent.click(button);

    expect(screen.getByText("Result: 5")).toBeInTheDocument();
  });

  it("handles multiple custom delimiters", () => {
    render(<Calculator />);
    const input = screen.getByPlaceholderText(
      "Enter numbers (use \\n for newline)"
    );
    const button = screen.getByText("Submit");

    fireEvent.change(input, { target: { value: "//[*][%]\\n1*2%3" } });
    fireEvent.click(button);

    expect(screen.getByText("Result: 6")).toBeInTheDocument();
  });
});
