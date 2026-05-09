import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/tebyan/Navbar";
import { Hero } from "@/components/tebyan/Hero";
import { SocialProof } from "@/components/tebyan/SocialProof";
import { HowItWorks } from "@/components/tebyan/HowItWorks";
import { Courses } from "@/components/tebyan/Courses";
import { Instructors } from "@/components/tebyan/Instructors";
import { Pricing } from "@/components/tebyan/Pricing";
import { Footer } from "@/components/tebyan/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "تبيان — منصتك العربية للتعلم الاحترافي" },
      { name: "description", content: "طوّر مهاراتك في الإدارة والقيادة وتطوير الذات بدورات قصيرة بأيدي نخبة من الخبراء العرب." },
      { property: "og:title", content: "تبيان — منصتك العربية للتعلم الاحترافي" },
      { property: "og:description", content: "وصول غير محدود لمئات الدورات الاحترافية باللغة العربية." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div dir="rtl" className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <HowItWorks />
        <Courses />
        <Instructors />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
