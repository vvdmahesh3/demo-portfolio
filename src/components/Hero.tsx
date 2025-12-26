import React, { useEffect, useState } from "react";
import ProximityText from "./ProximityText";
import { Github, Linkedin, Mail, MousePointer2 } from "lucide-react";
import WithText from "./WithText";

export default function Hero() {
  const [showScrollIcon, setShowScrollIcon] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    // Show hint after 1.5s, hide after 8s
    const hintTimer = setTimeout(() => setShowHint(true), 1500);
    const hideHintTimer = setTimeout(() => setShowHint(false), 9000);
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
      {/* --- HUD SYSTEM INDICATOR (ALIGNED TO LOGO) --- */}
      {/* top-8 and left-8 are the standard padding for top-left logos */}
      <div className="absolute top-8 left-8 z-50 pointer-events-none">
        {showHint && (
          <div className="flex flex-col items-center">
            {/* 1. The Aura: Using translate to center exactly on the 'M' */}
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute w-full h-full rounded-full border border-green-500/40 animate-aura bg-green-500/5 shadow-[0_0_20px_rgba(0,255,179,0.2)]" />
              {/* This small dot represents the center of your 'M' */}
              <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_#00FFB3]" />
            </div>
            
            {/* 2. The Tooltip: Positioned slightly below to not block the 'M' */}
            <div className="mt-3 flex items-center gap-2 bg-black/95 dark:bg-black/90 border border-green-500/30 px-3 py-1.5 rounded-full backdrop-blur-xl animate-in fade-in zoom-in slide-in-from-top-2 duration-1000 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              <MousePointer2 className="w-3 h-3 text-green-400 rotate-12" />
              <span className="text-[8px] uppercase tracking-[0.25em] text-green-400 font-bold whitespace-nowrap">
                Initialize System
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Top Marquee */}
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

      {/* Center Proximity Text */}
      <div className="h-8" />
      <div className="z-10">
        <ProximityText
          text="I BUILD THE FUTURE"
          className="font-extrabold tracking-wide bg-gradient-to-r from-black to-gray-800 bg-clip-text text-transparent dark:from-green-200 dark:to-green-400"
        />
      </div>

      {/* WithText Animation */}
      <div className="mt-6">
        <WithText />
      </div>

      {/* Social Icons */}
      <div className="flex gap-8 mt-10 z-10">
        <a
          href="https://github.com/vvdmahesh3"
          target="_blank"
          rel="noopener noreferrer"
          className="relative group"
        >
          <Github className="w-8 h-8 text-black dark:text-white group-hover:text-accent transition-colors duration-300" />
        </a>

        <a
          href="https://www.linkedin.com/in/vvdmahesh362006/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative group"
        >
          <Linkedin className="w-8 h-8 text-black dark:text-white group-hover:text-[#0A66C2] transition-colors duration-300" />
        </a>

        <a href="mailto:immahesh300@gmail.com" className="relative group">
          <Mail className="w-8 h-8 text-black dark:text-white group-hover:text-accent transition-colors duration-300" />
        </a>
      </div>

      <div className="h-8" />

      {/* Bottom Marquee */}
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

      {/* Scroll Indicator */}
      {showScrollIcon && (
        <a
          href="#about"
          className="absolute bottom-12 flex flex-col items-center justify-center z-10 cursor-pointer"
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute w-12 h-12 rounded-full border-2 border-accent animate-pulse-glow" />
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