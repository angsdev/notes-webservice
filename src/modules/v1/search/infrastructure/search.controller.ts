import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { errors, ObjectOfStringValues } from '../../shared';

const { NotFoundError } = errors;


export class SearchController {

  private collections: Record<string, string> = {
    users: 'users',
    notes: 'notes',
    noteTypes: 'note-types'
  }

  async parseParams(params: ParamsDictionary): Promise<Record<string, string>> {

    let { collection, term, firsNestedTerm } = params;
    if(term === 'types'){

      collection = `${collection}${term.replace(/^./, (c) => c.toUpperCase() )}`
      term = firsNestedTerm;
    }
    return { collection, term };
  }

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
      const { collection, term } = await this.parseParams(req.params);
      const moduleClassName = collection.replace(/^./, (c) => c.toUpperCase() );

      const moduleDir = Object.keys(this.collections).find(val => val.includes(collection))
      if(!moduleDir) throw new NotFoundError();

      const repositoryModule = await import(`../../${this.collections[moduleDir]}/infrastructure/persistence/mongo`);
      const repository = new repositoryModule[`${moduleClassName}MongoRepository`]();

      const serviceModule = await import(`../../${this.collections[moduleDir]}/application`);
      const service = new serviceModule[`${moduleClassName}Service`](repository);

      const method = `get${(term) ? 'ById' : 'All'}`;
      const data = await service[method](term || { page, perPage, order, sortBy, where });

      return res.json({ success: true, content: data });

    } catch(err){ next(); }
  }
}