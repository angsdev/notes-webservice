/*============================ Imports ============================*/
const { ValidatorBase } = require('../../shared').classes;
/*============================ Rest ============================*/

module.exports = new class SearchValidator extends ValidatorBase {

  /**
   * Create a new search validator instance.
   */
  constructor(){

    super();
    const { query, params: { collection, id } } = this.mergeBaseWith({
      params: {
        collection: this.validator.param('collection', 'It\'s necessary and must be a valid string.').isString().escape(),
        id: this.validator.param('term', 'It\'s necessary and must be a valid string.').isString().optional().escape()
      }
    });
    this.assign('exec', query, collection, id);
  }
};