/*============================ Imports ============================*/
const { Schema, model } = require('../../../../shared').services.database.mongodb.mongoose;
/*============================ Rest ============================*/

const NoteTypeSchema = new Schema({
  name: { type: String, unique: true, required: true },
  description: { type: String, default: '' }
}, {
  collection: 'NoteTypes',
  versionKey: false,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = model('NoteType', NoteTypeSchema);