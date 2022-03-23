/*============================ Imports ============================*/
import model from './model';
import IUser from '../../../domain/ientity';
import { types as T } from '../../../../shared'
import IUserRepository from '../../../domain/imodule-repository';
/*============================ Rest ============================*/

export default new class UserMongodbRepository implements IUserRepository {

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
   * @param {{ firstname: string; lastname: string; username: string; phone?: string; email: string; password?: string; access_token?: string; }|object[]} data
   * @returns {Promise<object|object[]>}
   */
  async create(data: IUser){

    data = await ((Array.isArray(data)) ? model.insertMany(data)
                                        : model.create(data));
    return data;
  }

  /**
   * Update one or more documents.
   * @param {object} where
   * @param {{ firstname?: string; lastname?: string; username?: string; phone?: string; email?: string; password?: string; }} toUpdate
   * @param {{ fields?: any[]; populate?: string|string[]|object[]; many?: boolean; }} options
   * @returns {Promise<object|object[]>}
   */
  async update(where: T.ModelIdentifiers, toUpdate: IUser|object, options: T.SingleResourceOptions = {}){

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

  /**
   * Get all documents from a sub model and it total.
   * @param {object} where
   * @param {string} subName
   * @param {object} options
   * @returns {Promise<{ total: number; data: object[]; }>}
   */
  async getSubAll(where: T.ModelIdentifiers, subName: string, options: T.ResourcesCollectionOptions = {}){


    const { page = 1, per_page = 15, where: subWhere = {}, order = 'desc', populate = [], filter = {} } = options;
    let { sort_by = [] } = options;
    where.deleted_at = null;
    if(typeof(sort_by) === 'string'){

      sort_by = sort_by.split(',');
      sort_by = (sort_by[0]) ? sort_by.map(attr => [ attr, ((order === 'asc') ? 1 : -1) ]) : [];
      sort_by.unshift([ '_id', ((order === 'asc') ? 1 : -1) ]);
    }
    const main = await model.findOne(where).populate([{ path: subName, match: subWhere, select: filter, options: { sort: sort_by } }]);
    const total = main[subName].length;
    const data = main[subName].splice(((page - 1) * per_page), per_page);
    return { total, data };
  }

  /**
    * Get one sub model document.
    * @param {object} where
    * @param {object} sub
    * @param {object} options
    * @returns {Promise<object>}
    */
  async getSubBy(where: T.ModelIdentifiers, sub: T.ModelIdentifiers, options: T.SingleResourceOptions = {}){

    const { filter = [], populate = [] } = options;
    const [ subName, subWhere ] =  Object.entries(sub)[0];
    const main = await model.findOne(where).populate([{ path: subName, match: subWhere, select: filter, populate }]);
    const data = main[subName][0];
    return data;
  }

  /**
    * Create one or more sub model documents.
    * @param {object} where
    * @param {object} subName
    * @param {object} data
    * @returns {Promise<object|object[]>}
    */
  async createSub(where: T.ModelIdentifiers, subName: string, data: object|object[]){

    const main = await model.findOne(where).populate([{ path: subName }]);
    const sub = main[subName];
    (Array.isArray(data)) ? sub.push(...data) : sub.push(data);
    data = await ((Array.isArray(data)) ? Promise.all(sub.filter((subDoc: {[x:string]: any}, index: number) => (index < (sub.length - data.length)) ? null : subDoc.save()))
                                        : sub[sub.length - 1].save());
    await main.save();
    return data;
  }

   /**
    * Update one or more sub model documents.
    * @param {object} where
    * @param {object} sub
    * @param {object} toUpdate
    * @param {object} options
    * @returns {Promise<object|object[]>}
    */
  async updateSub(where: T.ModelIdentifiers, sub: T.ModelIdentifiers, toUpdate: object, options: T.SingleResourceOptions = {}){

    const { filter = [], populate = [] } = options;
    const [ subName, subWhere ] =  Object.entries(sub)[0];
    const main = await model.findOne(where).populate([{ path: subName, match: subWhere, select: filter, populate }]);
    sub = main[subName];
    const data = await ((Array.isArray(sub)) ? Promise.all(sub.map(subDoc => Object.assign(subDoc, toUpdate).save()))
                                             : Object.assign(sub, toUpdate).save());
    return (data.length > 1) ? data : data[0];
  }

  /**
    * Delete one or more sub model documents.
    * @param {object} where
    * @param {object} sub
    * @param {object} options
    * @returns {Promise<object|object[]>}
    */
  async deleteSub(where: T.ModelIdentifiers, sub: T.ModelIdentifiers, options: T.SingleResourceOptions = {}){

    const { filter = [], populate = [] } = options;
    const [ subName, subWhere ] = Object.entries(sub)[0];
    const firstId = Object.values(subWhere)[0];
    const main = await model.findOneAndUpdate(where, { $pull: { [subName]: firstId } }).populate([{ path: subName, match: subWhere, select: filter, populate }]);
    if(!main) return null;
    sub = main[subName];
    const data = (Array.isArray(sub)) ? await Promise.all(sub.map(subDoc => subDoc.delete()))
                                      : await sub.delete();
    return (data.length > 1) ? data : data[0];
  }
}