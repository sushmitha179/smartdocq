import jwt from 'jsonwebtoken';
import { createHash } from 'node:crypto';
import { config } from '../config.js';

// ✅ Sign Access Token
export function signAccess(payload) {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '15m' });
}

// ✅ Sign Refresh Token
export function signRefresh(payload) {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '7d' });
}

// ✅ Verify Access Token
export function verifyAccess(token) {
  return jwt.verify(token, config.jwtSecret);
}

// ✅ Verify Refresh Token (for future extension, can use same secret)
export function verifyRefresh(token) {
  return jwt.verify(token, config.jwtSecret);
}

// ✅ Hash helper (for blacklisting refresh tokens etc.)
export function sha256(s) {
  return createHash('sha256').update(s).digest('hex');
}
