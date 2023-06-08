import { errors, CollectionRequestParams, FormattedCollectionResult } from '../../shared';
import { INote, NoteRepository } from '../domain/interfaces';
import * as DTO from './dto';

const { NotFoundError } = errors;

// import Note from '../domain/entity';

export default class NoteService {

 constructor(
    private repository: NoteRepository<INote>
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
   * @returns {Promise<INote>}
   */
  async getById(id: string, populate?: string|string[]): Promise<INote> {

    const where = { _id: id };
    const note = await this.repository.findBy(where, { populate });

    if(!note) throw new NotFoundError();
    return DTO.single(note);
  }

  /**
   * Create a resource.
   * @param {INote} data
   * @returns {Promise<INote>}
   */
  async create(data: INote): Promise<INote> {

    // const note = new Note(data);
    const noteCreated = <INote><unknown>(await this.repository.create(data));

    return DTO.single(noteCreated);
  }

  /**
   * Update a resource.
   * @param {string} id
   * @param {INote} toUpdate
   * @returns {Promise<INote>}
   */
  async update(id: string, toUpdate: INote): Promise<INote> {

    const where = { _id: id };
    const note = <INote><unknown>(await this.repository.update(where, toUpdate));

    if(!note) throw new NotFoundError();
    return DTO.single(note);
  }

  /**
   * Delete a resource.
   * @param {string} id
   * @returns {Promise<INote>}
   */
  async delete(id: string): Promise<INote> {

    const where = { _id: id };
    const note = <INote><unknown>(await this.repository.delete(where));

    if(!note) throw new NotFoundError();
    return DTO.single(note);
  }
}