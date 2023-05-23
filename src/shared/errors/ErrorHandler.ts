/*============================ Imports ============================*/
import { CustomLogger as Logger } from '../loggers';
import BaseError from './BaseError';
/*============================ Rest ============================*/

export default class ErrorHandler {

  public logger: Logger;

  /**
   * Create a error handler instance.
   */
  constructor(){

    this.logger = new Logger();
  }

  /**
   * Handle an error with specified logic.
   * @param {Error | BaseError} err
   * @returns {void}
   */
  handle(err: Error | BaseError): void {

    this.logger.debug(err, true);
  }

  /**
   * Make friendly error message depending on the error.
   * @param {Error & BaseError} err
   * @returns {string}
   */
  familiarizeMessage(err: Error & BaseError): string {

    switch(err.name){
      case 'MongoServerError':
        return this.handleMongoErrors(err);
      default:
        return err.message;
    }
  }

  /**
   * Return if the error is trusted.
   * @param {Error | BaseError} err
   * @returns {boolean}
   */
  isTrustedError(err: Error | BaseError): Boolean {

    return (err instanceof BaseError && err.isOperational);
  }

  /**
   * Handle all the errors related to MongoDB in a custom way.
   * @param {Error & BaseError} err
   * @returns {string}
   */
  handleMongoErrors(err: Error & BaseError): string {

    switch(err.status){
      case 11000:
        return 'The resource with unique identifiers already exists in the collection.';
      default:
        return err.message;
    }
  }
}