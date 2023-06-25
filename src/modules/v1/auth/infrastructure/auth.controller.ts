import { NextFunction, Request, Response } from 'express';
import { AuthRequest } from '../../shared';
import { AuthService } from '../application';

export  class AuthController {

  constructor(
    private readonly service: AuthService
  ){

  }

  /**
   * Handle signing up in the app.
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<Response>}
   */
  async signUp(req: Request, res: Response, next: NextFunction): Promise<Response> {

    try {

      const userData = req.body;

      const user = await this.service.create(userData);
      return res.status(201).json({ success: true, content: user });

    } catch(err){ next(err); }
  }

  /**
   * Handle signing into the app.
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<Response>}
   */
  async signIn(req: Request, res: Response, next: NextFunction): Promise<Response> {

    try {

      const credentials = req.body;

      const user = await this.service.signIn(credentials);
      return res.json({ success: true, content: user });

    } catch(err){ next(err); }
  }

  /**
   * Handle signing up or in with google account, depending on the user existence in the app.
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<Response>}
   */
  async googleSign(req: Request, res: Response, next: NextFunction): Promise<Response> {

    try {

      const { googleToken } = req.body;

      const user = await this.service.google(googleToken);
      return res.json({ success: true, content: user });

    } catch(err){ next(err); }
  }

  /**
   * Handle forgot password request.
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<Response>}
   */
  async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<Response> {

    try {

      const { email } = req.body;

      const message = await this.service.forgotPassword(email);
      return res.json({ success: true, message });

    } catch(err){ next(err); }
  }

  /**
   * Handle password reset.
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<Response>}
   */
  async resetPassword(req: Request, res: Response, next: NextFunction): Promise<Response> {

    try {

      const { params: { token }, body: { password } } = req;

      const user = await this.service.resetPassword(token, password);
      return res.json({ success: true, content: user });

    } catch(err){ next(err); }
  }

  /**
   * Handle email verification.
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<Response>}
   */
  async emailVerify(req: Request, res: Response, next: NextFunction): Promise<Response> {

    try {

      const { token } = req.params;

      const user = await this.service.verifyEmail(token);
      return res.json({ success: true, content: user });

    } catch(err){ next(err); }
  }

  /**
   * Handle sending email verification.
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<Response>}
   */
  async emailVerifyNotification(req: AuthRequest, res: Response, next: NextFunction): Promise<Response> {

    try {

      const { id } = req.user;

      const message = await this.service.sendEmailVerifyNotification(id);
      return res.json({ success: true, message });

    } catch(err){ next(err); }
  }

  /**
   * Handle getting profile information.
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<Response>}
   */
  async profileInfo(req: AuthRequest, res: Response, next: NextFunction): Promise<Response> {

    try {

      const { id } = req.user;

      const user = await this.service.getByIndex(id);
      return res.json({ success: true, content: user });

    } catch(err){ next(err); }
  }

  /**
   * Handle getting profile notes information.
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<Response>}
   */
  async profileNotesInfo(req: AuthRequest, res: Response, next: NextFunction): Promise<Response> {

    try {

      const { id } = req.user;

      const { notes } = await this.service.getByIndex(id);
      return res.json({ success: true, content: notes });

    } catch(err){ next(err); }
  }
}