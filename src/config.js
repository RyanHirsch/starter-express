import env from 'dotenv';

env.config();

export default {
  port: process.env.PORT,
  db: process.env.DB,
};

export function isTest() {
  return /^test$/i.test(process.env.NODE_ENV);
}

export function isDev() {
  return /^development$/i.test(process.env.NODE_ENV);
}
