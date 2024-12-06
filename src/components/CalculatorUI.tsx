"use client";
import { CalculatorDisplay } from "@/components/CalculatorDisplay";
import { CalculatorInput } from "@/components/CalculatorInput";
import { useCalculator } from "@/hooks/useCalculator";
import { StringCalculator } from "@/services/StringCalculator";

export default function Calculator() {
  const calculator = new StringCalculator();
  const { input, setInput, result, error, handleCalculation } =
    useCalculator(calculator);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-2xl font-bold mb-4">String Calculator</h1>
      <CalculatorInput value={input} onChange={setInput} />
      <button
        onClick={handleCalculation}
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Submit
      </button>
      <CalculatorDisplay result={result} error={error} />
    </div>
  );
}
