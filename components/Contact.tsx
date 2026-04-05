"use client";
import { useState } from "react";
import { advocate } from "@/config/advocate";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    matter: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    
    setLoading(true);
    setStatus("idle");

    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
      if (!accessKey) {
        console.error("Missing NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY environment variable.");
        throw new Error("Missing access key");
      }

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          access_key: accessKey,
          subject: `New Legal Inquiry from ${formData.name}`,
          from_name: "Priyanka Portfolio Web Forms"
        }),
      });

      const result = await res.json();
      if (!result.success) throw new Error("Failed to submit");
      
      setStatus("success");
      setFormData({ name: "", phone: "", email: "", matter: "", description: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 lg:py-36 bg-[#06060a]">
      <div className="max-w-[1400px] mx-auto px-14 max-md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-16 lg:gap-24 items-start">

          {/* ── Left: info column ── */}
          <div>
            <p className="section-tag reveal">Get In Touch</p>
            <h2 className="section-title reveal reveal-d1">
              Begin Your
              <br />
              <em>Consultation</em>
            </h2>
            <div className="gold-divider reveal reveal-d2" />

            <div className="flex flex-col gap-2 md:gap-4 reveal reveal-d2">
              {advocate.contact.items.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-5 rounded-2xl border border-[rgba(200,169,110,0.08)] transition-all duration-300 hover:border-[rgba(200,169,110,0.22)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] group"
                  style={{ background: "rgba(14,14,24,0.7)" }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center text-lg border border-[rgba(200,169,110,0.15)] group-hover:border-[rgba(200,169,110,0.35)] transition-colors duration-300"
                    style={{ background: "rgba(200,169,110,0.06)" }}
                  >
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <h4
                      className="text-[0.6rem] tracking-[0.32em] uppercase text-[#c8a96e] mb-1.5 font-medium"
                    >
                      {item.label}
                    </h4>
                    <p className="text-[0.84rem] text-[rgba(240,236,228,0.52)] leading-[1.7] whitespace-pre-line">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: form ── */}
          <div className="reveal reveal-d2">
            <form
              onSubmit={handleSubmit}
              className="p-8 lg:p-10 rounded-3xl border border-[rgba(200,169,110,0.1)] transition-all duration-500"
              style={{
                background: "linear-gradient(145deg, #0e0e1a 0%, #0a0a12 100%)",
                boxShadow: "0 40px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(200,169,110,0.06)",
              }}
            >
              <p
                className="text-[0.62rem] tracking-[0.42em] uppercase text-[#c8a96e] mb-8 flex items-center gap-3"
                style={{ fontFamily: '"Cinzel", Georgia, serif' }}
              >
                <span className="w-6 h-px bg-[rgba(200,169,110,0.6)]" />
                Send a Message
              </p>

              {status === "success" && (
                <div className="mb-6 p-4 rounded-xl border border-[#28c840]/30 bg-[#28c840]/10 text-[#28c840] text-[0.8rem] text-center anim-fade-up flex flex-col gap-1 items-center justify-center">
                  <span className="text-xl">✓</span>
                  Your consultation request has been sent successfully. We will be in touch shortly.
                </div>
              )}
              {status === "error" && (
                <div className="mb-6 p-4 rounded-xl border border-[#ff5f57]/30 bg-[#ff5f57]/10 text-[#ff5f57] text-[0.8rem] text-center anim-fade-up flex flex-col gap-1 items-center justify-center">
                  <span className="text-xl">⚠️</span>
                  Something went wrong. Please check your connection or call us directly instead.
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-[0.6rem] tracking-[0.28em] uppercase text-[rgba(200,169,110,0.6)] mb-2.5 font-medium">
                    Your Name *
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Full name" 
                    className="form-field" 
                  />
                </div>
                <div>
                  <label className="block text-[0.6rem] tracking-[0.28em] uppercase text-[rgba(200,169,110,0.6)] mb-2.5 font-medium">
                    Phone Number
                  </label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX" 
                    className="form-field" 
                  />
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-[0.6rem] tracking-[0.28em] uppercase text-[rgba(200,169,110,0.6)] mb-2.5 font-medium">
                  Email Address *
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com" 
                  className="form-field" 
                />
              </div>

              <div className="mb-5 relative">
                <label className="block text-[0.6rem] tracking-[0.28em] uppercase text-[rgba(200,169,110,0.6)] mb-2.5 font-medium">
                  Legal Matter
                </label>
                <select 
                  name="matter"
                  value={formData.matter}
                  onChange={handleChange}
                  className="form-field text-[rgba(240,236,228,0.45)] pr-10"
                >
                  <option value="" disabled>Select area of concern</option>
                  {advocate.contact.matterOptions.map((o) => (
                    <option key={o} value={o} className="bg-[#0d0d18] text-[#f0ece4]">{o}</option>
                  ))}
                </select>
                <svg
                  className="absolute right-4 bottom-[18px] pointer-events-none text-[rgba(200,169,110,0.45)]"
                  width="14" height="14" viewBox="0 0 14 14" fill="none"
                >
                  <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <div className="mb-7">
                <label className="block text-[0.6rem] tracking-[0.28em] uppercase text-[rgba(200,169,110,0.6)] mb-2.5 font-medium">
                  Brief Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe your legal situation briefly..."
                  className="form-field resize-y"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-gold w-full justify-center !py-[18px] !text-[0.68rem] transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                {loading ? "Sending securely..." : "Request Confidential Consultation"}
              </button>

              <p className="text-[0.62rem] text-[rgba(122,116,104,0.55)] mt-5 leading-[1.7] text-center">
                {advocate.contact.disclaimer}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
