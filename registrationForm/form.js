const {
  validateName,
  validateEmail,
  validateParticipants,
} = require("./formValidation");

async function submitForm({ name, email, participants }) {
  validateName(name);
  validateEmail(email);
  validateParticipants(participants);

  try {
    const response = await fakeApiCall({ name, email, participants });
    return response;
  } catch (error) {
    throw new Error("Errore di rete: " + error.message);
  }
}

// Simuliamo una chiamata API
async function fakeApiCall(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Registrazione completata");
    }, 500);
  });
}

module.exports = { submitForm };
