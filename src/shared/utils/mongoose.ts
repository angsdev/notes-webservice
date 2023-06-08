import { isValidObjectId } from 'mongoose';
import { ObjectOfAnyValue } from '../';

/**
 * Generate an array to specify $or mongoose query _id field, and avoid ObjectId errors.
 * @param {string|number} id
 * @param {string} fields
 * @returns {DifferentValuesObject[]}
 */
export const orField = (id: string|number, fields: string): ObjectOfAnyValue[]  => {

  return fields
          .split('|')
          .map(field => ((field === '_id') && !isValidObjectId(id)) ? null : { [field]: id })
          .filter(val => val);
};