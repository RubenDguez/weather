import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async(req, res) => {
  // TODO: GET weather data from city name
  // TODO: save city to search history

  const currentWeather = await WeatherService.getWeatherForCity(req.body.cityName);
  
  res.status(200).send(currentWeather);
});

// TODO: GET search history
router.get('/history', async (_req, res) => {
  const cities = await HistoryService.getCities();

  res.status(200).send(cities);
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  const id = req.params.id;
  await HistoryService.removeCity(id);
  res.status(300).send();
});

export default router;
