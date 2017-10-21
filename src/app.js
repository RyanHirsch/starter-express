import path from 'path';
import express from 'express';
import compression from 'compression';
import cors from 'cors';
import serveStatic from 'serve-static';
import morgan from 'morgan';

import { stream } from './logger';
import api from './routes/api';

const app = express();

app.use(morgan('combined', { stream }));
app.use(cors());
app.use(compression());
app.use(serveStatic(path.resolve(__dirname, '..', 'public')));

app.use('/api', api);
app.get('/', (req, res) => {
  res.json({ alive: true });
});

export default app;
