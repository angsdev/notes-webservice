import { utils } from '../../shared';
import { User } from '../domain';

const { filterObject } = utils;

/**
 * Wrap a resource filtering data to transfer.
 * @param {IUser} resource
 * @returns {Document}
 */
const single = (resource: User): User => filterObject({
    uid: resource.id,
    firstname: resource.firstname,
    lastname: resource.lastname,
    username: resource.username,
    phone: resource.phone,
    email: resource.email,
    notes: resource.notes,
    accessToken: resource.accessToken
  }, (key: string) => key !== undefined
);

/**
 * Wrap a multiples resources filtering data to transfer.
 * @param {IUser[]} resources
 * @returns {IUser[]}
 */
const multiple = (resources: User[]): User[] => resources.map(single);


export const DTO = { single, multiple };