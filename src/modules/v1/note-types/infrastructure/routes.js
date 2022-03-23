/*============================ Imports ============================*/
const router = require('express').Router();
/*============================ Imports ============================*/
const validate = require('./validations');
const { showAll, show, store, update, destroy } = require('./controller');
/*============================ Rest ============================*/

router.get('/', validate.showAll, showAll)         /** All Note Type Route **/
      .get('/:id', validate.show, show)            /** Specific Note Type Route **/
      .post('/', validate.store, store)            /** Store New Note Type Route **/
      .put('/:id', validate.update, update)        /** Update Note Type Route **/
      .patch('/:id', validate.update, update)      /** Update Note Type Route **/
      .delete('/:id', validate.destroy, destroy);  /** Delete Note Type Route **/

module.exports = router;