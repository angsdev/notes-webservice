/*============================ Imports ============================*/
const { ValidatorBase } = require('../../shared').classes;
const { password } = require('config').get('app.standards');
/*============================ Rest ============================*/

module.exports = new class AuthValidator extends ValidatorBase {

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
          this.validator.body('id_token', 'Must be a valid google id token.').isString().escape()
        ],
        forgotPassword: [
          this.validator.body('email', 'Must be a valid email.').isEmail().escape()
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
};