/*============================ Imports ============================*/
import * as expressValidator from 'express-validator';
import { Request, Response, NextFunction } from 'express';
/*============================ Rest ============================*/

export default class ValidatorBase {

  public validator = expressValidator;
  protected rules: { [x: string]: any } = {};
  protected baseRules: { header?: any, params?: any, query?: any, body?: any } = {
    query: [
      this.validator.query(['page', 'per_page'], 'Must be a number between 1 and 99.').isInt({ min: 1, max: 99 }).toInt().optional(),
      this.validator.query(['sort_by', 'order'], 'Must be a valid value.').isString().optional().escape()
    ],
    params: {
      id: this.validator.param('id', 'It\'s necessary and must be a valid string.').isMongoId()
    }
  };

  /**
   * Create a new validator base instance.
   */
  constructor(){

  }

  /**
   * Generate validation rules.
   * @param {object} rulesObject
   * @returns {object}
   */
  mergeBaseWith(rulesObject: object): { header?: any, params?: any, query?: any, body?: any } {

    Object.assign(this.rules, this.baseRules, rulesObject);
    return this.rules;
  }

  /**
   * Assign the validation rules to the given property.
   * @param  {string} attr
   * @param  {...object} options
   * @returns {void}
   */
  assign(attr: string, ...options: any): void {

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
  run(req: Request, res: Response, next: NextFunction): Response|void {

    const errors = expressValidator.validationResult(req).formatWith(({ msg, value }) => ({ value, message: msg }));
    if(!errors.isEmpty()) return res.status(400).json({ success: false, content: errors.mapped() });
    next();
  }
}