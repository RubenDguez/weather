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

app.use(express.static(dist));
app.use(express.json());
app.use(routes);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
