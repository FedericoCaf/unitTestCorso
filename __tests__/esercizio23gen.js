const { describe } = require("node:test");


describe("AuthTest", (maxLong) => {
    xtest("Should throw error if numbers length is equal to zero ", () => {
        expect(() => calculateStDev([])).toThrow("Array must not be empty");
    });
    xtest("Should throw error if numbers is not an array ", () => {
        expect(() => calculateStDev("ciao")).toThrow("Numbers must be an array");
    });
    xtest("Should throw error if array doesn't contains numbers only", () => {
        expect(() => calculateStDev(['pippo', 1])).toThrow("Numbers must contain numbers only");
    });
    xtest("Should return correct calculation", () => {
        expect(() => calculateStDev([2, 3, 4])).toBe(2);
    });
    xtest(`Should throw error in any number of numbers is greater than ${maxLong}`, () => {
        expect(() => calculateStDev([2000000000000000000000000n, 3, 4])).toThrow(`Number must be lower than ${maxLong}`);
    });

});