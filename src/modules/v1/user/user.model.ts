import { Schema, model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password?: string | null;
  avatar?: string | null;
  role: 'user' | 'admin';
  provider: 'google' | 'local';
  email_verified_at?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  resetToken?: string | null;
  resetTokenExp?: Date | null;
  createdAtFormatted?: string;
  updatedAtFormatted?: string;
}
const formatILTime = (date: any) =>
  new Date(date).toLocaleString('he-IL', {
    timeZone: 'Asia/Jerusalem',
  });

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_, obj) {
        if (obj.createdAt) obj.createdAtFormatted = formatILTime(obj.createdAt);
        if (obj.updatedAt) obj.updatedAtFormatted = formatILTime(obj.updatedAt);
        return obj;
      },
    },
  }
);

export const UserModel = model<IUser>('User', userSchema);
