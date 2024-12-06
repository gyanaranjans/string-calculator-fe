import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { CalculatorDisplay } from "@/components/CalculatorDisplay";

describe("CalculatorDisplay", () => {
  it("displays result when provided", () => {
    render(<CalculatorDisplay result={6} error={null} />);
    expect(screen.getByText("Result: 6")).toBeInTheDocument();
  });

  it("displays error when provided", () => {
    render(<CalculatorDisplay result={null} error="Test error" />);
    expect(screen.getByText("Test error")).toBeInTheDocument();
  });

  it("displays nothing when no result or error", () => {
    const { container } = render(
      <CalculatorDisplay result={null} error={null} />
    );
    expect(container.firstChild).toBeNull();
  });
});
