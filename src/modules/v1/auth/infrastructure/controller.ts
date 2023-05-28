/*============================ Imports ============================*/
import { service }from '../../users';
import { NextFunction, Request, Response } from 'express';
/*============================ Rest ============================*/

export default new class AuthController {

  /**
   * Handle signing up in the app.
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {Promise<object>}
   */
  async signUp(req: Request, res: Response, next: NextFunction){

    try{

      const userData = req.body;
      const user = await service.create(userData);
      res.status(201).json({ success: true, content: user });
    } catch(err){ next(err); }
  }

  /**
   * Handle signing into the app.
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {Promise<object>}
   */
  async signIn(req: Request, res: Response, next: NextFunction){

    try{

      const credentials = req.body;
      const user = await service.signIn(credentials);
      res.json({ success: true, content: user });
    } catch(err){ next(err); }
  }

  /**
   * Handle signing up or in with google account, depending on the user existence in the app.
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {Promise<object>}
   */
  async googleSign(req: Request, res: Response, next: NextFunction){

    try{

      const { googleToken } = req.body;
      const user = await service.google(googleToken);
      res.json({ success: true, content: user });
    } catch(err){ next(err); }
  }

  /**
   * Handle forgot password request.
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {Promise<object>}
   */
  async forgotPassword(req: Request, res: Response, next: NextFunction){

    try{

      const { email } = req.body;
      const response = await service.forgotPassword(email);
      res.json({ success: true, message: response });
    } catch(err){ next(err); }
  }

  /**
   * Handle password reset.
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {Promise<object>}
   */
  async resetPassword(req: Request, res: Response, next: NextFunction){

    try{

      const { params: { token }, body: { password } } = req;
      const user = await service.resetPassword(token, password);
      res.json({ success: true, content: user });
    } catch(err){ next(err); }
  }

  /**
   * Handle email verification.
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {Promise<object>}
   */
  async emailVerify(req: Request, res: Response, next: NextFunction){

    try{

      const { token } = req.params;
      const user = await service.verifyEmail(token);
      res.json({ success: true, content: user });
    } catch(err){ next(err); }
  }

  /**
   * Handle sending email verification.
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {Promise<object>}
   */
  async emailVerifyNotification(req: Request, res: Response, next: NextFunction){

    try{

      const { id } = req.authUser;
      const response = await service.sendEmailVerifyNotification(id);
      res.json({ success: true, message: response });
    } catch(err){ next(err); }
  }

  /**
   * Handle getting profile information.
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {Promise<object>}
   */
  async profileInfo(req: Request, res: Response, next: NextFunction){

    try{

      const { id } = req.authUser;
      const user = await service.getById(id, 'notes');
      res.json({ success: true, content: user });
    } catch(err){ next(err); }
  }

  /**
   * Handle getting profile notes information.
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {Promise<object>}
   */
  async profileNotesInfo(req: Request, res: Response, next: NextFunction){

    try{

      const { id } = req.authUser;
      const { notes } = await service.getById(id, 'notes');
      res.json({ success: true, content: notes });
    } catch(err){ next(err); }
  }
}