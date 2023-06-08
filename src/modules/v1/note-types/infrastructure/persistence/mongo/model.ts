import { services } from '../../../../shared';
import { NoteTypeDocument } from '../../../domain/interfaces';

const { Schema, model } = services.database.mongodb.mongoose;

const NoteTypeSchema = new Schema<NoteTypeDocument>({
  name: { type: String, unique: true, required: true },
  description: { type: String, default: '' }
}, {
  collection: 'NoteTypes',
  timestamps: true
});

export default model<NoteTypeDocument>('NoteType', NoteTypeSchema);