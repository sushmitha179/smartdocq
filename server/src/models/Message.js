import mongoose from 'mongoose';

const AttachmentSchema = new mongoose.Schema({
  fileName: String, mimeType: String, size: Number, storageKey: String
}, { _id: false });

const MessageSchema = new mongoose.Schema({
  conversationId: { type: String, index: true, ref: 'Conversation' },
  role: { type: String, enum: ['user','assistant','system'], required: true },
  content: { type: String, default: '' },
  attachments: [AttachmentSchema],
  tokensIn: Number,
  tokensOut: Number
}, { timestamps: true });

MessageSchema.index({ conversationId: 1, createdAt: 1 });

export const Message = mongoose.model('Message', MessageSchema);
