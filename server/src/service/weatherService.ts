import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object
interface Weather {
  temperature: number;
  description: string;
  icon: string;
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL: string = 'https://api.openweathermap.org';
  private apiKey: string | undefined = process.env.API_KEY;

  // TODO: Create fetchLocationData method
  private async fetchLocationData(city: string): Promise<Coordinates> {
    const response = await fetch(this.buildGeocodeQuery(city));
    const data = await response.json();
    return this.destructureLocationData(data[0]);
  }

  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: any): Coordinates {
    return { lat: locationData.lat, lon: locationData.lon };
  }

  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(city: string): string {
    return `${this.baseURL}/geo/1.0/direct?q=${city}&appid=${this.apiKey}`;
  }

  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=metric`;
  }

  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(city: string): Promise<Coordinates> {
    const response = await fetch(this.buildGeocodeQuery(city));
    const data = await response.json();
    return this.destructureLocationData(data);
  }

  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates): Promise<Weather> {
    const response = await fetch(this.buildWeatherQuery(coordinates));
    const data = await response.json();
    return this.parseCurrentWeather(data);
  }

  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any): Weather {
    return {
      temperature: response.main.temp,
      description: response.weather[0].description,
      icon: response.weather[0].icon,
    };
  }

  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]): Weather[] {
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
  async getWeatherForCity(city: string): Promise<Weather> {
    const coordinates = await this.fetchLocationData(city);
    return await this.fetchWeatherData(coordinates);
  }

  // Example method for additional functionality: getForecast
  async getForecast(city: string): Promise<Weather[]> {
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
