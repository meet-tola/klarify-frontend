"use client";
import { useState, useEffect, createContext, useContext } from "react";
import { CurrentUserResponseType } from "@/types/api.type";
import { getCurrentUser } from "@/lib/api";

type AuthContextType = {
  user: CurrentUserResponseType | null;
  setUser: React.Dispatch<React.SetStateAction<CurrentUserResponseType | null>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<CurrentUserResponseType | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data ?? null);
      } catch (error) {
        console.log("Failed to fetch user data:", error);
        setUser(null);
      }
    };

    fetchUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
