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
      {/* --- PIXEL-PERFECT LOGO HINT --- */}
      {/* Adjusted top and left to perfectly center on the "M" logo */}
      <div className="absolute top-5 left-8 z-50 pointer-events-none">
        {showHint && (
          <div className="flex flex-col items-center gap-1.5">
            {/* The Aura Glow - perfectly sized to the logo square */}
            <div className="w-11 h-11 rounded-xl animate-aura bg-green-500/5 border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]" />
            
            {/* The Minimalist Tooltip - cleaned up width and padding */}
            <div className="flex items-center gap-2 bg-black/90 dark:bg-zinc-900 border border-white/10 dark:border-green-500/30 px-2.5 py-1 rounded-full backdrop-blur-md animate-in fade-in zoom-in slide-in-from-top-1 duration-700 shadow-2xl">
              <MousePointer2 className="w-2.5 h-2.5 text-green-400" />
              <span className="text-[7px] uppercase tracking-[0.15em] text-green-400 font-bold whitespace-nowrap">
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