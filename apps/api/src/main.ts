/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import app from './app/app';

const APP_PORT = process.env.port || 3333

app
  .listen(APP_PORT, () => {
    console.log(`server running on port : ${APP_PORT}`);
  })
  .on('error', (e) => console.error(e));
