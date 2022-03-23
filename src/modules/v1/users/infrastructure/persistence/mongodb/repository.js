/*============================ Imports ============================*/
const model = require('./model');
const UserRepository = require('../../../domain/module-repository');
/*============================ Rest ============================*/

module.exports = new class UserMongodbRepository extends UserRepository {

  /**
   * Create a new user mongo repository instance.
   */
  constructor(){

    model.isMongo = true;
    super(model);
  }
};