/*============================ Imports ============================*/
import config from 'config';
import { classes } from '../../shared';
/*============================ Vars setup ============================*/
const { ValidatorBase } = classes;
const { password } = config.get('app.standards');
/*============================ Rest ============================*/

export default new class UserValidator extends ValidatorBase {

  public showAll: any[];
  public show: any[];
  public store: any[];
  public update: any[];
  public destroy: any[];
  public showAllNotes: any[];
  public showNote: any[];
  public storeNote: any[];
  public updateNote: any[];
  public destroyNote: any[];

  /**
   * Create a new user validator instance.
   */
  constructor(){

    super();
    const { query, params, body } = this.mergeBaseWith({
      params: {
        id: this.validator.param('id', 'It\'s necessary and must be a valid string.').isString().escape(),
        noteId: this.validator.param('nid', 'It\'s necessary and must be a valid string.').isMongoId()
      },
      body: {
        user: {
          store: [
            this.validator.body(['firstname', 'lastname'], 'Must be a string containing only alphabetic and space characters.').isString().escape(),
            this.validator.body('username', 'Must be a valid username.').isString().escape(),
            this.validator.body('phone', 'Must be a valid phone format.').isString().optional().escape(),
            this.validator.body('email', 'Must be a valid email.').isEmail().escape(),
            this.validator.body('password', 'Must be greater than 8 and contain at least one uppercase letter, one lowercase letter, one symbol, and one number.')
              .custom((val, { req }) => (val === req.body.password_confirmation)).withMessage('The passwords don\'t match.').isStrongPassword({ ...password })
          ],
          update: [
            this.validator.body(['firstname', 'lastname'], 'Must be a string containing only alphabetic and space characters.').isString().optional().escape(),
            this.validator.body('username', 'Must be a valid username.').isString().optional().escape(),
            this.validator.body('phone', 'Must be a valid phone format.').isString().optional().escape(),
            this.validator.body('email', 'Must be a valid email.').isEmail().optional().escape(),
            this.validator.body('password', 'Must be greater than 8 and contain at least one uppercase letter, one lowercase letter, one symbol, and one number.')
              .custom((val, { req }) => (val === req.body.password_confirmation)).withMessage('The passwords don\'t match.').isStrongPassword({ ...password }).optional().escape()
          ]
        },
        note: {
          store: [
            this.validator.body('type', 'Must be a string and a valid type.').isMongoId(),
            this.validator.body('title', 'Must be a valid string.').isString().escape(),
            this.validator.body('content', 'Must be a valid string.').isString().optional().escape()
          ],
          update: [
            this.validator.body('type', 'Must be a string and a valid type.').isMongoId().optional(),
            this.validator.body('title', 'Must be a valid string.').isString().optional().escape(),
            this.validator.body('content', 'Must be a valid string.').isString().optional().escape()
          ]
        }
      }
    });
    this.assign('showAll', query);
    this.assign('show', params.id);
    this.assign('store', body.user.store);
    this.assign('update', params.id, body.user.update);
    this.assign('destroy', params.id);
    this.assign('showAllNotes', params.id, query);
    this.assign('showNote', params.id, params.noteId);
    this.assign('storeNote', params.id, body.note.store);
    this.assign('updateNote', params.id, params.noteId, body.note.update);
    this.assign('destroyNote', params.id, params.noteId);
  }
}