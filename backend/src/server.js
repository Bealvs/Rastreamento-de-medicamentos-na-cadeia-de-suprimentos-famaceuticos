import dotenv from 'dotenv';
dotenv.config();

import App from './app.js';

const PORT = process.env.PORT || 5000;
const server = new App();
server.listen(PORT);
