/*============================ Imports ============================*/
// const fs = require('fs');
const rfs = require('rotating-file-stream');
/*============================ Rest ============================*/

module.exports = class Logger {

  /**
   * Create new custom logger instance.
   */
  constructor() {

    // this.logger = fs.createWriteStream('error.log', { flags: 'a' });
    this.logger = rfs.createStream('error.log', { path: './src/storage/logs', compress: 'gzip', interval: '1d', maxFiles: 7 });
  }

  /**
   * Format the error and return data before log into file or console.
   * @param {string} level
   * @param {object} err
   * @returns {object}
   */
  formatLog(level, err){

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
  info(err, consolePrint = false){

    const { date, log, stackTrace } = this.formatLog('info', err);
    this.logger.write(`${log}\n`, (error) => (consolePrint) && console.info('\x1b[44m\x1b[30m%s\x1b[0m\x1b[36m%s\x1b[0m', `[${date}]`, ` - ${err.name}:`, err.message, stackTrace));
  }

  /**
   * Log in debug mode.
   * @param {object} err
   * @param {boolean} consolePrint
   * @returns {void}
   */
  debug(err, consolePrint = false){

    const { date, log, stackTrace } = this.formatLog('debug', err);
    this.logger.write(`${log}\n`, (error) => (consolePrint) && console.debug('\x1b[44m\x1b[30m%s\x1b[0m\x1b[32m%s\x1b[0m', `[ ${date} ]`, ` - ${err.name}:`, err.message, stackTrace));
  }

  /**
   * Log in warn mode.
   * @param {object} err
   * @param {boolean} consolePrint
   * @returns {void}
   */
  warn(err, consolePrint = false){

    const { date, log, stackTrace } = this.formatLog('warn', err);
    this.logger.write(`${log}\n`, (error) => (consolePrint) && console.warn('\x1b[44m\x1b[30m%s\x1b[0m\x1b[33m%s\x1b[0m', `[${date}]`, ` - ${err.name}:`, err.message, stackTrace));
  }

  /**
   * Log in error mode.
   * @param {object} err
   * @param {boolean} consolePrint
   * @returns {void}
   */
  error(err, consolePrint = false){

    const { date, log, stackTrace } = this.formatLog('error', err);
    this.logger.write(`${log}\n`, (error) => (consolePrint) && console.error('\x1b[44m\x1b[30m%s\x1b[0m\x1b[31m%s\x1b[0m', `[${date}]`, ` - ${err.name}:`, err.message, stackTrace));
  }
};