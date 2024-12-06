"use client";
import { useState } from "react";
import { add } from "@/utils/stringCalculator";

export default function Calculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    try {
      const processedInput = input.replace(/\\n/g, "\n");
      console.log("input", processedInput);
      const sum = add(processedInput);
      console.log("sum", sum);
      setResult(sum);
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

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-2xl font-bold mb-4">Home</h1>
      <input
        type="text"
        placeholder="Enter numbers (use \n for newline)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="p-2 mb-4 border rounded w-64"
      />
      <button
        onClick={handleSubmit}
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Submit
      </button>
      {result !== null && <p className="mt-4">Result: {result}</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}
