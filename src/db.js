import mongoose from 'mongoose';
import config from './config';
import logger from './logger';

mongoose.Promise = global.Promise;

setTimeout(() => {
  const db = mongoose.connect(`mongodb://${config.db}/test`, {
    useMongoClient: true,
  });
  db.then(() => logger.info('Connected!'), err => logger.error(`connection error: ${err}`));
}, 3000);
