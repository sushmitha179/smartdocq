import { Conversation } from '../models/Conversation.js';

export async function createConversation(req, res) {
  const { title, isPermanent = false, isTemporary = true } = req.body;
  const doc = {
    userId: req.user.id,
    title: title || 'New chat',
    isPermanent,
    isTemporary
  };
  if (isTemporary) {
    // expire in 7 days
    doc.expiresAt = new Date(Date.now() + 7 * 24 * 3600 * 1000);
  }
  const conv = await Conversation.create(doc);
  res.status(201).json(conv);
}

export async function listConversations(req, res) {
  const { type, q } = req.query;
  const filter = { userId: req.user.id };
  if (type === 'temporary') filter.isTemporary = true;
  if (type === 'permanent') filter.isPermanent = true;
  if (q) filter.title = { $regex: q, $options: 'i' };
  const items = await Conversation.find(filter).sort({ updatedAt: -1 }).limit(100);
  res.json(items);
}

export async function getConversation(req, res) {
  const conv = await Conversation.findOne({ _id: req.params.id, userId: req.user.id });
  if (!conv) return res.status(404).json({ message: 'Not found' });
  res.json(conv);
}

export async function updateConversation(req, res) {
  const updates = {};
  if ('title' in req.body) updates.title = req.body.title;
  if ('isPermanent' in req.body) updates.isPermanent = !!req.body.isPermanent;
  if ('isTemporary' in req.body) updates.isTemporary = !!req.body.isTemporary;
  if (updates.isTemporary) updates.expiresAt = new Date(Date.now() + 7 * 24 * 3600 * 1000);
  const conv = await Conversation.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    { $set: updates },
    { new: true }
  );
  if (!conv) return res.status(404).json({ message: 'Not found' });
  res.json(conv);
}

export async function removeConversation(req, res) {
  await Conversation.deleteOne({ _id: req.params.id, userId: req.user.id });
  res.json({ ok: true });
}
