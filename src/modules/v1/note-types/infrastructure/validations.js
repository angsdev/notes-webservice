/*============================ Imports ============================*/
const { ValidatorBase } = require('../../shared').classes;
/*============================ Rest ============================*/

module.exports = new class NoteTypeValidator extends ValidatorBase {

  /**
   * Create a new note type validator instance.
   */
  constructor(){

    super();
    const { query, params, body } = this.mergeBaseWith({
      body: {
        store: [
          this.validator.body('name', 'Must be a valid string and can\'t contain special characters.').isString().escape(),
          this.validator.body('description', 'Must be a valid string.').isString().optional().escape()
        ],
        update: [
          this.validator.body('name', 'Must be a valid string and can\'t contain special characters.').isString().optional().escape(),
          this.validator.body('description', 'Must be a valid string.').isString().optional().escape()
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