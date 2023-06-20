import { Router } from 'express';
import { validate } from '../../shared';
import { SearchController } from './search.controller';
import { searchValidationSchema } from './search.validation';

const router = Router();
const { flexibleSearchSchema } = searchValidationSchema;

const controller = new SearchController();

router.get('/:collection/:term?/:firstNestedTerm?', validate(flexibleSearchSchema), controller.run);

export default router;