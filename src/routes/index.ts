/*============================ Imports ============================*/
import api from './api';
import { Router } from 'express';
/*============================ Vars setup ============================*/
const router = Router();
/*=========================== Rest =============================*/

router.use('/', api);

export default router;