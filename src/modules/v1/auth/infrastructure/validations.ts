import config from 'config';
import { types } from '../../shared';
import { ValidatorBase } from '../../shared';

const { password }: types.ObjectOfAnyValue = config.get('app.standards');
/*============================ Rest ============================*/

export default new class AuthValidator extends ValidatorBase {

  public signUp: any[];
  public signIn: any[];
  public googleSign: any[];
  public forgotPassword: any[];
  public resetPassword: any[];
  public emailVerify: any[];

  /**
   * Create a new auth validator instance.
   */
  constructor(){

    super();
    const { params, body } = this.mergeBaseWith({
      params: {
        token: this.validator.param('token', 'It\'s necessary and must be a JWT.').isJWT().escape()
      },
      body: {
        signUp: [
          this.validator.body(['firstname', 'lastname'], 'Must be a string containing only alphabetic and space characters.').isString().escape(),
          this.validator.body('username', 'Must be a valid username.').isString().escape(),
          this.validator.body('phone', 'Must be a valid phone format.').isString().optional().escape(),
          this.validator.body('email', 'Must be a valid email.').isEmail().escape(),
          this.validator.body('password', 'Must be greater than 8 and contain at least one uppercase letter, one lowercase letter, one symbol, and one number.')
            .custom((val, { req }) => (val === req.body.password_confirmation)).withMessage('The passwords don\'t match.').isStrongPassword({ ...password })
        ],
        signIn: [
          this.validator.body('username', 'Is necessary and must be a string.').isString().escape(),
          this.validator.body('password', 'Must be a string greater than 8 and contain at least one uppercase letter, one lowercase letter, one symbol, and one number.')
            .isStrongPassword({ ...password }).escape()
        ],
        googleSign: [
          this.validator.body('token', 'Must be a valid google id token.').isString().escape()
        ],
        forgotPassword: [
          this.validator.body('username', 'Must be a valid phone, email or username.').isString().escape()
        ],
        resetPassword: [
          this.validator.body('password', 'Must be greater than 8 and contain at least one uppercase letter, one lowercase letter, one symbol, and one number.')
            .custom((val, { req }) => (val === req.body.password_confirmation)).withMessage('The passwords don\'t match.').isStrongPassword({ ...password })
        ]
      }
    });
    this.assign('signUp', body.signUp);
    this.assign('signIn', body.signIn);
    this.assign('googleSign', body.googleSign);
    this.assign('forgotPassword', body.forgotPassword);
    this.assign('resetPassword', params.token, body.resetPassword);
    this.assign('emailVerify', params.token);
  }
}