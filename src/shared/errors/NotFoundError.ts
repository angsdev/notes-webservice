import BaseError from './BaseError';

export default class NotFoundError extends BaseError {

  /**
   * Create a new not found error instance.
   */
  constructor(message: string = 'Resource Not found.'){

    super({ name: 'NOT_FOUND', message, status: 404 });
  }
}