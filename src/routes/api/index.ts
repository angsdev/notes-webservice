/*============================ Imports ============================*/
import v1 from './v1';
import { Router } from 'express';
/*============================ Vars setup ============================*/
const router = Router();
/*=========================== Rest =============================*/

router.use('/v1', v1);

export default router;