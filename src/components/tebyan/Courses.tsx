import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Clock, Play, Heart, Users, ChevronRight, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { courses, categories, type Course } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth";
import { useNavigate, Link } from "@tanstack/react-router";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function Courses() {
  const [active, setActive] = useState("الكل");
  const [visible, setVisible] = useState(8);
  const { user, isEnrolled, isFavorite, toggleFavorite } = useAuth();
  const nav = useNavigate();

  const filtered = active === "الكل" ? courses : courses.filter((c) => c.cat === active);
  const shown = filtered.slice(0, visible);

  const goDetail = (id: string) => nav({ to: "/courses/$courseId", params: { courseId: id } });

  const handleFavorite = (id: string) => {
    if (!user) {
      toast("سجّل الدخول لإضافة الدورة للمفضلة");
      return;
    }
    toggleFavorite(id);
    toast(isFavorite(id) ? "أُزيلت من المفضلة" : "أُضيفت للمفضلة");
  };

  return (
    <section id="courses" className="py-24 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-gold text-sm font-bold">الأكثر رواجاً</span>
            <h2 className="mt-2 text-4xl md:text-5xl font-black text-primary">دورات مختارة بعناية</h2>
            <p className="mt-3 text-muted-foreground">+{courses.length} دورة احترافية في انتظارك</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((t) => (
              <button
                key={t}
                onClick={() => { setActive(t); setVisible(8); }}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition ${
                  active === t ? "bg-primary text-primary-foreground shadow-luxe" : "bg-card border border-border text-foreground/70 hover:border-primary/30"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={`m-${active}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <Carousel opts={{ direction: "rtl", align: "start", loop: false }} className="w-full">
                <CarouselContent className="-ml-4">
                  {filtered.map((c) => (
                    <CarouselItem key={c.title} className="pl-4 basis-[85%] sm:basis-[60%]">
                      <CourseCard
                        c={c}
                        enrolled={isEnrolled(c.title)}
                        favorite={isFavorite(c.title)}
                        onEnroll={() => handleEnroll(c.title)}
                        onFavorite={() => handleFavorite(c.title)}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex items-center justify-center gap-3 mt-6">
                  <CarouselPrevious className="static translate-y-0 size-10 bg-card border-border [&_svg]:hidden">
                    <ChevronRight className="size-5" />
                  </CarouselPrevious>
                  <CarouselNext className="static translate-y-0 size-10 bg-primary text-primary-foreground border-primary [&_svg]:hidden">
                    <ChevronLeft className="size-5" />
                  </CarouselNext>
                </div>
              </Carousel>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={`d-${active}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {shown.map((c) => (
                <CourseCard
                  key={c.title}
                  c={c}
                  enrolled={isEnrolled(c.title)}
                  favorite={isFavorite(c.title)}
                  onEnroll={() => handleEnroll(c.title)}
                  onFavorite={() => handleFavorite(c.title)}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {visible < filtered.length && (
            <div className="mt-10 text-center">
              <button
                onClick={() => setVisible((v) => v + 4)}
                className="px-8 py-3.5 rounded-full bg-card border border-border text-primary font-bold hover:border-primary/40 hover:shadow-luxe transition"
              >
                عرض المزيد ({filtered.length - visible} دورة)
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function CourseCard({
  c, enrolled, favorite, onEnroll, onFavorite,
}: {
  c: typeof courses[number]; enrolled: boolean; favorite: boolean; onEnroll: () => void; onFavorite: () => void;
}) {
  return (
    <article className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-luxe hover:-translate-y-1 transition-all flex flex-col h-full">
      <div className="relative aspect-video overflow-hidden">
        <img src={c.img} alt={c.title} loading="lazy" width={800} height={600} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
        {c.badge && (
          <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${c.badge === "best" ? "bg-gold-gradient text-gold-foreground" : "bg-primary text-primary-foreground"}`}>
            {c.badge === "best" ? "الأكثر مبيعاً" : "جديد"}
          </span>
        )}
        <button
          onClick={onFavorite}
          aria-label="مفضلة"
          className={`absolute top-3 left-3 size-9 rounded-full flex items-center justify-center backdrop-blur transition ${favorite ? "bg-destructive text-white" : "bg-white/90 text-primary hover:bg-white"}`}
        >
          <Heart className={`size-4 ${favorite ? "fill-current" : ""}`} />
        </button>
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition flex items-center justify-center pointer-events-none">
          <Play className="size-12 text-white opacity-0 group-hover:opacity-100 transition fill-current" />
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{c.instructor}</span>
          <span className="px-2 py-0.5 rounded-full bg-secondary font-semibold">{c.level}</span>
        </div>
        <h3 className="mt-2 font-bold text-primary leading-snug line-clamp-2 min-h-[3rem]">{c.title}</h3>

        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="flex items-center gap-1 text-gold font-bold">
            <Star className="size-3.5 fill-current" /> {c.rating}
          </span>
          <span className="flex items-center gap-1 text-muted-foreground">
            <Users className="size-3.5" /> {c.students.toLocaleString("ar-SA")}
          </span>
          <span className="flex items-center gap-1 text-muted-foreground">
            <Clock className="size-3.5" /> {c.duration}
          </span>
        </div>

        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between gap-3">
          <span className="text-xl font-black text-primary">{c.price} <span className="text-xs text-muted-foreground font-normal">ر.س</span></span>
          <button
            onClick={onEnroll}
            className={`px-4 py-2 rounded-full text-xs font-bold transition ${
              enrolled ? "bg-emerald-500/15 text-emerald-700" : "bg-primary text-primary-foreground hover:opacity-90"
            }`}
          >
            {enrolled ? "✓ مُسجَّل" : "سجّل الآن"}
          </button>
        </div>
      </div>
    </article>
  );
}
