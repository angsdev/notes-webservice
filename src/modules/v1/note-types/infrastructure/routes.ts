/*============================ Imports ============================*/
import { Router } from 'express';
import validate from './validations';
import controller from './controller';
/*============================ Vars setup ============================*/
const router = Router();
const { showAll, show, store, update, destroy } = controller;
/*============================ Rest ============================*/

router.get('/', validate.showAll, showAll)         /** All Note Type Route **/
      .get('/:id', validate.show, show)            /** Specific Note Type Route **/
      .post('/', validate.store, store)            /** Store New Note Type Route **/
      .put('/:id', validate.update, update)        /** Update Note Type Route **/
      .patch('/:id', validate.update, update)      /** Update Note Type Route **/
      .delete('/:id', validate.destroy, destroy);  /** Delete Note Type Route **/

export default router;