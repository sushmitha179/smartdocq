import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { Token } from '../models/Token.js';
import { signAccess, signRefresh, sha256 } from '../utils/jwt.js';
import { signupSchema, loginSchema } from '../utils/validators.js';

export async function signup(req, res) {
  const { value, error } = signupSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const exists = await User.findOne({ email: value.email });
  if (exists) return res.status(409).json({ message: 'Email already registered' });

  const passwordHash = await bcrypt.hash(value.password, 10);
  const user = await User.create({ email: value.email, passwordHash, name: value.name || '' });
  return res.status(201).json({ id: user._id, email: user.email, name: user.name });
}

export async function login(req, res) {
  const { value, error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const user = await User.findOne({ email: value.email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const ok = await bcrypt.compare(value.password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const access = signAccess({ sub: String(user._id) });
  const refresh = signRefresh({ sub: String(user._id) });

  await Token.create({
    userId: user._id,
    tokenHash: sha256(refresh),
    userAgent: req.headers['user-agent'] || '',
    ip: req.ip || '',
    expiresAt: new Date(Date.now() + 30 * 24 * 3600 * 1000)
  });

  // remember flag controls cookie maxAge length (function handles)
  const remember = value.remember !== false;
  res.cookie('access_token', access, { httpOnly: true, sameSite: 'lax', secure: false, maxAge: 60 * 60 * 1000 });
  res.cookie('refresh_token', refresh, { httpOnly: true, sameSite: 'lax', secure: false, maxAge: remember ? 30*24*3600*1000 : 24*3600*1000 });
  return res.json({ id: user._id, email: user.email, name: user.name });
}

export async function refresh(req, res) {
  // handled in middleware/auth.rotateRefresh alternative, but keep here as route
  return res.status(405).json({ message: 'Use /auth/rotate' });
}

export async function logout(req, res) {
  // middleware has a helper; but keep route version:
  res.clearCookie('access_token');
  res.clearCookie('refresh_token');
  return res.json({ ok: true });
}
