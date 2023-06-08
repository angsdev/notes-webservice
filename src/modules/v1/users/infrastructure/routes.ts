import { Router } from 'express';
import { validate } from '../../shared';
import validationSchemas from './validations';
import Controller from './controller';
import { mongo } from './persistence';
import { Service } from '../'


const router = Router();
const {
  showAllSchema, showSchema, storeSchema, updateSchema, destroySchema,
  showAllNotesSchema, showNoteSchema, storeNoteSchema, updateNoteSchema, destroyNoteSchema
} = validationSchemas;

const repository = new mongo.Repository();
const service = new Service(repository);
const controller = new Controller(service);

router.get('/', validate(showAllSchema), controller.showAll)
      .get('/:id', validate(showSchema), controller.show)
      .post('/', validate(storeSchema), controller.store)
      .put('/:id', validate(updateSchema), controller.update)
      .patch('/:id', validate(updateSchema), controller.update)
      .delete('/:id', validate(destroySchema), controller.destroy)
      /** Nested Route: Notes **/
      .get('/:id/notes', validate(showAllNotesSchema), controller.showAllNotes)
      .get('/:id/notes/:nid', validate(showNoteSchema), controller.showNote)
      .post('/:id/notes', validate(storeNoteSchema), controller.storeNote)
      .put('/:id/notes/:nid', validate(updateNoteSchema), controller.updateNote)
      .patch('/:id/notes/:nid', validate(updateSchema), controller.updateNote)
      .delete('/:id/notes/:nid', validate(destroyNoteSchema), controller.destroyNote);

export default router;