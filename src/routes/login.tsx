import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth, Role } from "@/lib/auth";
import { ArrowLeft, ShieldCheck, GraduationCap } from "lucide-react";
import logo from "@/assets/tebyan-logo.png";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "تسجيل الدخول — تبيان" },
      { name: "description", content: "ادخل إلى حسابك في منصة تبيان للتعلم الاحترافي." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("student");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("الرجاء إدخال البريد وكلمة المرور");
      return;
    }
    login(email, role);
    toast.success(`أهلاً بك، تم تسجيل الدخول بنجاح`);
    nav({ to: role === "admin" ? "/dashboard/admin" : "/dashboard" });
  };

  return (
    <div dir="rtl" className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="hidden lg:flex relative bg-hero text-primary-foreground p-12 flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:32px_32px]" />
        <Link to="/" className="relative flex items-center gap-3">
          <img src={logo} alt="تبيان" className="h-12 w-auto brightness-0 invert" />
        </Link>
        <div className="relative">
          <h2 className="text-4xl font-black leading-tight">
            تعلّم بلا حدود.<br />
            <span className="bg-gold-gradient bg-clip-text text-transparent">طوّر مسيرتك المهنية.</span>
          </h2>
          <p className="mt-4 text-primary-foreground/70 max-w-md">
            انضم لأكثر من 50,000 متدرب يستثمرون في أنفسهم يومياً مع نخبة من خبراء العالم العربي.
          </p>
        </div>
        <p className="relative text-xs text-primary-foreground/50">© 2026 تبيان. جميع الحقوق محفوظة.</p>
      </div>

      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="size-4" /> العودة للرئيسية
          </Link>
          <h1 className="text-3xl font-black text-primary">مرحباً بعودتك</h1>
          <p className="mt-2 text-muted-foreground">سجّل دخولك لمتابعة رحلتك التعليمية.</p>

          <div className="mt-6 grid grid-cols-2 gap-2 p-1 bg-secondary rounded-xl">
            <button
              type="button"
              onClick={() => setRole("student")}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition ${role === "student" ? "bg-primary text-primary-foreground shadow-luxe" : "text-muted-foreground"}`}
            >
              <GraduationCap className="size-4" /> طالب
            </button>
            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition ${role === "admin" ? "bg-primary text-primary-foreground shadow-luxe" : "text-muted-foreground"}`}
            >
              <ShieldCheck className="size-4" /> مشرف
            </button>
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-semibold text-foreground/80">البريد الإلكتروني</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-2 w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-foreground/80">كلمة المرور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-2 w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <button type="submit" className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-bold shadow-luxe hover:opacity-95 transition">
              تسجيل الدخول
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            ليس لديك حساب؟{" "}
            <button
              onClick={() => { login(email || "demo@tebyan.sa", role); toast.success("تم إنشاء حسابك التجريبي"); nav({ to: role === "admin" ? "/dashboard/admin" : "/dashboard" }); }}
              className="text-primary font-bold hover:underline"
            >
              أنشئ حساباً تجريبياً
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
