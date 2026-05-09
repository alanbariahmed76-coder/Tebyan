import { motion } from "framer-motion";
import { Play, Sparkles, ArrowLeft } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import heroImg from "@/assets/hero-tablet.jpg";

export function Hero() {
  const nav = useNavigate();
  return (
    <section id="home" className="relative overflow-hidden bg-hero text-primary-foreground">
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:32px_32px]" />
      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-28 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-right"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 text-gold text-xs font-semibold border border-gold/30">
            <Sparkles className="size-3.5" />
            منصة التعلم العربية الأولى للمحترفين
          </span>
          <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-black leading-[1.2]">
            <span className="block">طوّر مهاراتك اليوم في</span>
            <span className="block bg-gold-gradient bg-clip-text text-slate-50">10 دقائق فقط</span>
            <span className="block mt-2">منصتك العربية للمعرفة العملية</span>
          </h1>
          <p className="mt-6 text-lg text-primary-foreground/75 max-w-xl">
            انضم إلى تبيان واحصل على وصول غير محدود لمئات الدورات الاحترافية بإشراف نخبة من الخبراء العرب.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4 justify-end lg:justify-start">
            <button onClick={() => nav({ to: "/login" })} className="group inline-flex items-center gap-2 bg-gold-gradient text-gold-foreground px-7 py-4 rounded-full text-base font-bold shadow-gold hover:scale-[1.03] transition">
              ابدأ تجربتك المجانية الآن
              <ArrowLeft className="size-4 group-hover:-translate-x-1 transition" />
            </button>
            <button onClick={() => toast("سيُفتح العرض التعريفي قريباً 🎬")} className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-white/20 text-sm font-semibold hover:bg-white/5 transition">
              <Play className="size-4 fill-current" />
              شاهد العرض التعريفي
            </button>
          </div>
          <div className="mt-10 flex items-center gap-8 text-sm text-primary-foreground/60 justify-end lg:justify-start">
            <div><span className="text-gold font-bold text-2xl">+500</span><br />دورة احترافية</div>
            <div><span className="text-gold font-bold text-2xl">+50K</span><br />متدرب نشط</div>
            <div><span className="text-gold font-bold text-2xl">4.9★</span><br />تقييم المتدربين</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-10 bg-gold/20 blur-3xl rounded-full" />
          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-luxe">
            <img src={heroImg} alt="منصة تبيان التعليمية" width={1280} height={960} className="w-full h-auto" />
            <button onClick={() => toast("جاري تحميل المعاينة...")} aria-label="تشغيل" className="absolute inset-0 m-auto size-20 rounded-full bg-gold-gradient text-gold-foreground flex items-center justify-center shadow-gold hover:scale-110 transition">
              <Play className="size-8 fill-current ms-1" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
