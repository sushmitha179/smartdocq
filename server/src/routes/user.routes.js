import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { me, updateProfile, updatePreferences, changePassword } from '../controllers/user.controller.js';

const r = Router();
r.get('/me', requireAuth, me);
r.patch('/me', requireAuth, updateProfile);
r.patch('/me/preferences', requireAuth, updatePreferences);
r.post('/auth/change-password', requireAuth, changePassword);
export default r;
