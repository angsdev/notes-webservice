import * as bcrypt from 'bcryptjs';
import { CacheManager } from '../../../../shared/services/cache';
import { Note } from '../../notes/domain';
import { CollectionRequestParams, FormattedCollectionResult, errors, globalEventEmitter, utils } from '../../shared';
import { User, UserRepository } from '../domain';
import { DTO } from './user.dto';

const { Jwt } = utils;
const { NotFoundError } = errors;

export class UserService {

  constructor(
    protected readonly repository: UserRepository,
    protected readonly cache?: CacheManager
  ){

  }

  /**
   * Get all resources.
   * @param {CollectionRequestParams} options
   * @returns {Promise<FormattedCollectionResult<User>>}
   */
  async getAll(options: CollectionRequestParams = {}): Promise<FormattedCollectionResult<User>> {

    const { page, perPage, order, sortBy, where } = options;

    const cacheKey = `user:all?page=${page}&perPage=${perPage}&order=${order}&sortBy=${sortBy}&where=${where}`;
    const cachedResult = await this.cache?.get<FormattedCollectionResult<User>>(cacheKey);
    if(cachedResult) return cachedResult;

    const { total, collection } = await this.repository.findAll({ page, perPage, where, sortBy, order });
    const parsedResults: FormattedCollectionResult<User> = { total, page, pages: (Math.ceil(total/perPage) || 0), collection: DTO.multiple(collection) };

    await this.cache?.set(cacheKey, parsedResults, { expirationMs: 60000 });
    return parsedResults;
  }

  /**
   * Get one resource by any of given fields.
   * @param {string} index
   * @returns {Promise<IUser>}
   */
  async getByIndex(index: string): Promise<User> {

    const cacheKey = `user:${index}`;
    const cachedResult = await this.cache?.get<User>(cacheKey);
    if(cachedResult) return cachedResult;

    const user = await this.repository.findByIndex(index);
    if(!user) throw new NotFoundError();

    await this.cache?.set<User>(cacheKey, user, { expirationMs: 60000 });
    return DTO.single(user);
  }

  /**
   * Get one resource by any of given fields.
   * @param {string} id
   * @returns {Promise<IUser>}
   */
  async getById(id: string): Promise<User> {

    return this.getByIndex(id);
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
   * @param {CollectionRequestParams} options
   * @returns {Promise<FormattedCollectionResult<Note>>}
   */
  async getAllNotes(index: string, options: CollectionRequestParams = {}): Promise<FormattedCollectionResult<Note>> {

    const { page, perPage, order, sortBy, where } = options;

    const cacheKey = `user-${index}-note:all?page=${page}&perPage=${perPage}&order=${order}&sortBy=${sortBy}&where=${where}`;
    const cachedResult = await this.cache?.get<FormattedCollectionResult<Note>>(cacheKey);
    if(cachedResult) return cachedResult;

    const { total, collection } = await this.repository.findAllNotes(index, { page, perPage, where: where, sortBy, order });
    const parsedResults: FormattedCollectionResult<Note> = { total, page, pages: (Math.ceil(total/perPage) || 0), collection };

    await this.cache?.set(cacheKey, parsedResults, { expirationMs: 60000 });
    return parsedResults;
  }

  /**
   * Get one sub-resource by id.
   * @param {string} index
   * @param {string} noteId
   * @returns {Promise<Note>}
   */
  async getNote(index: string, noteId: string): Promise<Note> {

    const cacheKey = `user-${index}-note:${noteId}`;
    const cachedResult = await this.cache?.get<Note>(cacheKey);
    if(cachedResult) return cachedResult;

    const note = await this.repository.findNoteById(index, noteId);
    if(!note) throw new NotFoundError();

    await this.cache?.set<Note>(cacheKey, note, { expirationMs: 60000 });
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