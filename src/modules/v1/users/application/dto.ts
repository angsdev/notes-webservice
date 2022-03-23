/*============================ Imports ============================*/
import { utils } from '../../shared';
import IUser from '../domain/ientity';
/*============================ Vars setup ============================*/
const { filterObject } = utils;
/*============================ Rest ============================*/

/**
 * Wrap a resource filtering data to transfer.
 * @param {object} resource
 * @returns {object}
 */
export const single = (resource: IUser): object => filterObject({
    uid: resource._id,
    firstname: resource.firstname,
    lastname: resource.lastname,
    username: resource.username,
    phone: resource.phone,
    email: resource.email,
    notes: resource.notes,
    access_token: resource.access_token
  }, (key: string) => key !== undefined
);

/**
 * Wrap a multiples resources filtering data to transfer.
 * @param {object[]} resources
 * @returns {object[]}
 */
export const multiple = (resources: IUser[]): object[] => resources.map(single);