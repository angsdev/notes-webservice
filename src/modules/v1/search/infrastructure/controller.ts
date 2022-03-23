/*============================ Imports ============================*/
import { classes, types as T } from '../../shared';
import { service as userService } from '../../users';
import { service as noteService } from '../../notes';
import { NextFunction, Request, Response } from 'express';
import * as expressTypes from 'express-serve-static-core';
import { service as noteTypeService } from '../../note-types';
/*============================ Vars setup ============================*/
const { NotFoundError } = classes;
/*============================ Rest ============================*/

const collections: { [x: string]: any } = {
  'users': userService,
  'notes': noteService,
  'notestypes': noteTypeService
};

/**
 * Parse params to get correct collection and single indicator if exists.
 * @param {object} params
 * @returns {Promise<object>}
 */
const parseParams = async (params: expressTypes.ParamsDictionary) => {

  let { collection, term, firstNested } = params;
  if(term === 'types'){
    collection = `${collection}${term}`;
    term = firstNested;
  }
  return { collection, term };
};

export default new class SearchController {

  /**
   * Handle searching through different resource collections.
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {Promise<object>}
   */
  async exec(req: Request, res: Response, next: NextFunction){

    try{

      const { page = 1, per_page = 15, sort_by, order, ...where }: T.ResourcesCollectionOptions = req.query;
      const { collection, term }: { [x: string]: string|number } = await parseParams(req.params);
      const method = `get${(term) ? 'ById' : 'All'}`;
      const data = await collections[collection][method](term || { page, per_page, where, sort_by, order });
      res.json({ success: true, content: data });
    } catch(err){ next(new NotFoundError()); }
  }
}