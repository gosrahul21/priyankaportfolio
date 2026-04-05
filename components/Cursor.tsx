"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const curRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (curRef.current) {
        curRef.current.style.left = mx + "px";
        curRef.current.style.top  = my + "px";
      }
    };

    const raf = setInterval(() => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = rx + "px";
        ringRef.current.style.top  = ry + "px";
      }
    }, 16);

    const grow = () => {
      if (!ringRef.current) return;
      ringRef.current.style.width  = "60px";
      ringRef.current.style.height = "60px";
      ringRef.current.style.borderColor = "rgba(200,169,110,0.8)";
    };
    const shrink = () => {
      if (!ringRef.current) return;
      ringRef.current.style.width  = "36px";
      ringRef.current.style.height = "36px";
      ringRef.current.style.borderColor = "rgba(200,169,110,0.5)";
    };

    document.addEventListener("mousemove", onMove);
    document.querySelectorAll("a,button,input,textarea,select,.practice-card").forEach(el => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      clearInterval(raf);
    };
  }, []);

  return (
    <>
      <div id="cursor" ref={curRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  );
}
