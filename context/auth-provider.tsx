"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect, createContext, useContext } from "react";
import { CurrentUserResponseType } from "@/types/api.type";

type AuthContextType = {
  user: CurrentUserResponseType | null;
  setUser: React.Dispatch<React.SetStateAction<CurrentUserResponseType | null>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<CurrentUserResponseType | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const publicRoutes = ["/signup", "/login"];

    if (!pathname || publicRoutes.includes(pathname)) {
      // Skip fetching user on public pages
      return;
    }

    const fetchUserData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/current`, {
          credentials: "include",
        });

        if (!res.ok) {
          if (res.status === 401) {
            console.warn("Unauthorized - no current user session.");
            setUser(null); // Optional reset
            return;
          }
          throw new Error("Failed to fetch user");
        }

        const data = await res.json();
        setUser(data.user); // Ensure this matches your backend structure
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setUser(null);
      }
    };

    fetchUserData();
  }, [pathname]);

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
