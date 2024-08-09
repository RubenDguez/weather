![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![OpenWeatherAPI](https://img.shields.io/badge/-Open_Weather_API-%23FCC771?style=for-the-badge&logoColor=black)
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)
[![Licence](https://img.shields.io/github/license/Ileriayo/markdown-badges?style=for-the-badge)](./LICENSE)

# Weather Dashboard

## Description

The Weather Dashboard is a web application that allows travelers to view current and future weather conditions for multiple cities. This app helps users plan their trips accordingly by providing a 5-day weather forecast. The application uses the OpenWeather API to retrieve weather data and stores the user's search history in a JSON file.

## Features

- **Search Functionality**: Users can search for a city and view current and future weather conditions.
- **Weather Display**: The app displays the city name, current date, temperature, humidity, wind speed, and an icon representing the weather conditions.
- **5-Day Forecast**: Users can view a 5-day weather forecast with temperature, humidity, wind speed, and weather icons.
- **Search History**: Previously searched cities are saved and can be clicked on to view their weather conditions again.
- **Delete Functionality (Bonus)**: Users can delete cities from their search history.

## Technologies Used

- **HTML/CSS**: For structuring and styling the application.
- **JavaScript**: For handling client-side logic and making API requests.
- **Node.js & Express**: For building the backend and handling API routes.
- **OpenWeather API**: For fetching weather data.
- **Render**: For deploying the application.

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/RubenDguez/weather.git
   ```
2. Navigate to the project directory:
   ```bash
   cd weather
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add your OpenWeather API key:
   ```
   API_BASE_URL=https://api.openweathermap.org
   API_KEY=your_api_key_here
   ```
5. Run the application locally:
   ```bash
   npm run start:dev
   ```
6. Open your browser and go to `http://localhost:3000` to view the app.

## API Routes

- **GET /api/weather/history**: Returns all saved cities from `searchHistory.json`.
- **POST /api/weather**: Receives a city name, saves it to `searchHistory.json`, and returns the weather data.
- **DELETE /api/weather/history/:id**: Deletes a city from `searchHistory.json` by its unique id.

## Deployment

The application is deployed on Render. You can view it live [here](https://weather-x3e7.onrender.com).

## License

This project is licensed under the MIT License.

## Credits

- Starter code provided by [Bootcamp](https://bootcamp.com).
- Weather data provided by [OpenWeather API](https://openweathermap.org/api).

## Questions

- If you have further questions, you can contact me at: argenis.dominguez@hotmail.com
- This is my GitHub profile: [RubenDguez](https://github.com/RubenDguez)
