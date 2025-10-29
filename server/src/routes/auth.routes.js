import { Router } from 'express';
import { signup, login, logout } from '../controllers/auth.controller.js';
import { rotateRefresh, revokeRefresh } from '../middleware/auth.js';

const r = Router();
r.post('/signup', signup);
r.post('/login', login);
r.post('/rotate', rotateRefresh); // silent refresh
r.post('/logout', revokeRefresh);  // clears + revokes
export default r;
