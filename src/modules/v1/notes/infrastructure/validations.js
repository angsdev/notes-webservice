/*============================ Imports ============================*/
const { ValidatorBase } = require('../../shared').classes;
/*============================ Rest ============================*/

module.exports = new class NoteValidator extends ValidatorBase {

  /**
   * Create a new note validator instance.
   */
  constructor(){

    super();
    const { query, params, body } = this.mergeBaseWith({
      body: {
        store: [
          this.validator.body('type_id', 'Must be a string and a valid type.').isMongoId(),
          this.validator.body('title', 'Must be a valid string.').isString().escape(),
          this.validator.body('content', 'Must be a valid string.').isString().optional().escape()
        ],
        update: [
          this.validator.body('type_id', 'Must be a string and a valid type.').isMongoId().optional(),
          this.validator.body('title', 'Must be a valid string.').isString().optional().escape(),
          this.validator.body('content', 'Must be a valid string.').isString().optional().escape()
        ]
      }
    });
    this.assign('showAll', query);
    this.assign('show', params.id);
    this.assign('store', body.store);
    this.assign('update', params.id, body.update);
    this.assign('destroy', params.id);
  }
};