import * as express from 'express';
import { Application } from 'express';
import * as bodyParser from 'body-parser';

import { MainRouter } from './routes';
import middlewareLogger from './utils/middlewareLogger';
import { loadErrorHandlers } from './utils/error-handling';
import session from './utils/session';

import './db'; // initialize database
// Passport configuration
import "./utils/passport";

const app: Application = express();

app.use(middlewareLogger);
//app.use(helmet());
//app.use(compression());
app.use(bodyParser.json());

app.use(session);
app.use('/api', MainRouter);

loadErrorHandlers(app);


export default app;
