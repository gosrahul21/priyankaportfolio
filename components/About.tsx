import { advocate } from "@/config/advocate";
import Image from "next/image";
export default function About() {
  return (
    <section id="about" className="relative py-28 lg:py-36 bg-[#0a0a10]">
      <div className="max-w-[1400px] mx-auto px-14 max-md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── Portrait visual column ── */}
          <div className="reveal relative flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[420px]">

              {/* Main portrait frame */}
              <div
                className="relative w-full rounded-3xl border border-[rgba(200,169,110,0.12)] overflow-hidden"
                style={{
                  aspectRatio: "3/4",
                  background: "linear-gradient(145deg, #131320 0%, #0d0d18 50%, #111122 100%)",
                  boxShadow: "0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(200,169,110,0.08)",
                }}
              >
                {/* Inner glow */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(200,169,110,0.07), transparent 70%)",
                  }}
                />

                {/* Actual Portrait */}
                <Image
                  src="/priyanka_dp.jpeg"
                  alt={`Portrait of ${advocate.name.display}`}
                  fill
                  quality={90}
                  className="object-cover object-top absolute inset-0 pointer-events-none"
                  style={{ opacity: 0.95 }}
                />

                {/* Bottom fade */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                  style={{ background: "linear-gradient(to top, #0d0d18, transparent)" }}
                />
              </div>

              {/* Corner accent lines */}
              <div className="absolute -top-2 -left-2 w-10 h-10 border-t-[1.5px] border-l-[1.5px] border-[rgba(200,169,110,0.5)] rounded-tl-lg" />
              <div className="absolute -bottom-2 -right-2 w-10 h-10 border-b-[1.5px] border-r-[1.5px] border-[rgba(200,169,110,0.5)] rounded-br-lg" />

              {/* Floating badge */}
              <div
                className="absolute -bottom-5 -right-4 lg:right-[-28px] rounded-2xl px-6 py-4 text-center"
                style={{
                  background: "linear-gradient(135deg, #c8a96e 0%, #e2c98a 50%, #a38651 100%)",
                  boxShadow: "0 16px 40px rgba(200,169,110,0.3), 0 4px 12px rgba(0,0,0,0.3)",
                }}
              >
                <span
                  className="block text-[2rem] leading-none text-[#06060a] mb-1"
                  style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700 }}
                >
                  {advocate.qualification.year}
                </span>
                <span
                  className="text-[0.52rem] tracking-[0.3em] uppercase font-semibold text-[rgba(6,6,10,0.7)]"
                >
                  Year Qualified
                </span>
              </div>
            </div>
          </div>

          {/* ── Text column ── */}
          <div>
            <p className="section-tag reveal">Who I Am</p>

            <h2 className="section-title reveal reveal-d1 mb-0">
              Fearless advocacy.
              <br />
              <em>Principled counsel.</em>
            </h2>

            <div className="gold-divider reveal reveal-d2" />

            <div className="space-y-5 reveal reveal-d2">
              {advocate.about.paragraphs.map((para, i) => (
                <p
                  key={i}
                  className="text-[0.92rem] text-[rgba(240,236,228,0.5)] leading-[1.9]"
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Qualifications list */}
            <ul className="reveal reveal-d3 mt-8 space-y-3">
              {advocate.about.qualifications.map((q, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3.5 text-[0.86rem] text-[rgba(240,236,228,0.6)]"
                >
                  <span
                    className="w-1.5 h-1.5 bg-[#c8a96e] flex-shrink-0 mt-[0.45rem]"
                    style={{ transform: "rotate(45deg)" }}
                  />
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
