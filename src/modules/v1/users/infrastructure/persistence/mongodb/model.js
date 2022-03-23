/*============================ Imports ============================*/
const { Schema, model } = require('../../../../shared').services.database.mongodb.mongoose;
/*============================ Rest ============================*/

const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, index: true, unique: true, required: true },
  phone: { type: String, index: true, unique: true, sparse: true },
  email: { type: String, index: true, unique: true, required: true },
  email_verified_at: { type: Date, select: false, default: null },
  password: { type: String, required: true },
  remember_token: { type: String, default: null },
  notes: [{ type: Schema.Types.ObjectId, ref: 'Note', index: true }],
  deleted_at: { type: Date, default: null }
}, {
  collection: 'Users',
  versionKey: false,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = model('User', UserSchema);