/*============================ Rest ============================*/

/**
 * Filter an object from properties especifieds in a callback function.
 * @param {object} object
 * @param {function} filterCallback
 * @returns {object}
 */
export const filterObject = (object: { [index: string]: any }, filterCallback: Function): object => {

  return Object
          .keys(object)
          .filter(key => filterCallback(object[key]))
          .reduce((result: { [index: string]: any }, key) => {
            result[key] = object[key];
            return result;
          }, {});
};