/*============================ Imports ============================*/
import BaseError from './BaseError';
/*============================ Rest ============================*/

export default class NotFoundError extends BaseError {

  /**
   * Create a new not found error instance.
   */
  constructor(message: string = 'Resource Not found.'){

    super({ name: 'NOT_FOUND', message, status: 404 });
  }
}