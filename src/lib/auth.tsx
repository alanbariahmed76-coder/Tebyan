import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Role = "student" | "admin";
export type User = { name: string; email: string; role: Role; avatar?: string };

type AuthCtx = {
  user: User | null;
  enrolled: string[];
  favorites: string[];
  login: (email: string, role?: Role) => User;
  logout: () => void;
  enroll: (courseTitle: string) => void;
  toggleFavorite: (courseTitle: string) => void;
  isEnrolled: (courseTitle: string) => boolean;
  isFavorite: (courseTitle: string) => boolean;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [enrolled, setEnrolled] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const u = localStorage.getItem("tebyan:user");
      const e = localStorage.getItem("tebyan:enrolled");
      const f = localStorage.getItem("tebyan:favorites");
      if (u) setUser(JSON.parse(u));
      if (e) setEnrolled(JSON.parse(e));
      if (f) setFavorites(JSON.parse(f));
    } catch {}
  }, []);

  const persist = (key: string, value: unknown) => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  };

  const login = (email: string, role: Role = "student") => {
    const name = email.split("@")[0] || "متعلم";
    const u: User = { name, email, role };
    setUser(u);
    persist("tebyan:user", u);
    return u;
  };

  const logout = () => {
    setUser(null);
    try { localStorage.removeItem("tebyan:user"); } catch {}
  };

  const enroll = (t: string) => {
    setEnrolled((prev) => {
      if (prev.includes(t)) return prev;
      const next = [...prev, t];
      persist("tebyan:enrolled", next);
      return next;
    });
  };

  const toggleFavorite = (t: string) => {
    setFavorites((prev) => {
      const next = prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t];
      persist("tebyan:favorites", next);
      return next;
    });
  };

  return (
    <Ctx.Provider
      value={{
        user, enrolled, favorites, login, logout, enroll, toggleFavorite,
        isEnrolled: (t) => enrolled.includes(t),
        isFavorite: (t) => favorites.includes(t),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
