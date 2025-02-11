const { submitForm } = require("../registrationForm/form");

// Mock delle funzioni di validazione
jest.mock("../registrationForm/formValidation", () => ({
  validateName: jest.fn(),
  validateEmail: jest.fn(),
  validateParticipants: jest.fn(),
}));

const {
  validateName,
  validateEmail,
  validateParticipants,
} = require("../registrationForm/formValidation");

describe("Test di Integrazione del Form", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  xtest("Dovrebbe inviare il form con dati validi", async () => {
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

  xtest("Dovrebbe mostrare errore se il nome è troppo corto", async () => {
    validateName.mockImplementation(() => {
      throw new Error("Il nome deve essere lungo almeno 3 caratteri");
    });

    await expect(
      submitForm({ name: "Ma", email: "xtest@example.com", participants: 5 })
    ).rejects.toThrow("Il nome deve essere lungo almeno 3 caratteri");
  });

  xtest("Dovrebbe mostrare errore se l'email è non valida", async () => {
    validateName.mockReturnValue(true);
    validateParticipants.mockReturnValue(true);
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
  

  xtest("Dovrebbe mostrare errore se il numero di partecipanti è fuori range", async () => {
    validateName.mockReturnValue(true);
    validateEmail.mockReturnValue(true);
    validateParticipants.mockImplementation(() => {
      throw new Error("Il numero di partecipanti deve essere tra 1 e 10");
    });
  
    await expect(
      submitForm({
        name: "Mario Rossi",
        email: "xtest@example.com",
        participants: 15,
      })
    ).rejects.toThrow("Il numero di partecipanti deve essere tra 1 e 10");
  });
  

  // xtest("Dovrebbe gestire un errore di rete", async () => {
  //   jest.spyOn(global, "fetch").mockRejectedValue(new Error("Errore di rete"));

  //   await expect(
  //     submitForm({
  //       name: "Mario Rossi",
  //       email: "test@example.com",
  //       participants: 5,
  //     })
  //   ).rejects.toThrow("Errore di rete");

  //   global.fetch.mockRestore();
  // });
});
