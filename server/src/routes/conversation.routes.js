import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { createConversation, listConversations, getConversation, updateConversation, removeConversation } from '../controllers/conversation.controller.js';
import { listMessages, addMessage, deleteMessage } from '../controllers/message.controller.js';

const r = Router();
r.use(requireAuth);
r.post('/', createConversation);
r.get('/', listConversations);
r.get('/:id', getConversation);
r.patch('/:id', updateConversation);
r.delete('/:id', removeConversation);
r.get('/:id/messages', listMessages);
r.post('/:id/messages', addMessage);
r.delete('/messages/:messageId', deleteMessage);
export default r;
