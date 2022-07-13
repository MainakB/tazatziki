import * as winston from "winston";
import { GLOBALFLAGS } from "../constants";

// const dateFormat = () => {
//   return new Date(Date.now()).toUTCString();
// };

const customLevels = {
  levels: {
    error: 1,
    warn: 2,
    debug: 3,
    trace: 4,
    info: 5,
    silent: 6,
  },
  colors: {
    error: "red",
    warn: "yellow",
    info: "cyan",
    debug: "green",
    trace: "blue",
    silent: "orange",
    date: "grey",
  },
};
const colorizer = winston.format.colorize();
const options = {
  console: {
    format: winston.format.combine(
      winston.format.splat(),
      winston.format.align(),
      winston.format.printf((info) => {
        return (
          colorizer.colorize("date", `${new Date().toISOString()} `) +
          colorizer.colorize(info.level, `${info.level.toUpperCase()} `) +
          `Testlogger: ${info.message.trim()}`
        );
      })
    ),
    handleExceptions: true,
  },
  file: {
    format: winston.format.combine(
      winston.format.splat(),
      winston.format.align(),
      winston.format.printf((info) => {
        return `${new Date().toISOString()} | ${info.level.toUpperCase()} | ${
          info.message
        }`;
      })
    ),
    handleExceptions: true,
  },
};
//     Level of logging verbosity: trace | debug | info | warn | error | silent
class LoggerService {
  logger: winston.Logger;
  static _instance: LoggerService;
  private constructor() {
    this.logger = winston.createLogger({
      levels: customLevels.levels,
      exitOnError: false,
      transports: [
        new winston.transports.Console({
          ...options.console,
          ...{
            level: "info",
          },
        }),

        // new winston.transports.Console({
        //   ...options.console,
        //   ...{
        //     level: "trace",
        //   },
        // }),

        new winston.transports.File({
          ...options.file,
          ...{
            filename: `Reports/debug.log`,
            level: "debug",
          },
        }),
        new winston.transports.File({
          ...options.file,
          ...{
            filename: `Reports/all-logs.log`,
            level: "silent",
          },
        }),
        // new winston.transports.File({
        //   ...options.file,
        //   ...{
        //     filename: `Reports/all-logs.log`,
        //     level: "warn",
        //   },
        // }),
        // new winston.transports.File({
        //   ...options.file,
        //   ...{
        //     filename: `Reports/all-logs.log`,
        //     level: "error",
        //   },
        // }),
      ],
    });
    winston.addColors(customLevels.colors);
  }

  static getInstance() {
    if (!LoggerService._instance) {
      LoggerService._instance = new LoggerService();
    }
    return LoggerService._instance;
  }

  // async error(message: string) {
  //   await this.logger.log("error", message);
  // }

  // async info(message: string) {
  //   await this.logger.log("info", message);
  // }

  // async debug(message: string) {
  //   await this.logger.log("debug", message);
  // }

  // async trace(message: string) {
  //   await this.logger.log("trace", message);
  // }

  // async silent(message: string) {
  //   await this.logger.log(message, "silent");
  // }

  // async logMessage(message: string) {
  //   await this.logger.log(message, "logMessage");
  // }

  async log(message: string, type = GLOBALFLAGS.LOGTYPE) {
    // console.log("why error", message, type);
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    await this.logger.log(type || "info", message);
    // switch (type) {
    //   case "error":
    //     await this.logger.log("error", message);
    //     break;
    //   case "info":
    //   case "warn":
    //     await this.logger.log("info", message);
    //     break;
    //   case "debug":
    //   case "trace":
    //     await this.logger.log("debug", message);
    //     break;
    //   case "silent":
    //     break;
    //   default:
    //     await this.logger.log("info", message);
    //     break;
    // }
  }
}
export const Logger = LoggerService.getInstance();
