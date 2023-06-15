import { Document, Types } from 'mongoose';
import { NoteType } from './note-type.entity';

/* Interface extending the main entity and the mongoose document. */

export interface NoteTypeDocument extends NoteType, Document {
  _id: Types.ObjectId;
};