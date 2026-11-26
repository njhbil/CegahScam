import { createContext, useContext, useState } from "react";

type AuthContextType = {
  IsLoggedIn: boolean;
  username: string | null;
  avatar: string;
  login: (username: string) => void;
  logout: () => void;
  setAvatar: (id: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [IsLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("IsLoggedIn") === "true";
  });

  const [username, setUsername] = useState<string | null>(() => {
    return localStorage.getItem("username");
  });

  const [avatar, setAvatarState] = useState(() => {
    return localStorage.getItem("avatar") ?? "jempol";
  });

  const login = (username: string) => {
    localStorage.setItem("IsLoggedIn", "true");
    localStorage.setItem("username", username);

    setIsLoggedIn(true);
    setUsername(username);
  };

  const logout = () => {
    localStorage.removeItem("IsLoggedIn");
    localStorage.removeItem("username");

    setIsLoggedIn(false);
    setUsername(null);
  };

  const setAvatar = (id: string) => {
    localStorage.setItem("avatar", id);
    setAvatarState(id);
  };

  return (
    <AuthContext.Provider
      value={{ IsLoggedIn, username, avatar, login, logout, setAvatar }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth harus digunakan di dalam AuthProvider");
  }

  return context;
}
