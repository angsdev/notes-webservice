import { Router } from 'express';
import { middlewares, validate } from '../../shared';
import { mongo } from '../../users/infrastructure/persistence';
import { AuthService } from '../application/auth.service';
import { AuthController } from './auth.controller';
import { authValidationSchemas } from './auth.validation';

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
} = authValidationSchemas;

const repository = new mongo.UserMongoRepository();
const service = new AuthService(repository);
const controller = new AuthController(service);

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