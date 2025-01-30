const fetch = require("node-fetch");

const API_KEY = "chiaveAPI"; // Legge l'API Key dal file .env
const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast"; // API per previsioni a 3 giorni

/**
 * Valida se il nome della città è corretto.
 * Accetta solo lettere e spazi (no numeri o caratteri speciali).
 * @param {string} city - Nome della città da validare
 * @returns {boolean} - True se valido, false altrimenti
 */
const validateCity = (city) => {
    return typeof city === "string" && /^[a-zA-Zàèìòùé]+$/.test(city);
};

/**
 * Recupera i dati meteo da OpenWeatherMap.
 * @param {string} city - Nome della città
 * @returns {Promise<object>} - Oggetto con i dati meteo
 * @throws {Error} - Se l'input non è valido o l'API restituisce un errore
 */
const getWeather = async (city) => {    
    if (!validateCity(city)) {
        throw new Error("Nome città non valido. Inserisci solo lettere.");
    }
    try {
        const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=it`);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("Città non trovata.");
            }
            throw new Error("Errore nella richiesta API.");
        }
        const data = await response.json();
        const currentWeather = data.list[0];
        
        return {
            città: data.city.name,
            temperatura: `${currentWeather.main.temp}°C`,
            umidità: `${currentWeather.main.humidity}%`,
            descrizione: currentWeather.weather[0].description,
            vento: `${currentWeather.wind.speed} m/s`,
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = { validateCity, getWeather };
