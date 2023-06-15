import { checkSchema } from 'express-validator';
import { IsIntOptions } from 'express-validator/src/options';

export const searchValidationSchema = {
  flexibleSearchSchema: checkSchema({
    page: {
      in: 'query',
      optional: true,
      escape: true,
      isInt: <IsIntOptions & any>{ min: 1, max: 99 },
      toInt: true,
      errorMessage: 'Must be a number between 1 and 99.'
    },
    per_page: {
      in: 'query',
      optional: true,
      escape: true,
      isInt: <IsIntOptions & any>{ min: 1, max: 99 },
      toInt: true,
      errorMessage: 'Must be a number between 1 and 99.'
    },
    order: {
      in: 'query',
      optional: true,
      escape: true,
      isString: true,
      errorMessage: 'Must be a valid value.'
    },
    sort_by: {
      in: 'query',
      optional: true,
      escape: true,
      isString: true,
      errorMessage: 'Must be a valid value.'
    },
    collection: {
      in: 'params',
      escape: true,
      isString: true,
      errorMessage: 'It\'s necessary and must be a valid string.'
    },
    term: {
      in: 'params',
      optional: true,
      escape: true,
      isString: true,
      errorMessage: 'It\'s necessary and must be a valid string.'
    },
    firstNestedTerm: {
      in: 'params',
      optional: true,
      escape: true,
      isString: true,
      errorMessage: 'It\'s necessary and must be a valid string.'
    }
  })
};