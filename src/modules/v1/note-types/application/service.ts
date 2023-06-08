import { errors, CollectionRequestParams, FormattedCollectionResult } from '../../shared';
import { INoteType, NoteTypeRepository } from '../domain/interfaces';
import * as DTO from './dto';

const { NotFoundError } = errors;

// import NoteType from '../domain/entity';

export default class NoteTypeService {

 constructor(
    private repository: NoteTypeRepository<INoteType>
  ){

    this.repository = repository;
  }

  /**
   * Get all resources.
   * @param {CollectionRequestParams} options
   * @returns {Promise<FormattedCollectionResult>}
   */
  async getAll(options: CollectionRequestParams = {}): Promise<FormattedCollectionResult> {

    let { page, perPage, order, sortBy, where } = options;

    const { total, collection } = await this.repository.findAll({ page, perPage, where, sortBy, order });
    const pages = Math.ceil(total/perPage) || 0;
    const parsedResults: FormattedCollectionResult = { total, pages, page, collection: DTO.multiple(collection) };
    return parsedResults;
  }

  /**
   * Get one resource by id.
   * @param {string} id
   * @param {string|string[]} populate
   * @returns {Promise<INoteType>}
   */
  async getById(id: string, populate?: string|string[]): Promise<INoteType> {

    const where = { _id: id };
    const noteType = await this.repository.findBy(where, { populate });

    if(!noteType) throw new NotFoundError();
    return DTO.single(noteType);
  }

  /**
   * Create a resource.
   * @param {INoteType} data
   * @returns {Promise<INoteType>}
   */
  async create(data: INoteType): Promise<INoteType> {

    // let note = new NoteType(data);
    const noteTypeCreated = <INoteType><unknown>(await this.repository.create(data));

    return DTO.single(noteTypeCreated);
  }

  /**
   * Update a resource.
   * @param {string} id
   * @param {INoteType} toUpdate
   * @returns {Promise<INoteType>}
   */
  async update(id: string, toUpdate: INoteType): Promise<INoteType> {

    const where = { _id: id };
    const noteType = <INoteType><unknown>(await this.repository.update(where, toUpdate));

    if(!noteType) throw new NotFoundError();
    return DTO.single(noteType);
  }

  /**
   * Delete a resource.
   * @param {string} id
   * @returns {Promise<INoteType>}
   */
  async delete(id: string): Promise<INoteType> {

    const where = { _id: id };
    const noteType = <INoteType><unknown>(await this.repository.delete(where));

    if(!noteType) throw new NotFoundError();
    return DTO.single(noteType);
  }
}