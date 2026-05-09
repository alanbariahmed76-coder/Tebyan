import { motion } from "framer-motion";
import i1 from "@/assets/instructor-1.jpg";
import i2 from "@/assets/instructor-2.jpg";
import i3 from "@/assets/instructor-3.jpg";

const list = [
  { name: "أحمد خليل", role: "خبير القيادة والإدارة الاستراتيجية", img: i1, courses: 24 },
  { name: "د. سلمى الراشد", role: "استشارية تطوير الأعمال", img: i2, courses: 18 },
  { name: "م. يوسف ناصر", role: "مختص الذكاء الاصطناعي والبيانات", img: i3, courses: 31 },
];

export function Instructors() {
  return (
    <section id="instructors" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-gold text-sm font-bold">نخبة من الخبراء</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-primary">تعلّم من أفضل المدربين</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {list.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center group"
            >
              <div className="relative inline-block">
                <div className="absolute -inset-2 bg-gold-gradient rounded-full opacity-0 group-hover:opacity-100 blur-xl transition duration-500" />
                <img src={p.img} alt={p.name} loading="lazy" width={512} height={512} className="relative size-40 rounded-full object-cover border-4 border-card shadow-luxe" />
                <span className="absolute bottom-2 left-2 bg-gold-gradient text-gold-foreground text-xs font-bold px-3 py-1 rounded-full shadow-gold">
                  +{p.courses} دورة
                </span>
              </div>
              <h3 className="mt-6 text-xl font-bold text-primary">{p.name}</h3>
              <p className="mt-2 text-muted-foreground">{p.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
