/*============================ Imports ============================*/
import { Router } from 'express';
import validate from './validations';
import controller from './controller';
import { middlewares } from '../../shared';
/*============================ Vars setup ============================*/
const router = Router();
const { JWTAuthentication } = middlewares;
const {
  signUp, signIn, googleSign, profileInfo, profileNotesInfo,
  forgotPassword, resetPassword, emailVerify, emailVerifyNotification
} = controller;
/*============================ Rest ============================*/

router.get('/profile', JWTAuthentication, profileInfo)                                  /** Profile Route **/
      .get('/profile/notes', JWTAuthentication, profileNotesInfo)                       /** Profile Route **/
      .post('/signup', validate.signUp, signUp)                                          /** SignUp Route **/
      .post('/signin', validate.signIn, signIn)                                          /** SignIn Route **/
      .post('/google', validate.googleSign, googleSign)                                  /** Google SignIn/SignUp Route **/
      .post('/password/forgot', validate.forgotPassword, forgotPassword)                 /** Forgot Password Route **/
      .post('/password/reset/:token', validate.resetPassword, resetPassword)             /** Reset Password Route **/
      .get('/email/verify/:token', validate.emailVerify, emailVerify)                    /** Verify Email Route **/
      .post('/email/verify-notification', JWTAuthentication, emailVerifyNotification);  /** Email Notification Route **/

export default router;