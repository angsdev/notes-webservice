import { INote } from '../domain/interfaces';
import { utils } from '../../shared';

const { filterObject } = utils;

/**
 * Wrap a resource filtering data to transfer.
 * @param {INote} resource
 * @returns {INote}
 */
export const single = (resource: INote): INote => filterObject({
    id: resource._id,
    user: resource.userId,
    type: resource.typeId,
    title: resource.title,
    content: resource.content
  }, (key: string) => key !== undefined
);

/**
 * Wrap a multiples resources filtering data to transfer.
 * @param {INote[]} resources
 * @returns {INote[]}
 */
export const multiple = (resources: INote[]): INote[] => resources.map(single);