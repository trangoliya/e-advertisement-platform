//file: Context is a way to share data globally in a react app without passing props manually at every level.
//    - AuthContext.jsx: Context for managing authentication state across the application.

import { useState } from "react";
import { AuthContext } from "./AuthContext";

// provider component for authentication context
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(localStorage.getItem("role") || null);

  const login = (role) => {
    // login function to update authentication state
    setIsAuthenticated(true);
    setUser({ name: "Test User" });
    
    // const storedRole = "user";
    // const storedRole = "admin";
    // const storedRole = "publisher";
    
    setRole(role);
   
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("role", role);
    return role;
  };
  const logout = () => {
    // logout function to clear authentication state
    setIsAuthenticated(false);
    setUser(null);
    setRole(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("role");
  };
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, role, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
