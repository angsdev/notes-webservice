import { UpdateResult, DeleteResult } from 'mongodb'
import { Document, Types } from 'mongoose';
import { CollectionOptions, CollectionResult, CustomQueryOptions, CanManageMany, HasMongoIdFormat, TargetToSelect, Entity } from "../../shared";

/* Entity interface */

export interface INoteType extends Entity {
  _id?: unknown;
  name: string;
  description?: string;
};

/* Entity extending the mongoose and the main entity interface */

export interface NoteTypeDocument extends INoteType, Document {
  _id: Types.ObjectId;
};

/* Note type repository interface usable for both Mongo and MySQL drivers */

export interface NoteTypeRepository<T> {

  /**
   * Get all documents and they total.
   * @param {CollectionOptions} options
   * @returns {Promise<MongoCollectionResult>}
   */
  findAll(options?: CollectionOptions): Promise<CollectionResult<T>>

  /**
   * Get one document.
   * @param {TargetToChange} where
   * @param {CustomQueryOptions} options
   * @returns {Promise<IMongoUser>}
   */
  findBy(where: TargetToSelect, options?: CustomQueryOptions): Promise<T>;

  /**
   * Create one or more documents. asdsad
   * @param {IUser|IUser[]} data
   * @returns {Promise<IMongoUser|IMongoUser[]>}
   */
  create(data: T|T[]): Promise<T|T[]>;

  /**
   * Update one or more documents.
   * @param {TargetToChange} where
   * @param {IUser} toUpdate
   * @param {CustomQueryOptions} options
   * @returns {Promise<IMongoUser|IMongoUser[]|UpdateWriteOpResult>}
   */
  update(where: TargetToSelect, toUpdate: Partial<T>, options?: CustomQueryOptions): Promise<T|T[]|UpdateResult>;

  /**
   * Delete one or more documents.
   * @param {TargetToChange} where
   * @param {CanManageMany} options
   * @returns {Promise<IMongoUser|IMongoUser[]|DeleteResult>}
   */
  delete(where: TargetToSelect, options?: CanManageMany): Promise<T|T[]|DeleteResult>;
}