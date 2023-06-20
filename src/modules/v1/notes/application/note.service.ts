import { DTO } from './note.dto';
import { Note, NoteRepository } from '../domain';
import { CacheManager } from '../../../../shared/services/cache';
import { errors, CollectionRequestParams, FormattedCollectionResult } from '../../shared';

const { NotFoundError } = errors;


export class NoteService {

  constructor(
    private readonly repository: NoteRepository,
    private readonly cache?: CacheManager
  ){

    this.repository = repository;
    this.cache = cache;
  }

  /**
   * Get all resources.
   * @param {CollectionRequestParams} options
   * @returns {Promise<FormattedCollectionResult<Note>>}
   */
  async getAll(options: CollectionRequestParams = {}): Promise<FormattedCollectionResult<Note>> {

    const { page, perPage, order, sortBy, where } = options;

    const cacheKey = `note:all?page=${page}&perPage=${perPage}&order=${order}&sortBy=${sortBy}&where=${where}`;
    const cachedResult = await this.cache?.get<FormattedCollectionResult<Note>>(cacheKey);
    if(cachedResult) return cachedResult;

    const { total, collection } = await this.repository.findAll({ page, perPage, where, sortBy, order });
    const parsedResults: FormattedCollectionResult<Note> = { total, page, pages: (Math.ceil(total/perPage) || 0), collection: DTO.multiple(collection) };

    await this.cache?.set(cacheKey, parsedResults, { expirationMs: 60000 });
    return parsedResults;
  }

  /**
   * Get one resource by id.
   * @param {string} id
   * @returns {Promise<Note>}
   */
  async getById(id: string): Promise<Note> {

    const cacheKey = `note:${id}`;
    const cachedResult = await this.cache?.get<Note>(cacheKey);
    if(cachedResult) return cachedResult;

    const note = await this.repository.findById(id);
    if(!note) throw new NotFoundError();

    await this.cache?.set<Note>(cacheKey, note, { expirationMs: 60000 });
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