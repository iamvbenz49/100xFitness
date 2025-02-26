import { createContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import AuthContextType from "../interface/AuthContextType";
import User from "../interface/User";


const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = jwtDecode<User>(token);
        setUser(decodedUser);
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {

      const response = await axios.post(`${BACKEND_URL}auth/login`, {
        email,
        password,
      }, {
        headers: { "Content-Type": "application/json" }
      });

      const { data } = response;
      if (!response.data || !response.data.token) {
        throw new Error("Invalid response from server");
      }
      console.log(email, password, data.token);
      localStorage.setItem("token", data.token);
      const decodedUser = jwtDecode<User>(data.token);
      setUser(decodedUser);
      // navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  const signup = async (name: string, email: string, password: string) => {
    try {

      const response = await axios.post(`${BACKEND_URL}auth/signup`, {
        name,
        email,
        password,
      }, {
        headers: { "Content-Type": "application/json" }
      });

      const { data } = response;
      if (!response.data || !response.data.token) {
        throw new Error("Invalid response from server");
      }
      console.log(email, password, data.token);
      localStorage.setItem("token", data.token);
      const decodedUser = jwtDecode<User>(data.token);
      setUser(decodedUser);
      // navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
