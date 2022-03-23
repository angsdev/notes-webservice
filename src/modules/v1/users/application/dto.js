/*============================ Imports ============================*/
const { filterObject } = require('../../shared').utils;
/*============================ Rest ============================*/

/**
 * Wrap a resource filtering data to transfer.
 * @param {object} resource
 * @returns {object}
 */
exports.single = (resource) => filterObject({
    uid: resource._id,
    firstname: resource.firstname,
    lastname: resource.lastname,
    username: resource.username,
    phone: resource.phone,
    email: resource.email,
    notes: resource.notes,
    access_token: resource.access_token
  }, (key) => key !== undefined
);

/**
 * Wrap a multiples resources filtering data to transfer.
 * @param {object[]} resources
 * @returns {object[]}
 */
exports.multiple = (resources) => resources.map(exports.single);