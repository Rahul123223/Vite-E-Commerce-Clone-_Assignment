import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextProps {
  user: string | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Try to fetch token and user info from localStorage on app load
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }
  }, []);

  const login = async (username: string, password: string) => {
    const response = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (data.token) {
      setToken(data.token);
      setUser(username);
      localStorage.setItem("token", data.token); // Store token in localStorage
      localStorage.setItem("user", username); // Store username
    } else {
      throw new Error("Invalid login credentials");
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token"); // Remove token from localStorage
    localStorage.removeItem("user"); // Remove username from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
