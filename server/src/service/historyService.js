import fs from 'node:fs/promises';
// Define a City class with name and id properties
class City {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
class HistoryService {
    async read() {
        const data = await fs.readFile('searchHistory.json', 'utf-8');
        return JSON.parse(data) || [];
    }
    async write(cities) {
        await fs.writeFile('searchHistory.json', JSON.stringify(cities, null, 2));
    }
    async getCities() {
        return await this.read();
    }
    async addCity(city) {
        const cities = await this.read();
        const id = (Math.random() * 100000).toFixed(0); // Generate unique ID
        cities.push(new City(id, city));
        await this.write(cities);
    }
    async removeCity(id) {
        const cities = await this.read();
        const updatedCities = cities.filter((city) => city.id !== id);
        await this.write(updatedCities);
    }
}
export default new HistoryService();
