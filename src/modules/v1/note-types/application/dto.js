/*============================ Imports ============================*/
const { filterObject } = require('../../shared').utils;
/*============================ Rest ============================*/

/**
 * Wrap a resource filtering data to transfer.
 * @param {object} resource
 * @returns {object}
 */
exports.single = (resource) => filterObject({
  id: resource._id,
  name: resource.name,
  description: resource.description
  }, (key) => key !== undefined
);

/**
 * Wrap a multiples resources filtering data to transfer.
 * @param {object[]} resources
 * @returns {object[]}
 */
exports.multiple = (resources) => resources.map(exports.single);