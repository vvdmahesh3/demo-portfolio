// src/components/Hero.tsx
import React, { useEffect, useState } from "react";
import ProximityText from "./ProximityText";
import { Github, Linkedin, Mail } from "lucide-react";
import WithText from "./WithText";

export default function Hero() {
  const [showScrollIcon, setShowScrollIcon] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowScrollIcon(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const marqueeText =
    "I BUILD THE FUTURE. I BUILD THE FUTURE. I BUILD THE FUTURE. I BUILD THE FUTURE.";

  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-4 text-center bg-white dark:bg-black transition-colors duration-700"
    >
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
