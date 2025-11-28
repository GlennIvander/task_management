import React, { createContext, useState } from "react";
import API from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = async (email, password) => {
    const res = await API.post("/login", { email, password });
    const newToken = res.data.token;

    setToken(newToken);
    localStorage.setItem("token", newToken);

    API.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
    return res.data;
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    delete API.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
