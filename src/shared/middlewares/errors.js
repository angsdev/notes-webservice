/*============================ Imports ============================*/
const { NotFoundError, ErrorHandler } = require('../classes');
/*============================ Vars setup ============================*/
const errorHandler = new ErrorHandler();
/*============================ Rest ============================*/

/**
 * Middleware that throw an not found error.
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {Promise<void>}
 */
exports.notFoundThrower = async (req, res, next) => next(new NotFoundError('Resource not found.'));

/**
 * Middleware that handle error if any other can.
 * @param {object} err
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {Promise<object>}
 */
exports.fallback = async (err, req, res, next) => {

  const message = errorHandler.familiarizeMessage(err);
  res.status(err.status || 500).json({ success: false, message });
  if(errorHandler.isTrustedError(err)) return next(err);
  errorHandler.handle(err);
};

process.on('unhandledRejection', (reason) => { throw reason; });
process.on('uncaughtException', (err) => {

  errorHandler.handle(err);
  if(!errorHandler.isTrustedError(err)) process.exit(1);
});