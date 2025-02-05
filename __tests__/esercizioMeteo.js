const { validateCity, getWeather } = require("../meteo/meteo")
const fetch = require('node-fetch')

jest.mock('node-fetch', () => jest.fn())

describe("Validazione Input", () => {
    xtest("Accetta nomi di città validi", () => {
        expect(validateCity("Roma")).toBe(true);
        expect(validateCity("Milano")).toBe(true);
    });

    xtest("Rifiuta input non validi", () => {
        expect(validateCity("123")).toBe(false);
        expect(validateCity("Roma123")).toBe(false);
        expect(validateCity("!!?")).toBe(false);
    });
});

describe("Richiesta API", () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    xtest("Restituisce dati meteo validi", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                city: { name: "Roma" },
                list: [
                    {
                        main: { temp: 15, humidity: 80 },
                        weather: [{ description: "parzialmente nuvoloso" }],
                        wind: { speed: 3 },
                    },
                ],
            }),
        });

        const weather = await getWeather("Roma");               
        expect(weather).toEqual({
            città: "Roma",
            temperatura: "15°C",
            umidità: "80%",
            descrizione: "parzialmente nuvoloso",
            vento: "3 m/s",
        });
    });

    xtest("Gestisce città non trovata", async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 404,
        });

        await expect(getWeather("CittàInventata")).rejects.toThrow("Città non trovata.");
    });

    xtest("Gestisce errori di rete", async () => {
        fetch.mockRejectedValueOnce(new Error("Errore di rete"));

        await expect(getWeather("Roma")).rejects.toThrow("Errore di rete");
    });
});
