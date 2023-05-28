import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../errors';
import { verifyJWT, googleAuth } from '../utils';

export default class Authorization {

  constructor(){

  }

  static async JWT(req: Request & { user?: string|object }, res: Response, next: NextFunction): Promise<void> {

    try {

      const authorization = req.header('authorization');
      if(!authorization) throw new UnauthorizedError('You\'re unauthorized to perform this action.');

      const token = authorization.split(' ')[1];
      const payload = await verifyJWT(token);

      if(!payload) throw new UnauthorizedError('You\'re unauthorized to perform this action.')

      req.user = { authenticated: true, id: (typeof(payload) === 'string') ? payload : payload.id };
      next();

    } catch(err){ next(err); }
  }

  // /**
  //  * Sign in or up with google depending on user existence.
  //  * @param {string} google_token
  //  * @returns {Promise<object>}
  //  */
  // async google(req: Request & { user?: string|object }, res: Response, next: NextFunction){

  //   try {

  //     const token = req.body.google_token;
  //     const payload = await googleAuth(token);
  //     if(!payload) throw new UnauthorizedError('You\'re unauthorized to perform this action.')

  //     req.user = { authenticated: true, id: (typeof(payload) === 'string') ? payload : payload.id };
  //     next();

  //   } catch(err){ next(err); }

  // }
};