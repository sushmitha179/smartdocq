// client/src/services/api.js
const API_URL = "http://localhost:5000/api";

export async function signup(data) {
  try {
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Signup failed");
    }

    return res.json();
  } catch (err) {
    throw new Error(err.message || "Network error");
  }
}

export async function login(data) {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",   // ✅ important if backend sets cookies
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Login failed");
    }

    return res.json();
  } catch (err) {
    throw new Error(err.message || "Network error");
  }
}
