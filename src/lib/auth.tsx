import { createContext, useContext, useEffect, useState, ReactNode, useMemo } from "react";

export type Role = "student" | "admin";
export type User = { name: string; email: string; role: Role; avatar?: string };

type Progress = Record<string, string[]>; // courseId -> completed lesson ids

type AuthCtx = {
  user: User | null;
  enrolled: string[];
  favorites: string[];
  progress: Progress;
  login: (email: string, role?: Role) => User;
  logout: () => void;
  enroll: (courseId: string) => void;
  toggleFavorite: (courseId: string) => void;
  toggleLesson: (courseId: string, lessonId: string) => void;
  isEnrolled: (courseId: string) => boolean;
  isFavorite: (courseId: string) => boolean;
  getCompleted: (courseId: string) => string[];
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [enrolled, setEnrolled] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [progress, setProgress] = useState<Progress>({});

  useEffect(() => {
    try {
      const u = localStorage.getItem("tebyan:user");
      const e = localStorage.getItem("tebyan:enrolled");
      const f = localStorage.getItem("tebyan:favorites");
      const p = localStorage.getItem("tebyan:progress");
      if (u) setUser(JSON.parse(u));
      if (e) setEnrolled(JSON.parse(e));
      if (f) setFavorites(JSON.parse(f));
      if (p) setProgress(JSON.parse(p));
    } catch {}
  }, []);

  const persist = (key: string, value: unknown) => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  };

  const value = useMemo<AuthCtx>(() => ({
    user, enrolled, favorites, progress,
    login: (email, role = "student") => {
      const name = email.split("@")[0] || "متعلم";
      const u: User = { name, email, role };
      setUser(u);
      persist("tebyan:user", u);
      return u;
    },
    logout: () => {
      setUser(null);
      try { localStorage.removeItem("tebyan:user"); } catch {}
    },
    enroll: (id) => {
      setEnrolled((prev) => {
        if (prev.includes(id)) return prev;
        const next = [...prev, id];
        persist("tebyan:enrolled", next);
        return next;
      });
    },
    toggleFavorite: (id) => {
      setFavorites((prev) => {
        const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
        persist("tebyan:favorites", next);
        return next;
      });
    },
    toggleLesson: (courseId, lessonId) => {
      setProgress((prev) => {
        const cur = prev[courseId] || [];
        const next = {
          ...prev,
          [courseId]: cur.includes(lessonId) ? cur.filter((l) => l !== lessonId) : [...cur, lessonId],
        };
        persist("tebyan:progress", next);
        return next;
      });
    },
    isEnrolled: (id) => enrolled.includes(id),
    isFavorite: (id) => favorites.includes(id),
    getCompleted: (id) => progress[id] || [],
  }), [user, enrolled, favorites, progress]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
