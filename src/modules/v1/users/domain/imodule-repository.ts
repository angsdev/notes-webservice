/*============================ Imports ============================*/
import { interfaces as I }  from '../../shared';
/*============================ Rest ============================*/

export default interface IUserRepository extends I.Repository {

  /**
   * Get all documents from a sub model and it total.
   * @param {object} where
   * @param {string} subName
   * @param {object} options
   * @returns {Promise<{ total: number; data: object[]; }>}
   */
  getSubAll(where: object, subName: string, options: object): Promise<{ total: number; data: object; }>;

   /**
    * Get one sub model document.
    * @param {object} where
    * @param {object} sub
    * @param {object} options
    * @returns {Promise<object>}
    */
  getSubBy(where: object, sub: object, options: object): Promise<object>;

   /**
    * Create one or more sub model documents.
    * @param {object} where
    * @param {object} subName
    * @param {object} data
    * @returns {Promise<object|object[]>}
    */
  createSub(where: object, subName: string, data: object): Promise<object>;

   /**
    * Update one or more sub model documents.
    * @param {object} where
    * @param {object} sub
    * @param {object} toUpdate
    * @param {object} options
    * @returns {Promise<object|object[]>}
    */
  updateSub(where: object, sub: object, toUpdate: object, options: object): Promise<object>;

   /**
    * Delete one or more sub model documents.
    * @param {object} where
    * @param {object} sub
    * @param {object} options
    * @returns {Promise<object|object[]>}
    */
  deleteSub(where: object, sub: object, options: object): Promise<object>;
}