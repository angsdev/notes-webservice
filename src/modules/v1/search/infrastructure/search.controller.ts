import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { errors, ObjectOfStringValues } from '../../shared';

const { NotFoundError } = errors;
const collections: ObjectOfStringValues = {
  users: 'users',
  notes: 'notes',
  noteTypes: 'note-types'
};

/**
 * Parse params to get correct collection and single indicator if exists.
 * @param {ParamsDictionary} params
 * @returns {Promise<ObjectOfStringValues>}
 */
const parseParams = async (params: ParamsDictionary): Promise<ObjectOfStringValues> => {

  let { collection, term, firsNestedTerm } = params;
  if(term === 'types'){

    collection = `${collection}${term.replace(/^./, (c) => c.toUpperCase() )}`
    term = firsNestedTerm;
  }
  return { collection, term };
};

export class AuthController {

  /**
   * Handle searching through different resource collections.
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<Response>}
   */
  async run(req: Request, res: Response, next: NextFunction): Promise<Response> {

    try {

      const { page, perPage, order, sortBy, ...where } = req.query;
      const { collection, term } = await parseParams(req.params);

      const moduleChosen = Object.keys(collections).find(val => val.includes(collection))
      if(!moduleChosen) throw new NotFoundError();

      const repositoryModule = await import(`../../${collections[moduleChosen]}/persistence/mongo`)
      const repository = new repositoryModule.Repository();

      const serviceModule = await import(`../../${collections[moduleChosen]}`);
      const service = new serviceModule.Service(repository)

      const method = `find${(term) ? 'ById' : 'All'}`;
      const data = await service[method](term || { page, perPage, order, sortBy, where });

      return res.json({ success: true, content: data });

    } catch(err){ next(); }
  }
}