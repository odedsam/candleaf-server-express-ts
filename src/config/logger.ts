import { LogtailTransport } from "@logtail/winston";
import { Logtail } from "@logtail/node";
import { ENV } from "./env";
import winston from "winston";

const { combine, timestamp, json, errors } = winston.format;
const LOGTAIL_SOURCE_TOKEN = ENV.LOGTAIL_TOKEN;
const LOGTAIL_SOURCE_HOST = ENV.LOGTAIL_HOST;
const logtail = new Logtail(LOGTAIL_SOURCE_TOKEN, {endpoint:LOGTAIL_SOURCE_HOST});


const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(timestamp(), errors({ stack: true }), json()),
  transports: [new LogtailTransport(logtail)],
  defaultMeta: { service: "checkout-service" },
});

logger.info("Init winston looger with betterstack");
logtail.flush();

export default logger;
