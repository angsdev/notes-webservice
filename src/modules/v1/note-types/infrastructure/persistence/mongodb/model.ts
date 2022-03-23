/*============================ Imports ============================*/
import { services } from '../../../../shared';
/*============================ Vars setup ============================*/
const { Schema, model } = services.database.mongodb.mongoose;
/*============================ Rest ============================*/

const NoteTypeSchema = new Schema({
  name: { type: String, unique: true, required: true },
  description: { type: String, default: '' }
}, {
  collection: 'NoteTypes',
  versionKey: false,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export default model('NoteType', NoteTypeSchema);