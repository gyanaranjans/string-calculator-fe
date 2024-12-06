import { renderHook, act } from "@testing-library/react";
import { useCalculator } from "@/hooks/useCalculator";

const mockCalculator = {
  calculate: jest.fn(),
};

describe("useCalculator", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("initializes with empty state", () => {
    const { result } = renderHook(() => useCalculator(mockCalculator));

    expect(result.current.input).toBe("");
    expect(result.current.result).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it("updates input value", () => {
    const { result } = renderHook(() => useCalculator(mockCalculator));

    act(() => {
      result.current.setInput("1,2,3");
    });

    expect(result.current.input).toBe("1,2,3");
  });

  it("handles successful calculation", () => {
    mockCalculator.calculate.mockReturnValue(6);
    const { result } = renderHook(() => useCalculator(mockCalculator));

    act(() => {
      result.current.setInput("1,2,3");
      result.current.handleCalculation();
    });

    expect(result.current.result).toBe(6);
    expect(result.current.error).toBeNull();
  });

  it("handles calculation error", () => {
    mockCalculator.calculate.mockImplementation(() => {
      throw new Error("Test error");
    });
    const { result } = renderHook(() => useCalculator(mockCalculator));

    act(() => {
      result.current.setInput("1,-2,3");
      result.current.handleCalculation();
    });

    expect(result.current.result).toBeNull();
    expect(result.current.error).toBe("Test error");
  });
});
