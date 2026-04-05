import { advocate } from "@/config/advocate";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── Rich background atmosphere ── */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Deep radial glow - right side */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 70% 80% at 75% 55%, rgba(200,169,110,0.09) 0%, transparent 65%),
              radial-gradient(ellipse 50% 60% at 5% 70%, rgba(80,40,140,0.07) 0%, transparent 60%),
              radial-gradient(ellipse 35% 45% at 95% 15%, rgba(200,169,110,0.05) 0%, transparent 55%),
              radial-gradient(ellipse 40% 40% at 50% 100%, rgba(0,0,0,0.8) 0%, transparent 100%)
            `,
          }}
        />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(200,169,110,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(200,169,110,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* ── Decorative horizontal lines ── */}
      <div className="hero-line" style={{ top: "28%" }} aria-hidden="true" />
      <div className="hero-line" style={{ bottom: "28%" }} aria-hidden="true" />

      {/* ── Vertical rotated label ── */}
      <div
        className="absolute right-10 top-1/2 hidden xl:block pointer-events-none"
        style={{
          transform: "translateY(-50%) rotate(90deg)",
          transformOrigin: "center",
        }}
        aria-hidden="true"
      >
        <span className="text-[0.56rem] tracking-[0.5em] uppercase text-[rgba(200,169,110,0.35)] whitespace-nowrap">
          {advocate.locationTag}
        </span>
      </div>

      {/* ── Main hero content ── */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-14 max-md:px-6 pt-28 pb-20">
        <div className="max-w-[780px]">

          {/* Eyebrow pill */}
          <div className="anim-fade-up delay-200 inline-flex items-center gap-3 mb-10">
            <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, #c8a96e, rgba(200,169,110,0.3))" }} />
            <span
              className="text-[0.62rem] tracking-[0.45em] uppercase text-[#c8a96e]"
              style={{ fontFamily: '"Cinzel", Georgia, serif' }}
            >
              {advocate.title}
            </span>
            <div className="w-8 h-px" style={{ background: "linear-gradient(270deg, #c8a96e, rgba(200,169,110,0.3))" }} />
          </div>

          {/* Big name */}
          <h1
            className="anim-fade-up delay-400 leading-[0.9] tracking-[-0.02em] mb-6"
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 400,
              fontSize: "clamp(4.5rem, 9.5vw, 8.5rem)",
            }}
          >
            <span className="block text-[#f0ece4]">{advocate.name.first}</span>
            <span
              className="block italic"
              style={{
                background: "linear-gradient(135deg, #e2c98a 0%, #c8a96e 40%, #a38651 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {advocate.name.last}
            </span>
          </h1>

          {/* Credential strip */}
          <div className="anim-fade-up delay-600 flex items-center gap-4 mb-8">
            <div
              className="h-px w-20 flex-shrink-0"
              style={{ background: "linear-gradient(90deg, #c8a96e, transparent)" }}
            />
            <p
              className="text-[0.7rem] tracking-[0.35em] uppercase text-[rgba(200,169,110,0.6)]"
              style={{ fontFamily: '"Cinzel", Georgia, serif' }}
            >
              {advocate.qualification.degree} &middot; {advocate.qualification.universityShort} &middot; {advocate.location}
            </p>
          </div>

          {/* Description */}
          <p
            className="anim-fade-up delay-700 leading-[1.9] text-[rgba(240,236,228,0.5)] mb-10 max-w-[520px]"
            style={{ fontSize: "0.95rem" }}
          >
            {advocate.heroDescription}
          </p>

          {/* CTA buttons */}
          <div className="anim-fade-up delay-900 flex flex-wrap gap-4">
            <a href="#ai" className="btn-gold">
              Ask AI About Me
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-[1px]">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#practice" className="btn-ghost">
              View Practice Areas
            </a>
          </div>
        </div>
      </div>

      {/* ── Stats panel – bottom right ── */}
      <div
        className="anim-fade-left delay-1100 absolute right-10 bottom-12 hidden lg:flex flex-col gap-0 text-right"
        style={{ minWidth: "120px" }}
      >
        {advocate.heroStats.map((s, i) => (
          <div key={i}>
            {i > 0 && (
              <div
                className="w-10 h-px ml-auto my-5"
                style={{ background: "rgba(200,169,110,0.2)" }}
              />
            )}
            <div
              className="leading-none"
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontWeight: 400,
                fontSize: "clamp(2rem, 3vw, 2.8rem)",
                background: "linear-gradient(135deg, #e2c98a, #c8a96e)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {s.value}
            </div>
            <div
              className="text-[0.57rem] tracking-[0.22em] uppercase text-[#7a7468] mt-1 whitespace-pre-line leading-[1.6]"
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Bottom scroll hint ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 anim-fade-in delay-1500">
        <span className="text-[0.55rem] tracking-[0.4em] uppercase text-[rgba(200,169,110,0.3)]">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[rgba(200,169,110,0.4)] to-transparent" />
      </div>
    </section>
  );
}
