/*============================ Imports ============================*/
import model from './model';
import { types as T } from '../../../../shared'
import INoteType from '../../../domain/ientity';
import INoteTypeRepository from '../../../domain/imodule-repository';
/*============================ Rest ============================*/

export default new class NoteTypeMongoRepository implements INoteTypeRepository {

  /**
   * Get all documents and it total.
   * @param {{ where?: object; filter?: object; page?: number; per_page?: number; sort?: object; populate?: string|string[]|object[]; }} options
   * @returns {Promise<{ total: number; data: object[]; }>}
   */
   async getAll(options: T.ResourcesCollectionOptions = {}){

    const { page = 1, per_page = 15, where = {}, order = 'desc', populate = [], filter = {} } = options;
    let { sort_by = [] } = options;
    where.deleted_at = null;
    if(typeof(sort_by) === 'string'){

      sort_by = sort_by.split(',');
      sort_by = (sort_by[0]) ? sort_by.map((attr: string) => [ attr, ((order === 'asc') ? 1 : -1) ]) : [];
      sort_by.unshift([ '_id', ((order === 'asc') ? 1 : -1) ]);
    }
    const [ total, data ] = await Promise.all([
      model.countDocuments(where),
      model.find(where, filter).skip((page - 1) * per_page).limit(per_page).sort(sort_by).populate(populate)
    ]);
    return { total, data };
  }

  /**
   * Get one document.
   * @param {object} where
   * @param {{ filter?: object; populate?: string|string[]|object[]; }} options
   * @returns {Promise<object>}
   */
  async getBy(where: T.ModelIdentifiers, options: T.SingleResourceOptions = {}){

    const { filter = {}, populate = [] } = options;
    const data = await model.findOne(where, filter).populate(populate);
    return data;
  }

  /**
   * Create one or more documents.
   * @param {{ name: string; description?: string; }} data
   * @returns {Promise<object|object[]>}
   */
  async create(data: INoteType){

    data = await ((Array.isArray(data)) ? model.insertMany(data)
                                        : model.create(data));
    return data;
  }

  /**
   * Update one or more documents.
   * @param {object} where
   * @param {{ name?: string; description?: string; }} toUpdate
   * @param {{ fields?: any[]; populate?: string|string[]|object[]; many?: boolean; }} options
   * @returns {Promise<object|object[]>}
   */
  async update(where: T.ModelIdentifiers, toUpdate: INoteType|object, options: T.SingleResourceOptions = {}){

    const { populate = [], many = false } = options;
    options = { timestamps: true, new: true, ...options };
    const data = await ((many) ? model.updateMany(where, toUpdate, options).populate(populate)
                               : model.findOneAndUpdate(where, toUpdate, options).populate(populate));
    return data;
  }

  /**
   * Delete one or more documents.
   * @param {object} where
   * @param {{ many?: boolean; }} options
   * @returns {Promise<object|object[]>}
   */
  async delete(where: T.ModelIdentifiers, options: T.SingleResourceOptions = {}){

    const { many = false } = options;
    const data = await ((many) ? model.deleteMany(where)
                               : model.findOneAndDelete(where));
    return data;
  }
}