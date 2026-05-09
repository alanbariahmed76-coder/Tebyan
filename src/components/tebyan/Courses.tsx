import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Clock, Play } from "lucide-react";
import imgLeadership from "@/assets/course-leadership.jpg";
import imgManagement from "@/assets/course-management.jpg";
import imgDev from "@/assets/course-development.jpg";
import imgTech from "@/assets/course-tech.jpg";

type Course = {
  title: string; instructor: string; rating: number; img: string; badge?: "best" | "new"; duration: string; cat: string;
};

const courses: Course[] = [
  { title: "أساسيات الإدارة الحديثة للقادة", instructor: "د. سلمى الراشد", rating: 4.9, img: imgManagement, badge: "best", duration: "3 س 45 د", cat: "الإدارة" },
  { title: "القيادة الملهمة وبناء الفرق", instructor: "أحمد خليل", rating: 4.8, img: imgLeadership, badge: "best", duration: "2 س 30 د", cat: "القيادة" },
  { title: "عقلية النمو والذكاء العاطفي", instructor: "د. هند العنزي", rating: 4.9, img: imgDev, badge: "new", duration: "1 س 50 د", cat: "تطوير الذات" },
  { title: "الذكاء الاصطناعي للمحترفين", instructor: "م. يوسف ناصر", rating: 4.7, img: imgTech, badge: "new", duration: "4 س 10 د", cat: "التكنولوجيا" },
];

const tabs = ["الكل", "الإدارة", "القيادة", "تطوير الذات", "التكنولوجيا"];

export function Courses() {
  const [active, setActive] = useState("الكل");
  const filtered = active === "الكل" ? courses : courses.filter((c) => c.cat === active);

  return (
    <section id="courses" className="py-24 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-gold text-sm font-bold">الأكثر رواجاً</span>
            <h2 className="mt-2 text-4xl md:text-5xl font-black text-primary">دورات مختارة بعناية</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setActive(t)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition ${
                  active === t ? "bg-primary text-primary-foreground shadow-luxe" : "bg-card border border-border text-foreground/70 hover:border-primary/30"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filtered.map((c) => (
              <article key={c.title} className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-luxe hover:-translate-y-1 transition-all">
                <div className="relative aspect-video overflow-hidden">
                  <img src={c.img} alt={c.title} loading="lazy" width={800} height={600} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                  {c.badge && (
                    <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${c.badge === "best" ? "bg-gold-gradient text-gold-foreground" : "bg-primary text-primary-foreground"}`}>
                      {c.badge === "best" ? "الأكثر مبيعاً" : "جديد"}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition flex items-center justify-center">
                    <Play className="size-12 text-white opacity-0 group-hover:opacity-100 transition fill-current" />
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs text-muted-foreground">{c.instructor}</p>
                  <h3 className="mt-2 font-bold text-primary leading-snug line-clamp-2 min-h-[3rem]">{c.title}</h3>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-gold font-bold">
                      <Star className="size-4 fill-current" /> {c.rating}
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="size-4" /> {c.duration}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
