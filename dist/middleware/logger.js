"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpLogger = exports.logger = void 0;
const env_1 = require("../config/env");
const pino_1 = __importDefault(require("pino"));
const pino_http_1 = __importDefault(require("pino-http"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logDir = path_1.default.join(__dirname, "../logs");
if (!fs_1.default.existsSync(logDir)) {
    fs_1.default.mkdirSync(logDir);
}
const baseLoggerConfig = {
    level: env_1.ENV.NODE_ENV ? "info" : "debug",
    timestamp: pino_1.default.stdTimeFunctions.isoTime,
};
const pinoTransport = pino_1.default.transport({
    targets: [
        {
            target: 'pino/file',
            options: {
                destination: path_1.default.join(logDir, "app.log"),
                append: true,
            },
            level: baseLoggerConfig.level,
        },
        {
            target: 'pino/file',
            options: {
                destination: path_1.default.join(logDir, "exceptions.log"),
                append: true,
            },
            level: 'error',
        },
        {
            target: 'pino/file',
            options: {
                destination: path_1.default.join(logDir, "combined.log"),
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
            ] : []),
    ],
});
const httpConfigLogger = {
    logger: (0, pino_1.default)(baseLoggerConfig, pino_1.default.transport({
        target: 'pino/file',
        options: {
            destination: path_1.default.join(logDir, "http.log"),
            append: true,
        },
        level: baseLoggerConfig.level,
    })),
    customProps: (req, res) => ({
        reqId: req.id,
        method: req.method,
        url: req.url,
        statusCode: res.statusCode,
        responseTime: res.getHeader('x-response-time') || null,
    }),
    serializers: {
        req: (req) => ({
            method: req.method,
            url: req.url,
            headers: req.headers,
            remoteAddress: req.socket ? req.socket.remoteAddress : req.headers['x-forwarded-for'] || null,
            remotePort: req.socket ? req.socket.remotePort : null,
        }),
        res: (res) => ({
            statusCode: res.statusCode,
            headers: res.getHeaders,
            contentLength: res.getHeaders,
        }),
    },
};
const appLogger = (0, pino_1.default)(baseLoggerConfig, pinoTransport);
exports.logger = appLogger;
const httpLogger = (0, pino_http_1.default)(httpConfigLogger);
exports.httpLogger = httpLogger;
//# sourceMappingURL=logger.js.map