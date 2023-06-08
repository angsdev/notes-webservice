import { Document } from 'mongoose';
import { ObjectOfAnyValue } from '../';

/**
 * Filter an object from properties especifieds in a callback function.
 * @param {ObjectOfAnyValue} object
 * @param {Function} filterCallback
 * @returns {any}
 */
export const filterObject = (object: ObjectOfAnyValue, filterCallback: Function): any => {

  return <Document>Object
          .keys(object)
          .filter(key => filterCallback(object[key]))
          .reduce((result: ObjectOfAnyValue, key) => {
            result[key] = object[key];
            return result;
          }, {});
};