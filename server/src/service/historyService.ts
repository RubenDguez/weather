import { readFile, writeFile } from 'fs/promises';
import * as uuid from 'uuid';

/** Class City */
class City {
	id: string;
	name: string;

	/**
	 * Constructor
	 * @param {string} name
	 */
	constructor(name: string) {
		this.id = uuid.v4();
		this.name = name;
	}
}

/** History Service */
class HistoryService {
	private readonly DB_URL = `${process.cwd()}/db/db.json`;

	/**
	 * Read
	 * @return {Promise<Array<City>>}
	 */
	private async read(): Promise<Array<City>> {
		const cities = await readFile(this.DB_URL, { encoding: 'utf-8' });

		return JSON.parse(cities);
	}

	/**
	 * Write
	 * @param {Array<City>} cities
	 * @return {Promise<void>}
	 */
	private async write(cities: Array<City>): Promise<void> {
		await writeFile(this.DB_URL, JSON.stringify(cities, null, 4), { encoding: 'utf-8' });
	}

	/**
	 * Get Cities
	 * @return {Promise<Array<City>>}
	 */
	async getCities(): Promise<Array<City>> {
		const cities: Array<City> = await this.read();
		await this.write(cities);

		return cities;
	}

	/**
	 * Add City
	 * @param {string} city
	 * @return {Promise<void>}
	 */
	async addCity(city: string): Promise<void> {
		const cities = await this.getCities();

		if (cities.find((c) => c.name === city)) return;

		cities.push(new City(city));
		await this.write(cities);
	}

	/**
	 * Remove City
	 * @param {string} id
	 * @return {Promise<void>}
	 */
	async removeCity(id: string): Promise<void> {
		const cities = await this.getCities();
		const filteredCities = cities.filter((c) => c.id !== id);
		await this.write(filteredCities);
	}
}

export default new HistoryService();
