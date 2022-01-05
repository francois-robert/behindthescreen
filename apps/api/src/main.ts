/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import app from './app/app';
import logger from './app/utils/logger';

const APP_PORT = process.env.PORT || 3333

app
  .listen(APP_PORT, () => {
    logger.info(`server running on port : ${APP_PORT}`);
  })
  .on('error', (e) => console.error(e));
