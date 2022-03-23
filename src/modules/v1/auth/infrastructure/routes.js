/*============================ Imports ============================*/
const router = require('express').Router();
/*============================ Imports ============================*/
const validate = require('./validations');
const { authentication } = require('../../shared').middlewares;
const {
  signUp, signIn, googleSign, profileInfo, profileNotesInfo,
  forgotPassword, resetPassword, emailVerify, emailVerifyNotification
} = require('./controller');
/*============================ Rest ============================*/

router.get('/profile', authentication.JWT, profileInfo)  /** Profile Route **/
      .get('/profile/notes', authentication.JWT, profileNotesInfo)  /** Profile Route **/
      .post('/signup', validate.signUp, signUp)  /** SignUp Route **/
      .post('/signin', validate.signIn, signIn)  /** SignIn Route **/
      .post('/google', validate.googleSign, googleSign)  /** Google SignIn/SignUp Route **/
      .post('/password/forgot', validate.forgotPassword, forgotPassword)  /** Forgot Password Route **/
      .post('/password/reset/:token', validate.resetPassword, resetPassword)  /** Reset Password Route **/
      .get('/email/verify/:token', validate.emailVerify, emailVerify)  /** Verify Email Route **/
      .post('/email/verify-notification', authentication.JWT, emailVerifyNotification);  /** Email Notification Route **/

module.exports = router;