/*============================ Rest ============================*/

module.exports = class BaseError extends Error {

  /**
   * Create a new base error instance.
   * @param {string} name
   * @param {string} message
   * @param {number} status
   * @param {boolean} isOperational
   */
  constructor(name, message = 'There was an error.', status, isOperational = true){

    super(message);
    this.name = name;
    this.status = status;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
};