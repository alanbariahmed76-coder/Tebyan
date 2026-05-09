import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ArrowLeft, Star, Clock, Users, BookOpen, Award, Play, CheckCircle2, Circle, Lock, Heart, ChevronDown, Download, Eye } from "lucide-react";
import { getCourseById, totalLessons, type Course } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth";
import { Navbar } from "@/components/tebyan/Navbar";
import { Footer } from "@/components/tebyan/Footer";
import { downloadCertificatePDF, previewCertificate } from "@/lib/certificate";

export const Route = createFileRoute("/courses/$courseId")({
  loader: ({ params }) => {
    const course = getCourseById(params.courseId);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.course.title} — تبيان` : "دورة — تبيان" },
      { name: "description", content: loaderData?.course.description || "" },
      { property: "og:title", content: loaderData?.course.title || "" },
      { property: "og:image", content: loaderData?.course.img || "" },
    ],
  }),
  notFoundComponent: () => (
    <div dir="rtl" className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-black text-primary">الدورة غير موجودة</h1>
        <Link to="/" className="mt-4 inline-block px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-bold">العودة للرئيسية</Link>
      </div>
    </div>
  ),
  component: CourseDetail,
});

function CourseDetail() {
  const { course } = Route.useLoaderData() as { course: Course };
  const { user, isEnrolled, isFavorite, enroll, toggleFavorite, toggleLesson, getCompleted } = useAuth();
  const nav = useNavigate();
  const enrolled = isEnrolled(course.id);
  const completed = getCompleted(course.id);
  const total = totalLessons(course);
  const progress = total ? Math.round((completed.length / total) * 100) : 0;

  const allLessons = useMemo(() => course.modules.flatMap((m) => m.lessons), [course]);
  const nextLesson = allLessons.find((l) => !completed.includes(l.id));
  const [activeLesson, setActiveLesson] = useState<string | null>(null);

  const handleEnroll = () => {
    if (!user) {
      toast("سجّل الدخول للالتحاق بالدورة", { action: { label: "تسجيل", onClick: () => nav({ to: "/login" }) } });
      return;
    }
    if (!enrolled) {
      enroll(course.id);
      toast.success("تم التسجيل بنجاح! ابدأ التعلم 🎓");
    }
    setActiveLesson(nextLesson?.id || allLessons[0]?.id);
  };

  const playLesson = (lessonId: string, locked: boolean) => {
    if (locked) {
      toast("سجّل في الدورة لمشاهدة هذا الدرس");
      return;
    }
    setActiveLesson(lessonId);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const markComplete = (lessonId: string) => {
    if (!enrolled) {
      toast("سجّل في الدورة أولاً");
      return;
    }
    toggleLesson(course.id, lessonId);
    if (!completed.includes(lessonId)) toast.success("أحسنت! تم إكمال الدرس");
  };

  const currentLesson = activeLesson ? allLessons.find((l) => l.id === activeLesson) : null;

  return (
    <div dir="rtl" className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-hero text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-gold">
              <ArrowLeft className="size-4" /> العودة للدورات
            </Link>
            <span className="mt-4 inline-block px-3 py-1 rounded-full bg-gold/15 text-gold text-xs font-bold border border-gold/30">{course.cat}</span>
            <h1 className="mt-3 text-3xl md:text-5xl font-black leading-tight">{course.title}</h1>
            <p className="mt-4 text-lg text-primary-foreground/75 max-w-2xl">{course.description}</p>

            <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-primary-foreground/80">
              <span className="flex items-center gap-1.5"><Star className="size-4 fill-gold text-gold" /> <strong className="text-gold">{course.rating}</strong></span>
              <span className="flex items-center gap-1.5"><Users className="size-4" /> {course.students.toLocaleString("ar-SA")} متدرب</span>
              <span className="flex items-center gap-1.5"><Clock className="size-4" /> {course.duration}</span>
              <span className="flex items-center gap-1.5"><BookOpen className="size-4" /> {total} درس</span>
              <span className="px-2.5 py-1 rounded-full bg-white/10 text-xs font-bold">{course.level}</span>
            </div>

            <p className="mt-6 text-sm text-primary-foreground/70">المدرب: <span className="font-bold text-white">{course.instructor}</span></p>
          </div>

          {/* Player / Sidebar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:row-span-2">
            <div className="bg-card text-foreground rounded-2xl overflow-hidden shadow-luxe border border-border sticky top-24">
              <div className="relative aspect-video bg-primary">
                <img src={course.img} alt={course.title} className="w-full h-full object-cover opacity-60" />
                <button onClick={handleEnroll} className="absolute inset-0 m-auto size-20 rounded-full bg-gold-gradient text-gold-foreground flex items-center justify-center shadow-gold hover:scale-110 transition">
                  <Play className="size-8 fill-current ms-1" />
                </button>
                {currentLesson && (
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="text-xs text-white/70">يُشغَّل الآن</p>
                    <p className="text-sm font-bold text-white line-clamp-1">{currentLesson.title}</p>
                  </div>
                )}
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-black text-primary">{course.price} <span className="text-sm text-muted-foreground font-normal">ر.س</span></span>
                  {enrolled && <span className="text-xs font-bold text-emerald-700 bg-emerald-500/15 px-3 py-1 rounded-full">✓ مُسجَّل</span>}
                </div>

                {enrolled && (
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-muted-foreground">تقدّمك</span>
                      <span className="font-bold text-primary">{progress}% ({completed.length}/{total})</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className="h-full bg-gold-gradient" />
                    </div>
                  </div>
                )}

                <button onClick={handleEnroll} className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-bold shadow-luxe hover:opacity-95 transition">
                  {!enrolled ? "سجّل الآن وابدأ التعلم" : nextLesson ? "متابعة التعلم" : "مراجعة الدورة"}
                </button>

                {enrolled && progress === 100 && (
                  <div className="rounded-xl border border-gold/40 bg-gold/10 p-4 space-y-3">
                    <div className="flex items-center gap-2 text-gold">
                      <Award className="size-5" />
                      <span className="font-black text-sm">تهانينا! أكملت الدورة 🎉</span>
                    </div>
                    <p className="text-xs text-muted-foreground">شهادتك جاهزة. يمكنك معاينتها أو تنزيلها بصيغة PDF.</p>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => previewCertificate({ studentName: user?.name || "متدرّب تبيان", courseTitle: course.title, instructor: course.instructor })}
                        className="py-2.5 rounded-lg bg-secondary text-foreground text-sm font-bold hover:bg-secondary/80 transition flex items-center justify-center gap-1.5"
                      >
                        <Eye className="size-4" /> معاينة
                      </button>
                      <button
                        onClick={() => { downloadCertificatePDF({ studentName: user?.name || "متدرّب تبيان", courseTitle: course.title, instructor: course.instructor }); toast.success("تم تنزيل الشهادة"); }}
                        className="py-2.5 rounded-lg bg-gold-gradient text-gold-foreground text-sm font-black shadow-gold hover:scale-[1.02] transition flex items-center justify-center gap-1.5"
                      >
                        <Download className="size-4" /> تنزيل PDF
                      </button>
                    </div>
                  </div>
                )}
                  <Heart className={`size-4 ${isFavorite(course.id) ? "fill-destructive text-destructive" : ""}`} />
                  {isFavorite(course.id) ? "في المفضلة" : "أضف للمفضلة"}
                </button>

                <ul className="text-xs text-muted-foreground space-y-2 pt-3 border-t border-border">
                  <li>✓ وصول مدى الحياة</li>
                  <li>✓ شهادة إتمام معتمدة</li>
                  <li>✓ مشاهدة على جميع الأجهزة</li>
                  <li>✓ ضمان استرداد خلال 30 يوماً</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4 mt-2">
            {course.outcomes.map((o) => (
              <div key={o} className="flex items-start gap-3 bg-white/5 rounded-xl p-4 border border-white/10">
                <CheckCircle2 className="size-5 text-gold shrink-0 mt-0.5" />
                <span className="text-sm text-primary-foreground/90">{o}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum + Instructor */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-primary">منهج الدورة</h2>
              <p className="mt-2 text-muted-foreground">{course.modules.length} وحدات · {total} درس · {course.duration}</p>
              <div className="mt-6 space-y-3">
                {course.modules.map((m, mi) => (
                  <ModuleAccordion
                    key={mi}
                    module={m}
                    moduleIndex={mi}
                    enrolled={enrolled}
                    completed={completed}
                    activeLesson={activeLesson}
                    onPlay={playLesson}
                    onToggle={markComplete}
                  />
                ))}
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border">
              <h2 className="text-xl font-black text-primary">عن المدرب</h2>
              <div className="mt-4 flex items-start gap-4">
                <div className="size-16 rounded-full bg-gold-gradient flex items-center justify-center text-2xl font-black text-gold-foreground shrink-0">
                  {course.instructor.replace("د. ", "").replace("م. ", "").charAt(0)}
                </div>
                <div>
                  <h3 className="font-black text-primary">{course.instructor}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{course.instructorBio}</p>
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h3 className="font-black text-primary flex items-center gap-2"><Award className="size-5 text-gold" /> ماذا ستحصل عليه؟</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-center gap-2"><CheckCircle2 className="size-4 text-emerald-600" /> {total} درس فيديو HD</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="size-4 text-emerald-600" /> ملفات وموارد قابلة للتحميل</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="size-4 text-emerald-600" /> شهادة إتمام احترافية</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="size-4 text-emerald-600" /> دعم مباشر من المدرب</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="size-4 text-emerald-600" /> مجتمع المتعلمين</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ModuleAccordion({
  module: m, moduleIndex, enrolled, completed, activeLesson, onPlay, onToggle,
}: {
  module: { title: string; lessons: { id: string; title: string; duration: string; preview?: boolean }[] };
  moduleIndex: number;
  enrolled: boolean;
  completed: string[];
  activeLesson: string | null;
  onPlay: (id: string, locked: boolean) => void;
  onToggle: (id: string) => void;
}) {
  const [open, setOpen] = useState(moduleIndex === 0);
  const moduleCompleted = m.lessons.filter((l) => completed.includes(l.id)).length;
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full p-5 flex items-center justify-between hover:bg-secondary/50 transition text-right">
        <div className="flex items-center gap-3">
          <span className="size-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-black text-sm">{moduleIndex + 1}</span>
          <div>
            <h3 className="font-bold text-primary">{m.title}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{m.lessons.length} دروس · {moduleCompleted}/{m.lessons.length} مكتمل</p>
          </div>
        </div>
        <ChevronDown className={`size-5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul className="border-t border-border divide-y divide-border">
          {m.lessons.map((l) => {
            const done = completed.includes(l.id);
            const locked = !enrolled && !l.preview;
            const active = activeLesson === l.id;
            return (
              <li key={l.id} className={`flex items-center gap-3 p-4 transition ${active ? "bg-primary/5" : "hover:bg-secondary/40"}`}>
                <button onClick={() => onToggle(l.id)} disabled={!enrolled} className="shrink-0 disabled:opacity-50">
                  {done ? <CheckCircle2 className="size-5 text-emerald-600 fill-emerald-500/20" /> : <Circle className="size-5 text-muted-foreground" />}
                </button>
                <button onClick={() => onPlay(l.id, locked)} className="flex-1 text-right flex items-center gap-2 min-w-0">
                  <span className={`text-sm flex-1 line-clamp-1 ${done ? "line-through text-muted-foreground" : "text-foreground"}`}>{l.title}</span>
                  {l.preview && !enrolled && <span className="text-[10px] font-bold text-emerald-700 bg-emerald-500/15 px-2 py-0.5 rounded-full shrink-0">معاينة</span>}
                </button>
                <span className="text-xs text-muted-foreground shrink-0 tabular-nums">{l.duration}</span>
                {locked ? <Lock className="size-4 text-muted-foreground shrink-0" /> : <Play className="size-4 text-primary shrink-0 fill-current" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
