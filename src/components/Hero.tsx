import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProximityText from "./ProximityText";
import { Github, Linkedin, Mail, ArrowDown, Send } from "lucide-react";
import WithText from "./WithText";

export default function Hero() {
  const [showCTA, setShowCTA] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const ctaTimer = setTimeout(() => setShowCTA(true), 2800);
    return () => clearTimeout(ctaTimer);
  }, []);

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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

      {/* ✨ Premium Contact Me CTA — Replaces old "Scroll" indicator */}
      <AnimatePresence>
        {showCTA && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-10 z-20 flex flex-col items-center"
          >
            <button
              onClick={handleContactClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="hero-cta-btn group relative flex flex-col items-center cursor-pointer focus:outline-none"
              aria-label="Contact Me"
            >
              {/* Outer Sonar Rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="hero-cta-ring hero-cta-ring--1" />
                <span className="hero-cta-ring hero-cta-ring--2" />
                <span className="hero-cta-ring hero-cta-ring--3" />
              </div>

              {/* Core Icon Container */}
              <motion.div
                animate={{
                  y: isHovered ? -4 : [0, -8, 0],
                  scale: isHovered ? 1.15 : 1,
                }}
                transition={
                  isHovered
                    ? { duration: 0.3, ease: "easeOut" }
                    : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
                }
                className="relative w-16 h-16 rounded-full flex items-center justify-center"
              >
                {/* Glassmorphism Background */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600/20 to-indigo-600/20 dark:from-[#00FFB3]/20 dark:to-cyan-400/20 backdrop-blur-xl border border-blue-500/30 dark:border-[#00FFB3]/30 shadow-[0_0_30px_rgba(37,99,235,0.15)] dark:shadow-[0_0_30px_rgba(0,255,179,0.15)] group-hover:shadow-[0_0_50px_rgba(37,99,235,0.3)] dark:group-hover:shadow-[0_0_50px_rgba(0,255,179,0.3)] transition-shadow duration-500" />
                
                {/* Inner Gradient Core */}
                <div className="absolute inset-[3px] rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-[#00FFB3] dark:to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon */}
                <motion.div
                  animate={{ rotate: isHovered ? 0 : 0 }}
                  className="relative z-10"
                >
                  {isHovered ? (
                    <Send className="w-6 h-6 text-blue-600 dark:text-[#00FFB3] group-hover:text-white dark:group-hover:text-black transition-colors duration-300" />
                  ) : (
                    <ArrowDown className="w-6 h-6 text-blue-600 dark:text-[#00FFB3] transition-colors duration-300" />
                  )}
                </motion.div>
              </motion.div>

              {/* Label Text */}
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-4 relative overflow-hidden"
              >
                <span className="hero-cta-label block text-[10px] font-black uppercase tracking-[0.35em] text-zinc-400 dark:text-zinc-500 group-hover:text-blue-600 dark:group-hover:text-[#00FFB3] transition-colors duration-500">
                  {isHovered ? "Let's Connect" : "Contact Me"}
                </span>
                {/* Animated underline */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-[#00FFB3] dark:to-cyan-400 origin-left"
                />
              </motion.div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}