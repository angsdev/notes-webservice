import { utils } from '../../shared';
import { NoteType } from '../domain';

const { filterObject } = utils;

/**
 * Wrap a resource filtering data to transfer.
 * @param {NoteType} resource
 * @returns {NoteType}
 */
const single = (resource: NoteType): NoteType => filterObject({
  id: resource.id,
  name: resource.name,
  description: resource.description
  }, (key: string) => key !== undefined
);

/**
 * Wrap a multiples resources filtering data to transfer.
 * @param {NoteType[]} resources
 * @returns {NoteType[]}
 */
const multiple = (resources: NoteType[]): NoteType[] => resources.map(single);


export const DTO = { single, multiple };