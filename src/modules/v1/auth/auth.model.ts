import { Schema, model, Types } from 'mongoose';
import { IUser } from '../user/user.model';

export interface IAuth {
  user: Types.ObjectId | IUser;
  provider: 'google' | 'local';
  providerId?: string | null;
  password?: string | null;
  email_verified_at?: string | null;
  resetToken?: string | null;
  resetTokenExp?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}
const authSchema = new Schema<IAuth>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    provider: { type: String, enum: ['google', 'local'], required: true },
    providerId: { type: String, default: null },
    password: { type: String },
    email_verified_at: { type: String, default: null },
    resetToken: { type: String, default: null },
    resetTokenExp: { type: Date, default: null },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_, doc) {
        return doc;
      },
    },
  }
);

export const AuthModel = model<IAuth>('Auth', authSchema);
