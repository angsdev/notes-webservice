import { Document, Types } from 'mongoose';
import { Note } from './note.entity';

/* Interface extending the main entity and the mongoose document. */

export interface NoteDocument extends Note, Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  typeId: Types.ObjectId;
};