//file: Context is a way to share data globally in a react app without passing props manually at every level.
//    - AuthContext.jsx: Context for managing authentication state across the application.

import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import {
  login as loginUser,
  register as registerUser,
} from "../services/auth.service";
// import useAuth from "../hooks/useAuth";

// provider component for authentication context
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // load user from localstorage on refresh page
  useEffect(() => {
    const initAuth = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  // register function
  const register = async (formData) => {
    try {
      const data = await registerUser(formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  };

  // login function
  const login = async (formData) => {
    try {
      const data = await loginUser(formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login Failed",
      };
    }
  };

  // logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, register, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
