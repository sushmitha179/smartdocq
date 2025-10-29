import { api } from './client';

export const AuthAPI = {
  // me: () => api('/me'),
  me: () => fetch("http://localhost:4000/api/me", { credentials: "include" }).then(res => res.json()),
  login: (data) => api('/auth/login', { method:'POST', body: data }),
  signup: (data) => api('/auth/signup', { method:'POST', body: data }),
  logout: () => api('/auth/logout', { method:'POST' })
};

export const ConvAPI = {
  create: (body) => api('/conversations', { method:'POST', body }),
  list: (type) => api(`/conversations?type=${type||''}`),
  get: (id) => api(`/conversations/${id}`),
  rename: (id, title) => api(`/conversations/${id}`, { method:'PATCH', body: { title } }),
  togglePermanent: (id, isPermanent) => api(`/conversations/${id}`, { method:'PATCH', body: { isPermanent, isTemporary: !isPermanent } }),
  messages: (id) => api(`/conversations/${id}/messages`),
  addMessage: (id, role, content) => api(`/conversations/${id}/messages`, { method:'POST', body: { role, content } })
};

export const QAAPI = {
  answer: (conversationId, query) => api('/qa/answer', { method:'POST', body: { conversationId, query } })
};
