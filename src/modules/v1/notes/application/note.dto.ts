import { Note } from '../domain';
import { utils } from '../../shared';

const { filterObject } = utils;

/**
 * Wrap a resource filtering data to transfer.
 * @param {Note} resource
 * @returns {Note}
 */
const single = (resource: Note): Note => filterObject({
    id: resource.id,
    user: resource.userId,
    type: resource.typeId,
    title: resource.title,
    content: resource.content
  }, (key: string) => key !== undefined
);

/**
 * Wrap a multiples resources filtering data to transfer.
 * @param {Note[]} resources
 * @returns {Note[]}
 */
const multiple = (resources: Note[]): Note[] => resources.map(single);


export const DTO = { single, multiple };