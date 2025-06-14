// AuthContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { instance } from "~/api/api.config";
import {
  AuthService,
  type AuthInterface,
  type UserPayload,
} from "~/api/api.auth";

export interface AuthContextInterface {
  user: UserPayload | null;
  loading: boolean;
  login: (res: UserPayload) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextInterface | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserPayload | null>(null);
  const [loading, setLoading] = useState(false);

  // Check login status on load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // if (user === null) {
        //   const res = await AuthService.checkAuth();
        //   console.log(res);
        //   setUser(res);
        // }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Login function
  const login = async (res: UserPayload) => {
    setUser(res);
  };

  // Logout function
  const logout = async () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
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
