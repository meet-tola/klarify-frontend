"use client";
import { useState, useEffect, createContext, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CurrentUserResponseType } from "@/types/api.type";
import { getCurrentUser } from "@/lib/api";

type AuthContextType = {
  user: CurrentUserResponseType | null;
  loading: boolean; 
  setUser: React.Dispatch<React.SetStateAction<CurrentUserResponseType | null>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<CurrentUserResponseType | null>(null);
  const [loading, setLoading] = useState(true); 
  const router = useRouter();
  const pathname = usePathname();


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data ?? null);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false); 
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (!loading && !user && pathname !== "/") {
      router.push("/login");
    }
  }, [user, loading, pathname, router]);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
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