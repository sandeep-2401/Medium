import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  token: string | null;
  isAuthenticated: boolean;
  setToken: (token: string | null) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setTokenState(storedToken);
    }
    setLoading(false);
  }, []);

  const setToken = (token: string | null) => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
    setTokenState(token);
  };

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
