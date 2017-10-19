import winston from 'winston';
import { isTest, isDev } from './config';

winston.emitErrs = true;

const transports = isTest()
  ? []
  : [
      new winston.transports.Console({
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: isDev(),
      }),
    ];

const logger = new winston.Logger({
  transports,
  exitOnError: false,
});

export default logger;
export const stream = {
  write(message) {
    logger.info(message);
  },
};
