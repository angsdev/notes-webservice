/*============================ Imports ============================*/
const api = require('./api');
const router = require('express').Router();
/*=========================== Rest =============================*/

router.use('/', api);

module.exports = router;