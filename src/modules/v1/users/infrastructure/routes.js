/*============================ Imports ============================*/
const router = require('express').Router();
/*============================ imports ============================*/
const validate = require('./validations');
const {
  showAll, show, store, update, destroy,
  showAllNotes, showNote, storeNote, updateNote, destroyNote
} = require('./controller');
/*============================ Rest ============================*/

router.get('/', validate.showAll, showAll)        /** All Users Route **/
      .get('/:id', validate.show, show)           /** Specific User Route **/
      .post('/', validate.store, store)           /** Store New User Route **/
      .put('/:id', validate.update, update)       /** Update User Route **/
      .patch('/:id', validate.update, update)     /** Update User Route **/
      .delete('/:id', validate.destroy, destroy)  /** Delete User Route **/
      /** Nested Route: Notes **/
      .get('/:id/notes', validate.showAllNotes, showAllNotes)         /** All User Notes Route  **/
      .get('/:id/notes/:nid', validate.showNote, showNote)            /** Specific User Note Route  **/
      .post('/:id/notes', validate.storeNote, storeNote)              /** Store New User Note Route **/
      .put('/:id/notes/:nid', validate.updateNote, updateNote)        /** Update User Note Route **/
      .patch('/:id/notes/:nid', validate.updateNote, updateNote)      /** Update User Note Route **/
      .delete('/:id/notes/:nid', validate.destroyNote, destroyNote);  /** Delete User Note Route **/

module.exports = router;