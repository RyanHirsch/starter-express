import app from './app';
import config from './config';
import logger from './logger';

function started(err) {
  if (err) {
    console.error(err);
    throw err;
  }
  logger.info('Up and running', this.address().port);
}

app.listen(config.port, started);
