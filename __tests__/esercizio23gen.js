const { describe } = require("node:test");


describe("AuthTest", (maxLong) => {
    test("Should throw error if numbers length is equal to zero ", () => {
        expect(() => calculateStDev([])).toThrow("Array must not be empty");
    });
    test("Should throw error if numbers is not an array ", () => {
        expect(() => calculateStDev("ciao")).toThrow("Numbers must be an array");
    });
    test("Should throw error if array doesn't contains numbers only", () => {
        expect(() => calculateStDev(['pippo', 1])).toThrow("Numbers must contain numbers only");
    });
    test("Should return 2", () => {
        expect(() => calculateStDev([2, 3, 4])).toThrow("Should return 2");
    });
    test(`Should throw error in any number of numbers is greater than ${maxLong}`, () => {
        expect(() => calculateStDev([2000000000000000000000000n, 3, 4])).toThrow(`Number must be lower than ${maxLong}`);
    });

});