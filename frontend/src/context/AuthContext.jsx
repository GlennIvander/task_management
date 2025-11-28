import React, { createContext, useState, useEffect } from "react";
import { setAuthToken } from "../api/axios";


export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setTokenValue] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) setAuthToken(token);
  }, [token]);

  const setToken = (token) => {
    setAuthToken(token);
    setTokenValue(token);
  };

  const logout = () => setToken(null);

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
