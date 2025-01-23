const { describe } = require("node:test");

const getWeather = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY`
    );
    if (!response.ok) {
      throw new Error("Errore durante la connessione all'API");
    }
    const data = await response.json();
    return {
      city: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
    };
  } catch (error) {
    throw new Error(error.message || "Errore durante la connessione all'API");
  }
};

global.fetch = jest.fn();

describe("Weather Service", () => {
  test("Should fetch weather data successfully", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        name: "Rome",
        main: { temp: 295.15 },
        weather: [{ description: "clear sky" }],
      }),
    });
    const weatherData = await getWeather("Rome");
    expect(weatherData).toEqual({
      city: "Rome",
      temperature: 295.15,
      description: "clear sky",
    });
  });

  test("Should handle API errors", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });
    await expect(getWeather("Rome")).rejects.toThrow(
      "Errore durante la connessione all'API"
    );
  });

  test("Should handle network errors", async () => {
    fetch.mockRejectedValueOnce(new Error("Network Error"));
    await expect(getWeather("Rome")).rejects.toThrow("Network Error");
  });
});

module.exports = getWeather;
