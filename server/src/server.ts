import dotenv from 'dotenv';
import express from 'express';
import path, { join } from 'path';

dotenv.config({
    path: join(process.cwd(), '../.env')
});

// Import the routes
import routes from './routes/index.js';

const dist = path.join(process.cwd(), '../client/dist')

const app = express();

const PORT = process.env.PORT || 3001;

// TODO: Serve static files of entire client dist folder
app.use(express.static(dist));

// TODO: Implement middleware for parsing JSON and urlencoded form data
app.use(express.json());

// TODO: Implement middleware to connect the routes
app.use(routes);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
