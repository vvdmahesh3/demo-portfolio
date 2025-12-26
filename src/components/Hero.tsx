"use client";

import React, { useEffect, useState } from "react";
import ProximityText from "./ProximityText";
import WithText from "./WithText";
import { Github, Linkedin, Mail, MousePointer2 } from "lucide-react";

export default function Hero() {
  const [showScrollIcon, setShowScrollIcon] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const hintTimer = setTimeout(() => setShowHint(true), 1500);
    const hideHintTimer = setTimeout(() => setShowHint(false), 8000);
    const scrollTimer = setTimeout(() => setShowScrollIcon(true), 3000);

    return () => {
      clearTimeout(hintTimer);
      clearTimeout(hideHintTimer);
      clearTimeout(scrollTimer);
    };
  }, []);

  const marqueeText =
    "I BUILD THE FUTURE. I BUILD THE FUTURE. I BUILD THE FUTURE. I BUILD THE FUTURE.";

  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-4 text-center bg-white dark:bg-black transition-colors duration-700"
    >
      {/* ======================================================
          TOP-LEFT LOGO : PIXEL-PERFECT M + BORDER + TOOLTIP
      ====================================================== */}
      <div className="absolute top-6 left-6 z-50">
        <div className="relative w-11 h-11 flex items-center justify-center">
          {/* Glow / Border */}
          {showHint && (
            <div
              className="absolute inset-0 rounded-xl border border-green-500/30
                         shadow-[0_0_18px_rgba(34,197,94,0.35)]
                         animate-aura pointer-events-none"
            />
          )}

          {/* M Logo */}
          <span className="relative z-10 text-green-400 font-extrabold text-xl select-none">
            M
          </span>

          {/* Tooltip */}
          {showHint && (
            <div
              className="absolute -bottom-7 left-1/2 -translate-x-1/2
                         flex items-center gap-2
                         bg-black/90 dark:bg-zinc-900
                         border border-green-500/30
                         px-2.5 py-1 rounded-full backdrop-blur-md
                         shadow-2xl animate-in fade-in zoom-in slide-in-from-top-1
                         duration-700 whitespace-nowrap"
            >
              <MousePointer2 className="w-2.5 h-2.5 text-green-400" />
              <span className="text-[7px] tracking-[0.15em] uppercase text-green-400 font-bold">
                Initialize System
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ================= TOP MARQUEE ================= */}
      <div className="w-full overflow-hidden pt-8">
        <div className="flex animate-marqueeLeft whitespace-nowrap will-change-transform">
          <span className="text-[10.5vw] font-extrabold text-[#111111] dark:text-green-400 opacity-50 leading-none pr-12">
            {marqueeText}
          </span>
          <span className="text-[10.5vw] font-extrabold text-[#111111] dark:text-green-400 opacity-50 leading-none pr-12">
            {marqueeText}
          </span>
        </div>
      </div>

      {/* ================= CENTER TEXT ================= */}
      <div className="h-8" />

      <div className="z-10">
        <ProximityText
          text="I BUILD THE FUTURE"
          className="font-extrabold tracking-wide bg-gradient-to-r from-black to-gray-800 bg-clip-text text-transparent dark:from-green-200 dark:to-green-400"
        />
      </div>

      {/* ================= SUB TEXT ================= */}
      <div className="mt-6">
        <WithText />
      </div>

      {/* ================= SOCIAL ICONS ================= */}
      <div className="flex gap-8 mt-10 z-10">
        <a
          href="https://github.com/vvdmahesh3"
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <Github className="w-8 h-8 text-black dark:text-white group-hover:text-green-400 transition-colors duration-300" />
        </a>

        <a
          href="https://www.linkedin.com/in/vvdmahesh362006/"
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <Linkedin className="w-8 h-8 text-black dark:text-white group-hover:text-[#0A66C2] transition-colors duration-300" />
        </a>

        <a href="mailto:immahesh300@gmail.com" className="group">
          <Mail className="w-8 h-8 text-black dark:text-white group-hover:text-green-400 transition-colors duration-300" />
        </a>
      </div>

      <div className="h-8" />

      {/* ================= BOTTOM MARQUEE ================= */}
      <div className="w-full overflow-hidden pb-8">
        <div className="flex animate-marqueeRight whitespace-nowrap will-change-transform">
          <span className="text-[10.5vw] font-extrabold text-[#111111] dark:text-green-400 opacity-50 leading-none pr-12">
            {marqueeText}
          </span>
          <span className="text-[10.5vw] font-extrabold text-[#111111] dark:text-green-400 opacity-50 leading-none pr-12">
            {marqueeText}
          </span>
        </div>
      </div>

      {/* ================= SCROLL INDICATOR ================= */}
      {showScrollIcon && (
        <a
          href="#about"
          className="absolute bottom-12 flex flex-col items-center justify-center z-10 cursor-pointer"
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute w-12 h-12 rounded-full border-2 border-green-400 animate-pulse-glow" />
            <span className="text-black dark:text-white text-2xl animate-bounce">
              ↓
            </span>
          </div>
          <span className="text-xs mt-2 text-gray-600 dark:text-gray-400">
            Scroll
          </span>
        </a>
      )}
    </section>
  );
}
