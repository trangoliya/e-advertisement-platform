import api from "./api";

// Register
export const register = async (data) => {
  const response = await api.post("/api/auth/register", data);
  return response.data;
};

// Login
export const login = async (data) => {
  const response = await api.post("/api/auth/login", data);

  const token = response.data?.token;
  const user = response.data?.user;

  if (token) {
    localStorage.setItem("token", token);
  }

  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  return response.data;
};

// Logout
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// Get Current User
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};