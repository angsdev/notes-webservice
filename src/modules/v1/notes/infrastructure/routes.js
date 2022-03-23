/*============================ Imports ============================*/
const router = require('express').Router();
/*============================ Imports ============================*/
const validate = require('./validations');
const { showAll, show, store, update, destroy } = require('./controller');
/*============================ Rest ============================*/

router.get('/', validate.showAll, showAll)         /** All Notes Route **/
      .get('/:id', validate.show, show)            /** Specific Note Route **/
      .post('/', validate.store, store)            /** Store New Note Route **/
      .put('/:id', validate.update, update)        /** Update Note Route **/
      .patch('/:id', validate.update, update)      /** Update Note Route **/
      .delete('/:id', validate.destroy, destroy);  /** Delete Note Route **/

module.exports = router;