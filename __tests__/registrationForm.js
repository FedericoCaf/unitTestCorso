const {
  validateName,
  validateEmail,
  validateParticipants,
} = require("../registrationForm/formValidation");

describe("Validazione Nome", () => {
  xtest("Dovrebbe accettare un nome valido", () => {
    expect(validateName("Mario")).toBe(true);
  });

  xtest("Dovrebbe rifiutare un nome troppo corto", () => {
    expect(() => validateName("Ma")).toThrow(
      "Il nome deve essere lungo almeno 3 caratteri"
    );
  });

  xtest("Dovrebbe accettare nomi con spazi", () => {
    expect(validateName("Mario Rossi")).toBe(true);
  });
});

describe("Validazione Email", () => {
  xtest("Dovrebbe accettare un'email valida", () => {
    expect(validateEmail("email@mail.com")).toBe(true);
  });

  xtest("Dovrebbe rifiutare un'email senza @", () => {
    expect(() => validateEmail("mail.com")).toThrow("Email non valida");
  });

  xtest("Dovrebbe rifiutare un'email senza dominio", () => {
    expect(() => validateEmail("email@.com")).toThrow("Email non valida");
  });

  xtest("Dovrebbe accettare email con sottodomini", () => {
    expect(validateEmail("xtest@mail.co.uk")).toBe(true);
  });
});

describe("Validazione Numero di Partecipanti", () => {
  xtest("Dovrebbe accettare un numero valido", () => {
    expect(validateParticipants(5)).toBe(true);
  });

  xtest("Dovrebbe rifiutare un numero inferiore a 1", () => {
    expect(() => validateParticipants(0)).toThrow(
      "Il numero di partecipanti deve essere tra 1 e 10"
    );
  });

  xtest("Dovrebbe rifiutare un numero superiore a 10", () => {
    expect(() => validateParticipants(11)).toThrow(
      "Il numero di partecipanti deve essere tra 1 e 10"
    );
  });

  xtest("Dovrebbe rifiutare un valore non numerico", () => {
    expect(() => validateParticipants("cinque")).toThrow(
      "Il numero di partecipanti deve essere un numero valido"
    );
  });

  xtest("Dovrebbe rifiutare numeri con decimali", () => {
    expect(() => validateParticipants(3.5)).toThrow(
      "Il numero di partecipanti deve essere un numero valido"
    );
  });
});
