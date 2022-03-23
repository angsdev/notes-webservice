/*============================ Rest ============================*/

/**
 * Filter an object from properties especifieds in a callback function.
 * @param {object} object
 * @param {function} filterCallback
 * @returns {object}
 */
exports.filterObject = (object, filterCallback) => {

  return Object
          .keys(object)
          .filter(key => filterCallback(object[key]))
          .reduce((result, key) => {
            result[key] = object[key];
            return result;
          }, {});
};