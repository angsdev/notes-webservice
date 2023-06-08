import config from 'config';
import { checkSchema } from "express-validator";
import { IsIntOptions, IsStrongPasswordOptions } from 'express-validator/src/options';
import { ValidationStandard } from '../../shared';

const { password }: ValidationStandard = config.get('app.standards');

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
      isString: true,
      errorMessage: 'It\'s necessary and must be a valid string.'
    }
  }),
  storeSchema: checkSchema({
    firstname: {
      in: 'body',
      escape: true,
      isString: true,
      errorMessage: 'Must be a string containing only alphabetic and space characters.'
    },
    lastname: {
      in: 'body',
      escape: true,
      isString: true,
      errorMessage: 'Must be a string containing only alphabetic and space characters.'
    },
    username: {
      in: 'body',
      escape: true,
      isString: true,
      errorMessage: 'Must be a valid username.'
    },
    phone: {
      in: 'body',
      escape: true,
      isString: true,
      optional: true,
      errorMessage: 'Must be a valid phone format.'
    },
    email: {
      in: 'body',
      escape: true,
      isEmail: true,
      isString: true,
      errorMessage: 'Must be a valid email.'
    },
    password: {
      in: 'body',
      escape: true,
      isStrongPassword: <IsStrongPasswordOptions & any>{ ...password },
      errorMessage: 'Must be greater than 8 and contain at least one uppercase letter, one lowercase letter, one symbol, and one number.',
      custom: {
        options: (val, { req }) => (val === req.body.password_confirmation),
        errorMessage: 'The passwords don\'t match.'
      }
    }
  }),
  updateSchema: checkSchema({
    id: {
      in: 'params',
      escape: true,
      isString: true,
      errorMessage: 'It\'s necessary and must be a valid string.'
    },
    firstname: {
      in: 'body',
      optional: true,
      escape: true,
      isString: true,
      errorMessage: 'Must be a string containing only alphabetic and space characters.'
    },
    lastname: {
      in: 'body',
      optional: true,
      escape: true,
      isString: true,
      errorMessage: 'Must be a string containing only alphabetic and space characters.'
    },
    username: {
      in: 'body',
      optional: true,
      escape: true,
      isString: true,
      errorMessage: 'Must be a valid username.'
    },
    phone: {
      in: 'body',
      optional: true,
      escape: true,
      isString: true,
      errorMessage: 'Must be a valid phone format.'
    },
    email: {
      in: 'body',
      optional: true,
      escape: true,
      isEmail: true,
      isString: true,
      errorMessage: 'Must be a valid email.'
    },
    password: {
      in: 'body',
      optional: true,
      escape: true,
      isStrongPassword: <IsStrongPasswordOptions & any>{ ...password },
      errorMessage: 'Must be greater than 8 and contain at least one uppercase letter, one lowercase letter, one symbol, and one number.',
      custom: {
        options: (val, { req }) => (val === req.body.password_confirmation),
        errorMessage: 'The passwords don\'t match.'
      }
    }
  }),
  destroySchema: checkSchema({
    id: {
      in: 'params',
      escape: true,
      isString: true,
      errorMessage: 'It\'s necessary and must be a valid string.'
    }
  }),
  showAllNotesSchema: checkSchema({
    id: {
      in: 'params',
      escape: true,
      isString: true,
      errorMessage: 'It\'s necessary and must be a valid string.'
    },
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
  showNoteSchema: checkSchema({
    id: {
      in: 'params',
      escape: true,
      isString: true,
      errorMessage: 'It\'s necessary and must be a valid string.'
    },
    nid: {
      in: 'params',
      escape: true,
      isMongoId: true,
      errorMessage: 'It\'s necessary and must be a valid string.'
    }
  }),
  storeNoteSchema: checkSchema({
    id: {
      in: 'params',
      escape: true,
      isString: true,
      errorMessage: 'It\'s necessary and must be a valid string.'
    },
    type_id: {
      in: 'body',
      escape: true,
      isMongoId: true,
      errorMessage: 'Must be a string and a valid type.'
    },
    title: {
      in: 'body',
      escape: true,
      isString: true,
      errorMessage: 'Must be a valid string.'
    },
    content: {
      in: 'body',
      optional: true,
      escape: true,
      isString: true,
      errorMessage: 'Must be a valid string.'
    }
  }),
  updateNoteSchema: checkSchema({
    id: {
      in: 'params',
      escape: true,
      isString: true,
      errorMessage: 'It\'s necessary and must be a valid string.'
    },
    nid: {
      in: 'params',
      escape: true,
      isMongoId: true,
      errorMessage: 'It\'s necessary and must be a valid string.'
    },
    type_id: {
      in: 'body',
      optional: true,
      escape: true,
      isMongoId: true,
      errorMessage: 'Must be a string and a valid type.'
    },
    title: {
      in: 'body',
      optional: true,
      escape: true,
      isString: true,
      errorMessage: 'Must be a valid string.'
    },
    content: {
      in: 'body',
      optional: true,
      escape: true,
      isString: true,
      errorMessage: 'Must be a valid string.'
    }
  }),
  destroyNoteSchema: checkSchema({
    id: {
      in: 'params',
      escape: true,
      isString: true,
      errorMessage: 'It\'s necessary and must be a valid string.'
    },
    nid: {
      in: 'params',
      escape: true,
      isMongoId: true,
      errorMessage: 'It\'s necessary and must be a valid string.'
    }
  })
}