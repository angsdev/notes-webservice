/*============================ Imports ============================*/
import BaseError from '../errors/BaseError';
import { verifyJWT } from '../utils';
import { NextFunction, Request, Response } from 'express';
/*============================ Rest ============================*/

export default class Authentication {

  /**
   * Validate if an user is authenticated through JWT.
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {Promise<void>}
   */
  async JWT(req: Request|any, res: Response, next: NextFunction): Promise<void> {

    try{

      const authorization = req.header('authorization');
      if(!authorization) throw new BaseError('UNAUTHORIZED', 'You\'re unauthorized to perform this action.', 401);
      const payload = await verifyJWT(authorization.split(' ')[1]);
      req.authUser = (typeof(payload) === 'string') ? payload : { id: payload.id };
      next();
    } catch(err){ next(err); }
  }
}