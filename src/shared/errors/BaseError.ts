import { BaseErrorOptions } from '../';

export default class BaseError extends Error {

  public name: string;
  public status: number;
  public isOperational?: Boolean;

  /**
   * Create a new base error instance.
   */
  constructor({ name, message = 'There was an error.', status, isOperational = true } : BaseErrorOptions){

    super(message);
    this.name = name;
    this.status = status;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}