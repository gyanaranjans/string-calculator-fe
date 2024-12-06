interface CalculatorInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function CalculatorInput({ value, onChange }: CalculatorInputProps) {
  return (
    <input
      type="text"
      placeholder="Enter numbers in comma separated format"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 mb-4 border rounded w-64"
    />
  );
}
