import { motion } from "framer-motion";
import { CreditCard, Brain, Award } from "lucide-react";

const steps = [
  { icon: CreditCard, title: "اشترك مرة واحدة", desc: "اشتراك واحد يفتح لك آلاف الدورات في كل المجالات بدون قيود.", num: "01" },
  { icon: Brain, title: "تعلم بذكاء", desc: "محتوى مركّز ومُختصر بأسلوب الـ Micro-Learning، تتعلم في أي وقت.", num: "02" },
  { icon: Award, title: "احصل على شهادتك", desc: "احصل على شهادة معتمدة بصيغة PDF عند إتمام كل دورة بنجاح.", num: "03" },
];

export function HowItWorks() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-gold text-sm font-bold">كيف تعمل تبيان؟</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-primary">ثلاث خطوات تفصلك عن التميّز</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative p-8 rounded-3xl bg-card border border-border hover:border-gold/40 hover:shadow-luxe transition-all group"
            >
              <span className="absolute top-6 left-6 text-6xl font-black text-muted/60">{s.num}</span>
              <div className="size-14 rounded-2xl bg-gold-gradient flex items-center justify-center shadow-gold group-hover:scale-110 transition">
                <s.icon className="size-7 text-gold-foreground" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-primary">{s.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
