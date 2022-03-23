export default interface IRepository {

  /**
   * Get all documents and it total.
   * @param {object} options
   * @returns {Promise<{ total: number; data: object[]; }>}
   */
  getAll(options: object): Promise<{ total: number; data: object; }>;

  /**
   * Get one document.
   * @param {object} where
   * @param {object} options
   * @returns {Promise<object>}
   */
  getBy(where: object, options: object): Promise<object>;

  /**
   * Create one or more documents.
   * @param {object} data
   * @returns {Promise<object|object[]>}
   */
  create(data: object): Promise<object>;

  /**
   * Update one or more documents.
   * @param {object} where
   * @param {object} toUpdate
   * @param {object} options
   * @returns {Promise<object|object[]>}
   */
  update(where: object, toUpdate: object, options: object): Promise<object>;

  /**
   * Delete one or more documents.
   * @param {object} where
   * @param {object} options
   * @returns {Promise<object|object[]>}
   */
  delete(where: object, options: object): Promise<object>;
}
