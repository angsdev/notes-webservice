import { DTO } from './note-type.dto';
import { NoteType, NoteTypeRepository } from '../domain';
import { errors, CollectionRequestParams, FormattedCollectionResult } from '../../shared';

const { NotFoundError } = errors;

export class NoteTypeService {

  constructor(
    private readonly repository: NoteTypeRepository
  ){

    this.repository = repository;
  }

  /**
   * Get all resources.
   * @param {CollectionRequestParams} options
   * @returns {Promise<FormattedCollectionResult<NoteType>>}
   */
  async getAll(options: CollectionRequestParams = {}): Promise<FormattedCollectionResult<NoteType>> {

    const { page, perPage, order, sortBy, where } = options;

    const { total, collection } = await this.repository.findAll({ page, perPage, where, sortBy, order });
    const parsedResults: FormattedCollectionResult<NoteType> = { total, page, pages: (Math.ceil(total/perPage) || 0), collection: DTO.multiple(collection) };

    return parsedResults;
  }

  /**
   * Get one resource by id.
   * @param {string} id
   * @returns {Promise<NoteType>}
   */
  async getById(id: string): Promise<NoteType> {

    const noteType = await this.repository.findById(id);

    if(!noteType) throw new NotFoundError();
    return DTO.single(noteType);
  }

  /**
   * Create a resource.
   * @param {Partial<NoteType>} data
   * @returns {Promise<NoteType>}
   */
  async create(data: Partial<NoteType>): Promise<NoteType> {

    const noteTypeCreated = await this.repository.create(data);

    return DTO.single(noteTypeCreated);
  }

  /**
   * Update a resource.
   * @param {string} id
   * @param {Partial<NoteType>} toUpdate
   * @returns {Promise<NoteType>}
   */
  async update(id: string, toUpdate: Partial<NoteType>): Promise<NoteType> {

    const noteType = await this.repository.update(id, toUpdate);

    if(!noteType) throw new NotFoundError();
    return DTO.single(noteType);
  }

  /**
   * Delete a resource.
   * @param {string} id
   * @returns {Promise<NoteType>}
   */
  async delete(id: string): Promise<NoteType> {

    const noteType = await this.repository.delete(id);

    if(!noteType) throw new NotFoundError();
    return DTO.single(noteType);
  }
}