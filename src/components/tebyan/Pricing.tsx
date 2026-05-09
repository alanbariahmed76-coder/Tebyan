import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "الاشتراك الشهري",
    price: "99",
    period: "ر.س / شهرياً",
    desc: "ابدأ رحلتك التعليمية بمرونة كاملة.",
    features: ["وصول غير محدود لجميع الدورات", "شهادات معتمدة بصيغة PDF", "مشاهدة على جميع الأجهزة", "إلغاء في أي وقت"],
    highlight: false,
  },
  {
    name: "الاشتراك السنوي",
    price: "799",
    period: "ر.س / سنوياً",
    desc: "وفّر أكثر من 33% مع أفضل قيمة.",
    features: ["كل مزايا الباقة الشهرية", "تحميل الدورات بدون إنترنت", "جلسات إرشاد شهرية حصرية", "أولوية الدعم الفني", "دورات حصرية للمشتركين السنويين"],
    highlight: true,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-gold text-sm font-bold">باقات مرنة</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-primary">اختر الباقة المناسبة لك</h2>
          <p className="mt-4 text-muted-foreground">استثمر في نفسك بأقل من ثمن فنجان قهوة يومياً.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative rounded-3xl p-8 md:p-10 border ${
                p.highlight
                  ? "bg-primary text-primary-foreground border-gold shadow-luxe scale-[1.02]"
                  : "bg-card border-border"
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-4 right-8 inline-flex items-center gap-1.5 bg-gold-gradient text-gold-foreground px-4 py-1.5 rounded-full text-xs font-bold shadow-gold">
                  <Sparkles className="size-3.5" /> الأفضل قيمة
                </span>
              )}
              <h3 className={`text-2xl font-black ${p.highlight ? "text-gold" : "text-primary"}`}>{p.name}</h3>
              <p className={`mt-2 text-sm ${p.highlight ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{p.desc}</p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-6xl font-black">{p.price}</span>
                <span className={p.highlight ? "text-primary-foreground/70" : "text-muted-foreground"}>{p.period}</span>
              </div>
              <ul className="mt-8 space-y-4">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className={`mt-0.5 size-5 rounded-full flex items-center justify-center shrink-0 ${p.highlight ? "bg-gold-gradient text-gold-foreground" : "bg-primary/10 text-primary"}`}>
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    <span className={p.highlight ? "" : "text-foreground/80"}>{f}</span>
                  </li>
                ))}
              </ul>
              <button className={`mt-10 w-full py-4 rounded-full font-bold transition ${
                p.highlight
                  ? "bg-gold-gradient text-gold-foreground shadow-gold hover:scale-[1.02]"
                  : "bg-primary text-primary-foreground hover:opacity-90"
              }`}>
                اشترك الآن
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
