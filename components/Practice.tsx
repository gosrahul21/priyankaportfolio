import { advocate } from "@/config/advocate";

export default function Practice() {
  return (
    <section id="practice" className="relative py-28 lg:py-36 bg-[#06060a]">
      <div className="max-w-[1400px] mx-auto px-14 max-md:px-6">

        {/* Section header */}
        <div className="max-w-[550px] mb-16">
          <p className="section-tag reveal">What I Do</p>
          <h2 className="section-title reveal reveal-d1">
            Areas of <em>Legal Practice</em>
          </h2>
          <div className="gold-divider reveal reveal-d2 !mb-0" />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {advocate.practiceAreas.map((area, idx) => (
            <div
              key={area.num}
              className={`practice-card reveal reveal-d${Math.min(idx + 1, 4)} group relative rounded-2xl p-8 border transition-all duration-500
                border-[rgba(200,169,110,0.08)]
                hover:border-[rgba(200,169,110,0.25)]
                hover:-translate-y-2
                hover:shadow-[0_24px_48px_rgba(0,0,0,0.4),0_0_0_1px_rgba(200,169,110,0.12)]
              `}
              style={{
                background: "linear-gradient(145deg, #0e0e18 0%, #0a0a12 100%)",
              }}
            >
              {/* Ambient corner glow */}
              <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(200,169,110,0.08), transparent 70%)",
                  transform: "translate(30%, -30%)",
                }}
              />

              {/* Number */}
              <div
                className="mb-5 leading-none select-none"
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontWeight: 700,
                  fontSize: "2.5rem",
                  background: "linear-gradient(135deg, rgba(200,169,110,0.18), rgba(200,169,110,0.05))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  transition: "all 0.4s",
                }}
              >
                {area.num}
              </div>

              {/* Icon */}
              <div className="text-2xl mb-4 transition-transform duration-300 group-hover:scale-110 origin-left">
                {area.icon}
              </div>

              {/* Title */}
              <h3
                className="text-[1.1rem] text-[#f0ece4] leading-[1.3] mb-3 font-medium"
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              >
                {area.name}
              </h3>

              {/* Desc */}
              <p className="text-[0.84rem] text-[rgba(200,188,168,0.55)] leading-[1.8]">
                {area.desc}
              </p>

              {/* Explore link */}
              <div className="mt-6 flex items-center gap-2 text-[0.62rem] tracking-[0.28em] uppercase text-[rgba(200,169,110,0.5)] font-medium opacity-0 group-hover:opacity-100 transition-all duration-400 -translate-x-1 group-hover:translate-x-0">
                <span>Explore</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
