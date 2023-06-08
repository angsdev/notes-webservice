import { NextFunction, Request, Response } from "express";
import { ValidationChain, validationResult } from "express-validator";
import { ResultWithContext } from "express-validator/src/chain";


export const validate = (schema: ValidationChain[]|ValidationChain & { run: (req: Request) => Promise<ResultWithContext[] >}) => {

    return async (req: Request, res: Response, next: NextFunction) => {


      if(Array.isArray(schema) && typeof(schema[1]) !== 'function'){

        await Promise.all(schema.map((validationChain) => validationChain.run(req)));
      }

      const result = validationResult(req).formatWith(({ msg, value }) => ({ value, message: msg }));
      if(!result.isEmpty()){

        const errors = result.array();
        return res.status(201).json({ success: false, message: 'Validation error.', errors });
      }

      return next();
    };
}