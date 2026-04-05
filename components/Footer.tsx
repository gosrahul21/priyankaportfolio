import { advocate } from "@/config/advocate";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="relative border-t border-[rgba(200,169,110,0.1)] bg-[#06060a]">
      <div className="max-w-[1400px] mx-auto px-14 max-md:px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">

          {/* Logo */}
          <div
            className="text-[0.75rem] tracking-[0.3em] text-[#c8a96e]"
            style={{ fontFamily: '"Cinzel", Georgia, serif' }}
          >
            {advocate.name.display.toUpperCase()}
          </div>

          {/* Copyright */}
          <div className="text-[0.62rem] tracking-[0.15em] text-[rgba(122,116,104,0.6)] text-center">
            © {currentYear} · LLB, TMBHU Bhagalpur · All Rights Reserved
          </div>

          {/* Disclaimer */}
          <div className="text-[0.58rem] text-[rgba(122,116,104,0.35)] text-right max-w-[220px] leading-[1.7] max-md:text-center">
            {advocate.footer.disclaimer}
          </div>
        </div>
      </div>
    </footer>
  );
}
