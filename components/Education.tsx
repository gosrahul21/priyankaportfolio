import { advocate } from "@/config/advocate";

export default function Education() {
  return (
    <section id="education" className="relative py-28 lg:py-36 bg-[#0a0a10]">
      <div className="max-w-[1400px] mx-auto px-14 max-md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-16 lg:gap-24">

          {/* ── Sticky sidebar ── */}
          <div className="lg:sticky lg:top-32 lg:h-fit reveal">
            <p className="section-tag">My Journey</p>
            <h2 className="section-title">
              Education &amp;
              <br />
              <em>Milestones</em>
            </h2>
            <div className="gold-divider" />
            <p className="text-[0.88rem] text-[rgba(200,188,168,0.5)] leading-[1.9]">
              {advocate.education.sideNote}
            </p>
          </div>

          {/* ── Timeline ── */}
          <div className="edu-timeline relative pl-0">
            {advocate.education.milestones.map((m, i) => (
              <div
                key={i}
                className={`reveal ${["", "reveal-d1", "reveal-d2", "reveal-d3"][i] ?? ""} relative pl-12 pb-12 last:pb-0 group`}
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-[-5px] top-1 w-[11px] h-[11px] rounded-full border-2 border-[#c8a96e] transition-all duration-400"
                  style={{
                    background: "#0a0a10",
                    boxShadow: "0 0 0 4px rgba(10,10,16,1)",
                  }}
                />
                <div
                  className="absolute left-[-5px] top-1 w-[11px] h-[11px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-400"
                  style={{
                    background: "linear-gradient(135deg, #e2c98a, #c8a96e)",
                    boxShadow: "0 0 12px rgba(200,169,110,0.6)",
                  }}
                />

                {/* Card */}
                <div
                  className="rounded-2xl p-8 border border-[rgba(200,169,110,0.08)] transition-all duration-500 group-hover:border-[rgba(200,169,110,0.2)] group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)]"
                  style={{ background: "linear-gradient(145deg, #0e0e1a 0%, #0a0a12 100%)" }}
                >
                  <div
                    className="text-[0.62rem] tracking-[0.4em] uppercase text-[#c8a96e] mb-3 font-medium"
                    style={{ fontFamily: '"Cinzel", Georgia, serif' }}
                  >
                    {m.year}
                  </div>
                  <h3
                    className="text-[1.35rem] text-[#f0ece4] mb-2 leading-[1.2]"
                    style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 500 }}
                  >
                    {m.title}
                  </h3>
                  <p className="text-[0.82rem] text-[rgba(200,169,110,0.65)] mb-3 font-medium">
                    {m.place}
                  </p>
                  <p className="text-[0.84rem] text-[rgba(240,236,228,0.42)] leading-[1.8]">
                    {m.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
