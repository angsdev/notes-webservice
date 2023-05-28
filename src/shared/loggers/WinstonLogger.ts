import winston, { createLogger, format, transports } from 'winston';

export default class Logger {

  public logger: winston.Logger = createLogger({
    // level: 'trace',
    // levels: { fatal: 0, error: 1, warn: 2, info: 3, debug: 4, trace: 5 },
    transports: [
      new transports.File({
        level: 'error',
        filename: './logs/error.log',
        format: format.printf(({ timestamp, level, message, ...meta }) => JSON.stringify({timestamp, level, message, stack: meta.stack}))
      }),
      new transports.Console({
        level: 'debug',
        handleExceptions: true,
        format: format.combine(
          format.timestamp({ format: 'HH:mm:ss DD-MM-YYYY' }),
          format.colorize({ colors: { fatal: 'red', error: 'red', warn: 'yellow', info: 'green', debug: 'green', trace: 'white' } }),
          format.printf(({ timestamp, level, message, ...meta }) => `${timestamp} ${level}: ${message} \n ${meta.stack}`)
        )
      })
    ]
  });

  /**
   * Create a new winston logger instance.
   */
  constructor() {

  }

  /**
   * Log in trace mode.
   * @param {string} message
   * @param {*} meta
   * @returns {void}
   */
  trace(message: string, meta: any): void {

    this.logger.log('trace', message, meta);
  }

  /**
   * Log in debug mode.
   * @param {string} message
   * @param {*} meta
   * @returns {void}
   */
  debug(message: string, meta: any): void {

    this.logger.debug(message, meta);
  }

  /**
   * Log in info mode.
   * @param {string} message
   * @param {*} meta
   * @returns {void}
   */
  info(message: string, meta: any): void {

    this.logger.info(message, meta);
  }

  /**
   * Log in warn mode.
   * @param {string} message
   * @param {*} meta
   * @returns {void}
   */
  warn(message: string, meta: any): void {

    this.logger.warn(message, meta);
  }

  /**
   * Log in error mode.
   * @param {string} message
   * @param {*} meta
   * @returns {void}
   */
  error(message: string, meta: any): void {

    this.logger.error(message, meta);
  }

  /**
   * Log in fatal mode.
   * @param {string} message
   * @param {*} meta
   * @returns {void}
   */
  fatal(message: string, meta: any): void {

    this.logger.log('fatal', message, meta);
  }
}