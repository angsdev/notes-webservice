import { checkSchema } from "express-validator";
import { IsIntOptions } from "express-validator/src/options";


export default {
  showAllSchema: checkSchema({
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
    }
  }),
  showSchema: checkSchema({
    id: {
      in: 'params',
      escape: true,
      isMongoId: true,
      errorMessage: 'It\'s necessary and must be a valid string.'
    }
  }),
  storeSchema: checkSchema({
    name: {
      in: 'body',
      escape: true,
      isString: true,
      errorMessage: 'Must be a valid string and can\'t contain special characters.'
    },
    description: {
      in: 'body',
      optional: true,
      escape: true,
      isString: true,
      errorMessage: 'Must be a valid string.'
    }
  }),
  updateSchema: checkSchema({
    id: {
      in: 'params',
      escape: true,
      isMongoId: true,
      errorMessage: 'It\'s necessary and must be a valid string.'
    },
    name: {
      in: 'body',
      optional: true,
      escape: true,
      isString: true,
      errorMessage: 'Must be a valid string and can\'t contain special characters.'
    },
    description: {
      in: 'body',
      optional: true,
      escape: true,
      isString: true,
      errorMessage: 'Must be a valid string.'
    }
  }),
  destroySchema: checkSchema({
    id: {
      in: 'params',
      escape: true,
      isMongoId: true,
      errorMessage: 'It\'s necessary and must be a valid string.'
    }
  })
};