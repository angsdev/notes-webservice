/*============================ Imports ============================*/
const BaseError = require('./BaseError');
const { verifyJWT } = require('../utils');
/*============================ Rest ============================*/

module.exports = class Authentication {

  /**
   * Validate if an user is authenticated through JWT.
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {Promise<void>}
   */
  async JWT(req, res, next){

    try{

      const authorization = req.header('authorization');
      if(!authorization) throw new BaseError('UNAUTHORIZED', 401, 'You\'re unauthorized to perform this action.');
      const { id } = await verifyJWT(authorization.split(' ')[1]);
      req.authUser = { id };
      next();
    } catch(err){ next(err); }
  }
};