// src/components/MBackground.tsx
import React from "react";
import { motion } from "framer-motion";
import { 
  Play, SkipBack, SkipForward, Volume2, 
  Youtube, Settings, Activity, X 
} from "lucide-react";

interface LabProps {
  onClose: () => void;
}

const MBackground: React.FC<LabProps> = ({ onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black overflow-hidden flex flex-col items-center justify-center font-mono"
    >
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white z-[210] transition-all group"
      >
        <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* 1. CINEMATIC BACKGROUND IDENTITY */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.h1 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.03 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-[60vw] font-black text-white leading-none select-none opacity-[0.03]"
        >
          M
        </motion.h1>
        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* 2. CENTER CONTENT - YOUR NAME REPLACED HERE */}
      <div className="relative z-10 text-center px-6">
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h2 
            className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase mb-2 leading-none"
            style={{ 
                textShadow: "0 0 35px rgba(255, 255, 255, 0.2)",
                fontFamily: "var(--font-mono), monospace" 
            }}
          >
            V V D MAHESH <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFB3] to-cyan-400" style={{ filter: "drop-shadow(0 0 20px rgba(0,255,179,0.5))" }}>PERURI</span>
          </h2>
          
          {/* Subtle line decoration matching the "Architecture" vibe */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.8, duration: 1 }}
            className="h-[1px] bg-gradient-to-r from-transparent via-[#00FFB3]/40 to-transparent mt-4"
          />
        </motion.div>
      </div>

      {/* 3. THE MUSIC DOCK (SKELETON) */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.4 }}
        className="absolute bottom-10 w-full max-w-4xl px-6"
      >
        <div className="h-24 rounded-[32px] bg-zinc-950/60 backdrop-blur-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-between px-8 relative group overflow-hidden">
          
          {/* Animated border glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00FFB3]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

          {/* Left: Metadata */}
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center shadow-lg border border-white/5 relative overflow-hidden group/thumb">
                <div className="absolute inset-0 bg-[#00FFB3]/10 opacity-0 group-hover/thumb:opacity-100 transition-opacity" />
                <Youtube className="text-zinc-500 group-hover/thumb:text-[#00FFB3] transition-colors" size={20} />
            </div>
            <div className="hidden md:block text-left">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">System Anthem</h4>
              <p className="text-[9px] text-[#00FFB3] font-bold uppercase tracking-[0.2em] flex items-center gap-2 mt-1">
                <Activity size={10} className="animate-pulse" /> READY TO SYNC
              </p>
            </div>
          </div>

          {/* Center: Controls */}
          <div className="flex items-center gap-6 relative z-10">
            <button className="text-zinc-600 hover:text-white transition-colors">
              <SkipBack size={20} />
            </button>
            <button className="w-14 h-14 rounded-full bg-[#00FFB3] flex items-center justify-center text-black shadow-[0_0_25px_rgba(0,255,179,0.4)] hover:scale-110 active:scale-95 transition-all">
              <Play size={24} fill="currentColor" className="ml-1" />
            </button>
            <button className="text-zinc-600 hover:text-white transition-colors">
              <SkipForward size={20} />
            </button>
          </div>

          {/* Right: Hub */}
          <div className="flex items-center gap-6 relative z-10">
            <div className="hidden sm:flex items-center gap-3">
              <Volume2 size={16} className="text-zinc-500" />
              <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  animate={{ width: ["30%", "70%", "45%"] }} 
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="h-full bg-[#00FFB3]" 
                  style={{ boxShadow: "0 0 10px #00FFB3" }}
                />
              </div>
            </div>
            <Settings size={18} className="text-zinc-500 animate-[spin_10s_linear_infinite] hover:text-white transition-colors cursor-pointer" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MBackground;