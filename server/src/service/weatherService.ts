import dotenv from 'dotenv';
import historyService from './historyService.js';
import { join } from 'path';
dotenv.config({
    path: join(process.cwd(), '../.env')
});

// TODO: Define an interface for the Coordinates object
interface Coordinates {
	name: string;
	lat: number;
	lon: number;
	country: string;
	state: string;
}

// TODO: Define a class for the Weather object
class Weather {
	readonly city: string;
	readonly date: string;
	readonly icon: string;
	readonly iconDescription: string;
	readonly tempF: string;
	readonly windSpeed: string;
	readonly humidity: string;

	constructor(city: string, data: any) {
		this.city = city;
		this.date = data.dt_txt.split(' ')[0];
		this.icon = data.weather[0].icon;
		this.iconDescription = data.weather[0].description;
		this.tempF = data.main.temp;
		this.windSpeed = data.wind.speed;
		this.humidity = data.main.humidity;
	}
}

// TODO: Complete the WeatherService class
class WeatherService {
	// TODO: Define the baseURL, API key, and city name properties
	private readonly baseURL: string = process.env.API_BASE_URL!;
	private readonly apiKey: string = process.env.API_KEY!;
	private city: string = '';
	private location: Coordinates = { country: 'US', lat: 0, lon: 0, name: '', state: '' };

	// TODO: Create fetchLocationData method
	private async fetchLocationData(query: string) {
		return fetch(query);
	}

	// TODO: Create destructureLocationData method
	private destructureLocationData(locationData: Coordinates): Coordinates {
		this.location = { ...locationData };
		return this.location;
	}

	// TODO: Create buildGeocodeQuery method
	private buildGeocodeQuery(): string {
		return this.baseURL + `/geo/1.0/direct?q=${this.city},US&appid=` + this.apiKey;
	}

	// TODO: Create buildWeatherQuery method
	private buildWeatherQuery(coordinates: Coordinates): string {
		return this.baseURL + `/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=` + this.apiKey;
	}

	// TODO: Create fetchAndDestructureLocationData method
	private async fetchAndDestructureLocationData() {
		const query = this.buildGeocodeQuery();
		const response = await this.fetchLocationData(query);
		const json = await response.json();
		const data: Array<Coordinates> = await json;

		this.destructureLocationData(data[0]);
	}

	// TODO: Create fetchWeatherData method
	private async fetchWeatherData(coordinates: Coordinates) {
		return fetch(this.buildWeatherQuery(coordinates));
	}

	// TODO: Build parseCurrentWeather method
	private async parseCurrentWeather(response: any) {
		const json = await response.json();
		const data = await json;

		return { currentWeather: new Weather(this.city, data.list[0]), data };
	}

	// TODO: Complete buildForecastArray method
	private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
		const forecast: Array<Weather> = [];

		for (const weather of weatherData) {
			if (forecast.find((f) => f.date === weather.dt_txt.split(' ')[0])) continue;
			forecast.push(new Weather(this.city, weather));

			if (forecast.length >= 5) break;
		}

		return { currentWeather, forecast };
	}

	// TODO: Complete getWeatherForCity method
	async getWeatherForCity(city: string) {
		this.city = city.replace(' ', '');
		this.fetchAndDestructureLocationData();
		const response = await this.fetchWeatherData(this.location);

		const { currentWeather, data } = await this.parseCurrentWeather(response);
		const { forecast } = this.buildForecastArray(currentWeather, data.list);

		await historyService.addCity(city);

		return [currentWeather, ...forecast];
	}
}

export default new WeatherService();
