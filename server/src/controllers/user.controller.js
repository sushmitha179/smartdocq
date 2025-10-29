import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';

export async function me(req, res) {
  const user = await User.findById(req.user.id).select('_id email name avatarUrl preferences');
  if (!user) return res.status(404).json({ message: 'Not found' });
  res.json(user);
}

export async function updateProfile(req, res) {
  const { name, avatarUrl } = req.body;
  const user = await User.findByIdAndUpdate(req.user.id, { $set: { name, avatarUrl } }, { new: true })
    .select('_id email name avatarUrl preferences');
  res.json(user);
}

export async function updatePreferences(req, res) {
  const { preferences } = req.body;
  const user = await User.findByIdAndUpdate(req.user.id, { $set: { preferences } }, { new: true })
    .select('_id email name avatarUrl preferences');
  res.json(user);
}

export async function changePassword(req, res) {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: 'Not found' });

  const ok = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!ok) return res.status(400).json({ message: 'Current password incorrect' });

  user.passwordHash = await bcrypt.hash(newPassword, 10);
  await user.save();
  res.json({ ok: true });
}
