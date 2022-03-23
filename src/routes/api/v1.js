/*============================ Imports ============================*/
const router = require('express').Router();
const {
  auth: { router: auth },
  users: { router: users },
  notes: { router: notes },
  search: { router: search },
  noteTypes: { router: noteTypes }
} = require('../../modules').v1;
const { authentication } = require('../../shared').middlewares;
/*=========================== Rest =============================*/

router.use('/auth', auth)
      .use('/users', authentication.JWT, users)
      .use('/search', authentication.JWT, search)
      .use('/notes(?!/types)', authentication.JWT, notes)
      .use('/notes/types', authentication.JWT, noteTypes);

module.exports = router;