import api from './api';
import { Router } from 'express';

const router = Router();

router.use('/', api);

export default router;