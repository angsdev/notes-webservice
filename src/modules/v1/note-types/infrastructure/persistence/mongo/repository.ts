import { Model } from 'mongoose';
import { UpdateResult, DeleteResult } from 'mongodb';
import { NoteTypeRepository, INoteType, NoteTypeDocument } from '../../../domain/interfaces';
import { CanManageMany, CollectionOptions, CollectionResult, CustomQueryOptions, TargetToSelect} from '../../../../shared'
import MongoModel from './model';

export default class NoteTypeMongoRepository implements NoteTypeRepository<INoteType> {

  constructor(
    private model: Model<NoteTypeDocument> = MongoModel
  ){

    this.model = model;
  }

  async findAll(options: CollectionOptions = {}): Promise<CollectionResult<INoteType>> {

    let { page = 1, perPage = 15, order = 'desc', sortBy = '', where = {}, populate = [], filter = [] } = options;
    let skip = (page - 1) * perPage;

    sortBy = ',_id,'.concat(sortBy).replace(/,+/g, (order === 'asc') ? ' -' : ' ').trim();
    where.deletedAt = null;

    const [ total, collection ] = await Promise.all([
      this.model.countDocuments(where),
      this.model.find(where, filter).skip(skip).limit(perPage).sort(sortBy).populate(populate)
    ]);
    return { total, collection };
  }

  async findBy(where: TargetToSelect, options: CustomQueryOptions = {}): Promise<INoteType> {

    const { filter = [], populate = [] } = options;
    const document = await this.model.findOne(where, filter).populate(populate);
    return document;
  }

  async create(data: INoteType|INoteType[]): Promise<INoteType|INoteType[]> {

    const document = await this.model[(Array.isArray(data)) ? 'insertMany' : 'create'](data);
    return document;
  }

  async update(where: TargetToSelect, toUpdate: Partial<INoteType>, options: CustomQueryOptions = {}): Promise<INoteType|INoteType[]|UpdateResult> {

    const { populate = [], many = false } = options;
    options = { timestamps: true, new: true, ...options };

    const document = await this.model[(many) ? 'updateMany' : 'findOneAndUpdate'](where, toUpdate, options);
    return document;
  }

  async delete(where: TargetToSelect, options: CanManageMany = {}): Promise<INoteType|INoteType[]|DeleteResult> {

    const { many = false } = options;
    const document = await this.model[(many) ? 'deleteMany' : 'findOneAndDelete'](where);
    return document;
  }
}