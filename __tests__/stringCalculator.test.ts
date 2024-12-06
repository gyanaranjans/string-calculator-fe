
import { add } from '../src/utils/stringCalculator';

test('should return 0 for an empty string', () => {
    expect(add("")).toBe(0);
});


test('should return the number itself for a single number', () => {
    expect(add("1")).toBe(1);
    expect(add("5")).toBe(5);
});

test('should return the sum of two numbers', () => {
    expect(add("1,2")).toBe(3);
    expect(add("10,20")).toBe(30);
});

test('should return the sum of multiple numbers', () => {
    expect(add("1,2,3")).toBe(6);
    expect(add("10,20,30")).toBe(60);
});

test('should handle new lines between numbers', () => {
    expect(add("1\n2,3")).toBe(6);
    expect(add("10\n20\n30")).toBe(60);
});

test('should support different delimiters', () => {
    expect(add("//;\n1;2")).toBe(3);
    expect(add("//|\n1|2|3")).toBe(6);
});

test('should throw an exception for negative numbers', () => {
    expect(() => add("1,-2,3")).toThrow("negative numbers not allowed: -2");
    expect(() => add("1,-2,-3")).toThrow("negative numbers not allowed: -2,-3");
});

test('should support multiple delimiters', () => {
    expect(add("//[;][|]\n1;2|3")).toBe(6);
    expect(add("//[;][|]\n1|2;3")).toBe(6);
});

test('should support delimiters of any length', () => {
    expect(add("//[***]\n1***2***3")).toBe(6);
    expect(add("//[---]\n1---2---3")).toBe(6);
});

test('should ignore non-numeric values', () => {
    expect(add("1,a,2")).toBe(3);
    expect(add("1\nb\n2")).toBe(3);
});



test('should ignore numbers greater than 1000', () => {
    expect(add("1001,2000,3000")).toBe(0);
    expect(add("//;\n1001;2000;3000")).toBe(0);
    expect(add('1,2,1001')).toBe(3);
});

