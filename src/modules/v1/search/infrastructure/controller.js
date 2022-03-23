/*============================ Imports ============================*/
const userService = require('../../users').service;
const noteService = require('../../notes').service;
const noteTypeService = require('../../note-types').service;
const { NotFoundError } = require('../../shared').classes;
/*============================ Rest ============================*/

const collections = {
  'users': userService,
  'notes': noteService,
  'notestypes': noteTypeService
};

/**
 * Parse params to get correct collection and single indicator if exists.
 * @param {object} params
 * @returns {Promise<object>}
 */
const parseParams = async (params) => {

  let { collection, term, firstNested } = params;
  if(term === 'types'){
    collection = `${collection}${term}`;
    term = firstNested;
  }
  return { collection, term };
};

module.exports = new class SearchController {

  /**
   * Handle searching through different resource collections.
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {Promise<object>}
   */
  async exec(req, res, next){

    try{

      const { page = 1, per_page = 15, sort_by, order, ...where } = req.query;
      const { collection, term } = await parseParams(req.params);
      const method = `get${(term) ? 'ById' : 'All'}`;
      const data = await collections[collection][method](term || { page, per_page, where, sort_by, order });
      res.json({ success: true, content: data });
    } catch(err){ next(new NotFoundError()); }
  }
};