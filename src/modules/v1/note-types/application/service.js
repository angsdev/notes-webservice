/*============================ Imports ============================*/
const DTO = require('./dto');
const NoteType = require('../domain/entity');
const { NotFoundError } = require('../../shared').classes;
const { mongodb: { repository } } = require('../infrastructure/persistence');
/*============================ Rest ============================*/

module.exports = new class NoteTypeService {

  /**
   * Get all resources.
   * @param {object} options
   * @returns {Promise<{ total: number; pages: number; page: number; data: object[] }>}
   */
  async getAll(options = {}){

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
  async getById(id, populate = []){

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
  async create(data){

    let noteType = new NoteType(data);
    noteType = await repository.create(noteType);
    return DTO.single(noteType);
  }

  /**
   * Update a resource.
   * @param {string} id
   * @param {object} toUpdate
   * @returns {Promise<object>}
   */
  async update(id, toUpdate){

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
  async delete(id){

    const where = { _id: id };
    const data = await repository.delete(where);
    if(!data) throw new NotFoundError('Resource not found.');
    return DTO.single(data);
  }
};