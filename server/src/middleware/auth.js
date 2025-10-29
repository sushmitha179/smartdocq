import { verifyAccess, verifyRefresh, signAccess, signRefresh, sha256 } from '../utils/jwt.js';
import { Token } from '../models/Token.js';
import { config } from '../config.js';
import { User } from '../models/User.js';

export function requireAuth(req, res, next) {
  const token = req.cookies['access_token'];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const payload = verifyAccess(token);
    req.user = { id: payload.sub };
    next();
  } catch {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

export async function refreshIfNeeded(err, req, res, next) {
  // Not an error handler; helper for routes if you want silent refresh pattern on 401 via frontend
  next(err);
}

export function setAuthCookies(res, access, refresh, remember = true) {
  const common = { httpOnly: true, sameSite: 'lax', secure: false }; // set secure: true in production behind HTTPS
  res.cookie('access_token', access, { ...common, maxAge: 1000 * 60 * 60 }); // browser holds short-lived access token cookie
  // refresh as httpOnly cookie, longer maxAge if remember
  res.cookie('refresh_token', refresh, {
    ...common,
    maxAge: remember ? 1000 * 60 * 60 * 24 * 30 : 1000 * 60 * 60 * 24 * 1
  });
}

export async function rotateRefresh(req, res) {
  const refresh = req.cookies['refresh_token'];
  if (!refresh) return res.status(401).json({ message: 'No refresh token' });
  try {
    const payload = verifyRefresh(refresh);
    const tokenHash = sha256(refresh);
    const found = await Token.findOne({ userId: payload.sub, tokenHash, revoked: false });
    if (!found || found.expiresAt < new Date()) return res.status(401).json({ message: 'Invalid session' });

    // rotate refresh
    const newRefresh = signRefresh({ sub: payload.sub });
    found.tokenHash = sha256(newRefresh);
    found.expiresAt = new Date(Date.now() + 30 * 24 * 3600 * 1000);
    await found.save();

    const access = signAccess({ sub: payload.sub });
    setAuthCookies(res, access, newRefresh, true);
    return res.json({ ok: true });
  } catch {
    return res.status(401).json({ message: 'Invalid refresh' });
  }
}

export async function revokeRefresh(req, res) {
  const refresh = req.cookies['refresh_token'];
  if (refresh) {
    try {
      const payload = verifyRefresh(refresh);
      await Token.updateMany({ userId: payload.sub, tokenHash: sha256(refresh) }, { $set: { revoked: true } });
    } catch {}
  }
  res.clearCookie('access_token');
  res.clearCookie('refresh_token');
  return res.json({ ok: true });
}
