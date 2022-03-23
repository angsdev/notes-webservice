/*============================ Imports ============================*/
const DTO = require('./dto');
const bcrypt = require('bcryptjs');
const User = require('../domain/entity');
const { mongodb: { repository } } = require('../infrastructure/persistence');
const { events: { globalEvents }, classes: { NotFoundError }, utils: { orField, verifyJWT, generateJWT, googleVerify } } = require('../../shared');
/*============================ Rest ============================*/

module.exports = new class UserService {

  /**
   * Get all resources.
   * @param {object} options
   * @returns {Promise<{ total: number; pages: number; page: number; data: object[]; }>}
   */
  async getAll(options = {}){

    let { page = 1, per_page = 15, where = {}, filter = {}, sort_by = null, order = 'desc' } = options;
    const { total, data } = await repository.getAll({ page, per_page, where, sort_by, order, filter });
    const pages = Math.ceil(total/per_page) || 0;
    const parsedResults = { total, pages, page, data: DTO.multiple(data) };
    return parsedResults;
  }

  /**
   * Get one resource by any of given fields.
   * @param {string} id
   * @param {string|string[]} populate
   * @returns {Promise<object>}
   */
  async getByAnyOf(id, populate = []){

    const where = { $or: orField(id, '_id|email|phone|username') };
    const data = await repository.getBy(where, { populate });
    if(!data) throw new NotFoundError('Resource not found.');
    return DTO.single(data);
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
   * Get one resource by username.
   * @param {string} username
   * @param {string|string[]} populate
   * @returns {Promise<object>}
   */
  async getByUsername(username, populate = []){

    const where = { username };
    const data = await repository.getBy(where, { populate });
    if(!data) throw new NotFoundError('Resource not found.');
    return DTO.single(data);
  }

  /**
   * Get one resource by email.
   * @param {string} email
   * @param {string|string[]} populate
   * @returns {Promise<object>}
   */
  async getByEmail(email, populate = []){

    const where = { email };
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

    let user = new User(data);
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
    const newUser = await repository.create(user);
    newUser.access_token = await generateJWT({ id: newUser.id });
    const mailToken = await generateJWT({ id: newUser.id }, { expiresIn: '1d' });
    globalEvents.emit('verifyEmail', { version: 'v1', token: mailToken, to: newUser.email });
    return DTO.single(user);
  }

  /**
   * Update a resource.
   * @param {string} id
   * @param {object} toUpdate
   * @returns {Promise<object>}
   */
  async update(id, toUpdate){

    const where = { $or: orField(id, '_id|email|phone|username') };
    if(toUpdate.password) toUpdate.password = bcrypt.hashSync(toUpdate.password, bcrypt.genSaltSync());
    const data = await repository.update(where, toUpdate);
    if(!data) throw new NotFoundError('Resource not found.');
    return DTO.single(data);
  }

  /**
   * Soft delete a resource.
   * @param {string} id
   * @returns {Promise<object>}
   */
  async softDelete(id){

    const where = { $or: orField(id, '_id|email|phone|username') };
    const softDelete = { deleted_at: new Date(Date.now()).toISOString() };
    const data = await repository.update(where, softDelete);
    if(!data) throw new NotFoundError('Resource not found.');
    return DTO.single(data);
  }

  /**
   * Delete a resource.
   * @param {string} id
   * @returns {Promise<object>}
   */
  async delete(id){

    const where = { $or: orField(id, '_id|email|phone|username') };
    const data = await repository.delete(where);
    if(!data) throw new NotFoundError('Resource not found.');
    return DTO.single(data);
  }

  /**
   * Get all sub-resources.
   * @param {string} id
   * @param {object} options
   * @returns {Promise<{ total: number; pages: number; page: number; data: object[]; }>}
   */
  async getAllNotes(id, options = {}){

    let { page = 1, per_page = 15, where: subWhere = {}, filter = {}, sort_by = null, order = 'desc' } = options;
    const where = { $or: orField(id, '_id|email|phone|username') };
    const { total, data } = await repository.getSubAll(where, 'notes', { page, per_page, where: subWhere, sort_by, order, filter });
    const pages = Math.ceil(total/per_page) || 0;
    const parsedResults = { total, pages, page, data };
    return parsedResults;
  }

  /**
   * Get one sub-resource by id.
   * @param {string} id
   * @param {string} nid
   * @returns {Promise<object>}
   */
  async getNote(id, nid){

    const subWhere = { notes: { _id: nid } };
    const where = { $or: orField(id, '_id|email|phone|username'), ...subWhere };
    const data = await repository.getSubBy(where, subWhere);
    if(!data) throw new NotFoundError('Resource not found.');
    return data;
  }

  /**
   * Create a sub-resource.
   * @param {string} id
   * @param {object} data
   * @returns {Promise<object>}
   */
  async createNote(id, data){

    const where = { $or: orField(id, '_id|email|phone|username') };
    data = await repository.createSub(where, 'notes', data);
    return data;
  }

  /**
   * Update a sub-resource.
   * @param {string} id
   * @param {string} nid
   * @param {object} toUpdate
   * @returns {Promise<object>}
   */
  async updateNote(id, nid, toUpdate){

    const subWhere = { notes: { _id: nid } };
    const where = { $or: orField(id, '_id|email|phone|username'), ...subWhere };
    const data = await repository.updateSub(where, subWhere, toUpdate);
    if(!data) throw new NotFoundError('Resource not found.');
    return data;
  }

  /**
   * Delete a sub-resource.
   * @param {string} id
   * @param {string} nid
   * @returns {Promise<object>}
   */
  async deleteNote(id, nid){

    const subWhere = { notes: { _id: nid } };
    const where = { $or: orField(id, '_id|email|phone|username'), ...subWhere };
    const data = await repository.deleteSub(where, subWhere);
    if(!data) throw new NotFoundError('Resource not found.');
    return data;
  }

  /**
   * Signin an user by username and password.
   * @param {{ username: string; password: string; }} credentials
   * @returns {Promise<object>}
   */
  async signIn(credentials){

    const { username, password } = credentials;
    const where = { $or: orField(username, 'email|phone|username') };
    const user = await repository.getBy(where);
    if(!user) throw new NotFoundError('Resource not found.');
    const validPassword = bcrypt.compareSync(password, user.password);
    if(!validPassword) throw new NotFoundError('Resource not found.');
    user.access_token = await generateJWT({ id: user.id });
    return DTO.single(user);
  }

  /**
   * Sign in or up with google depending on user existence.
   * @param {string} id_token
   * @returns {Promise<object>}
   */
  async google(id_token){

    const { given_name: firstname, family_name: lastname, email, sub: password } = await googleVerify(id_token);
    const user = await this.getBy(email) || await this.create({ firstname, lastname, username: email.split('@')[0], email, password });
    user.access_token = await generateJWT(user);
    return user;
  }

  /**
   * Send a email solution to forgot password.
   * @param {string} email
   * @returns {Promise<string>}
   */
  async forgotPassword(username){

    const where = { $or: orField(username, 'email|phone|username') };
    const user = await repository.getBy(where);
    if(!user) throw new NotFoundError('Resource not found.');
    const mailToken = await generateJWT({ id: user.id }, { expiresIn: '1d' });
    globalEvents.emit('resetPassword', { version: 'v1', to: user.email, token: mailToken });
    return 'Password reset email was sent to your email.';
  }

  /**
   * Reset password.
   * @param {string} token
   * @param {string} password
   * @returns {Promise<object>}
   */
  async resetPassword(token, password){

    const { id } = await verifyJWT(token);
    const where = { _id: id };
    const user = await repository.update(where, { password });
    if(!user) throw new NotFoundError('Resource not found.');
    user.access_token = await generateJWT(user);
    return user;
  }

  /**
   * Send a notification to an authenticated user email to get verified.
   * @param {string} token
   * @returns {Promise<string>}
   */
  async sendEmailVerifyNotification(id){

    const where = { _id: id };
    const user = await repository.getBy(where);
    if(!user) throw new NotFoundError('Resource not found.');
    const mailToken = await generateJWT({ id: user.id }, { expiresIn: '1d' });
    globalEvents.emit('verifyEmail', { version: 'v1', to: user.email, token: mailToken });
    return 'Email verification was sent to your email.';
  }

  /**
   * Verify an email.
   * @param {string} token
   * @returns {Promise<object>}
   */
  async verifyEmail(token){

    const { id } = await verifyJWT(token);
    const where = { _id: id };
    const user = await repository.update(where, { email_verified_at: new Date(Date.now()).toISOString() });
    if(!user) throw new NotFoundError('Resource not found.');
    return user;
  }
};