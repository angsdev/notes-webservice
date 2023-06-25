import { Document, Types } from 'mongoose';
import { NoteDocument } from '../../notes/domain';
import { User } from './user.entity';


export interface UserSignInOptions {
  username: string;
  password: string;
}

/* Interface extending the main entity and the mongoose document. */

export interface UserDocument extends User, Document {
  _id: Types.ObjectId;
  notes: Types.DocumentArray<NoteDocument>;
}