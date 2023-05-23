/*============================ Imports ============================*/
import { verifyJWT } from '../utils';
import { UnauthorizedError } from '../errors';
import { NextFunction, Request, Response } from 'express';
/*============================ Rest ============================*/

/**
 * Validate if an user is authenticated through JWT.
 * @param {Request & any} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const JWTAuthentication = async (req: Request & any, res: Response, next: NextFunction): Promise<void> => {

  try{

    const authorization = req.header('authorization');
    if(!authorization) throw new UnauthorizedError('You\'re unauthorized to perform this action.');

    const token = authorization.split(' ')[1];
    const payload = await verifyJWT(token);

    req.authUser = (typeof(payload) === 'string') ? payload : { id: payload.id };
    next();

  } catch(err){ next(err); }
}