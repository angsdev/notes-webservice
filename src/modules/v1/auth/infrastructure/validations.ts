import config from 'config';
import { checkSchema } from 'express-validator';
import { IsStrongPasswordOptions } from 'express-validator/src/options';
import { ValidationStandard } from '../../shared';

const { password }: ValidationStandard = config.get('app.validationStandards');

export default {
  signUpSchema: checkSchema({
    firstname: {
      in: 'body',
      escape: true,
      isString: true,
      errorMessage: 'Must be a string containing only alphabetic and space characters.'
    },
    lastname: {
      in: 'body',
      escape: true,
      isString: true,
      errorMessage: 'Must be a string containing only alphabetic and space characters.'
    },
    username: {
      in: 'body',
      escape: true,
      isString: true,
      errorMessage: 'Must be a valid username.'
    },
    phone: {
      in: 'body',
      optional: true,
      escape: true,
      isString: true,
      errorMessage: 'Must be a valid phone format.'
    },
    email: {
      in: 'body',
      escape: true,
      isEmail: true,
      isString: true,
      errorMessage: 'Must be a valid email.'
    },
    password: {
      in: 'body',
      escape: true,
      isStrongPassword: <IsStrongPasswordOptions & any>{ ...password },
      errorMessage: 'Must be greater than 8 and contain at least one uppercase letter, one lowercase letter, one symbol, and one number.',
      custom: {
        options: (val, { req }) => (val === req.body.password_confirmation),
        errorMessage: 'The passwords don\'t match.'
      }
    }
  }),
  signInSchema: checkSchema({
    username: {
      in: 'body',
      escape: true,
      isString: true,
      errorMessage: 'Is necessary and must be a valid string.'
    },
    password: {
      in: 'body',
      escape: true,
      isStrongPassword: <IsStrongPasswordOptions & any>{ ...password },
      errorMessage: 'Must be a string greater than 8 and contain at least one uppercase letter, one lowercase letter, one symbol, and one number.'
    }
  }),
  googleSignSchema: checkSchema({
    token: {
      in: 'body',
      escape: true,
      isString: true,
      errorMessage: 'Must be a valid google id token.'
    }
  }),
  forgotPasswordSchema: checkSchema({
    username: {
      in: 'body',
      escape: true,
      isString: true,
      errorMessage: 'Must be a valid phone, email or username.'
    }
  }),
  resetPasswordSchema: checkSchema({
    token: {
      in: 'params',
      escape: true,
      isJWT: true,
      errorMessage: 'It\'s necessary and must be a JWT.'
    },
    password: {
      in: 'body',
      escape: true,
      isStrongPassword: <IsStrongPasswordOptions & any>{ ...password },
      errorMessage: 'Must be greater than 8 and contain at least one uppercase letter, one lowercase letter, one symbol, and one number.',
      custom: {
        options: (val, { req }) => (val === req.body.password_confirmation),
        errorMessage: 'The passwords don\'t match.'
      }
    }
  }),
  emailVerificationSchema: checkSchema({
    token: {
      in: 'params',
      escape: true,
      isJWT: true,
      errorMessage: 'It\'s necessary and must be a JWT.'
    }
  }),
  emailNotificationSchema: checkSchema({
    token: {
      in: 'params',
      escape: true,
      isJWT: true,
      errorMessage: 'It\'s necessary and must be a JWT.'
    }
  })
};
//   signUpSchema: [
//     body(['firstname', 'lastname'], 'Must be a string containing only alphabetic and space characters.').isString().escape(),
//     body('username', 'Must be a valid username.').isString().escape(),
//     body('phone', 'Must be a valid phone format.').isString().optional().escape(),
//     body('email', 'Must be a valid email.').isEmail().escape(),
//     body('password', 'Must be greater than 8 and contain at least one uppercase letter, one lowercase letter, one symbol, and one number.')
//       .custom((val, { req }) => (val === req.body.password_confirmation)).withMessage('The passwords don\'t match.').isStrongPassword({ ...password })
//   ],
//   signInSchema: [
//     body('username', 'Is necessary and must be a string.').isString().escape(),
//     body('password', 'Must be a string greater than 8 and contain at least one uppercase letter, one lowercase letter, one symbol, and one number.')
//       .isStrongPassword({ ...password }).escape()
//   ],
//   googleSignSchema: [
//     body('token', 'Must be a valid google id token.').isString().escape()
//   ],
//   forgotPasswordSchema: [
//     body('username', 'Must be a valid phone, email or username.').isString().escape()
//   ],
//   resetPasswordSchema: [
//     param('token', 'It\'s necessary and must be a JWT.').isJWT().escape(),
//     body('password', 'Must be greater than 8 and contain at least one uppercase letter, one lowercase letter, one symbol, and one number.')
//       .custom((val, { req }) => (val === req.body.password_confirmation)).withMessage('The passwords don\'t match.').isStrongPassword({ ...password })
//   ],
//   emailVerificationSchema: [
//     param('token', 'It\'s necessary and must be a JWT.').isJWT().escape()
//   ]
// };