"use client";
import { useEffect, useRef } from "react";

export default function ScrollReveal() {
  const obsRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    obsRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".reveal").forEach((el) => {
      obsRef.current!.observe(el);
    });

    return () => obsRef.current?.disconnect();
  }, []);

  return null;
}
