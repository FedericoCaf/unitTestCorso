const { describe } = require("node:test");

function loginFn(email, password) {
    if (!email) {
        throw new Error("Email is required");
    }

    email = email.trim();
    if (!email) {
        throw new Error("Email must not have empty space");
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        throw new Error("Invalid email format");
    }

    if (email.length > 20) {
        throw new Error("Email is too long");
    }

    if (!password) {
        throw new Error("Password is required");
    }

    password = password.trim();
    if (!password) {
        throw new Error("Password must not have empty space");
    }
    return "Validation passed";
}


describe("AuthTest", () => {
    test("Should throw error if email not provided", () => {
        expect(() => loginFn("", "password3")).toThrow("Email is required");
    });

    test("Should throw error if email has wrong format", () => {
        expect(() => loginFn("user3.com", "password3")).toThrow("Invalid email format");
    });

    test("Should throw error if email has empty spaces", () => {
        expect(() => loginFn("user3@gmail.com ", "password3")).toThrow("Email cannot have empty space");
    });

    test("Should throw error if email has empty spaces", () => {
        expect(() => loginFn("user3@gmail.com", "password3 ")).toThrow("Password cannot have empty space");
    });

    test("Should throw error if email is too long", () => {
        expect(() => loginFn("user3@gmail.comasasasasasasasaasasasasasas.com", "password3")).toThrow("Email is too long");
    });

    test("Should throw error if password not provided", () => {
        expect(() => loginFn("user3@gmail.com", "")).toThrow("Password is required");
    });
});





