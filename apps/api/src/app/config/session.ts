import * as session from 'express-session';
import { environment } from "../../../environments/environment";

export default session({
    name : 'app.sid',
    secret: environment.session_secret,
    cookie: {
        maxAge: 60000
      },
    store: new session.MemoryStore(),
    resave: false,
    saveUninitialized: false
  });
