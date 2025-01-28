const { describe } = require("node:test");
const { media, mediana, moda, varianza, deviazione } = require("../utils/mathFunctions");
const maxLong = 200000;

describe("mathFunctions", () => {

    describe('media', () => {
        test("Should throw error if numbers length is equal to zero ", () => {
            expect(() => media([])).toThrow("Array must not be empty");
        });
        test("Should throw error if numbers is not an array", () => {
            expect(() => media("ciao")).toThrow("Numbers must be an array");
        });
        test("Should throw error if array doesn't contains numbers only", () => {
            expect(() => media(["ciao", 2])).toThrow("Numbers must contain numbers only");
        });
        test("Should return correct calculation", () => {
            expect(media([4, 2])).toBe(3);
        });
        test(`Should throw error in any number of numbers is greater than ${maxLong}`, () => {
            expect(() => media([2000000000000n, 3, 4])).toThrow(`Number must be lower than ${maxLong}`);
        });
    });

    describe('mediana', () => {
        test("Should throw error if numbers length is equal to zero ", () => {
            expect(() => mediana([])).toThrow("Array must not be empty");
        });
        test("Should throw error if numbers is not an array", () => {
            expect(() => mediana("ciao")).toThrow("Numbers must be an array");
        });
        test("Should return correct median for odd-length array", () => {
            expect(mediana([1, 3, 2])).toBe(2);
        });
        test("Should return correct median for even-length array", () => {
            expect(mediana([1, 2, 3, 4])).toBe(2.5);
        });
        test("Should handle already sorted array correctly", () => {
            expect(mediana([1, 2, 3])).toBe(2);
        });
    });

    describe('moda', () => {
        test("Should throw error if numbers length is equal to zero ", () => {
            expect(() => moda([])).toThrow("Array must not be empty");
        });
        test("Should throw error if numbers is not an array", () => {
            expect(() => moda("ciao")).toThrow("Numbers must be an array");
        });
        test("Should return correct mode for single mode array", () => {
            expect(moda([1, 2, 2, 3])).toBe(2);
        });
        test("Should return correct mode for multi-modal array", () => {
            expect(moda([1, 1, 2, 2, 3])).toEqual([1, 2]);
        });
        test("Should return mode for array with one element", () => {
            expect(moda([5])).toBe(5);
        });
    });

    describe('varianza', () => {
        test("Should throw error if numbers length is equal to zero ", () => {
            expect(() => varianza([])).toThrow("Array must not be empty");
        });
        test("Should throw error if numbers is not an array", () => {
            expect(() => varianza("ciao")).toThrow("Numbers must be an array");
        });
        test("Should return correct variance", () => {
            expect(varianza([1, 2, 3, 4])).toBeCloseTo(1.25);
        });
        test("Should return 0 for single element array", () => {
            expect(varianza([5])).toBe(0);
        });
        test("Should handle large arrays correctly", () => {
            expect(varianza([1000, 1001, 1002])).toBeCloseTo(1);
        });
    });

    describe('deviazione standard', () => {
        test("Should throw error if numbers length is equal to zero ", () => {
            expect(() => deviazione([])).toThrow("Array must not be empty");
        });
        test("Should throw error if numbers is not an array", () => {
            expect(() => deviazione("ciao")).toThrow("Numbers must be an array");
        });
        test("Should return correct standard deviation", () => {
            expect(deviazione([1, 2, 3, 4])).toBeCloseTo(1.118, 3);
        });
        test("Should return 0 for single element array", () => {
            expect(deviazione([5])).toBe(0);
        });
        test("Should handle large arrays correctly", () => {
            expect(deviazione([1000, 1001, 1002])).toBeCloseTo(1);
        });
    });

});
