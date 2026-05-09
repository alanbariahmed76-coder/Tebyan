import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { courses, dashboardStats, recentActivity, monthlyEnrollment } from "@/lib/mock-data";
import { DashboardSidebar } from "@/components/tebyan/DashboardSidebar";
import { Users, BookOpen, DollarSign, TrendingUp, Plus, Search, Edit, Trash2, MoreVertical } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/admin")({
  head: () => ({
    meta: [{ title: "لوحة المشرف — تبيان" }, { name: "description", content: "إدارة منصة تبيان." }],
  }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const { user } = useAuth();
  const nav = useNavigate();
  const [tab, setTab] = useState("نظرة عامة");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && (!user || user.role !== "admin")) {
      const t = setTimeout(() => nav({ to: "/login" }), 0);
      return () => clearTimeout(t);
    }
  }, [user, nav]);

  if (!user || user.role !== "admin") return null;

  const stats = dashboardStats.admin;
  const filtered = courses.filter((c) => c.title.includes(search) || c.instructor.includes(search));
  const maxV = Math.max(...monthlyEnrollment.map((m) => m.v));

  return (
    <div dir="rtl" className="min-h-screen bg-secondary/30 flex">
      <DashboardSidebar role="admin" active={tab} onSelect={setTab} />

      <main className="flex-1 min-w-0">
        <header className="bg-card border-b border-border px-6 lg:px-10 py-5 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl lg:text-2xl font-black text-primary">{tab}</h1>
            <p className="text-xs lg:text-sm text-muted-foreground mt-0.5">إدارة منصة تبيان · {user.name}</p>
          </div>
          <div className="lg:hidden flex gap-2 overflow-x-auto">
            {["نظرة عامة", "إدارة الدورات", "المستخدمون", "الإحصائيات"].map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${tab === t ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>{t}</button>
            ))}
          </div>
        </header>

        <div className="p-6 lg:p-10 space-y-8">
          {tab === "نظرة عامة" && (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { l: "إجمالي المستخدمين", v: stats.totalUsers.toLocaleString("ar-SA"), i: Users, c: "text-primary", b: "bg-primary/10", trend: "+12%" },
                  { l: "الدورات النشطة", v: stats.activeCourses, i: BookOpen, c: "text-emerald-600", b: "bg-emerald-500/10", trend: "+5%" },
                  { l: "الإيرادات الشهرية", v: `${(stats.monthlyRevenue / 1000).toFixed(0)}K ر.س`, i: DollarSign, c: "text-gold", b: "bg-gold/15", trend: "+18%" },
                  { l: "معدل الإكمال", v: `${stats.completionRate}%`, i: TrendingUp, c: "text-violet-600", b: "bg-violet-500/10", trend: "+3%" },
                ].map((s, i) => (
                  <motion.div key={s.l} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-card rounded-2xl p-6 border border-border">
                    <div className="flex items-start justify-between">
                      <div className={`size-11 rounded-xl flex items-center justify-center ${s.b}`}>
                        <s.i className={`size-5 ${s.c}`} />
                      </div>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded-full">{s.trend}</span>
                    </div>
                    <p className="mt-4 text-2xl lg:text-3xl font-black text-primary">{s.v}</p>
                    <p className="text-sm text-muted-foreground mt-1">{s.l}</p>
                  </motion.div>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-card rounded-2xl p-6 border border-border">
                  <h2 className="font-black text-lg text-primary mb-6">التسجيلات الشهرية</h2>
                  <div className="flex items-end gap-3 h-56">
                    {monthlyEnrollment.map((m, i) => (
                      <motion.div
                        key={m.m}
                        initial={{ height: 0 }}
                        animate={{ height: `${(m.v / maxV) * 100}%` }}
                        transition={{ delay: i * 0.08, duration: 0.5 }}
                        className="flex-1 flex flex-col items-center gap-2 group"
                      >
                        <span className="text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition">{m.v}</span>
                        <div className="w-full flex-1 bg-gold-gradient rounded-t-lg" />
                        <span className="text-xs text-muted-foreground">{m.m}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="bg-card rounded-2xl p-6 border border-border">
                  <h2 className="font-black text-lg text-primary mb-5">آخر النشاطات</h2>
                  <div className="space-y-4">
                    {recentActivity.map((a, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="size-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">{a.user.charAt(0)}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm">
                            <span className="font-bold text-primary">{a.user}</span>{" "}
                            <span className="text-muted-foreground">{a.action}</span>{" "}
                            <span className="font-semibold">{a.target}</span>
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {tab === "إدارة الدورات" && (
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="p-5 border-b border-border flex items-center justify-between gap-4 flex-wrap">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ابحث عن دورة أو مدرب..." className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-border bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <button onClick={() => toast.success("فُتح نموذج إضافة دورة جديدة")} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-luxe">
                  <Plus className="size-4" /> دورة جديدة
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-secondary/60 text-right">
                    <tr>
                      <th className="p-4 font-bold text-primary">الدورة</th>
                      <th className="p-4 font-bold text-primary">المدرب</th>
                      <th className="p-4 font-bold text-primary">الفئة</th>
                      <th className="p-4 font-bold text-primary">المتدربون</th>
                      <th className="p-4 font-bold text-primary">السعر</th>
                      <th className="p-4 font-bold text-primary">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((c) => (
                      <tr key={c.title} className="border-t border-border hover:bg-secondary/30">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img src={c.img} alt="" className="size-12 rounded-lg object-cover" />
                            <span className="font-bold text-primary line-clamp-1">{c.title}</span>
                          </div>
                        </td>
                        <td className="p-4 text-muted-foreground">{c.instructor}</td>
                        <td className="p-4"><span className="px-2.5 py-1 rounded-full bg-secondary text-xs font-bold">{c.cat}</span></td>
                        <td className="p-4 text-muted-foreground">{c.students.toLocaleString("ar-SA")}</td>
                        <td className="p-4 font-bold text-gold">{c.price} ر.س</td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            <button onClick={() => toast("فُتح محرر الدورة")} className="size-9 rounded-lg hover:bg-secondary text-primary flex items-center justify-center"><Edit className="size-4" /></button>
                            <button onClick={() => toast.error("تم حذف الدورة")} className="size-9 rounded-lg hover:bg-destructive/10 text-destructive flex items-center justify-center"><Trash2 className="size-4" /></button>
                            <button className="size-9 rounded-lg hover:bg-secondary text-muted-foreground flex items-center justify-center"><MoreVertical className="size-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === "المستخدمون" && (
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="p-5 border-b border-border">
                <h2 className="font-black text-lg text-primary">إدارة المستخدمين</h2>
                <p className="text-sm text-muted-foreground mt-1">{stats.totalUsers.toLocaleString("ar-SA")} مستخدم مسجّل</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-secondary/60 text-right">
                    <tr>
                      <th className="p-4 font-bold text-primary">المستخدم</th>
                      <th className="p-4 font-bold text-primary">الدور</th>
                      <th className="p-4 font-bold text-primary">الباقة</th>
                      <th className="p-4 font-bold text-primary">آخر نشاط</th>
                      <th className="p-4 font-bold text-primary">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentActivity.map((u, i) => (
                      <tr key={i} className="border-t border-border hover:bg-secondary/30">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">{u.user.charAt(0)}</div>
                            <div>
                              <p className="font-bold text-primary">{u.user}</p>
                              <p className="text-xs text-muted-foreground">{u.user.replace(" ", ".").toLowerCase()}@tebyan.sa</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4"><span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">متعلم</span></td>
                        <td className="p-4"><span className="px-2.5 py-1 rounded-full bg-gold/15 text-gold text-xs font-bold">سنوي</span></td>
                        <td className="p-4 text-muted-foreground">{u.time}</td>
                        <td className="p-4">
                          <button onClick={() => toast("فُتح ملف المستخدم")} className="px-3 py-1.5 rounded-lg bg-secondary text-xs font-bold">عرض</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === "الإحصائيات" && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="font-black text-primary">توزيع الدورات حسب الفئة</h3>
                <div className="mt-5 space-y-4">
                  {["الإدارة", "القيادة", "تطوير الذات", "التكنولوجيا"].map((cat, i) => {
                    const count = courses.filter((c) => c.cat === cat).length;
                    const pct = (count / courses.length) * 100;
                    return (
                      <div key={cat}>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="font-bold text-primary">{cat}</span>
                          <span className="text-muted-foreground">{count} دورة</span>
                        </div>
                        <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay: i * 0.1, duration: 0.6 }} className="h-full bg-gold-gradient" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="font-black text-primary">أعلى الدورات تسجيلاً</h3>
                <div className="mt-5 space-y-3">
                  {[...courses].sort((a, b) => b.students - a.students).slice(0, 5).map((c, i) => (
                    <div key={c.title} className="flex items-center gap-3">
                      <span className="size-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-black text-sm">{i + 1}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-primary text-sm line-clamp-1">{c.title}</p>
                        <p className="text-xs text-muted-foreground">{c.students.toLocaleString("ar-SA")} متدرب</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === "الإعدادات" && (
            <div className="bg-card rounded-2xl p-8 border border-border max-w-2xl space-y-6">
              <h2 className="font-black text-lg text-primary">إعدادات المنصة</h2>
              {[
                { l: "اسم المنصة", v: "تبيان" },
                { l: "البريد الرسمي", v: "info@tebyan.sa" },
                { l: "العملة", v: "ريال سعودي (SAR)" },
                { l: "اللغة الافتراضية", v: "العربية" },
              ].map((f) => (
                <div key={f.l}>
                  <label className="text-xs font-semibold text-muted-foreground">{f.l}</label>
                  <input defaultValue={f.v} className="mt-1.5 w-full px-4 py-3 rounded-xl border border-border bg-secondary/40 text-sm" />
                </div>
              ))}
              <button onClick={() => toast.success("تم حفظ الإعدادات")} className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold">حفظ التغييرات</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
