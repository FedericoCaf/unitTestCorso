const { validateName, validateEmail, validateParticipants } = require("../registrationForm/formValidation");

describe("Validazione Nome", () => {
    test("Dovrebbe accettare un nome valido", () => {
        expect(validateName("Mario")).toBe(true);
    });

    test("Dovrebbe rifiutare un nome troppo corto", () => {
        expect(() => validateName("Ma")).toThrow("Il nome deve essere lungo almeno 3 caratteri");
    });
});

describe("Validazione Email", () => {
    test("Dovrebbe accettare un'email valida", () => {
        expect(validateEmail("email@mail.com")).toBe(true);
    });

    test("Dovrebbe rifiutare un'email senza @", () => {
        expect(() => validateEmail("mail.com")).toThrow("Email non valida");
    });

    test("Dovrebbe rifiutare un'email senza dominio", () => {
        expect(() => validateEmail("email@.com")).toThrow("Email non valida");
    });
});

describe("Validazione Numero di Partecipanti", () => {
    test("Dovrebbe accettare un numero valido", () => {
        expect(validateParticipants(5)).toBe(true);
    });

    test("Dovrebbe rifiutare un numero inferiore a 1", () => {
        expect(() => validateParticipants(0)).toThrow("Il numero di partecipanti deve essere tra 1 e 10");
    });

    test("Dovrebbe rifiutare un numero superiore a 10", () => {
        expect(() => validateParticipants(11)).toThrow("Il numero di partecipanti deve essere tra 1 e 10");
    });

    test("Dovrebbe rifiutare un valore non numerico", () => {
        expect(() => validateParticipants("cinque")).toThrow("Il numero di partecipanti deve essere un numero valido");
    });
});