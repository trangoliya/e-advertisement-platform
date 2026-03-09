import api from "./api";

// for register user
export const register = async (data) => {
  const response = await api.post("/api/auth/register", data);
  return response.data;
};

// for login user
export const login = async (data) => {
  const response = await api.post("/api/auth/login", data);
  const { token, user } = response.data;

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  return response.data;
};
