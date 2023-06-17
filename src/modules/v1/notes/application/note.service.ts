import { DTO } from './note.dto';
import { Note, NoteRepository } from '../domain';
import { errors, CollectionRequestParams, FormattedCollectionResult } from '../../shared';

const { NotFoundError } = errors;

export class NoteService {

  constructor(
    private readonly repository: NoteRepository
  ){

    this.repository = repository;
  }

  /**
   * Get all resources.
   * @param {CollectionRequestParams} options
   * @returns {Promise<FormattedCollectionResult<Note>>}
   */
  async getAll(options: CollectionRequestParams = {}): Promise<FormattedCollectionResult<Note>> {

    const { page, perPage, order, sortBy, where } = options;

    const { total, collection } = await this.repository.findAll({ page, perPage, where, sortBy, order });
    const parsedResults: FormattedCollectionResult<Note> = { total, page, pages: (Math.ceil(total/perPage) || 0), collection: DTO.multiple(collection) };

    return parsedResults;
  }

  /**
   * Get one resource by id.
   * @param {string} id
   * @returns {Promise<Note>}
   */
  async getById(id: string): Promise<Note> {

    const note = await this.repository.findById(id);

    if(!note) throw new NotFoundError();
    return DTO.single(note);
  }

  /**
   * Create a resource.
   * @param {Partial<Note>} data
   * @returns {Promise<Note>}
   */
  async create(data: Partial<Note>): Promise<Note> {

    const noteCreated = await this.repository.create(data);

    return DTO.single(noteCreated);
  }

  /**
   * Update a resource.
   * @param {string} id
   * @param {Partial<Note>} toUpdate
   * @returns {Promise<Note>}
   */
  async update(id: string, toUpdate: Partial<Note>): Promise<Note> {

    const note = await this.repository.update(id, toUpdate);

    if(!note) throw new NotFoundError();
    return DTO.single(note);
  }

  /**
   * Delete a resource.
   * @param {string} id
   * @returns {Promise<Note>}
   */
  async delete(id: string): Promise<Note> {

    const note = await this.repository.delete(id);

    if(!note) throw new NotFoundError();
    return DTO.single(note);
  }
}