export function add(numbers: string): number {
    if (numbers === "") {
        return 0;
    }

    const { processedNumbers, delimiter } = extractAndReplaceDelimiter({ numbers });
    const numArray = parseNumbers(processedNumbers, delimiter);
    negativeNumberCheck(numArray);

    return numArray.filter(num => num <= 1000).reduce((sum, num) => sum + num, 0);
}

function extractAndReplaceDelimiter({ numbers }: { numbers: string; }): { processedNumbers: string, delimiter: RegExp } {
    let delimiter = /,|\n/;
    if (numbers.startsWith("//")) {
        const delimiterEndIndex = numbers.indexOf("\n");
        let customDelimiter = numbers.substring(2, delimiterEndIndex);
        if (customDelimiter.startsWith("[")) {
            customDelimiter = customDelimiter.slice(1, -1).split("][").map(escapeDelimiter).join("|");
        } else {
            customDelimiter = escapeDelimiter(customDelimiter);
        }
        delimiter = new RegExp(customDelimiter);
        numbers = numbers.substring(delimiterEndIndex + 1);
    }
    return { processedNumbers: numbers, delimiter };
}

function escapeDelimiter(delimiter: string): string {
    return delimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function parseNumbers(numbers: string, delimiter: RegExp): number[] {
    return numbers.split(delimiter).map(num => {
        const parsedNum = Number(num);
        return isNaN(parsedNum) ? 0 : parsedNum;
    });
}

function negativeNumberCheck(numArray: number[]) {
    const negativeNumbers = numArray.filter(num => num < 0);
    if (negativeNumbers.length > 0) {
        throw new Error(`negative numbers not allowed: ${negativeNumbers.join(",")}`);
    }
}