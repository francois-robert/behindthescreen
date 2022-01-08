import * as mongoose from 'mongoose';
import logger from "./utils/logger";
import { environment } from "../../environments/environment";

const dbURI = environment.mongodb_uri

const options = {
  useNewUrlParser   : true,
  useUnifiedTopology: true,
  autoIndex         : true,
  connectTimeoutMS  : 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS   : 45000, // Close sockets after 45 seconds of inactivity
};

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
    logger.info('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
    logger.error('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
    logger.info('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    logger.info('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});


export function connectDB() : Promise<typeof import("mongoose")> {
  logger.debug(dbURI);

  // Create the database connection
  return mongoose.connect(dbURI, options)
}

export function disconnectDB() : Promise<void> {
  return mongoose.connection.close()
}