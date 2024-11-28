import dotenv from 'dotenv';
dotenv.config();
// TODO: Complete the WeatherService class
class WeatherService {
    constructor() {
        // TODO: Define the baseURL, API key, and city name properties
        this.baseURL = 'https://api.openweathermap.org';
        this.apiKey = process.env.API_KEY;
    }
    // TODO: Create fetchLocationData method
    async fetchLocationData(city) {
        const response = await fetch(this.buildGeocodeQuery(city));
        const data = await response.json();
        return this.destructureLocationData(data[0]);
    }
    // TODO: Create destructureLocationData method
    destructureLocationData(locationData) {
        return { lat: locationData.lat, lon: locationData.lon };
    }
    // TODO: Create buildGeocodeQuery method
    buildGeocodeQuery(city) {
        return `${this.baseURL}/geo/1.0/direct?q=${city}&appid=${this.apiKey}`;
    }
    // TODO: Create buildWeatherQuery method
    buildWeatherQuery(coordinates) {
        return `${this.baseURL}/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=metric`;
    }
    // TODO: Create fetchAndDestructureLocationData method
    async fetchAndDestructureLocationData(city) {
        const response = await fetch(this.buildGeocodeQuery(city));
        const data = await response.json();
        return this.destructureLocationData(data);
    }
    // TODO: Create fetchWeatherData method
    async fetchWeatherData(coordinates) {
        const response = await fetch(this.buildWeatherQuery(coordinates));
        const data = await response.json();
        return this.parseCurrentWeather(data);
    }
    // TODO: Build parseCurrentWeather method
    parseCurrentWeather(response) {
        return {
            temperature: response.main.temp,
            description: response.weather[0].description,
            icon: response.weather[0].icon,
        };
    }
    // TODO: Complete buildForecastArray method
    buildForecastArray(currentWeather, weatherData) {
        return [
            {
                temperature: currentWeather.temperature,
                description: `Current: ${currentWeather.description}`,
                icon: currentWeather.icon,
            },
            ...weatherData.map((forecast) => ({
                temperature: forecast.main.temp,
                description: forecast.weather[0].description,
                icon: forecast.weather[0].icon,
            })),
        ];
    }
    // TODO: Complete getWeatherForCity method
    async getWeatherForCity(city) {
        const coordinates = await this.fetchLocationData(city);
        return await this.fetchWeatherData(coordinates);
    }
    // Example method for additional functionality: getForecast
    async getForecast(city) {
        const coordinates = await this.fetchAndDestructureLocationData(city);
        const currentWeather = await this.fetchWeatherData(coordinates);
        // Example: Simulated forecast data
        const fakeForecastData = [
            { main: { temp: currentWeather.temperature + 1 }, weather: [{ description: 'Partly Cloudy', icon: '02d' }] },
            { main: { temp: currentWeather.temperature + 2 }, weather: [{ description: 'Rain Showers', icon: '09d' }] },
        ];
        return this.buildForecastArray(currentWeather, fakeForecastData);
    }
}
export default new WeatherService();
