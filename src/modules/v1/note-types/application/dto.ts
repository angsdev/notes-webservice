/*============================ Imports ============================*/
import { utils } from '../../shared';
import INoteType from '../domain/ientity';
/*============================ Vars setup ============================*/
const { filterObject } = utils;
/*============================ Rest ============================*/

/**
 * Wrap a resource filtering data to transfer.
 * @param {object} resource
 * @returns {object}
 */
export const single = (resource: INoteType): object => filterObject({
  id: resource._id,
  name: resource.name,
  description: resource.description
  }, (key: string) => key !== undefined
);

/**
 * Wrap a multiples resources filtering data to transfer.
 * @param {object[]} resources
 * @returns {object[]}
 */
export const multiple = (resources: INoteType[]): object[] => resources.map(single);