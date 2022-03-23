/*============================ Imports ============================*/
const model = require('./model');
const NoteRepository = require('../../../domain/module-repository');
/*============================ Rest ============================*/

module.exports = new class NoteMongoRepository extends NoteRepository {

  /**
   * Create a new note mongo repository instance.
   */
  constructor(){

    model.isMongo = true;
    super(model);
  }
};