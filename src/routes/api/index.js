/*============================ Imports ============================*/
const v1 = require('./v1');
const router = require('express').Router();
/*=========================== Rest =============================*/

router.use('/v1', v1);

module.exports = router;