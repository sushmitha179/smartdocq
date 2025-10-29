import { Message } from '../models/Message.js';

export async function listMessages(req, res) {
  const { id } = req.params;
  const items = await Message.find({ conversationId: id }).sort({ createdAt: 1 });
  res.json(items);
}

export async function addMessage(req, res) {
  const { id } = req.params;
  const { role, content } = req.body;
  const msg = await Message.create({ conversationId: id, role, content });
  res.status(201).json(msg);
}

export async function deleteMessage(req, res) {
  const { messageId } = req.params;
  await Message.deleteOne({ _id: messageId });
  res.json({ ok: true });
}
