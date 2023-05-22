/*============================ Imports ============================*/
// import Logger from '../classes/CustomLogger';
import { CustomLogger } from '../loggers';

import BaseError from './BaseError';
/*============================ Rest ============================*/

export default class ErrorHandler {

  public logger: CustomLogger;

  /**
   * Create a error handler instance.
   */
  constructor(){

    this.logger = new CustomLogger();
  }

  /**
   * Handle an error with specified logic.
   * @param {object} err
   * @returns {void}
   */
  handle(err: object): void {

    this.logger.debug(err, true);
  }

  /**
   * Make friendly error message depending on the error.
   * @param {object} err
   * @returns {string}
   */
  familiarizeMessage(err: any): string {

    switch(err.name){
      case 'MongoServerError': switch(err.status){
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
  isTrustedError(err: object): Boolean {

    return (err instanceof BaseError && err.isOperational);
  }
}