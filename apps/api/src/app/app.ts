import * as express from 'express';
import { Application } from 'express';
import * as bodyParser from 'body-parser';

import { MainRouter } from './routes';
import middlewareLogger from './config/middleware-logger';
import { catch404, errorHandler } from './config/error-handling';
import session from './config/session';
import "./config/passport"; // Passport configuration

const app: Application = express();

app.use(middlewareLogger);
//app.use(helmet());
//app.use(compression());
app.use(bodyParser.json());

app.use(session);
app.use('/api', MainRouter);

app.use(catch404)
app.use(errorHandler)


export default app;
