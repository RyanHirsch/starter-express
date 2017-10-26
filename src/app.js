import path from 'path';
import express from 'express';
import compression from 'compression';
import cors from 'cors';
import serveStatic from 'serve-static';
import morgan from 'morgan';

import logger, { stream } from './logger';
import api from './routes/api';

const app = express();

function someAwesomeMiddleware(configurationOptions) {
  logger.debug(`I am not using the options passed: ${configurationOptions}`);
  return (req, resp, next) => {
    req.hi = 'hello';
    next();
  };
}

app.use(morgan('combined', { stream }));
app.use(cors());
app.use(compression());
app.use(serveStatic(path.resolve(__dirname, '..', 'public')));
app.use(someAwesomeMiddleware());
app.use('/api', api);
app.get('/info', (req, res) => {
  res.json({ version: '1.0.0', alive: true });
});

export default app;
