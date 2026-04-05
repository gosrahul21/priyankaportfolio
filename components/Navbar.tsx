"use client";
import { useEffect, useState } from "react";
import { advocate } from "@/config/advocate";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#about",     label: "About" },
    { href: "#practice",  label: "Practice" },
    { href: "#education", label: "Education" },
    { href: "#ai",        label: "AI Counsel" },
    { href: "#contact",   label: "Contact" },
  ];

  return (
    <>
      <nav
        className={[
          "fixed top-0 left-0 right-0 z-[500] transition-all duration-500 px-10",
          scrolled
            ? "bg-[rgba(6,6,10,0.95)] border-b border-[rgba(200,169,110,0.1)] py-4"
            : "bg-transparent py-6",
        ].join(" ")}
        style={{ backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none" }}
      >
        <div className="max-w-[1400px] mx-auto px-14 max-md:px-5 flex items-center justify-between gap-8">
          {/* ── Logo ── */}
          <a href="#hero" className="navbar-logo flex-shrink-0">
            {advocate.name.shorthand}
          </a>

          {/* ── Desktop Links ── */}
          <ul className="hidden lg:flex items-center gap-8 list-none">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="nav-link-item">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* ── CTA ── */}
          <a
            href="#contact"
            className="!hidden lg:!inline-flex btn-gold !py-[11px] lg:whitespace-nowrap !px-[26px] !text-[0.62rem]"
          >
            Consult Now
          </a>

          {/* ── Mobile hamburger ── */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-px bg-[#c8a96e] transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-px bg-[#c8a96e] transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-px bg-[#c8a96e] transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {/* ── Mobile menu ── */}
        {mobileOpen && (
          <div className="lg:hidden bg-[rgba(6,6,10,0.98)] border-t border-[rgba(200,169,110,0.1)] py-6 px-5 flex flex-col gap-4" style={{ backdropFilter: "blur(20px)" }}>
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="nav-link-item text-sm py-2"
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a href="#contact" className="btn-gold mt-2 w-full whitespace-nowrap justify-center">
              Consult Now
            </a>
          </div>
        )}
      </nav>
    </>
  );
}
