// src/components/MobileWarning.tsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Smartphone, X, ChevronRight, Sparkles } from "lucide-react";

const MobileWarning: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    // Check if user already dismissed in this session
    const dismissed = sessionStorage.getItem("mobileWarningDismissed");
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    // Detect screen width
    const checkMobile = () => {
      if (window.innerWidth < 768) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Countdown timer for the skip button
  useEffect(() => {
    if (!isVisible || isDismissed) return;
    if (countdown <= 0) {
      setCanSkip(true);
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, isVisible, isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem("mobileWarningDismissed", "true");
  };

  if (isDismissed || !isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-6"
      >
        {/* Deep blurred background with animated gradient */}
        <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" />
        
        {/* Ambient glow orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -40, 20, 0],
              scale: [1, 1.2, 0.9, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-20 -left-20 w-[300px] h-[300px] rounded-full bg-[#00FFB3]/10 blur-[100px]"
          />
          <motion.div
            animate={{
              x: [0, -30, 20, 0],
              y: [0, 30, -30, 0],
              scale: [1, 0.9, 1.2, 1],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-20 -right-20 w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[100px]"
          />
        </div>

        {/* Content Card */}
        <motion.div
          initial={{ scale: 0.85, y: 40 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-md"
        >
          {/* Glass card */}
          <div className="relative rounded-[40px] overflow-hidden border border-white/10">
            {/* Top gradient accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-[#00FFB3] via-cyan-400 to-[#00FFB3]" />

            <div className="bg-zinc-950/80 backdrop-blur-2xl p-10">
              {/* Device Animation */}
              <div className="flex items-center justify-center gap-8 mb-10">
                {/* Phone (crossed out) */}
                <motion.div
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="relative"
                >
                  <div className="w-16 h-24 rounded-2xl border-2 border-red-500/40 bg-red-500/5 flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-red-500/60" />
                  </div>
                  {/* Diagonal cross */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[120%] h-[2px] bg-red-500/60 rotate-45 rounded-full" />
                  </div>
                </motion.div>

                {/* Arrow animation */}
                <motion.div
                  animate={{ x: [0, 6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="flex items-center gap-1"
                >
                  <ChevronRight className="w-4 h-4 text-zinc-600" />
                  <ChevronRight className="w-4 h-4 text-zinc-500" />
                  <ChevronRight className="w-4 h-4 text-[#00FFB3]/70" />
                </motion.div>

                {/* Desktop (highlighted) */}
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 0px rgba(0,255,179,0)",
                      "0 0 30px rgba(0,255,179,0.3)",
                      "0 0 0px rgba(0,255,179,0)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-20 h-16 rounded-2xl border-2 border-[#00FFB3]/50 bg-[#00FFB3]/5 flex items-center justify-center"
                >
                  <Monitor className="w-8 h-8 text-[#00FFB3]" />
                </motion.div>
              </div>

              {/* Header with sparkle */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00FFB3]/20 bg-[#00FFB3]/5 mb-5">
                  <Sparkles className="w-3 h-3 text-[#00FFB3]" />
                  <span className="text-[8px] font-black uppercase tracking-[0.3em] text-[#00FFB3]">
                    Experience Notice
                  </span>
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight uppercase leading-tight mb-3">
                  Desktop <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFB3] to-cyan-400">
                    Recommended
                  </span>
                </h2>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-xs mx-auto">
                  This portfolio features advanced animations, parallax effects, and interactive elements best experienced on a larger screen.
                </p>
              </div>

              {/* Feature pills */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {["3D Effects", "AI Assistant", "Music Lab", "Parallax"].map(
                  (feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-[9px] font-bold text-zinc-400 uppercase tracking-wider"
                    >
                      {feature}
                    </span>
                  )
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {/* Continue Button */}
                <motion.button
                  whileHover={canSkip ? { scale: 1.02 } : {}}
                  whileTap={canSkip ? { scale: 0.98 } : {}}
                  onClick={canSkip ? handleDismiss : undefined}
                  disabled={!canSkip}
                  className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-500 ${
                    canSkip
                      ? "bg-[#00FFB3] text-black shadow-[0_10px_40px_rgba(0,255,179,0.2)] cursor-pointer"
                      : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                  }`}
                >
                  {canSkip ? (
                    <>
                      Continue Anyway
                      <ChevronRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Continue in {countdown}s
                      <div className="w-4 h-4 border-2 border-zinc-500 border-t-zinc-300 rounded-full animate-spin" />
                    </>
                  )}
                </motion.button>

                {/* Subtle hint */}
                <p className="text-center text-[9px] text-zinc-600 font-mono tracking-widest uppercase">
                  Optimized for 1024px+ viewports
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MobileWarning;
