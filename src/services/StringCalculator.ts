import { CalculatorOperation } from '@/types/types';
import { add } from "@/utils/stringCalculator";

export class StringCalculator implements CalculatorOperation {
    calculate(input: string): number {
        return add(input);
    }
}
