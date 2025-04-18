import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./AuthContext";
import User from "../../interfaces/User";
import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isGuest, setIsGuest] = useState(false);
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
        const { data } = await axios.post(`${BACKEND_URL}auth/login`, { email, password });
        if (!data?.token) throw new Error("Invalid response from server");
  
        localStorage.setItem("token", data.token);
        const decodedUser = jwtDecode<User>(data.token);
        setUser(decodedUser);
        navigate("/");
      } catch (error) {
        console.error("Login failed", error);
      }
    };
  
    const signup = async (name: string, email: string, password: string) => {
      try {
        const { data } = await axios.post(`${BACKEND_URL}auth/signup`, { name, email, password });
        if (!data?.token) throw new Error("Invalid response from server");
  
        localStorage.setItem("token", data.token);
        const decodedUser = jwtDecode<User>(data.token);
        setUser(decodedUser);
        navigate("/target");
      } catch (error) {
        console.error("Signup failed", error);
      }
    };
  
    const guestLogin = () => {
      const guestUser = {
        id: "guest",
        name: "Guest User",
        email: "guest@example.com",
      };
      localStorage.setItem("token", "guest-token");
      setUser(guestUser);
      setIsGuest(true);
      navigate("/");
    };
  
    const logout = () => {
      localStorage.removeItem("token");
      setUser(null);
      navigate("/login");
    };
  
    return (
      <AuthContext.Provider value={{ user, login, logout, signup, guestLogin, isAuthenticated: !!user, isGuest}}>
        {children}
      </AuthContext.Provider>
    );
  };
  