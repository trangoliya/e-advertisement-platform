import { createContext, useContext } from "react";

// create context(shared information) for authentication state
export const AuthContext = createContext(null);

// custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
