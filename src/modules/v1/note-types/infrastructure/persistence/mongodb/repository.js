/*============================ Imports ============================*/
const model = require('./model');
const NoteTypeRepository = require('../../../domain/module-repository');
/*============================ Rest ============================*/

module.exports = new class NoteTypeMongoRepository extends NoteTypeRepository {

  /**
   * Create a new note type mongo repository instance.
   */
  constructor(){

    model.isMongo = true;
    super(model);
  }
};