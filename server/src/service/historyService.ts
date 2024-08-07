import { readFile, writeFile } from 'fs/promises';
import * as uuid from 'uuid';

// TODO: Define a City class with name and id properties
class City {
  id: string;
  name: string;

  constructor(name: string) {
    this.id = uuid.v4();
    this.name = name;
  }
}

// TODO: Complete the HistoryService class
class HistoryService {
  private readonly DB_URL = `${process.cwd()}/db/db.json`;

  // TODO: Define a read method that reads from the searchHistory.json file
  private async read(): Promise<Array<City>> {
    const cities = await readFile(this.DB_URL, {encoding: 'utf-8'});

    return JSON.parse(cities);
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    await writeFile(this.DB_URL, JSON.stringify(cities, null, 4), {encoding: 'utf-8'});
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities(): Promise<Array<City>> {
    const cities: Array<City> = await this.read();
    await this.write(cities);

    return cities;
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    const cities = await this.getCities();

    if (cities.find((c) => (c.name === city))) return;

    cities.push(new City(city));
    await this.write(cities);
  }

  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    const cities = await this.getCities();
    const filteredCities = cities.filter((c) => (c.id !== id));
    await this.write(filteredCities);
  }
}

export default new HistoryService();
