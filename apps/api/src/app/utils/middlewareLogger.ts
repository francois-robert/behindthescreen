import { format, transports } from 'winston';
import { logger } from'express-winston';


const config = {
    transports: [
      new transports.Console()
    ],
    format: format.combine(
      format.colorize(),
      format.json()
    ),
    meta: false,
    msg: "HTTP  ",
    expressFormat: true,
    colorize: false,
    ignoreRoute: () => { return false; }
  }

export default logger(config)