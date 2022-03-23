/*============================ Imports ============================*/
const Logger = require('./CustomLogger');
const BaseError = require('./BaseError');
/*============================ Rest ============================*/

module.exports = class ErrorHandler {

  /**
   * Create a error handler instance.
   */
  constructor(){

    this.logger = new Logger();
  }

  /**
   * Handle an error with specified logic.
   * @param {object} err
   * @returns {void}
   */
  handle(err){

    this.logger.debug(err);
  }

  /**
   * Make friendly error message depending on the error.
   * @param {object} err
   * @returns {string}
   */
  familiarizeMessage(err){

    switch(err.name){
      case 'MongoServerError': switch(err.code){
        case 11000: return 'The resource with unique identifiers already exists in the collection.';
        default: return err.message;
      }
      default:
        return err.message;
    }
  }

  /**
   * Return if the error is trusted.
   * @param {object} err
   * @returns {boolean}
   */
  isTrustedError(err){

    return (err instanceof BaseError && err.isOperational);
  }
};