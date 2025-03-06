"use client";
import { createContext, useContext, useState, useEffect } from "react";
import API from "@/lib/axios-client";
import { CurrentUserResponseType } from "@/types/api.type";

// Define the context shape
type AuthContextType = {
  user: CurrentUserResponseType | null;
  setUser: React.Dispatch<React.SetStateAction<CurrentUserResponseType | null>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<CurrentUserResponseType | null>(null);

  useEffect(() => {
    // Fetch current user on mount
    const fetchUserData = async () => {
      try {
        const response = await API.get("/user/current");
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user data", error);
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

// Custom hook to use AuthContext
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
