import { Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";
import logo from "@/assets/tebyan-logo.png";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-20 pb-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <img src={logo} alt="تبيان" className="h-14 w-auto bg-white/95 rounded-xl p-2" />
            <p className="mt-6 text-primary-foreground/70 max-w-md leading-relaxed">
              تبيان هي المنصة العربية الرائدة في التعلم الرقمي للمحترفين ورواد الأعمال والطلاب،
              نقدم محتوى عملي مركّز بأيدي نخبة من الخبراء العرب.
            </p>
            <div className="mt-6 flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube, Linkedin].map((Icon, i) => (
                <a key={i} href="#" aria-label="social" className="size-10 rounded-full bg-white/5 hover:bg-gold hover:text-gold-foreground border border-white/10 flex items-center justify-center transition">
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-5 text-gold">روابط سريعة</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li><a href="#home" className="hover:text-gold transition">الرئيسية</a></li>
              <li><a href="#courses" className="hover:text-gold transition">المساقات</a></li>
              <li><a href="#instructors" className="hover:text-gold transition">المدربون</a></li>
              <li><a href="#pricing" className="hover:text-gold transition">الأسعار</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-5 text-gold">الدعم</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li><a href="#" className="hover:text-gold transition">مركز المساعدة</a></li>
              <li><a href="#" className="hover:text-gold transition">الشروط والأحكام</a></li>
              <li><a href="#" className="hover:text-gold transition">سياسة الخصوصية</a></li>
              <li><a href="#" className="hover:text-gold transition">تواصل معنا</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
          <p>© {new Date().getFullYear()} تبيان. جميع الحقوق محفوظة.</p>
          <p>صُنع بشغف للمتعلمين العرب</p>
        </div>
      </div>
    </footer>
  );
}
