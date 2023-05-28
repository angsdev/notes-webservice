import * as rfs from 'rotating-file-stream';
import { FormattedLog, ConsoleMessageFormat } from '../types';

export default class CustomLogger {

  private logger: rfs.RotatingFileStream;
  private consoleMessageFormat: ConsoleMessageFormat = {
    info:  '\x1b[44m\x1b[30m%s\x1b[0m \x1b[36m%s\x1b[0m',
    debug: '\x1b[44m\x1b[30m%s\x1b[0m \x1b[32m%s\x1b[0m',
    warn:  '\x1b[44m\x1b[30m%s\x1b[0m \x1b[33m%s\x1b[0m',
    error: '\x1b[44m\x1b[30m%s\x1b[0m \x1b[31m%s\x1b[0m'
  };

  /**
   * Create new custom logger instance.
   */
  constructor(){

    this.logger = rfs.createStream('error.log', {
      path: './dist/storage/logs',
      compress: 'gzip',
      interval: '1d',
      maxFiles: 7
    })
  }

  /**
   * Format the error and return data before log into file or console.
   * @param {string} level
   * @param {Error} err
   * @returns {object}
   */
  formatLog(level: string, err: Error): FormattedLog {

    const { name, message, stack } = err;
    const datetime = new Date(Date.now());
    const log = JSON.stringify({ level, datetime, name, message, stack });
    const stackTrace = err.stack.replace(`${err.name}: ${err.message}`, '');

    return { datetime, log, stackTrace };
  }

  /**
   * Log in info mode.
   * @param {Error} err
   * @param {boolean} consolePrint
   * @returns {void}
   */
  info(err: Error, consolePrint: boolean = false): void {

    const { datetime, log, stackTrace } = this.formatLog('info', err);
    this.logger.write(`${log}\n`, (e) => {

      if(e) throw e;
      if(consolePrint){

        const { info } = this.consoleMessageFormat
        console.info(info, `[${datetime}]`, ` - ${err.name}:`, err.message, stackTrace)
      }
    });
  }

  /**
   * Log in debug mode.
   * @param {Error} err
   * @param {boolean} consolePrint
   * @returns {void}
   */
  debug(err: Error, consolePrint: boolean = false): void {

    const { datetime, log, stackTrace } = this.formatLog('debug', err);
    this.logger.write(`${log}\n`, (e) => {

      if(e) throw e;
      if(consolePrint){

        const { debug } = this.consoleMessageFormat;
        console.debug(debug, `[${datetime}]`, ` - ${err.name}:`, err.message, stackTrace)
      }
    });
  }

  /**
   * Log in warn mode.
   * @param {Error} err
   * @param {boolean} consolePrint
   * @returns {void}
   */
  warn(err: Error, consolePrint: boolean = false): void {

    const { datetime, log, stackTrace } = this.formatLog('warn', err);
    this.logger.write(`${log}\n`, (e) => {

      if(e) throw e;
      if(consolePrint){

        const { warn } = this.consoleMessageFormat;
        console.warn(warn, `[${datetime}]`, ` - ${err.name}:`, err.message, stackTrace)
      }
    });
  }

  /**
   * Log in error mode.
   * @param {object} err
   * @param {boolean} consolePrint
   * @returns {void}
   */
  error(err: any, consolePrint: boolean = false): void {

    const { datetime, log, stackTrace } = this.formatLog('error', err);
    this.logger.write(`${log}\n`, (e) => {

      if(e) throw e;
      if(consolePrint){

        const { error } = this.consoleMessageFormat;
        console.error(error, `[${datetime}]`, ` - ${err.name}:`, err.message, stackTrace)
      }
    });
  }
}