import { Model } from 'mongoose';
import { NoteTypeMongoModel } from './note-type.mongo-model';
import { NoteType, NoteTypeRepository, NoteTypeDocument } from '../../../domain';
import { CollectionOptions, CollectionResult } from '../../../../shared'


export class NoteTypeMongoRepository implements NoteTypeRepository {

  constructor(
    private readonly model: Model<NoteTypeDocument> = NoteTypeMongoModel
  ){
    this.model = model;
  }

  async findAll(options?: CollectionOptions): Promise<CollectionResult<NoteType>> {

    let { page = 1, perPage = 15, order = 'desc', sortBy = '', where = {}, filter = [] } = options;
    let skip = (page - 1) * perPage;

    sortBy = ',_id,'.concat(sortBy).replace(/,+/g, (order === 'asc') ? ' -' : ' ').trim();

    const [ total, collection ] = await Promise.all([
      this.model.countDocuments(where),
      this.model.find(where, filter).skip(skip).limit(perPage).sort(sortBy)
    ]);

    return { total, collection };
  }

  async findById(id: string): Promise<NoteType | null> {

    const document = await this.model.findById(id);

    return document;
  }

  async create(data: Partial<NoteType>): Promise<NoteType | null> {

    const document = await this.model.create(data);

    return document;
  }

  async update(id: string, toUpdate: Partial<NoteType>): Promise<NoteType | null> {

    const options = { new: true, timestamps: true };

    const document = await this.model.findByIdAndUpdate(id, toUpdate,options);

    return document;
  }

  async delete(id: string): Promise<NoteType | null> {

    const document = await this.model.findByIdAndDelete(id);

    return document;
  }
}