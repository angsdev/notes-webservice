import config from "config";
import { Router } from 'express';
import { validate } from '../../shared';
import { mongo } from './persistence';
import { NoteTypeService } from '../application'
import { NoteTypeController } from './note-type.controller';
import { noteTypeValidationSchemas } from './note-type.validation';
import { CacheEnvironmentConfig } from '../../../../shared/types';
import { services } from "../../shared";


const redisConfig = config.get<CacheEnvironmentConfig>('cache.redis');
const router = Router();
const { cache } = services;
const {
  showAllSchema,
  showSchema,
  storeSchema,
  updateSchema,
  destroySchema
} = noteTypeValidationSchemas;

const repository = new mongo.NoteTypeMongoRepository();
const cacheManager = new cache.RedisCacheManager({ url: redisConfig.host });
const service = new NoteTypeService(repository, cacheManager);
const controller = new NoteTypeController(service);

router.get('/', validate(showAllSchema), controller.getAll)
      .get('/:id', validate(showSchema), controller.get)
      .post('/', validate(storeSchema), controller.store)
      .put('/:id', validate(updateSchema), controller.update)
      .patch('/:id', validate(updateSchema), controller.update)
      .delete('/:id', validate(destroySchema), controller.destroy);

export default router;