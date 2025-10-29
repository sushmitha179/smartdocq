const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

export async function api(path, { method = 'GET', body, headers } = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(headers || {}) },
    body: body ? JSON.stringify(body) : undefined
  });
  if (res.status === 401) {
    // try silent refresh
    const r = await fetch(`${API_BASE}/auth/rotate`, { method:'POST', credentials:'include' });
    if (r.ok) {
      const retry = await fetch(`${API_BASE}${path}`, {
        method, credentials:'include',
        headers: { 'Content-Type': 'application/json', ...(headers || {}) },
        body: body ? JSON.stringify(body) : undefined
      });
      if (!retry.ok) throw new Error((await retry.json()).message || 'Request failed');
      return retry.json();
    }
  }
  if (!res.ok) throw new Error((await res.json()).message || 'Request failed');
  return res.json();
}
