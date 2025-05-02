import { IncomingMessage, ServerResponse } from "http";
import { ENV } from "../config/env"
import pino from "pino";
import pinoHttp from "pino-http";
import fs from "fs";
import path from "path";

const logDir = path.join(__dirname, "../logs");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}


const baseLoggerConfig: pino.LoggerOptions = {
  level: ENV.NODE_ENV ? "info" : "debug",
  timestamp: pino.stdTimeFunctions.isoTime,
};

const pinoTransport = pino.transport({
  targets: [
    {
      target: 'pino/file',
      options: {
        destination: path.join(logDir, "app.log"),
        append: true,
      },
      level: baseLoggerConfig.level,
    },
    {
      target: 'pino/file',
      options: {
        destination: path.join(logDir, "exceptions.log"),
        append: true,
      },
      level: 'error',
    },
    {
      target: 'pino/file',
      options: {
        destination: path.join(logDir, "combined.log"),
        append: true,
      },
      level: 'trace',
    },
    ...(process.env.NODE_ENV !== "production"
      ? [
          {
            target: 'pino-pretty',
            options: {
              colorize: true,
            },
            level: 'debug',
          },
        ]: []),],


});


const httpConfigLogger ={
  logger: pino(
    baseLoggerConfig,
    pino.transport({
      target: 'pino/file',
      options: {
        destination: path.join(logDir, "http.log"),
        append: true,
      },
      level: baseLoggerConfig.level,
    })
    ),

  customProps: (req: IncomingMessage, res: ServerResponse) => ({
    reqId: req.id,
    method: req.method,
    url: req.url,
    statusCode: res.statusCode,
    responseTime: res.getHeader('x-response-time') || null,
  }),

  serializers: {
    req: (req: IncomingMessage) => ({
      method: req.method,
      url: req.url,
      headers: req.headers,
      remoteAddress: req.socket ? req.socket.remoteAddress : req.headers['x-forwarded-for'] || null,
      remotePort: req.socket ? req.socket.remotePort : null,
    }),


    res: (res: ServerResponse) => ({
      statusCode: res.statusCode,
      headers: res.getHeaders,
      contentLength: res.getHeaders,
    }),
  },
};




const appLogger = pino(
  baseLoggerConfig,
  pinoTransport,
);


const httpLogger = pinoHttp(httpConfigLogger);
export { appLogger as logger, httpLogger };
