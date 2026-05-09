const companies = ["ARAMCO", "STC", "SABIC", "MADA", "NEOM", "CARREFOUR", "TALABAT"];

export function SocialProof() {
  return (
    <section className="py-16 border-b border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-sm font-semibold text-muted-foreground mb-10 tracking-wide">
          يثق بنا متدربون من
        </p>
        <div className="overflow-hidden">
          <div className="flex gap-16 marquee whitespace-nowrap">
            {[...companies, ...companies].map((c, i) => (
              <span key={i} className="text-2xl font-black text-foreground/30 hover:text-primary transition tracking-tight">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
