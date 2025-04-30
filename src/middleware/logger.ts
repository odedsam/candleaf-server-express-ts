import pino from 'pino';
import pinoHttp from 'pino-http';
import fs from 'fs';
import path from 'path';

const isDevelopment = process.env.NODE_ENV !== 'production';

const logFile = fs.createWriteStream(path.join(__dirname, '../../logs/app.log'), { flags: 'a' });

const logger = pino(
  {
    level: process.env.LOG_LEVEL || 'info',
  },
  isDevelopment ? pino.destination({ dest: 1, minLength: 128, sync: false }) : logFile
);

const httpLogger = pinoHttp(logger);
export { logger, httpLogger };
