"use client";
import { useState, useRef, useEffect } from "react";
import { advocate } from "@/config/advocate";

type Message = { role: "user" | "assistant"; content: string };

export default function AISection() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef<string>("");

  useEffect(() => {
    // Generate a unique session ID for this instance on mount
    sessionIdRef.current = Math.random().toString(36).substring(2, 15);
  }, []);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, loading]);

  async function send() {
    const q = input.trim();
    if (!q || loading) return;
    setInput("");
    const newHistory: Message[] = [...messages, { role: "user", content: q }];
    setMessages(newHistory);
    setLoading(true);

    try {
      const res = await fetch("https://gosrahul21-n8n.hf.space/webhook/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemMessage: advocate.ai.systemPrompt,
          message: q,
          sessionId: sessionIdRef.current,
        }),
      });

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let reply = "";
      let buffer = "";

      // Start streaming - remove loading indicator immediately
      setLoading(false);
      setMessages([...newHistory, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (let line of lines) {
          // n8n can send SSE (data: {...}) or raw NDJSON
          const trimmed = line.replace(/^data:\s*/, "").trim();
          if (!trimmed) continue;

          try {
            const parsed = JSON.parse(trimmed);
            
            // Extract the actual text delta depending on n8n version
            if (parsed.type === "token" && parsed.data) {
              reply += parsed.data;
            } else if (parsed.type === "item" && parsed.content) {
              reply += parsed.content;
            } else if (parsed.content) {
              reply += parsed.content;
            }
          } catch (e) {
            // Ignore incomplete or non-JSON lines
          }
        }

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1].content = reply;
          return updated;
        });
      }
    } catch {
      setMessages([
        ...newHistory,
        { role: "assistant", content: "I'm experiencing a technical issue. Please contact Priyanka directly." },
      ]);
      setLoading(false);
    }
  }

  return (
    <section
      id="ai"
      className="relative py-28 lg:py-36 bg-[#0a0a10] overflow-hidden"
    >
      {/* BG glow */}
      <div
        className="absolute -top-[200px] -right-[200px] w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(200,169,110,0.05), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-14 max-md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-16 lg:gap-24 items-start">

        {/* Intro */}
        <div>
          <p className="section-tag reveal">Powered by AI</p>
          <h2 className="section-title reveal reveal-d1">
            Your 24/7 <em>Legal Guide</em>
          </h2>
          <div className="gold-divider reveal reveal-d2" />
          <p className="reveal reveal-d2 text-[#7a7468] leading-[1.9] text-[0.9rem] mt-6">
            Have questions about Priyanka&apos;s background, practice areas, or whether she can help with your
            specific matter? Our AI assistant knows everything about her — ask freely, anytime.
          </p>

          <div className="reveal reveal-d3 mt-10 flex flex-col gap-2 md:gap-4">
            {advocate.ai.features.map((f, i) => (
              <div key={i} className="flex gap-4 items-start p-4 rounded-xl border border-[rgba(200,169,110,0.06)] hover:border-[rgba(200,169,110,0.18)] transition-colors duration-300" style={{ background: "rgba(14,14,22,0.5)" }}>
                <div className="w-10 h-10 rounded-xl border border-[rgba(200,169,110,0.15)] flex-shrink-0 flex items-center justify-center text-base" style={{ background: "rgba(200,169,110,0.06)" }}>
                  {f.icon}
                </div>
                <div>
                  <h4 className="text-[0.88rem] font-medium mb-1 text-[#f0ece4]">{f.title}</h4>
                  <p className="text-[0.8rem] text-[rgba(200,188,168,0.5)] leading-[1.7]">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat widget */}
        <div className="reveal reveal-d2 border border-[rgba(200,169,110,0.1)] bg-[#0a0a0f] rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col relative">
          {/* Ambient header glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[40px] bg-[rgba(200,169,110,0.1)] blur-[40px] pointer-events-none" />
          {/* Header */}
          <div className="flex items-center gap-3 px-7 py-5 border-b border-[rgba(200,169,110,0.15)]">
            <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
            <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
            <div className="w-2 h-2 rounded-full bg-[#28c840]" />
            <span
              className="ml-auto text-[0.65rem] tracking-[0.35em] uppercase text-[#c8a96e]"
              style={{ fontFamily: '"Cinzel", Georgia, serif' }}
            >
              AI Counsel · Priyanka Goswami
            </span>
          </div>

          {/* Chat area */}
          <div
            ref={chatRef}
            className="h-[400px] overflow-y-auto px-7 py-6 flex flex-col gap-6 scroll-smooth z-10"
            style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(200,169,110,0.15) transparent" }}
          >
            {/* Greeting */}
            <div className="max-w-[85%] self-start flex flex-col gap-1.5 anim-fade-up">
              <div className="text-[0.6rem] tracking-[0.3em] uppercase text-[#7a7468] ml-2">
                AI · Assistant
              </div>
              <div className="px-5 py-3.5 text-[0.85rem] leading-[1.7] bg-[#111118] border border-[rgba(200,169,110,0.1)] text-[rgba(240,236,228,0.7)] rounded-2xl rounded-tl-sm shadow-sm backdrop-blur-sm">
                {advocate.ai.greeting}
              </div>
            </div>

            {/* Dynamic messages */}
            {messages.map((m, i) => (
              <div key={i} className={`max-w-[85%] flex flex-col gap-1.5 anim-fade-up ${m.role === "user" ? "self-end" : "self-start"}`}>
                <div
                  className={`text-[0.6rem] tracking-[0.3em] uppercase ${
                    m.role === "user" ? "text-right text-[#c8a96e] mr-2" : "text-[#7a7468] ml-2"
                  }`}
                >
                  {m.role === "user" ? "You" : "AI · Assistant"}
                </div>
                <div
                  className={`px-5 py-3.5 text-[0.85rem] leading-[1.7] shadow-sm backdrop-blur-sm ${
                    m.role === "user"
                      ? "text-[#f0ece4] rounded-2xl rounded-tr-sm"
                      : "bg-[#111118] border border-[rgba(200,169,110,0.1)] text-[rgba(240,236,228,0.7)] rounded-2xl rounded-tl-sm"
                  }`}
                  style={
                    m.role === "user"
                      ? { background: "linear-gradient(135deg, rgba(200,169,110,0.25), rgba(163,134,81,0.15))" }
                      : {}
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="max-w-[85%] self-start flex flex-col gap-1.5 anim-fade-up">
                <div className="text-[0.6rem] tracking-[0.3em] uppercase text-[#7a7468] ml-2">
                  AI · Assistant
                </div>
                <div className="px-5 py-4 bg-[#111118] border border-[rgba(200,169,110,0.1)] rounded-2xl rounded-tl-sm w-fit">
                  <div className="flex gap-1.5 items-center">
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-[rgba(200,169,110,0.1)] px-5 py-5 flex gap-3 bg-[rgba(11,11,16,0.5)] backdrop-blur-md z-10">
            <input
              className="flex-1 bg-[#111118] rounded-full border border-[rgba(200,169,110,0.15)] text-[#f0ece4] font-['DM_Sans',sans-serif] text-[0.85rem] px-5 py-3 outline-none transition-all duration-300 focus:border-[rgba(200,169,110,0.4)] focus:shadow-[0_0_15px_rgba(200,169,110,0.1)] placeholder:text-[rgba(240,236,228,0.2)]"
              placeholder={advocate.ai.inputPlaceholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
            />
            <button
              onClick={send}
              disabled={loading}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-[#c8a96e] to-[#e2c98a] border-none text-black text-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:shadow-[0_0_20px_rgba(200,169,110,0.3)] hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
            >
              &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
}
