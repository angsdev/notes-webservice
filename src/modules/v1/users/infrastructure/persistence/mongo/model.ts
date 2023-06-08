import { services } from '../../../../shared';
import { UserDocument } from '../../../domain/interfaces';

const { Schema, model } = services.database.mongodb.mongoose;

const UserSchema = new Schema<UserDocument>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, index: true, unique: true, required: true },
  phone: { type: String, index: true, unique: true, sparse: true },
  email: { type: String, index: true, unique: true, required: true },
  emailVerifiedAt: { type: Date, default: null },
  password: { type: String, required: true },
  rememberToken: { type: String, default: null },
  notes: [{ type: Schema.Types.ObjectId, ref: 'Note', index: true }],
  deletedAt: { type: Date, default: null }
}, {
  collection: 'Users',
  timestamps: true
});

export default model<UserDocument>('User', UserSchema);