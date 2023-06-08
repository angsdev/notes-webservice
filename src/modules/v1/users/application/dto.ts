import { IUser } from '../domain/interfaces';
import { utils } from '../../shared';

const { filterObject } = utils;

/**
 * Wrap a resource filtering data to transfer.
 * @param {IUser} resource
 * @returns {Document}
 */
export const single = (resource: IUser): IUser => filterObject({
    uid: resource._id,
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
export const multiple = (resources: IUser[]): IUser[] => resources.map(single);