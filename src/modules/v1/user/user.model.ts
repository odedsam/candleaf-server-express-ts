import { Schema, model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password?: string | null;
  avatar?: string | null;
  role: 'user' | 'admin';
  provider: 'google' | 'local';
  email_verified_at?: string | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  resetToken?: string | null;
  resetTokenExp?: Date | null;
}
const formatILTime = (date: Date) =>
  new Date(date).toLocaleString('he-IL', {
    timeZone: 'Asia/Jerusalem',
  });

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true,toLowerCase:true },
    avatar: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_, doc) {
        if (doc.createdAt) doc.createdAt = formatILTime(doc.createdAt as any);
        if (doc.updatedAt) doc.updatedAt = formatILTime(doc.updatedAt as any);
        return doc;
      },
    },
  }
);

export const UserModel = model<IUser>('User', userSchema);
