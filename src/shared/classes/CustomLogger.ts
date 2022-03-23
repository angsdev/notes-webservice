/*============================ Imports ============================*/
// import fs from 'fs';
import * as rfs from 'rotating-file-stream';
/*============================ Rest ============================*/

export default class Logger {

  // private logger: fs.WriteStream = fs.createWriteStream('error.log', { flags: 'a' });
  private logger: rfs.RotatingFileStream = rfs.createStream('error.log', { path: './dist/storage/logs', compress: 'gzip', interval: '1d', maxFiles: 7 });

  /**
   * Create new custom logger instance.
   */
  constructor(){

  }

  /**
   * Format the error and return data before log into file or console.
   * @param {string} level
   * @param {BaseError} err
   * @returns {object}
   */
  formatLog(level: string, err: any): object {

    const date = new Date(Date.now()).toISOString();
    const log = JSON.stringify({ level, datetime: date, name: err.name, message: err.message, stack: err.stack });
    const stackTrace = err.stack.replace(`${err.name}: ${err.message}`, '');
    return { date, log, stackTrace };
  }

  /**
   * Log in info mode.
   * @param {object} err
   * @param {boolean} consolePrint
   * @returns {void}
   */
  info(err: any, consolePrint: boolean = false): void {

    const { date, log, stackTrace }: { [x: string]: any } = this.formatLog('info', err);
    this.logger.write(`${log}\n`, (error) => (consolePrint) && console.info('\x1b[44m\x1b[30m%s\x1b[0m\x1b[36m%s\x1b[0m', `[${date}]`, ` - ${err.name}:`, err.message, stackTrace));
  }

  /**
   * Log in debug mode.
   * @param {object} err
   * @param {boolean} consolePrint
   * @returns {void}
   */
  debug(err: any, consolePrint: boolean = false): void {

    const { date, log, stackTrace }: { [x: string]: any } = this.formatLog('debug', err);
    this.logger.write(`${log}\n`, (error) => (consolePrint) && console.debug('\x1b[44m\x1b[30m%s\x1b[0m\x1b[32m%s\x1b[0m', `[ ${date} ]`, ` - ${err.name}:`, err.message, stackTrace));
  }

  /**
   * Log in warn mode.
   * @param {object} err
   * @param {boolean} consolePrint
   * @returns {void}
   */
  warn(err: any, consolePrint: boolean = false): void {

    const { date, log, stackTrace }: { [x: string]: any } = this.formatLog('warn', err);
    this.logger.write(`${log}\n`, (error) => (consolePrint) && console.warn('\x1b[44m\x1b[30m%s\x1b[0m\x1b[33m%s\x1b[0m', `[${date}]`, ` - ${err.name}:`, err.message, stackTrace));
  }

  /**
   * Log in error mode.
   * @param {object} err
   * @param {boolean} consolePrint
   * @returns {void}
   */
  error(err: any, consolePrint: boolean = false): void {

    const { date, log, stackTrace }: { [x: string]: any } = this.formatLog('error', err);
    this.logger.write(`${log}\n`, (error) => (consolePrint) && console.error('\x1b[44m\x1b[30m%s\x1b[0m\x1b[31m%s\x1b[0m', `[${date}]`, ` - ${err.name}:`, err.message, stackTrace));
  }
}