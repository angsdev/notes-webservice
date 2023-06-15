import * as bcrypt from 'bcryptjs';
import { DTO } from './user.dto';
import { Note } from '../../notes/domain';
import { User, UserRepository } from '../domain';
import { errors, utils, globalEventEmitter, CollectionRequestParams, FormattedCollectionResult } from '../../shared';

const { Jwt } = utils;
const { NotFoundError } = errors;

export class UserService {

  constructor(
    protected readonly repository: UserRepository
  ){

    this.repository = repository;
  }

  /**
   * Get all resources.
   * @param {CollectionRequestParams} options
   * @returns {Promise<FormattedCollectionResult>}
   */
  async getAll(options: CollectionRequestParams = {}): Promise<FormattedCollectionResult> {

    const { page, perPage, order, sortBy, where } = options;

    const { total, collection } = await this.repository.findAll({ page, perPage, where, sortBy, order });
    const parsedResults: FormattedCollectionResult = { total, page, pages: (Math.ceil(total/perPage) || 0), collection: DTO.multiple(collection) };

    return parsedResults;
  }

  /**
   * Get one resource by any of given fields.
   * @param {string} index
   * @returns {Promise<IUser>}
   */
  async getByIndex(index: string): Promise<User> {

    const user = await this.repository.findByIndex(index);

    if(!user) throw new NotFoundError();
    return DTO.single(user);
  }

  /**
   * Create a resource.
   * @param {User} data
   * @returns {Promise<User>}
   */
  async create(data: Partial<User>): Promise<User> {

    const user = new User(data);
    await user.hashPassword();

    const userCreated = await this.repository.create(user);
    userCreated.accessToken = await Jwt.generate({ id: userCreated.id });

    const mailToken = await Jwt.generate({ id: userCreated.id }, { expiresIn: '1y' });
    globalEventEmitter.emit('verifyEmail', { version: 'v1', token: mailToken, to: userCreated.email });

    return DTO.single(userCreated);
  }

  /**
   * Update a resource.
   * @param {string} index
   * @param {Partial<User>} toUpdate
   * @returns {Promise<User>}
   */
  async update(index: string, toUpdate: Partial<User>): Promise<User> {

    toUpdate.password = (toUpdate.password) ? await bcrypt.hash(toUpdate.password, await bcrypt.genSalt()) : undefined;
    const user = await this.repository.update(index, toUpdate);

    if(!user) throw new NotFoundError();
    return DTO.single(user);
  }

  /**
   * Delete a resource.
   * @param {string} index
   * @returns {Promise<User>}
   */
  async delete(index: string): Promise<User> {

    const user = await this.repository.delete(index);

    if(!user) throw new NotFoundError();
    return DTO.single(user);
  }

  /**
   * Get all sub-resources.
   * @param {string} index
   * @param {object} options
   * @returns {Promise<CollectionRequestParams>}
   */
  async getAllNotes(index: string, options: CollectionRequestParams = {}): Promise<FormattedCollectionResult> {

    const { page, perPage, order, sortBy, where } = options;

    const { total, collection } = await this.repository.findAllNotes(index, { page, perPage, where: where, sortBy, order });
    const parsedResults: FormattedCollectionResult = { total, page, pages: (Math.ceil(total/perPage) || 0), collection };

    return parsedResults;
  }

  /**
   * Get one sub-resource by id.
   * @param {string} index
   * @param {string} noteId
   * @returns {Promise<Note>}
   */
  async getNote(index: string, noteId: string): Promise<Note> {

    const note = await this.repository.findNoteById(index, noteId);

    if(!note) throw new NotFoundError();
    return note;
  }

  /**
   * Create a sub-resource.
   * @param {string} index
   * @param {Partial<Note>} data
   * @returns {Promise<Note>}
   */
  async createNote(index: string, data: Partial<Note>): Promise<Note> {

    const note = await this.repository.createNote(index, data);

    return note;
  }

  /**
   * Update a sub-resource.
   * @param {string} index
   * @param {string} noteId
   * @param {Partial<Note>} toUpdate
   * @returns {Promise<Note>}
   */
  async updateNote(index: string, noteId: string, toUpdate: Partial<Note>): Promise<Note> {

    const note = await this.repository.updateNote(index, noteId, toUpdate);

    if(!note) throw new NotFoundError();
    return note;
  }

  /**
   * Delete a sub-resource.
   * @param {string} index
   * @param {string} noteId
   * @returns {Promise<Note>}
   */
  async deleteNote(index: string, noteId: string): Promise<Note> {

    const note = await this.repository.deleteNote(index, noteId);

    if(!note) throw new NotFoundError();
    return note;
  }
}