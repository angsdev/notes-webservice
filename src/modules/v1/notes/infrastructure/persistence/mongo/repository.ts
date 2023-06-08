import { Model } from 'mongoose';
import { UpdateResult, DeleteResult } from 'mongodb'
import { NoteDocument, NoteRepository, INote } from '../../../domain/interfaces';
import { CanManageMany, CollectionOptions, CollectionResult, CustomQueryOptions, TargetToSelect } from '../../../../shared';
import MongoModel from './model';


export default class NoteMongoRepository implements NoteRepository<INote> {

  constructor(
    private model: Model<NoteDocument> = MongoModel
  ){
    this.model = model;
  }

  async findAll(options: CollectionOptions = {}): Promise<CollectionResult<INote>> {

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

  async findBy(where: TargetToSelect, options: CustomQueryOptions = {}): Promise<INote> {

    const { filter = [], populate = [] } = options;
    const document = await this.model.findOne(where, filter).populate(populate);
    return document;
  }

  async create(data: INote|INote[]): Promise<INote|INote[]> {

    const document = await this.model[(Array.isArray(data)) ? 'insertMany' : 'create'](data);
    return document;
  }

  async update(where: TargetToSelect, toUpdate: Partial<INote>, options: CustomQueryOptions = {}): Promise<INote|INote[]|UpdateResult> {

    const { populate = [], many = false } = options;
    options = { timestamps: true, new: true, ...options };

    const document = await this.model[(many) ? 'updateMany' : 'findOneAndUpdate'](where, toUpdate, options);
    return document;
  }

  async delete(where: TargetToSelect, options: CanManageMany = {}): Promise<INote|INote[]|DeleteResult> {

    const { many = false } = options;
    const document = await this.model[(many) ? 'deleteMany' : 'findOneAndDelete'](where);
    return document;
  }
}