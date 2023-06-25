import config from "config";
import { Router } from 'express';
import { CacheEnvironmentConfig } from '../../../../shared/types';
import { services, validate } from '../../shared';
import { NoteService } from '../application';
import { NoteController } from './note.controller';
import { noteValidationSchemas } from './note.validation';
import { mongo } from './persistence';


const redisConfig = config.get<CacheEnvironmentConfig>('cache.redis');
const router = Router();
const { cache } = services;
const {
  showAllSchema,
  showSchema,
  storeSchema,
  updateSchema,
  destroySchema
} = noteValidationSchemas;

const repository = new mongo.NoteMongoRepository();
const cacheManager = new cache.RedisCacheManager({ url: redisConfig.host });
const service = new NoteService(repository, cacheManager);
const controller = new NoteController(service);

router.get('/', validate(showAllSchema), controller.getAll)
      .get('/:id', validate(showSchema), controller.get)
      .post('/', validate(storeSchema), controller.store)
      .put('/:id', validate(updateSchema), controller.update)
      .patch('/:id', validate(updateSchema), controller.update)
      .delete('/:id', validate(destroySchema), controller.destroy)

export default router;