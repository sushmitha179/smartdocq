import mongoose from 'mongoose';

const PreferencesSchema = new mongoose.Schema({
  theme: { type: String, enum: ['light', 'dark', 'system'], default: 'system' },
  language: { type: String, default: 'en' },
  ttsEnabled: { type: Boolean, default: false },
  answerLength: { type: String, enum: ['short','medium','long'], default: 'medium' }
}, { _id: false });

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, index: true, required: true },
  passwordHash: { type: String, required: true },
  name: { type: String, default: '' },
  emailVerified: { type: Boolean, default: false },
  preferences: { type: PreferencesSchema, default: () => ({}) }
}, { timestamps: true });

export const User = mongoose.model('User', UserSchema);
