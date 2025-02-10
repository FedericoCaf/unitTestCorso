function validateName(name) {
  if (typeof name !== "string" || name.length < 3) {
    throw new Error("Il nome deve essere lungo almeno 3 caratteri");
  }
  return true;
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Email non valida");
  }
  return true;
}

function validateParticipants(participants) {
  if (typeof participants !== "number" || !Number.isInteger(participants)) {
    throw new Error("Il numero di partecipanti deve essere un numero valido");
  }
  if (participants < 1 || participants > 10) {
    throw new Error("Il numero di partecipanti deve essere tra 1 e 10");
  }
  return true;
}

module.exports = { validateName, validateEmail, validateParticipants };
