const add = require('../src/stringCalculator');

test('should return the sum of two numbers', () => {
    expect(add("1,2")).toBe(3);
    expect(add("10,20")).toBe(30);
    expect(add("20,00")).toBe(20);
});

test('should handle new lines between numbers', () => {
    expect(add("1\n2,3")).toBe(6);
    expect(add("10\n20,30")).toBe(60);
});