import mongoose from 'mongoose';

const TokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, index: true, required: true, ref: 'User' },
  tokenHash: { type: String, required: true },
  userAgent: { type: String, default: '' },
  ip: { type: String, default: '' },
  revoked: { type: Boolean, default: false },
  expiresAt: { type: Date, index: true }
}, { timestamps: true });

export const Token = mongoose.model('Token', TokenSchema);
