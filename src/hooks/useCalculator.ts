import { useState } from 'react';
import { CalculatorOperation, CalculatorResult } from '@/types/types';

export function useCalculator(calculator: CalculatorOperation) {
    const [input, setInput] = useState("");
    const [result, setResult] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleCalculation = () => {
        try {
            const processedInput = input.replace(/\\n/g, "\n");
            const calculatedResult = calculator.calculate(processedInput);
            setResult(calculatedResult);
            setError(null);
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError("An unknown error occurred");
            }
            setResult(null);
        }
    };

    return {
        input,
        setInput,
        result,
        error,
        handleCalculation
    };
}