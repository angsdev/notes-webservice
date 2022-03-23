/*============================ Imports ============================*/
import { v1 } from '../../modules';
import { Router } from 'express';
import { middlewares } from '../../shared';
/*============================ Vars setup ============================*/
const router = Router();
const {
  auth: { router: auth },
  users: { router: users },
  notes: { router: notes },
  search: { router: search },
  noteTypes: { router: noteTypes }
} = v1;
const { authentication } = middlewares;
/*=========================== Rest =============================*/

router.use('/auth', auth)
      .use('/users', authentication.JWT, users)
      .use('/search', authentication.JWT, search)
      .use('/notes(?!/types)', authentication.JWT, notes)
      .use('/notes/types', authentication.JWT, noteTypes);

export default router;