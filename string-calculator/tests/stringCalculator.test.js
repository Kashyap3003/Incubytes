const add = require('../src/stringCalculator');

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
    expect(add("10\n20,30")).toBe(60);
});

test('should support different delimiters', () => {
    expect(add("//;\n1;2")).toBe(3);
    expect(add("//|\n10|20|30")).toBe(60);
    expect(add("//[***]\n1***2***3")).toBe(6); // Testing delimiters of length 3
    expect(add("//[*][%]\n1*2%3")).toBe(6);   // Testing multiple single-char delimiters
    expect(add("//[**][%%]\n1**2%%3")).toBe(6); // Testing multiple multi-char delimiters
});

test('should throw an error for negative numbers', () => {
    expect(() => add("1,-2,3")).toThrow("negative numbers not allowed -2");
    expect(() => add("//;\n1;-2;3")).toThrow("negative numbers not allowed -2");
    expect(() => add("//|\n10|-20|30")).toThrow("negative numbers not allowed -20");
});

test('should throw an error for multiple negative numbers', () => {
    expect(() => add("1,-2,-3")).toThrow("negative numbers not allowed -2,-3");
    expect(() => add("//;\n-1;-2;3")).toThrow("negative numbers not allowed -1,-2");
    expect(() => add("//|\n-10|20|-30")).toThrow("negative numbers not allowed -10,-30");
});

test('should handle any amount of numbers', () => {
    expect(add("1,2,3,4,5,6,7,8,9,10")).toBe(55);
    expect(add("//;\n1;2;3;4;5;6;7;8;9;10")).toBe(55);
    expect(add("//|\n10|20|30|40|50|60|70|80|90|100")).toBe(550);
});

test('should ignore numbers greater than 1000', () => {
    expect(add("1001,2")).toBe(2);
    expect(add("//;\n1001;2;3")).toBe(5);
    expect(add("//|\n10|20|1001|30")).toBe(60);
});
