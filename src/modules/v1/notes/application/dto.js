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
    user: resource.user_id,
    type: resource.type_id,
    title: resource.title,
    content: resource.content
  }, (key) => key !== undefined
);

/**
 * Wrap a multiples resources filtering data to transfer.
 * @param {object[]} resources
 * @returns {object[]}
 */
exports.multiple = (resources) => resources.map(exports.single);