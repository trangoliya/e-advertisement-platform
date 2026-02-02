//file: Context is a way to share data globally in a react app without passing props manually at every level.
//    - AuthContext.jsx: Context for managing authentication state across the application.

import {  useState } from "react";
import { AuthContext } from "./AuthContext";

// provider component for authentication context
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = () => {
    // login function to update authentication state
    setIsAuthenticated(true);
  };
  const logout = () => {
    // logout function to clear authentication state
    setIsAuthenticated(false);
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;


