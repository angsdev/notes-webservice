/*============================ Imports ============================*/
const { isValidObjectId } = require('mongoose');
/*============================ Rest ============================*/

/**
 * Generate an array to specify $or mongoose query _id field, and avoid ObjectId errors.
 * @param {string} id
 * @param {string} fields
 * @returns {object[]}
 */
exports.orField = (id, fields = '') => {

  return fields.split('|')
               .map(field => ((field === '_id') && !isValidObjectId(id)) ? null : { [field]: id })
               .filter(val => val);
};