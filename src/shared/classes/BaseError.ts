/*============================ Rest ============================*/

export default class BaseError extends Error {

  public name: string;
  public status: number;
  public isOperational?: Boolean;

  /**
   * Create a new base error instance.
   * @param {string} name
   * @param {string} message
   * @param {number} status
   * @param {boolean} isOperational
   */
  constructor(name: string, message: string = 'There was an error.', status: number, isOperational: boolean = true){

    super(message);
    this.name = name;
    this.status = status;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}