"use client";
import { useState, useRef, useEffect } from "react";
import { advocate } from "@/config/advocate";

type Message = { role: "user" | "assistant"; content: string };

export default function FloatingChat() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef<string>("");

  useEffect(() => {
    sessionIdRef.current = Math.random().toString(36).substring(2, 15);
  }, []);

  // Pop up the bubble after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, loading, isOpen]);

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

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[600] flex flex-col items-end pointer-events-none">
      
      {/* ── Chat Window ── */}
      {isOpen && (
        <div 
          className="pointer-events-auto w-[calc(100vw-3rem)] max-w-[360px] h-[500px] max-h-[70vh] mb-4 bg-[#0a0a0f] border border-[rgba(200,169,110,0.2)] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden anim-fade-up"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(200,169,110,0.15)] bg-[#111118] relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[30px] bg-[rgba(200,169,110,0.1)] blur-[30px] pointer-events-none" />
            <div className="flex items-center gap-3 relative">
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840] animate-pulse" />
              <span
                className="text-[0.65rem] tracking-[0.2em] uppercase text-[#c8a96e]"
                style={{ fontFamily: '"Cinzel", Georgia, serif' }}
              >
                AI Assistant
              </span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-[rgba(200,169,110,0.6)] hover:text-[#c8a96e] transition-colors p-1"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Chat area */}
          <div
            ref={chatRef}
            className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-4"
            style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(200,169,110,0.15) transparent" }}
          >
            {/* Greeting */}
            <div className="max-w-[85%] self-start flex flex-col gap-1 anim-fade-up">
              <div className="text-[0.55rem] tracking-[0.2em] uppercase text-[#7a7468] ml-2">
                Assistant
              </div>
              <div className="px-4 py-3 text-[0.8rem] leading-[1.6] bg-[#15151e] border border-[rgba(200,169,110,0.1)] text-[rgba(240,236,228,0.8)] rounded-2xl rounded-tl-sm shadow-sm backdrop-blur-sm">
                {advocate.ai.greeting}
              </div>
            </div>

            {/* Messages */}
            {messages.map((m, i) => (
              <div key={i} className={`max-w-[85%] flex flex-col gap-1 anim-fade-up ${m.role === "user" ? "self-end" : "self-start"}`}>
                <div
                  className={`text-[0.55rem] tracking-[0.2em] uppercase ${
                    m.role === "user" ? "text-right text-[#c8a96e] mr-2" : "text-[#7a7468] ml-2"
                  }`}
                >
                  {m.role === "user" ? "You" : "Assistant"}
                </div>
                <div
                  className={`px-4 py-3 text-[0.8rem] leading-[1.6] shadow-sm backdrop-blur-sm ${
                    m.role === "user"
                      ? "text-[#f0ece4] rounded-2xl rounded-tr-sm"
                      : "bg-[#15151e] border border-[rgba(200,169,110,0.1)] text-[rgba(240,236,228,0.8)] rounded-2xl rounded-tl-sm"
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
              <div className="max-w-[85%] self-start flex flex-col gap-1 anim-fade-up">
                <div className="px-4 py-3 bg-[#15151e] border border-[rgba(200,169,110,0.1)] rounded-2xl rounded-tl-sm w-fit mt-3">
                  <div className="flex gap-1 items-center">
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-[rgba(200,169,110,0.1)] bg-[#0d0d12]">
            <div className="flex gap-2">
              <input
                className="flex-1 bg-[#15151e] rounded-full border border-[rgba(200,169,110,0.2)] text-[#f0ece4] text-[0.8rem] px-4 py-2.5 outline-none transition-all focus:border-[rgba(200,169,110,0.5)] focus:shadow-[0_0_10px_rgba(200,169,110,0.1)] placeholder:text-[rgba(240,236,228,0.3)]"
                placeholder="Ask a legal question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-[#c8a96e] to-[#e2c98a] border-none text-black flex items-center justify-center flex-shrink-0 transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Floating Bubble Button ── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto relative w-14 h-14 rounded-full bg-gradient-to-tr from-[#a38651] via-[#c8a96e] to-[#e2c98a] shadow-[0_8px_20px_rgba(200,169,110,0.3)] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_8px_25px_rgba(200,169,110,0.4)] anim-fade-up z-50"
      >
        {/* Glow effect back layer */}
        <div className="absolute inset-0 rounded-full border border-white/20 blur-[1px]"></div>
        
        {isOpen ? (
          <svg width="20" height="20" viewBox="0 0 14 14" fill="none" className="text-[#06060a]">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#06060a]">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04359 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.7929 3.20706 21.6771 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9564C8.88837 21.6244 10.4003 22 12 22Z" fill="currentColor"/>
            <path d="M8 12H16" stroke="#c8a96e" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )}
      </button>

    </div>
  );
}
