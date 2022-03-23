/*============================ Imports ============================*/
const BaseError = require('./BaseError');
/*============================ Rest ============================*/

module.exports = class NotFoundError extends BaseError {

  /**
   * Create a new not found error instance.
   * @param {string} message
   * @param {number} status
   */
  constructor(message = 'Bad Request.', status = 400){

    super('NOT_FOUND', message, status);
  }
};