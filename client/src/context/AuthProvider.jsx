import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import {
  login as loginUser,
  register as registerUser,
} from "../services/auth.service";

const storedUser = localStorage.getItem("user");
const initialUser = storedUser ? JSON.parse(storedUser) : null;

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(initialUser);
  const [loading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const register = async (formData) => {
    const data = await registerUser(formData);

    localStorage.setItem("token", data.token);
    setUser(data.user);

    return { success: true };
  };

  const login = async (formData) => {
    const data = await loginUser(formData);

    localStorage.setItem("token", data.token);
    setUser(data.user);

    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, register, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
