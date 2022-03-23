/*============================ Imports ============================*/
import { utils } from '../../shared';
import INote from '../domain/ientity';
/*============================ Vars setup ============================*/
const { filterObject } = utils;
/*============================ Rest ============================*/

/**
 * Wrap a resource filtering data to transfer.
 * @param {object} resource
 * @returns {object}
 */
export const single = (resource: INote): object => filterObject({
    id: resource._id,
    user: resource.user_id,
    type: resource.type_id,
    title: resource.title,
    content: resource.content
  }, (key: string) => key !== undefined
);

/**
 * Wrap a multiples resources filtering data to transfer.
 * @param {object[]} resources
 * @returns {object[]}
 */
export const multiple = (resources: INote[]): object[] => resources.map(single);