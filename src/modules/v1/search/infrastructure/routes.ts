/*============================ Imports ============================*/
import { Router } from 'express';
import validate from './validations';
import controller from './controller';
/*============================ Vars setup ============================*/
const router = Router();
const { exec } = controller;
/*============================ Rest ============================*/

router.get('/:collection/:term?/:firstNested?', validate.exec, exec); /** Advanced And Flexible Search Route **/

export default router;