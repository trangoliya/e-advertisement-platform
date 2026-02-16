import api from "./api";


// for register user
export const register = async (data) => {
  const response = await api.post("/api/auth/register", data);
  return response.data;
};

// for login user
export const login = async (data) => {
  const response = await api.post("/api/auth/login", data);
  return response.data;
};
