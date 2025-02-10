const {
  validateName,
  validateEmail,
  validateParticipants,
} = require("../registrationForm/formValidation");
const { submitForm } = require("../registrationForm/form");

describe("Validazione Nome", () => {
  test("Dovrebbe accettare un nome valido", () => {
    expect(validateName("Mario")).toBe(true);
  });

  test("Dovrebbe rifiutare un nome troppo corto", () => {
    expect(() => validateName("Ma")).toThrow(
      "Il nome deve essere lungo almeno 3 caratteri"
    );
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
    expect(() => validateParticipants(0)).toThrow(
      "Il numero di partecipanti deve essere tra 1 e 10"
    );
  });

  test("Dovrebbe rifiutare un numero superiore a 10", () => {
    expect(() => validateParticipants(11)).toThrow(
      "Il numero di partecipanti deve essere tra 1 e 10"
    );
  });

  test("Dovrebbe rifiutare un valore non numerico", () => {
    expect(() => validateParticipants("cinque")).toThrow(
      "Il numero di partecipanti deve essere un numero valido"
    );
  });
});



jest.mock("../registrationForm/formValidation");

describe("Test di Integrazione del Form", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Dovrebbe inviare il form con dati validi", async () => {
    validateName.mockReturnValue(true);
    validateEmail.mockReturnValue(true);
    validateParticipants.mockReturnValue(true);

    const response = await submitForm({
      name: "Mario Rossi",
      email: "test@example.com",
      participants: 5,
    });

    expect(response).toBe("Registrazione completata");
  });

  test("Dovrebbe mostrare errore se il nome è troppo corto", async () => {
    validateName.mockImplementation(() => {
      throw new Error("Il nome deve essere lungo almeno 3 caratteri");
    });

    await expect(
      submitForm({ name: "Ma", email: "test@example.com", participants: 5 })
    ).rejects.toThrow("Il nome deve essere lungo almeno 3 caratteri");
  });

  test("Dovrebbe mostrare errore se l'email è non valida", async () => {
    validateEmail.mockImplementation(() => {
      throw new Error("Email non valida");
    });

    await expect(
      submitForm({
        name: "Mario Rossi",
        email: "testexample.com",
        participants: 5,
      })
    ).rejects.toThrow("Email non valida");
  });

  test("Dovrebbe mostrare errore se il numero di partecipanti è fuori range", async () => {
    validateParticipants.mockImplementation(() => {
      throw new Error("Il numero di partecipanti deve essere tra 1 e 10");
    });

    await expect(
      submitForm({
        name: "Mario Rossi",
        email: "test@example.com",
        participants: 15,
      })
    ).rejects.toThrow("Il numero di partecipanti deve essere tra 1 e 10");
  });
});
