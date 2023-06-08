import { NextFunction, Response } from 'express';
import { AuthRequest } from "../";
import { UnauthorizedError } from '../errors';
import { Jwt } from '../utils';

export default class Auth {

  constructor(){

  }

  static async JWT(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {

    try {

      const authorization = req.header('authorization');
      if(!authorization) throw new UnauthorizedError('You\'re unauthorized to perform this action.');

      const token = authorization.split(' ')[1];
      const payload = await Jwt.verify(token);

      if(!payload) throw new UnauthorizedError('You\'re unauthorized to perform this action.')

      req.user = { authenticated: true, id: (typeof(payload) === 'string') ? payload : payload.id };
      return next();

    } catch(err){ next(err); }
  }
};