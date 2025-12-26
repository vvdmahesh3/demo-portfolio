import React, { useEffect, useState } from "react";
import ProximityText from "./ProximityText";
import { Github, Linkedin, Mail, MousePointerClick } from "lucide-react";
import WithText from "./WithText";

export default function Hero() {
  const [showScrollIcon, setShowScrollIcon] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    // 1. Show the "M" hint shortly after load
    const hintTimer = setTimeout(() => setShowHint(true), 1500);
    
    // 2. Hide the hint after 6 seconds so it doesn't stay forever
    const hideHintTimer = setTimeout(() => setShowHint(false), 7500);

    // 3. Show the bottom scroll icon
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
      {/* --- SECRET INTERFACE INDICATOR (Top Left) --- */}
      <div className="absolute top-8 left-8 z-50 pointer-events-none">
        {showHint && (
          <div className="relative flex items-center">
            {/* The Sonar Ripples around the "M" area */}
            <div className="absolute -left-2 w-10 h-10 rounded-full border border-green-500 animate-sonar" />
            <div className="absolute -left-2 w-10 h-10 rounded-full border border-green-500 animate-sonar [animation-delay:0.5s]" />
            
            {/* The Floating Label */}
            <div className="ml-12 flex items-center gap-2 bg-black/50 dark:bg-green-500/10 border border-black/10 dark:border-green-500/20 px-3 py-1.5 rounded-full backdrop-blur-md animate-in fade-in slide-in-from-left-4 duration-1000">
              <MousePointerClick className="w-3.5 h-3.5 text-black dark:text-green-400" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-black dark:text-green-400 font-bold font-mono">
                System Interface
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