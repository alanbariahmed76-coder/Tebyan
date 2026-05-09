import { motion } from "framer-motion";
import { Menu, LayoutDashboard, LogOut, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import logo from "@/assets/tebyan-logo.png";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

const links = [
  { label: "الرئيسية", href: "#home" },
  { label: "الدورات", href: "#courses" },
  { label: "المدربون", href: "#instructors" },
  { label: "الأسعار", href: "#pricing" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("تم تسجيل الخروج");
  };

  const dashHref = user?.role === "admin" ? "/dashboard/admin" : "/dashboard";

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/60"
    >
      <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <img src={logo} alt="تبيان" className="h-12 w-auto" />
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link to={dashHref} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border border-primary/30 text-primary hover:bg-primary/5 transition">
                <LayoutDashboard className="size-4" /> لوحة التحكم
              </Link>
              <button onClick={handleLogout} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 shadow-luxe transition">
                <LogOut className="size-4" /> خروج
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-5 py-2.5 rounded-full text-sm font-semibold border border-primary/30 text-primary hover:bg-primary/5 transition">
                تسجيل الدخول
              </Link>
              <button onClick={() => nav({ to: "/login" })} className="px-6 py-2.5 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 shadow-luxe transition">
                اشترك الآن
              </button>
            </>
          )}
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="القائمة">
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a key={l.href} onClick={() => setOpen(false)} href={l.href} className="text-sm font-medium">{l.label}</a>
          ))}
          {user ? (
            <>
              <Link to={dashHref} onClick={() => setOpen(false)} className="px-5 py-2.5 rounded-full text-sm font-semibold border border-primary/30 text-primary text-center">لوحة التحكم</Link>
              <button onClick={() => { handleLogout(); setOpen(false); }} className="px-6 py-2.5 rounded-full text-sm font-semibold bg-primary text-primary-foreground">تسجيل الخروج</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)} className="px-5 py-2.5 rounded-full text-sm font-semibold border border-primary/30 text-primary text-center">تسجيل الدخول</Link>
              <Link to="/login" onClick={() => setOpen(false)} className="px-6 py-2.5 rounded-full text-sm font-semibold bg-primary text-primary-foreground text-center">اشترك الآن</Link>
            </>
          )}
        </div>
      )}
    </motion.header>
  );
}
