/*============================ Imports ============================*/
import { isValidObjectId } from 'mongoose';
/*============================ Rest ============================*/

/**
 * Generate an array to specify $or mongoose query _id field, and avoid ObjectId errors.
 * @param {string} id
 * @param {string} fields
 * @returns {object[]}
 */
export const orField = (id: string|number, fields: string): { [index: string]: string|number }[]  => {

  return fields.split('|')
               .map(field => ((field === '_id') && !isValidObjectId(id)) ? null : { [field]: id })
               .filter(val => val);
};