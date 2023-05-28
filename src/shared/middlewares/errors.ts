import { BaseError, NotFoundError, ErrorHandler } from '../errors';
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

const errorHandler = new ErrorHandler();

/**
 * Middleware that throw an not found error.
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export const notFoundThrower = async (req: Request, res: Response, next: NextFunction): Promise<void> => next(new NotFoundError('Resource not found.'));

/**
 * Middleware that handle error if any other can.
 * @param {unknown} err
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export const fallback: ErrorRequestHandler = async (err: unknown, req: Request, res: Response, next: NextFunction): Promise<void> => {

  const error = err as Error & BaseError;
  const message = errorHandler.familiarizeMessage(error);
  res.status(error.status || 500).json({ success: false, message });
  if(errorHandler.isTrustedError(error)) return next(error);
  errorHandler.handle(error);
};

process.on('unhandledRejection', (reason) => { throw reason; });
process.on('uncaughtException', (err) => {

  errorHandler.handle(err);
  if(!errorHandler.isTrustedError(err)) process.exit(1);
});