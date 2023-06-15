import { services } from '../../../../shared';
import { NoteTypeDocument } from '../../../domain';

const { mongoose } = services.database.mongodb;

const NoteTypeMongoSchema = new mongoose.Schema<NoteTypeDocument>({
  name: { type: String, unique: true, required: true },
  description: { type: String, default: '' }
}, {
  collection: 'NoteTypes',
  timestamps: true
});

export const NoteTypeMongoModel = mongoose.model<NoteTypeDocument>('NoteType', NoteTypeMongoSchema);