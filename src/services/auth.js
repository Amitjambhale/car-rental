import { apiFetch } from "./api";

/**
 * Register new user
 */
export async function registerUser(payload) {
  return apiFetch("register/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * Login user
 */
export async function loginUser({ email, password }) {
  const data = await apiFetch("login/", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  // ✅ Store tokens locally
  if (data.access) {
    localStorage.setItem("access_token", data.access);
  }
  if (data.refresh) {
    localStorage.setItem("refresh_token", data.refresh);
  }

  return data;
}

/**
 * Logout user
 */
export function logoutUser() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}
