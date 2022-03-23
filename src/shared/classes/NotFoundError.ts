/*============================ Imports ============================*/
import BaseError from './BaseError';
/*============================ Rest ============================*/

export default class NotFoundError extends BaseError {

  /**
   * Create a new not found error instance.
   * @param {string} message
   * @param {number} status
   */
  constructor(message: string = 'Bad Request.', status: number = 400){

    super('NOT_FOUND', message, status);
  }
}