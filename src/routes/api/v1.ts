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
const { JWTAuthentication } = middlewares;
/*=========================== Rest =============================*/

router.use('/auth', auth)
      .use('/users', JWTAuthentication, users)
      .use('/search', JWTAuthentication, search)
      .use('/notes(?!/types)', JWTAuthentication, notes)
      .use('/notes/types', JWTAuthentication, noteTypes);

export default router;