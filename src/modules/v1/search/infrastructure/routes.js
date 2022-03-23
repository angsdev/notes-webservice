/*============================ Imports ============================*/
const router = require('express').Router();
/*============================ Imports ============================*/
const validate = require('./validations');
const { exec } = require('./controller');
/*============================ Rest ============================*/

router.get('/:collection/:term?/:firstNested?', validate.exec, exec); /** Advanced And Flexible Search Route **/

module.exports = router;