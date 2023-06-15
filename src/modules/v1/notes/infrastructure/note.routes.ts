import { Router } from 'express';
import { validate } from '../../shared';
import { mongo } from './persistence';
import { NoteService } from '../application';
import { NoteController } from './note.controller';
import { noteValidationSchemas } from './note.validation';

const router = Router();
const {
  showAllSchema,
  showSchema,
  storeSchema,
  updateSchema,
  destroySchema
} = noteValidationSchemas;

const repository = new mongo.NoteMongoRepository();
const service = new NoteService(repository);
const controller = new NoteController(service);

router.get('/', validate(showAllSchema), controller.getAll)
      .get('/:id', validate(showSchema), controller.get)
      .post('/', validate(storeSchema), controller.store)
      .put('/:id', validate(updateSchema), controller.update)
      .patch('/:id', validate(updateSchema), controller.update)
      .delete('/:id', validate(destroySchema), controller.destroy)

export default router;