const { validateName } = require("../registrationForm/formValidation");

describe("Validazione Nome", () => {
    test("Dovrebbe accettare un nome valido", () => {
        expect(validateName("Mario")).toBe(true);
    });

    test("Dovrebbe rifiutare un nome troppo corto", () => {
        expect(() => validateName("M")).toThrow("Il nome deve essere lungo almeno 2 caratteri");
    });
});