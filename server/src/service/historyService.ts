import { readFile, writeFile } from 'fs/promises';
import * as uuid from 'uuid';

class City {
  id: string;
  name: string;

  constructor(name: string) {
    this.id = uuid.v4();
    this.name = name;
  }
}

class HistoryService {
  private readonly DB_URL = `${process.cwd()}/db/db.json`;

  private async read(): Promise<Array<City>> {
    const cities = await readFile(this.DB_URL, {encoding: 'utf-8'});

    return JSON.parse(cities);
  }

  private async write(cities: City[]) {
    await writeFile(this.DB_URL, JSON.stringify(cities, null, 4), {encoding: 'utf-8'});
  }

  async getCities(): Promise<Array<City>> {
    const cities: Array<City> = await this.read();
    await this.write(cities);

    return cities;
  }

  async addCity(city: string) {
    const cities = await this.getCities();

    if (cities.find((c) => (c.name === city))) return;

    cities.push(new City(city));
    await this.write(cities);
  }

  async removeCity(id: string) {
    const cities = await this.getCities();
    const filteredCities = cities.filter((c) => (c.id !== id));
    await this.write(filteredCities);
  }
}

export default new HistoryService();
