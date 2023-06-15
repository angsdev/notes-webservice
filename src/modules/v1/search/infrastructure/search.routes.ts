import { Router } from 'express';
import { validate } from '../../shared';
import { AuthController } from './search.controller';
import { searchValidationSchema } from './search.validation';

const router = Router();
const { flexibleSearchSchema } = searchValidationSchema;

const controller = new AuthController();

router.get('/:collection/:term?/:firstNestedTerm?', validate(flexibleSearchSchema), controller.run);

export default router;