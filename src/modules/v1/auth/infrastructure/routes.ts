import { Router } from 'express';
import { middlewares, validate } from '../../shared';
import validationSchemas from './validations';
import Controller from './controller';
import { mongo } from '../../users/infrastructure/persistence';
import { Service } from '../../users'


const router = Router();
const { Auth } = middlewares;
const {
  signUpSchema,
  signInSchema,
  googleSignSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  emailVerificationSchema,
  emailNotificationSchema
} = validationSchemas;


const repository = new mongo.Repository();
const service = new Service(repository);
const controller = new Controller(service);

router.get('/profile', Auth.JWT, controller.profileInfo)
      .get('/profile/notes', Auth.JWT, controller.profileNotesInfo)
      .post('/signup', validate(signUpSchema), controller.signUp)
      .post('/signin', validate(signInSchema), controller.signIn)
      .post('/google', validate(googleSignSchema), controller.googleSign)
      .post('/password/forgot', validate(forgotPasswordSchema), controller.forgotPassword)
      .post('/password/reset/:token', validate(resetPasswordSchema), controller.resetPassword)
      .get('/email/verify/:token', validate(emailVerificationSchema), controller.emailVerify)
      .post('/email/verify-notification', [ Auth.JWT, validate(emailNotificationSchema) ], controller.emailVerifyNotification);

export default router;