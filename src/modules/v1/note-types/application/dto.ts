import { INoteType } from '../domain/interfaces';
import { utils } from '../../shared';

const { filterObject } = utils;

/**
 * Wrap a resource filtering data to transfer.
 * @param {INoteType} resource
 * @returns {INoteType}
 */
export const single = (resource: INoteType): INoteType => filterObject({
  id: resource._id,
  name: resource.name,
  description: resource.description
  }, (key: string) => key !== undefined
);

/**
 * Wrap a multiples resources filtering data to transfer.
 * @param {INoteType[]} resources
 * @returns {INoteType[]}
 */
export const multiple = (resources: INoteType[]): INoteType[] => resources.map(single);