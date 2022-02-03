require('dotenv-safe').config();
import cors from 'cors';
import express from 'express';

import routes from './routes';

import { corsOptions } from './config/cors';
import { logSuccess } from './config/logColors';

const app = express();

app.use(express.static('public'));

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`
 /$$$$$$$                                                              /$$    
 | $$__  $$                                                            | $$    
 | $$  \\ $$ /$$$$$$   /$$$$$$$ /$$$$$$$  /$$$$$$   /$$$$$$   /$$$$$$  /$$$$$$  
 | $$$$$$$/|____  $$ /$$_____//$$_____/ /$$__  $$ /$$__  $$ /$$__  $$|_  $$_/  
 | $$____/  /$$$$$$$|  $$$$$$|  $$$$$$ | $$  \\ $$| $$  \\ $$| $$  \\__/  | $$    
 | $$      /$$__  $$ \\____  $$\\____  $$| $$  | $$| $$  | $$| $$        | $$ /$$
 | $$     |  $$$$$$$ /$$$$$$$//$$$$$$$/| $$$$$$$/|  $$$$$$/| $$        |  $$$$/
 |__/      \\_______/|_______/|_______/ | $$____/  \\______/ |__/         \\___/  
                                       | $$                                    
                                       | $$                                    
                                       |__/                                    
  `);
  logSuccess('Passport Authentication Server v0.1.0');
  logSuccess(`App started @ localhost:${port}`);
});
