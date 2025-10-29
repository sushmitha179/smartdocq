import mongoose from 'mongoose';

const ConversationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, index: true, ref: 'User' },
  title: { type: String, default: 'New chat' },
  isPermanent: { type: Boolean, default: false },
  isTemporary: { type: Boolean, default: true },
  expiresAt: { type: Date, index: true, default: null }, // TTL index will purge
  tags: [{ type: String }]
}, { timestamps: true });

export const Conversation = mongoose.model('Conversation', ConversationSchema);
