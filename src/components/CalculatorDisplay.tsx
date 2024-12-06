interface CalculatorDisplayProps {
  result: number | null;
  error: string | null;
}

export function CalculatorDisplay({ result, error }: CalculatorDisplayProps) {
  return (
    <>
      {result !== null && <p className="mt-4">Result: {result}</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </>
  );
}
