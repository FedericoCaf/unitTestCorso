const {
  validateName,
  validateEmail,
  validateParticipants,
} = require("./formValidation");

async function submitForm({ name, email, participants }) {
  try {
    validateName(name);
    validateEmail(email);
    validateParticipants(participants);

    // Chiamata API 
    return "Registrazione completata";
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { submitForm };
