import { services } from '../../../../shared';
import { NoteDocument } from '../../../domain/interfaces';

const { Schema, model } = services.database.mongodb.mongoose;

const NoteSchema = new Schema<NoteDocument>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  typeId: { type: Schema.Types.ObjectId, ref: 'NoteType', required: true },
  title: { type: String, required: true },
  content: { type: String, default: '' }
}, {
  collection: 'Notes',
  timestamps: true
});

export default model<NoteDocument>('Note', NoteSchema);