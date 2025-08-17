import axios from "axios";

// ✅ Check if user is authenticated
export const isAuthenticated = () => {
  return Boolean(localStorage.getItem("access_token"));
};

// ✅ Get access token
export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

// ✅ Logout and clear tokens
export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.href = "/login"; // redirect to login page
};

// ✅ Refresh access token using refresh token
export const refreshToken = async () => {
  try {
    const refresh = localStorage.getItem("refresh_token");
    if (!refresh) throw new Error("No refresh token found");

    const response = await axios.post(
      "http://192.168.0.108:8000/api/token/refresh/",
      { refresh }
    );

    if (response.data?.access) {
      // save new access token
      localStorage.setItem("access_token", response.data.access);
      return response.data.access;
    } else {
      throw new Error("No access token received from server");
    }
  } catch (error) {
    console.error("Token refresh failed:", error);
    // if refresh fails → logout
    logout();
    throw error;
  }
};
