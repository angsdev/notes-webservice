import { JwtPayload } from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { errors, globalEventEmitter, CollectionRequestParams, utils, FormattedCollectionResult, IsFilterable } from '../../shared';
import { IUser, UserRepository, UserSignInOptions } from '../domain/interfaces';
import User from '../domain/entity';
import * as DTO from './dto';

const { NotFoundError, UnauthorizedError } = errors;
const { orField, Jwt, googleAuth } = utils;

export default class UserService {

  constructor(
    private repository: UserRepository<IUser>
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
   * Get one resource by any of given fields.
   * @param {string} id
   * @param {string|string[]} populate
   * @returns {Promise<IUser>}
   */
  async getByAnyOf(id: string, populate?: string|string[]): Promise<IUser> {

    const where = { $or: orField(id, '_id|email|phone|username') };
    const user = await this.repository.findBy(where, { populate });

    if(!user) throw new NotFoundError();
    return DTO.single(user);
  }

  /**
   * Get one resource by id.
   * @param {string} id
   * @param {string|string[]} populate
   * @returns {Promise<IUser>}
   */
  async getById(id: string, populate?: string|string[]): Promise<IUser> {

    const where = { _id: id };
    const user = await this.repository.findBy(where, { populate });

    if(!user) throw new NotFoundError();
    return DTO.single(user);
  }

  /**
   * Get one resource by username.
   * @param {string} username
   * @param {string|string[]} populate
   * @returns {Promise<IUser>}
   */
  async getByUsername(username: string, populate?: string|string[]): Promise<IUser> {

    const where = { username };
    const user = await this.repository.findBy(where, { populate });

    if(!user) throw new NotFoundError();
    return DTO.single(user);
  }

  /**
   * Get one resource by email.
   * @param {string} email
   * @param {string|string[]} populate
   * @returns {Promise<IUser>}
   */
  async getByEmail(email: string, populate?: string|string[]): Promise<IUser> {

    const where = { email };
    const user = await this.repository.findBy(where, { populate });

    if(!user) throw new NotFoundError();
    return DTO.single(user);
  }

  /**
   * Create a resource.
   * @param {IUser} data
   * @returns {Promise<IUser>}
   */
  async create(data: IUser): Promise<IUser> {

    const user = new User(data);
    await user.hashPassword();

    const userCreated = <IUser><unknown>(await this.repository.create(user));
    userCreated.accessToken = await Jwt.generate({ id: userCreated._id });

    const mailToken = await Jwt.generate({ id: userCreated._id }, { expiresIn: '1y' });
    globalEventEmitter.emit('verifyEmail', { version: 'v1', token: mailToken, to: userCreated.email });

    return DTO.single(userCreated);
  }

  /**
   * Update a resource.
   * @param {string} id
   * @param {IUser} toUpdate
   * @returns {Promise<IUser>}
   */
  async update(id: string, toUpdate: IUser): Promise<IUser> {

    const where = { $or: orField(id, '_id|email|phone|username') };

    if(toUpdate.password) toUpdate.password = await bcrypt.hash(toUpdate.password, await bcrypt.genSalt());
    const user = <IUser><unknown>(await this.repository.update(where, toUpdate));

    if(!user) throw new NotFoundError();
    return DTO.single(user);
  }

  /**
   * Soft delete a resource.
   * @param {string} id
   * @returns {Promise<IUser>}
   */
  async softDelete(id: string): Promise<IUser>{

    const where = { $or: orField(id, '_id|email|phone|username') };
    const softDelete = { deletedAt: new Date(Date.now()) };
    const user = <IUser><unknown>(await this.repository.update(where, softDelete));

    if(!user) throw new NotFoundError();
    return DTO.single(user);
  }

  /**
   * Delete a resource.
   * @param {string} id
   * @returns {Promise<IUser>}
   */
  async delete(id: string): Promise<IUser> {

    const where = { $or: orField(id, '_id|email|phone|username') };
    const user = <IUser><unknown>(await this.repository.delete(where));

    if(!user) throw new NotFoundError();
    return DTO.single(user);
  }

  /**
   * Get all sub-resources.
   * @param {string} id
   * @param {object} options
   * @returns {Promise<CollectionRequestParams & IsFilterable>}
   */
  async getAllNotes(id: string, options: CollectionRequestParams & IsFilterable = {}): Promise<FormattedCollectionResult> {

    let { page, perPage, order, sortBy, where: subWhere = {}, filter = [] } = options;
    const where = { $or: orField(id, '_id|email|phone|username') };

    const { total, collection } = await this.repository.findSubAll(where, 'notes', { page, perPage, where: subWhere, sortBy, order, filter });
    const pages = Math.ceil(total/perPage) || 0;
    const parsedResults: FormattedCollectionResult = { total, pages, page, collection };
    return parsedResults;
  }

  /**
   * Get one sub-resource by id.
   * @param {string} id
   * @param {string} nid
   * @returns {Promise<object>}
   */
  async getNote(id: string, nid: string): Promise<object> {

    const subWhere = { notes: { _id: nid } };
    const where = { $or: orField(id, '_id|email|phone|username'), ...subWhere };

    const note = await this.repository.findSubBy(where, subWhere);
    if(!note) throw new NotFoundError();
    return note;
  }

  /**
   * Create a sub-resource.
   * @param {string} id
   * @param {object} data
   * @returns {Promise<object>}
   */
  async createNote(id: string, data: object): Promise<object> {

    const where = { $or: orField(id, '_id|email|phone|username') };

    const note = await this.repository.createSub(where, 'notes', data);
    return note;
  }

  /**
   * Update a sub-resource.
   * @param {string} id
   * @param {string} nid
   * @param {object} toUpdate
   * @returns {Promise<object>}
   */
  async updateNote(id: string, nid: string, toUpdate: object): Promise<object> {

    const subWhere = { notes: { _id: nid } };
    const where = { $or: orField(id, '_id|email|phone|username'), ...subWhere };

    const note = await this.repository.updateSub(where, subWhere, toUpdate);

    if(!note) throw new NotFoundError();
    return note;
  }

  /**
   * Delete a sub-resource.
   * @param {string} id
   * @param {string} nid
   * @returns {Promise<object>}
   */
  async deleteNote(id: string, nid: string): Promise<object> {

    const subWhere = { notes: { _id: nid } };
    const where = { $or: orField(id, '_id|email|phone|username'), ...subWhere };

    const note = await this.repository.deleteSub(where, subWhere);

    if(!note) throw new NotFoundError();
    return note;
  }

  /**
   * Signin an user by username and password.
   * @param {UserSignInOptions} credentials
   * @returns {Promise<IUser>}
   */
  async signIn(credentials: UserSignInOptions): Promise<IUser> {

    const { username, password } = credentials;
    const where = { $or: orField(username, 'email|phone|username') };

    const user: IUser = await this.repository.findBy(where);
    // if(!user) throw new NotFoundError();

    const validPassword = await bcrypt.compare(password, user.password);
    if(!user || !validPassword) throw new UnauthorizedError('You username/password isn\'t valid.');

    user.accessToken = await Jwt.generate({ id: user._id });
    return DTO.single(user);
  }

  /**
   * Sign in or up with google depending on user existence.
   * @param {string} idToken
   * @returns {Promise<IUser>}
   */
  async google(idToken: string): Promise<IUser> {

    const { given_name: firstname, family_name: lastname, email, sub: password } = await googleAuth(idToken);

    const where = { email };
    let user: IUser = (await this.repository.findBy(where));

    if(!user){

      // const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt());
      user = await this.create({
        _id: undefined,
        firstname,
        lastname,
        username: email.split('@')[0],
        email,
        password,
        notes: undefined
      });

      return user;
    }

    const validPassword = bcrypt.compare(password, user.password);
    if(!validPassword) throw new UnauthorizedError('You username/password isn\'t valid.');

    user.accessToken = await Jwt.generate(user);
    return DTO.single(user);
  }

  /**
   * Send a email solution to forgot password.
   * @param {string} email
   * @returns {Promise<string>}
   */
  async forgotPassword(username: string): Promise<string> {

    const where = { $or: orField(username, 'email|phone|username') };

    const user: IUser = await this.repository.findBy(where);
    if(!user) throw new NotFoundError();

    const mailToken = await Jwt.generate({ id: user._id }, { expiresIn: '7d' });
    globalEventEmitter.emit('resetPassword', { version: 'v1', to: user.email, token: mailToken });

    return 'Password reset email was sent to your email.';
  }

  /**
   * Reset password.
   * @param {string} token
   * @param {string} password
   * @returns {Promise<IUser>}
   */
  async resetPassword(token: string, password: string): Promise<IUser> {

    const { id } = <JwtPayload>(await Jwt.verify(token));
    const where = { _id: id };

    const user = <IUser><unknown>(await this.repository.update(where, { password }));
    if(!user) throw new NotFoundError();

    user.accessToken = await Jwt.generate(user);
    return DTO.single(user);
  }

  /**
   * Send a notification to an authenticated user email to get verified.
   * @param {string} id
   * @returns {Promise<string>}
   */
  async sendEmailVerifyNotification(id: string): Promise<string> {

    const where = { _id: id };

    const user: IUser = await this.repository.findBy(where);
    if(!user) throw new NotFoundError();

    const mailToken = await Jwt.generate({ id: user._id }, { expiresIn: '7d' });
    globalEventEmitter.emit('verifyEmail', { version: 'v1', to: user.email, token: mailToken });

    return 'Email verification was sent to your email.';
  }

  /**
   * Verify an email.
   * @param {string} token
   * @returns {Promise<IUser>}
   */
  async verifyEmail(token: string): Promise<IUser> {

    const { id } = <JwtPayload>(await Jwt.verify(token));
    const where = { _id: id };

    const user = await this.repository.update(where, { emailVerifiedAt: new Date(Date.now()) });

    if(!user) throw new NotFoundError();
    return <IUser>user;
  }
}