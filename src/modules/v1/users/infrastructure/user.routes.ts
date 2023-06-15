import { Router } from 'express';
import { validate } from '../../shared';
import { mongo } from './persistence';
import { UserService } from '../application';
import { UserController } from './user.controller';
import { userValidationSchemas } from './user.validation';

const router = Router();
const {
  getAllSchema, getSchema, storeSchema, updateSchema, destroySchema,
  getAllNotesSchema, getNoteSchema, storeNoteSchema, updateNoteSchema, destroyNoteSchema
} = userValidationSchemas;

const repository = new mongo.UserMongoRepository();
const service = new UserService(repository);
const controller = new UserController(service);

router.get('/', validate(getAllSchema), controller.getAll)
      .get('/:id', validate(getSchema), controller.get)
      .post('/', validate(storeSchema), controller.store)
      .put('/:id', validate(updateSchema), controller.update)
      .patch('/:id', validate(updateSchema), controller.update)
      .delete('/:id', validate(destroySchema), controller.destroy)
      /** Nested Route: Notes **/
      .get('/:id/notes', validate(getAllNotesSchema), controller.getAllNotes)
      .get('/:id/notes/:noteId', validate(getNoteSchema), controller.getNote)
      .post('/:id/notes', validate(storeNoteSchema), controller.storeNote)
      .put('/:id/notes/:noteId', validate(updateNoteSchema), controller.updateNote)
      .patch('/:id/notes/:noteId', validate(updateSchema), controller.updateNote)
      .delete('/:id/notes/:noteId', validate(destroyNoteSchema), controller.destroyNote);

export default router;