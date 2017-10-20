import fs from 'fs';
import path from 'path';
import env from 'dotenv';

export function isTest() {
  return /^test$/i.test(process.env.NODE_ENV);
}

export function isDev() {
  return /^development$/i.test(process.env.NODE_ENV);
}

if (isTest()) {
  const testConfig = env.parse(fs.readFileSync(path.resolve(__dirname, '..', '.env.test')));
  Object.keys(testConfig).forEach(k => {
    process.env[k] = testConfig[k];
  });
}

env.config();

export default {
  port: process.env.PORT,
  db: {
    address: process.env.DB_ADDRESS,
    collection: process.env.DB_COLLECTION,
  },
};
