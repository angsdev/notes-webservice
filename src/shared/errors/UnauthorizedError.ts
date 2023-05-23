/*============================ Imports ============================*/
import BaseError from './BaseError';
/*============================ Rest ============================*/

export default class UnauthorizedError extends BaseError {

  /**
   * Create a new unauthorized error instance.
   */
  constructor(message: string = 'The current request is unauthorized to perform.'){

    super({ name: 'UNAUTHORIZED', message, status: 401 });
  }
}