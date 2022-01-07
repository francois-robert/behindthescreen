/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import app from './app/app';
import { connectDB } from './app/db';
import logger from './app/utils/logger';

connectDB().then(() => {
    logger.info('Mongoose connection done');
  })
  .catch((e) => {
    logger.info('Mongoose connection error');
    logger.error(e);
  });;

const APP_PORT = process.env.APP_PORT || 3333

app
  .listen(APP_PORT, () => {
    logger.info(`server running on port : ${APP_PORT}`);
  })
  .on('error', (e) => console.error(e));