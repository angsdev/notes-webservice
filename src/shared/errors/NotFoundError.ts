import BaseError from './BaseError';

export default class NotFoundError extends BaseError {

  constructor(message: string = 'Resource not found.'){

    super({ name: 'NOT_FOUND', message, status: 404 });
  }
}