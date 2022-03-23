/*============================ Imports ============================*/
import * as DTO from './dto';
import NoteType from '../domain/entity';
import INoteType from '../domain/ientity';
import { classes, types as T } from '../../shared';
import * as persistence from '../infrastructure/persistence';
/*============================ Vars setup ============================*/
const { NotFoundError } = classes;
const { mongodb: { repository } } = persistence;
/*============================ Rest ============================*/

export default new class NoteTypeService {

  /**
   * Get all resources.
   * @param {object} options
   * @returns {Promise<{ total: number; pages: number; page: number; data: object[]; }>}
   */
  async getAll(options: T.ResourcesCollectionOptions = {}){

    let { page = 1, per_page = 15, where = {}, filter = {}, sort_by = null, order = 'desc' } = options;
    const { total, data } = await repository.getAll({ page, per_page, where, sort_by, order, filter });
    const pages = Math.ceil(total/per_page) || 0;
    const parsedResults = { total, pages, page, data: DTO.multiple(data) };
    return parsedResults;
  }

  /**
   * Get one resource by id.
   * @param {string} id
   * @param {string|string[]} populate
   * @returns {Promise<object>}
   */
  async getById(id: string, populate?: string|string[]){

    const where = { _id: id };
    const data = await repository.getBy(where, { populate });
    if(!data) throw new NotFoundError('Resource not found.');
    return DTO.single(data);
  }

  /**
   * Create a resource.
   * @param {object} data
   * @returns {Promise<object>}
   */
  async create(data: INoteType){

    let note = new NoteType(data);
    note = await repository.create(note);
    return DTO.single(note);
  }

  /**
   * Update a resource.
   * @param {string} id
   * @param {object} toUpdate
   * @returns {Promise<object>}
   */
  async update(id: string, toUpdate: INoteType){

    const where = { _id: id };
    const data = await repository.update(where, toUpdate);
    if(!data) throw new NotFoundError('Resource not found.');
    return DTO.single(data);
  }

  /**
   * Delete a resource.
   * @param {string} id
   * @returns {Promise<object>}
   */
  async delete(id: string){

    const where = { _id: id };
    const data = await repository.delete(where);
    if(!data) throw new NotFoundError('Resource not found.');
    return DTO.single(data);
  }
}