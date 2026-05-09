import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/tebyan-logo.png";

const links = [
  { label: "الرئيسية", href: "#home" },
  { label: "المساقات", href: "#courses" },
  { label: "المدربون", href: "#instructors" },
  { label: "الأسعار", href: "#pricing" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
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
          <button className="px-5 py-2.5 rounded-full text-sm font-semibold border border-primary/30 text-primary hover:bg-primary/5 transition">
            تسجيل الدخول
          </button>
          <button className="px-6 py-2.5 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 shadow-luxe transition">
            اشترك الآن
          </button>
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="القائمة">
          <Menu className="size-6" />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium">{l.label}</a>
          ))}
          <button className="px-5 py-2.5 rounded-full text-sm font-semibold border border-primary/30 text-primary">تسجيل الدخول</button>
          <button className="px-6 py-2.5 rounded-full text-sm font-semibold bg-primary text-primary-foreground">اشترك الآن</button>
        </div>
      )}
    </motion.header>
  );
}
