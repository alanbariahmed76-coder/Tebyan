import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, BookOpen, Award, Heart, User, LogOut, Users, BarChart3, Settings, Home } from "lucide-react";
import logo from "@/assets/tebyan-logo.png";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

type Item = { label: string; to: string; icon: React.ComponentType<{ className?: string }> };

const studentItems: Item[] = [
  { label: "نظرة عامة", to: "/dashboard", icon: LayoutDashboard },
  { label: "دوراتي", to: "/dashboard", icon: BookOpen },
  { label: "الشهادات", to: "/dashboard", icon: Award },
  { label: "المفضلة", to: "/dashboard", icon: Heart },
  { label: "ملفي الشخصي", to: "/dashboard", icon: User },
];

const adminItems: Item[] = [
  { label: "نظرة عامة", to: "/dashboard/admin", icon: LayoutDashboard },
  { label: "إدارة الدورات", to: "/dashboard/admin", icon: BookOpen },
  { label: "المستخدمون", to: "/dashboard/admin", icon: Users },
  { label: "الإحصائيات", to: "/dashboard/admin", icon: BarChart3 },
  { label: "الإعدادات", to: "/dashboard/admin", icon: Settings },
];

export function DashboardSidebar({
  role,
  active,
  onSelect,
}: {
  role: "student" | "admin";
  active: string;
  onSelect: (label: string) => void;
}) {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const items = role === "admin" ? adminItems : studentItems;

  const handleLogout = () => {
    logout();
    toast.success("تم تسجيل الخروج");
    nav({ to: "/" });
  };

  return (
    <aside className="hidden lg:flex flex-col w-72 shrink-0 border-l border-border bg-card h-screen sticky top-0">
      <Link to="/" className="flex items-center gap-2 p-6 border-b border-border">
        <img src={logo} alt="تبيان" className="h-10 w-auto" />
      </Link>

      <div className="px-4 py-3 border-b border-border">
        <p className="text-xs text-muted-foreground">مرحباً</p>
        <p className="font-bold text-primary">{user?.name || "متعلم"}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{role === "admin" ? "حساب مشرف" : "حساب متعلم"}</p>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {items.map((it) => {
          const isActive = active === it.label;
          return (
            <button
              key={it.label}
              onClick={() => onSelect(it.label)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition text-right ${
                isActive ? "bg-primary text-primary-foreground shadow-luxe" : "text-foreground/70 hover:bg-secondary"
              }`}
            >
              <it.icon className="size-4" />
              {it.label}
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border space-y-1">
        <Link to="/" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-foreground/70 hover:bg-secondary">
          <Home className="size-4" /> الموقع الرئيسي
        </Link>
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-destructive hover:bg-destructive/10">
          <LogOut className="size-4" /> تسجيل الخروج
        </button>
      </div>
    </aside>
  );
}
