import { services } from '../../../../shared';
import { UserDocument } from '../../../domain';

const { mongoose } = services.database.mongodb;

const UserMongoSchema = new mongoose.Schema<UserDocument>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, index: true, unique: true, required: true },
  phone: { type: String, index: true, unique: true, sparse: true },
  email: { type: String, index: true, unique: true, required: true },
  emailVerifiedAt: { type: Date, default: null },
  password: { type: String, required: true },
  rememberToken: { type: String, default: null },
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note', index: true }],
  deletedAt: { type: Date, default: null }
}, {
  collection: 'Users',
  timestamps: true
});

export const UserMongoModel = mongoose.model<UserDocument>('User', UserMongoSchema);