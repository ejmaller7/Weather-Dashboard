import fs from 'node:fs/promises';

// Define a City class with name and id properties
class City {
  constructor(public id: string, public name: string) {}
}

class HistoryService {
  private async read(): Promise<City[]> {
    const data = await fs.readFile('searchHistory.json', 'utf-8');
    return JSON.parse(data) || [];
  }

  private async write(cities: City[]) {
    await fs.writeFile('searchHistory.json', JSON.stringify(cities, null, 2));
  }

  async getCities(): Promise<City[]> {
    return await this.read();
  }

  async addCity(city: string): Promise<void> {
    const cities = await this.read();
    const id = (Math.random() * 100000).toFixed(0); // Generate unique ID
    cities.push(new City(id, city));
    await this.write(cities);
  }

  async removeCity(id: string): Promise<void> {
    const cities = await this.read();
    const updatedCities = cities.filter((city) => city.id !== id);
    await this.write(updatedCities);
  }
}

export default new HistoryService();
