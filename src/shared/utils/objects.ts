import { ObjectOfAnyValue } from '../types';
/*============================ Rest ============================*/

/**
 * Filter an object from properties especifieds in a callback function.
 * @param {DifferentValuesObject} object
 * @param {function} filterCallback
 * @returns {DifferentValuesObject}
 */
export const filterObject = (object: ObjectOfAnyValue, filterCallback: Function): ObjectOfAnyValue => {

  return Object
          .keys(object)
          .filter(key => filterCallback(object[key]))
          .reduce((result: ObjectOfAnyValue, key) => {
            result[key] = object[key];
            return result;
          }, {});
};