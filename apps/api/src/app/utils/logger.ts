import { createLogger, format, transports } from 'winston';
import * as fs from 'fs';
import  * as DailyRotateFile from 'winston-daily-rotate-file';
import { environment } from "../../../environments/environment";

const dir = '../../../logs';

// create directory if it is not present
if (!fs.existsSync(dir)) {
  // Create the directory if it does not exist
  fs.mkdirSync(dir);
}

const logLevel = environment.production ? 'warn' : 'debug';

const exceptionHandlers : DailyRotateFile = new DailyRotateFile ({
    level                          : logLevel,
    filename                       : dir + '/%DATE%.log',
    datePattern                    : 'YYYY-MM-DD',
    zippedArchive                  : true,
    handleExceptions               : true,
    json                           : true,
    maxSize                        : '20m',
    maxFiles                       : '14d',
});

export default createLogger({
  transports       : [
    new transports.Console({
      stderrLevels: ["info", "error"],
      format: format.combine(format.errors({stack: true}), format.prettyPrint()),
    }),
  ],
  exceptionHandlers: exceptionHandlers,
  exitOnError      : false, // do not exit on handled exceptions
});
