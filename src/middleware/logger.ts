import pino from 'pino';
import pinoHttp from 'pino-http';
import fs from 'fs';
import path from 'path';

const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = pino(
  {
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',

  },
  fs.createWriteStream(path.join(logDir, 'app.log'), { flags: 'a' })
);

const httpLogger = pinoHttp({
  logger,
});

export { logger, httpLogger };
