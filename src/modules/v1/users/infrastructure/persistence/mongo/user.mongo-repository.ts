import { Model } from 'mongoose';
import { Note } from '../../../../notes/domain';
import { CollectionOptions, CollectionResult, TargetToSelect } from '../../../../shared';
import { User, UserDocument, UserRepository } from '../../../domain';
import { UserMongoModel } from './user.mongo-model';


export class UserMongoRepository implements UserRepository {

  constructor(
    private readonly model: Model<UserDocument> = UserMongoModel
  ){

  }

  async findAll(options: CollectionOptions = {}): Promise<CollectionResult<User>> {

    let { page = 1, perPage = 15, order = 'desc', sortBy = '', where = {}, filter = [] } = options;
    let skip = (page - 1) * perPage;

    sortBy = ',_id,'.concat(sortBy).replace(/,+/g, (order === 'asc') ? ' -' : ' ').trim();
    where.deletedAt = null;

    const [ total, collection ] = await Promise.all([
      this.model.countDocuments(where),
      this.model.find(where, filter).skip(skip).limit(perPage).sort(sortBy)
    ]);

    return { total, collection };
  }

  async findByIndex(index: string): Promise<User | null> {

    const where: TargetToSelect = { deletedAt: null, $or: [{ _id: index }, { email: index }, { username: index }, { phone: index }] };
    const document = await this.model.findOne(where);

    return document;
  }

  async create(data: Partial<User>): Promise<User | null> {

    const document = await this.model.create(data);

    return document;
  }

  async update(index: string, toUpdate: Partial<User>): Promise<User | null> {

    const where: TargetToSelect = { deletedAt: null, $or: [{ _id: index }, { email: index }, { username: index }, { phone: index }] };
    const options = { new: true, timestamps: true };

    const document = await this.model.findOneAndUpdate(where, toUpdate, options);

    return document;
  }

  async delete(index: string): Promise<User | null> {

    const where: TargetToSelect = { deletedAt: null, $or: [{ _id: index }, { email: index }, { username: index }, { phone: index }] };

    const document = await this.model.findOneAndDelete(where);

    // return (document) ? document: null;
    return document;
  }

  async findAllNotes(index: string, options: CollectionOptions = {}): Promise<CollectionResult<Note>> {

    let { page = 1, perPage = 15, order = 'desc', sortBy = '', where: subWhere = {}, filter = [] } = options;
    let skip = (page - 1) * perPage;

    sortBy = `,_id,${sortBy}`.replace(/,+$/, '').replace(/,+/g, (order === 'asc') ? ' -' : ' ').trim();

    const where: TargetToSelect = { deletedAt: null, $or: [{ _id: index }, { email: index }, { username: index }, { phone: index }] };
    let populationOptions = { path: 'notes', match: subWhere, select: filter, options: { sort: sortBy } };

    const userDoc = await this.model.findOne(where).populate(populationOptions);
    const noteDocs = userDoc.notes;
    const total = noteDocs.length;
    const collection = noteDocs.splice(skip, perPage);

    return { total, collection };
  }

  async findNoteById(index: string, noteId: string): Promise<Note | null> {

    const where: TargetToSelect = { deletedAt: null, $or: [{ _id: index }, { email: index }, { username: index }, { phone: index }] };

    const userDoc = await this.model.findOne(where);
    const noteDoc = userDoc.notes.id(noteId);
    return noteDoc;
  }

  async createNote(index: string, data: Partial<Note>): Promise<Note | null> {

    const where: TargetToSelect = { deletedAt: null, $or: [{ _id: index }, { email: index }, { username: index }, { phone: index }] };

    const userDoc = await this.model.findOne(where).populate('notes');
    const noteDocIndex = userDoc.notes.push(data) - 1;
    const noteDoc = userDoc.notes[noteDocIndex].save();
    userDoc.save();

    return noteDoc;
  }

  async updateNote(index: string, noteId: string, toUpdate: Partial<Note>): Promise<Note | null> {

    const where: TargetToSelect = { deletedAt: null, $or: [{ _id: index }, { email: index }, { username: index }, { phone: index }] };

    const userDoc = await this.model.findOne(where).populate('notes');
    const oldNoteDoc = userDoc.notes.id(noteId);
    const noteDoc = Object.assign(oldNoteDoc, toUpdate).save();

    return noteDoc;
  }

  async deleteNote(index: string, noteId: string): Promise<Note | null> {

    const where: TargetToSelect = { deletedAt: null, $or: [{ _id: index }, { email: index }, { username: index }, { phone: index }] };

    const userDoc = await this.model.findOne(where).populate('notes');
    const noteDoc = userDoc.notes.id(noteId).remove();

    return noteDoc;
  }
}