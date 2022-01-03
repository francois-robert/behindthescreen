import * as express from 'express';
import { Application } from 'express';
import { MainRouter } from './routes';
import './db'; // initialize database


const app: Application = express();

app.use('/api', MainRouter);


export default app;
