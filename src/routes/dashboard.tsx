import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { courses, dashboardStats, totalLessons, type Course } from "@/lib/mock-data";
import { DashboardSidebar } from "@/components/tebyan/DashboardSidebar";
import { BookOpen, Award, Clock, TrendingUp, Play, CheckCircle2, Heart, Star, Search } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [{ title: "لوحة التحكم — تبيان" }, { name: "description", content: "تابع تقدمك ودوراتك في منصة تبيان." }],
  }),
  component: StudentDashboard,
});

function StudentDashboard() {
  const { user, enrolled, favorites, toggleFavorite, getCompleted } = useAuth();
  const nav = useNavigate();
  const [tab, setTab] = useState("نظرة عامة");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && !user) {
      const t = setTimeout(() => nav({ to: "/login" }), 0);
      return () => clearTimeout(t);
    }
  }, [user, nav]);

  if (!user) return null;

  const enrolledCourses = courses.filter((c) => enrolled.includes(c.id));
  const favoriteCourses = courses.filter((c) => favorites.includes(c.id));
  const filtered = enrolledCourses.filter((c) => c.title.includes(search));
  const stats = dashboardStats.student;
  const progressOf = (c: Course) => {
    const done = getCompleted(c.id).length;
    const total = totalLessons(c);
    return total ? Math.round((done / total) * 100) : 0;
  };
  const completedCount = enrolledCourses.filter((c) => progressOf(c) === 100).length;

  return (
    <div dir="rtl" className="min-h-screen bg-secondary/30 flex">
      <DashboardSidebar role="student" active={tab} onSelect={setTab} />

      <main className="flex-1 min-w-0">
        <header className="bg-card border-b border-border px-6 lg:px-10 py-5 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl lg:text-2xl font-black text-primary">{tab}</h1>
            <p className="text-xs lg:text-sm text-muted-foreground mt-0.5">أهلاً {user.name}، استمر في التعلم 🎓</p>
          </div>
          <div className="lg:hidden flex gap-2 overflow-x-auto">
            {["نظرة عامة", "دوراتي", "الشهادات", "المفضلة"].map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${tab === t ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>{t}</button>
            ))}
          </div>
        </header>

        <div className="p-6 lg:p-10 space-y-8">
          {tab === "نظرة عامة" && (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { label: "دورات نشطة", value: enrolledCourses.length, icon: BookOpen, color: "text-primary", bg: "bg-primary/10" },
                  { label: "دورات مكتملة", value: completedCount, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-500/10" },
                  { label: "شهادات", value: completedCount, icon: Award, color: "text-gold", bg: "bg-gold/15" },
                  { label: "ساعات تعلم", value: stats.learningHours, icon: Clock, color: "text-violet-600", bg: "bg-violet-500/10" },
                ].map((s, i) => (
                  <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-card rounded-2xl p-6 border border-border">
                    <div className={`size-11 rounded-xl flex items-center justify-center ${s.bg}`}>
                      <s.icon className={`size-5 ${s.color}`} />
                    </div>
                    <p className="mt-4 text-3xl font-black text-primary">{s.value}</p>
                    <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
                  </motion.div>
                ))}
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-black text-lg text-primary">تابع التعلم</h2>
                  <button onClick={() => setTab("دوراتي")} className="text-xs font-bold text-primary hover:underline">عرض الكل</button>
                </div>
                {enrolledCourses.length === 0 ? (
                  <EmptyState onBrowse={() => nav({ to: "/" })} />
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {enrolledCourses.slice(0, 3).map((c) => (
                      <ProgressCard key={c.id} c={c} progress={progressOf(c)} onContinue={() => nav({ to: "/courses/$courseId", params: { courseId: c.id } })} />
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {tab === "دوراتي" && (
            <div className="space-y-5">
              <div className="relative max-w-md">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ابحث في دوراتك..." className="w-full pr-10 pl-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              {filtered.length === 0 ? (
                <EmptyState onBrowse={() => nav({ to: "/" })} />
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filtered.map((c) => (
                    <ProgressCard key={c.id} c={c} progress={progressOf(c)} onContinue={() => nav({ to: "/courses/$courseId", params: { courseId: c.id } })} />
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === "الشهادات" && (
            <div className="grid md:grid-cols-2 gap-5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="bg-card rounded-2xl border border-border p-6 flex items-center gap-5">
                  <div className="size-16 rounded-xl bg-gold-gradient flex items-center justify-center shrink-0">
                    <Award className="size-8 text-gold-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-primary">شهادة إتمام {courses[i - 1]?.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">صدرت في 15 رمضان 1447</p>
                  </div>
                  <button onClick={() => toast.success("جاري تحميل الشهادة...")} className="px-4 py-2 rounded-full text-xs font-bold bg-primary text-primary-foreground">تحميل</button>
                </div>
              ))}
            </div>
          )}

          {tab === "المفضلة" && (
            favoriteCourses.length === 0 ? (
              <div className="bg-card rounded-2xl p-12 text-center border border-border">
                <Heart className="size-12 text-muted-foreground mx-auto" />
                <p className="mt-4 font-bold text-primary">لا توجد دورات في المفضلة</p>
                <Link to="/" className="inline-block mt-4 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-bold">تصفح الدورات</Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {favoriteCourses.map((c) => (
                  <article key={c.id} className="bg-card rounded-2xl overflow-hidden border border-border">
                    <Link to="/courses/$courseId" params={{ courseId: c.id }}>
                      <img src={c.img} alt={c.title} className="aspect-video w-full object-cover" />
                    </Link>
                    <div className="p-5">
                      <h3 className="font-bold text-primary line-clamp-2 min-h-[3rem]">{c.title}</h3>
                      <div className="mt-3 flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1 text-gold font-bold"><Star className="size-4 fill-current" /> {c.rating}</span>
                        <button onClick={() => { toggleFavorite(c.id); toast("أُزيلت من المفضلة"); }} className="text-destructive">
                          <Heart className="size-5 fill-current" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )
          )}

          {tab === "ملفي الشخصي" && (
            <div className="bg-card rounded-2xl p-8 border border-border max-w-2xl">
              <div className="flex items-center gap-5">
                <div className="size-20 rounded-full bg-gold-gradient flex items-center justify-center text-2xl font-black text-gold-foreground">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-primary">{user.name}</h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div className="mt-8 grid sm:grid-cols-2 gap-5">
                {[
                  { l: "الاسم الكامل", v: user.name },
                  { l: "البريد الإلكتروني", v: user.email },
                  { l: "نوع الحساب", v: "متعلم" },
                  { l: "الباقة", v: "الاشتراك السنوي" },
                ].map((f) => (
                  <div key={f.l}>
                    <label className="text-xs font-semibold text-muted-foreground">{f.l}</label>
                    <p className="mt-1 font-bold text-primary">{f.v}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => toast.success("تم حفظ التعديلات")} className="mt-8 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold">حفظ التعديلات</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function ProgressCard({ c, progress, onContinue }: { c: Course; progress: number; onContinue: () => void }) {
  const completed = progress === 100;
  return (
    <article className="bg-secondary/40 rounded-2xl overflow-hidden border border-border group flex flex-col">
      <button onClick={onContinue} className="relative aspect-video block">
        <img src={c.img} alt={c.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition flex items-center justify-center">
          <span className="size-14 rounded-full bg-gold-gradient text-gold-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-gold">
            <Play className="size-5 fill-current" />
          </span>
        </div>
      </button>
      <div className="p-5 flex-1 flex flex-col">
        <p className="text-xs text-muted-foreground">{c.instructor}</p>
        <h3 className="mt-1 font-bold text-primary line-clamp-2 min-h-[3rem]">{c.title}</h3>
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-muted-foreground">{completed ? "مكتملة 🎉" : "التقدم"}</span>
            <span className="font-bold text-primary">{progress}%</span>
          </div>
          <div className="h-2 bg-border rounded-full overflow-hidden">
            <div className={`h-full transition-all ${completed ? "bg-emerald-500" : "bg-gold-gradient"}`} style={{ width: `${progress}%` }} />
          </div>
        </div>
        <button onClick={onContinue} className={`mt-5 w-full py-2.5 rounded-full text-sm font-bold transition ${completed ? "bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/25" : "bg-primary text-primary-foreground hover:opacity-90"}`}>
          {progress === 0 ? "ابدأ التعلم" : completed ? "مراجعة" : "متابعة"}
        </button>
      </div>
    </article>
  );
}

function EmptyState({ onBrowse }: { onBrowse: () => void }) {
  return (
    <div className="text-center py-12">
      <TrendingUp className="size-12 text-muted-foreground mx-auto" />
      <p className="mt-4 font-bold text-primary">لم تسجّل في أي دورة بعد</p>
      <p className="text-sm text-muted-foreground mt-1">ابدأ رحلتك التعليمية اليوم</p>
      <button onClick={onBrowse} className="mt-5 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-bold">تصفح الدورات</button>
    </div>
  );
}
