/*============================ Imports ============================*/
const { createLogger, format, transports } = require('winston');
/*============================ Rest ============================*/

module.exports = class Logger {

  /**
   * Create a new winston logger instance.
   */
  constructor() {

    this.logger = createLogger({
      // level: 'trace',
      // levels: { fatal: 0, error: 1, warn: 2, info: 3, debug: 4, trace: 5 },
      transports: [
        new transports.Console({
          level: 'debug',
          handleExceptions: true,
          format: format.combine(
            format.timestamp({ format: 'HH:mm:ss DD-MM-YYYY' }),
            format.colorize({ colors: { fatal: 'red', error: 'red', warn: 'yellow', info: 'green', debug: 'green', trace: 'white' } }),
            format.printf(({ timestamp, level, message, ...meta }) => `${timestamp} ${level}: ${message} \n ${meta.stack}`)
          )
        }),
        new transports.File({ level: 'error', filename: './logs/error.log', format: format.printf(({ timestamp, level, message, ...meta }) => JSON.stringify({timestamp, level, message, stack: meta.stack})) })
      ]
    });
  }

  /**
   * Log in trace mode.
   * @param {string} message
   * @param {*} meta
   * @returns {void}
   */
  trace(message, meta){

    this.logger.log('trace', message, meta);
  }

  /**
   * Log in debug mode.
   * @param {string} message
   * @param {*} meta
   * @returns {void}
   */
  debug(message, meta){

    this.logger.debug(message, meta);
  }

  /**
   * Log in info mode.
   * @param {string} message
   * @param {*} meta
   * @returns {void}
   */
  info(message, meta){

    this.logger.info(message, meta);
  }

  /**
   * Log in warn mode.
   * @param {string} message
   * @param {*} meta
   * @returns {void}
   */
  warn(message, meta){

    this.logger.warn(message, meta);
  }

  /**
   * Log in error mode.
   * @param {string} message
   * @param {*} meta
   * @returns {void}
   */
  error(message, meta){

    this.logger.error(message, meta);
  }

  /**
   * Log in fatal mode.
   * @param {string} message
   * @param {*} meta
   * @returns {void}
   */
  fatal(message, meta){

    this.logger.log('fatal', message, meta);
  }
};