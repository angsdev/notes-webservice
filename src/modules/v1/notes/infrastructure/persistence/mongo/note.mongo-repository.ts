import { Model } from 'mongoose';
import { NoteMongoModel } from './note.mongo-model';
import { Note, NoteDocument, NoteRepository } from '../../../domain';
import { CollectionOptions, CollectionResult } from '../../../../shared';


export class NoteMongoRepository implements NoteRepository {

  constructor(
    private readonly model: Model<NoteDocument> = NoteMongoModel
  ){
    this.model = model;
  }

  async findAll(options?: CollectionOptions): Promise<CollectionResult<Note>> {

    let { page = 1, perPage = 15, order = 'desc', sortBy = '', where = {}, filter = [] } = options;
    let skip = (page - 1) * perPage;

    sortBy = ',_id,'.concat(sortBy).replace(/,+/g, (order === 'asc') ? ' -' : ' ').trim();

    const [ total, collection ] = await Promise.all([
      this.model.countDocuments(where),
      this.model.find(where, filter).skip(skip).limit(perPage).sort(sortBy)
    ]);

    return { total, collection };
  }

  async findById(id: string): Promise<Note | null> {

    const document = await this.model.findById(id);

    return document;
  }

  async create(data: Partial<Note>): Promise<Note | null> {

    const document = await this.model.create(data);

    return document;
  }

  async update(id: string, toUpdate: Partial<Note>): Promise<Note | null> {

    const options = { new: true, timestamps: true };

    const document = await this.model.findByIdAndUpdate(id, toUpdate,options);

    return document;
  }

  async delete(id: string): Promise<Note | null> {

    const document = await this.model.findByIdAndDelete(id);

    return document;
  }
}