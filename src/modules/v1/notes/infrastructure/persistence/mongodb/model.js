/*============================ Imports ============================*/
const { Schema, model } = require('../../../../shared').services.database.mongodb.mongoose;
/*============================ Rest ============================*/

const NoteSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type_id: { type: Schema.Types.ObjectId, ref: 'NoteType', required: true },
  title: { type: String, required: true },
  content: { type: String, default: '' }
}, {
  collection: 'Notes',
  versionKey: false,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = model('Note', NoteSchema);