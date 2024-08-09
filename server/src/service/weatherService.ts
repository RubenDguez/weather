import dotenv from 'dotenv';
import historyService from './historyService.js';
import { join } from 'path';
dotenv.config({
	path: join(process.cwd(), '../.env'),
});

interface Coordinates {
	name: string;
	lat: number;
	lon: number;
	country: string;
	state: string;
}

/** Class Weather */
class Weather {
	/**
	 * Constructor
	 * @param {string} city
	 * @param {string} date
	 * @param {string} icon
	 * @param {string} iconDescription
	 * @param {string} tempF
	 * @param {string} windSpeed
	 * @param {string} humidity
	 */
	constructor(
		public city: string,
		public date: string,
		public icon: string,
		public iconDescription: string,
		public tempF: string,
		public windSpeed: string,
		public humidity: string,
	) {}
}

/** Class Weather Service */
class WeatherService {
	private readonly baseURL: string = process.env.API_BASE_URL!;
	private readonly apiKey: string = process.env.API_KEY!;
	private CITY: string = '';
	private LOCATION: Coordinates = { country: 'US', lat: 0, lon: 0, name: '', state: '' };

	/**
	 * Get Current Date
	 * @param {number} dt_sec - Date in seconds
	 * @return {string}
	 * @description - Get the current date in the format of YYYY-MM-DD
	 */
	private getCurrentDate(dt_sec: number): string {
		const date = new Date(dt_sec * 1000);
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
		return `${year}-${month}-${day}`;
	}

	/**
	 * Fetch Location Data
	 * @param {string} query
	 * @return {Promise<Response>}
	 */
	private async fetchLocationData(query: string): Promise<Response> {
		return fetch(query);
	}

	/**
	 * Destructure Location Data
	 * @param {Coordinates} locationData
	 * @return {Coordinates}
	 */
	private destructureLocationData(locationData: Coordinates): Coordinates {
		this.LOCATION = { ...locationData };
		return this.LOCATION;
	}

	/**
	 * Build Geocode Query
	 * @return {string}
	 */
	private buildGeocodeQuery(): string {
		return this.baseURL + `/geo/1.0/direct?q=${this.CITY},US&appid=` + this.apiKey;
	}

	/**
	 * Build Weather Query
	 * @param {Coordinates} coordinates
	 * @return {{ currentWeatherQuery: string; forecastWeatherQuery: string }}
	 */
	private buildWeatherQuery(coordinates: Coordinates): { currentWeatherQuery: string; forecastWeatherQuery: string } {
		const currentWeatherQuery = this.baseURL + `/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=` + this.apiKey;
		const forecastWeatherQuery = this.baseURL + `/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=` + this.apiKey;

		return { currentWeatherQuery, forecastWeatherQuery };
	}

	/**
	 * Fetch And Destructure Location Data
	 * @return {Promise<void>}
	 */
	private async fetchAndDestructureLocationData(): Promise<void> {
		const query = this.buildGeocodeQuery();
		const response = await this.fetchLocationData(query);
		const json = await response.json();
		const data: Array<Coordinates> = await json;

		this.destructureLocationData(data[0]);
	}

	/**
	 * Fetch Weather Data
	 * @param {Coordinates} coordinates
	 * @return {Promise<{ currentWeatherData: any; forecastData: any; }>}
	 */
	private async fetchWeatherData(coordinates: Coordinates): Promise<{ currentWeatherData: any; forecastData: any }> {
		const currentWeatherResponse = await fetch(this.buildWeatherQuery(coordinates).currentWeatherQuery);
		const forecastResponse = await fetch(this.buildWeatherQuery(coordinates).forecastWeatherQuery);
		const currentWeatherData = await currentWeatherResponse.json();
		const forecastData = await forecastResponse.json();

		return { currentWeatherData, forecastData };
	}

	/**
	 * Parse Current Weather Data
	 * @param {*} currentWeatherData
	 * @return {Promise<Weather>}
	 */
	private async parseCurrentWeather(currentWeatherData: any): Promise<Weather> {
		return new Weather(
			this.CITY,
			this.getCurrentDate(currentWeatherData.dt),
			currentWeatherData.weather[0].icon,
			currentWeatherData.weather[0].description,
			currentWeatherData.main.temp,
			currentWeatherData.wind.speed,
			currentWeatherData.main.humidity,
		);
	}

	/**
	 * Build Forecast Array
	 * @param {Array<any>} weatherData
	 * @return {Array<Weather>}
	 */
	private buildForecastArray(weatherData: Array<any>): Array<Weather> {
		const forecast: Array<Weather> = new Array();

		for (const weather of weatherData) {
			if (forecast.find((f) => f.date === weather.dt_txt.split(' ')[0])) continue;

			forecast.push(
				new Weather(
					this.CITY,
					weather.dt_txt.split(' ')[0],
					weather.weather[0].icon,
					weather.weather[0].iconDescription,
					weather.main.temp,
					weather.wind.speed,
					weather.main.humidity,
				),
			);

			if (forecast.length >= 5) break;
		}

		return forecast;
	}

	/**
	 * Get Weather For City
	 * @param {string} city
	 * @return {Promise<Array<Weather>>}
	 */
	async getWeatherForCity(city: string): Promise<Array<Weather>> {
		this.CITY = city;
		this.fetchAndDestructureLocationData();
		const { currentWeatherData, forecastData } = await this.fetchWeatherData(this.LOCATION);

		const currentWeather = await this.parseCurrentWeather(currentWeatherData);
		const forecast = this.buildForecastArray(forecastData.list);

		await historyService.addCity(city);

		return [currentWeather, ...forecast];
	}
}

export default new WeatherService();
