const API_BASE = import.meta.env.VITE_API_BASE;

function getAccessToken() {
  return localStorage.getItem("access_token");
}

function getRefreshToken() {
  return localStorage.getItem("refresh_token");
}

async function refreshToken() {
  const refresh = getRefreshToken();
  if (!refresh) throw new Error("No refresh token");

  const res = await fetch(`${API_BASE}token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });

  if (!res.ok) throw new Error("Failed to refresh token");
  const data = await res.json();
  localStorage.setItem("access_token", data.access);
  return data.access;
}

/**
 * apiFetch wraps fetch with:
 * - base URL handling
 * - JSON parsing
 * - better error messages
 * - automatic token refresh
 */
export async function apiFetch(path, options = {}, retry = true) {
  const url = path.startsWith("http") ? path : `${API_BASE}${path}`;

  let headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  // ✅ Add access token if available
  const token = getAccessToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    ...options,
    headers,
  });

  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    // 🔄 If unauthorized and retry allowed → refresh token
    if (res.status === 401 && retry) {
      try {
        const newToken = await refreshToken();
        return apiFetch(path, options, false); // retry once
      } catch (err) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
      }
    }

    const msg =
      (data && data.detail) ||
      (typeof data === "string" ? data : JSON.stringify(data)) ||
      `Request failed with status ${res.status}`;
    throw new Error(msg);
  }

  return data;
}
