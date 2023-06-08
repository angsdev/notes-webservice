import { Router } from 'express';
import { validate } from '../../shared';
import AuthController from './controller';
import validationSchemas from './validations';

const router = Router();
const { flexibleSearchSchema } = validationSchemas;

const controller = new AuthController();


router.get('/:collection/:term?/:firstNestedTerm?', validate(flexibleSearchSchema), controller.run);

export default router;