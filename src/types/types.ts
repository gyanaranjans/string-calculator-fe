
export interface CalculatorOperation {
    calculate: (input: string) => number;
}

export interface CalculatorResult {
    result: number | null;
    error: string | null;
}
