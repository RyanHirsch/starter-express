import mongoose from 'mongoose';
import config from './config';
import logger from './logger';

mongoose.Promise = global.Promise;

const db = mongoose.createConnection(`mongodb://${config.db.address}/${config.db.collection}`, {
  useMongoClient: true,
});
db.then(() => logger.info('Connected!'), err => logger.error(`connection error: ${err}`));
export default db;
