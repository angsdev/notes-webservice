import { Router } from 'express';
import { v1 } from '../../modules';
import { middlewares } from '../../shared';

const router = Router();
const { Auth } = middlewares;
const {
  auth: { router: auth },
  users: { router: users },
  notes: { router: notes },
  search: { router: search },
  noteTypes: { router: noteTypes }
} = v1;

router.use('/auth', auth)
      .use('/users', Auth.JWT, users)
      .use('/search', Auth.JWT, search)
      .use('/notes(?!/types)', Auth.JWT, notes)
      .use('/notes/types', Auth.JWT, noteTypes);

export default router;