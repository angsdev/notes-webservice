/*============================ Imports ============================*/
const expressValidator = require('express-validator');
/*=========================== Rest =============================*/

module.exports = class ValidatorBase {

  /**
   * Create a new validator base instance.
   */
  constructor(){

    this.rules = {};
    this.validator = expressValidator;
    this.baseRules = {
      query: [
        this.validator.query(['page', 'per_page'], 'Must be a number between 1 and 99.').isInt({ min: 1, max: 99 }).toInt().optional(),
        this.validator.query(['sort_by', 'order'], 'Must be a valid value.').isString().optional().escape()
      ],
      params: {
        id: this.validator.param('id', 'It\'s necessary and must be a valid string.').isMongoId()
      }
    };
  }

  /**
   * Generate validation rules.
   * @param {object} rulesObject
   * @returns {object}
   */
  mergeBaseWith(rulesObject = {}){

    Object.assign(this.rules, this.baseRules, rulesObject);
    return this.rules;
  }

  /**
   * Assign the validation rules to the given property.
   * @param  {string} attr
   * @param  {...object} options
   * @returns {void}
   */
  assign(attr, ...options){

    options = Object.values(options);
    this[attr] = [ ...options, this.run ];
  }

  /**
   * Execute the validation.
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {void}
   */
  run(req, res, next){

    const errors = expressValidator.validationResult(req).formatWith(({ msg, value }) => ({ value, message: msg }));
    if(!errors.isEmpty()) return res.status(400).json({ success: false, content: errors.mapped() });
    next();
  }
};