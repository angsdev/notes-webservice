import { services } from '../../../../shared';
import { NoteDocument } from '../../../domain';

const { mongoose } = services.database.mongodb;

const NoteMongoSchema = new mongoose.Schema<NoteDocument>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  typeId: { type: mongoose.Schema.Types.ObjectId, ref: 'NoteType', required: true },
  title: { type: String, required: true },
  content: { type: String, default: '' }
}, {
  collection: 'Notes',
  timestamps: true
});

export const NoteMongoModel = mongoose.model<NoteDocument>('User', NoteMongoSchema);