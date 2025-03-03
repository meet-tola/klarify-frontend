"use client";
import { createContext, useContext, useEffect } from "react";
import useUserId from "@/hooks/use-user-id";

// Define the context shape
type AuthContextType = {
    userId: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const userId = useUserId();

  useEffect(() => {});

  return (
    <AuthContext.Provider
      value={{
        userId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useCurrentUserContext must be used within a AuthProvider");
  }
  return context;
};