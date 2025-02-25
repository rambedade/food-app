import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser({ loggedIn: true });
    }
  }, []);

  // ✅ Login Function (No Navigation Here)
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
      setUser({ loggedIn: true });
      return true; // ✅ Return success flag
    } catch (err) {
      console.error("Login failed:", err.response?.data?.message || err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Register Function (No Navigation Here)
  const register = async (name, email, password) => {
    setLoading(true);
    try {
      await axios.post(`${BASE_URL}/api/auth/register`, { name, email, password });
      return true; // ✅ Return success flag
    } catch (err) {
      console.error("Registration failed:", err.response?.data?.message || err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout Function
  const logout = () => {
    localStorage.removeItem("token");
    axios.defaults.headers.common["Authorization"] = "";
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
