import { createContext, useState, useEffect } from "react";
import { login } from "../services/adminService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      if (token) {
        // If there's a token, set user as authenticated
        // You can decode the token or just set a basic user object
        setUser({ authenticated: true });
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = async (credentials) => {
    setIsLoading(true);
    try {
      const response = await login(credentials);
      setUser(response.admin);
      localStorage.setItem("token", response.token);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, handleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
