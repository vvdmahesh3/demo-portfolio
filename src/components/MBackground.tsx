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
      className="fixed inset-0 z-[200] bg-black overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white z-[210] transition-all"
      >
        <X size={24} />
      </button>

      {/* 1. CINEMATIC BACKGROUND IDENTITY */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.h1 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.05 }}
          className="text-[60vw] font-black text-white leading-none select-none"
        >
          M
        </motion.h1>
        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* 2. CENTER CONTENT */}
      <div className="relative z-10 text-center px-6">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#00FFB3] mb-4 block">
            Experimental Workspace v4.0
          </span>
          {/* FIXED: Removed .text-glow and used standard inline style object for the shadow */}
          <h2 
            className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase mb-6"
            style={{ textShadow: "0 0 30px rgba(0, 255, 179, 0.3)" }}
          >
            I BUILD THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFB3] to-cyan-500">FUTURE</span>
          </h2>
          <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest max-w-lg mx-auto">
            Neural Interface & Media Control Architecture
          </p>
        </motion.div>
      </div>

      {/* 3. THE MUSIC DOCK (SKELETON) */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.4 }}
        className="absolute bottom-10 w-full max-w-4xl px-6"
      >
        <div className="h-24 rounded-[32px] bg-zinc-900/60 backdrop-blur-3xl border border-white/10 shadow-2xl flex items-center justify-between px-8 relative group">
          
          {/* Left: Metadata */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-zinc-800 flex items-center justify-center shadow-lg border border-white/5">
                <Youtube className="text-zinc-500" size={20} />
            </div>
            <div className="hidden md:block text-left">
              <h4 className="text-sm font-black text-white uppercase tracking-tight">System Anthem</h4>
              <p className="text-[9px] text-[#00FFB3] font-bold uppercase tracking-widest flex items-center gap-2">
                <Activity size={10} /> READY TO SYNC
              </p>
            </div>
          </div>

          {/* Center: Controls */}
          <div className="flex items-center gap-6">
            <SkipBack size={20} className="text-zinc-500 cursor-not-allowed" />
            <button className="w-14 h-14 rounded-full bg-[#00FFB3] flex items-center justify-center text-black shadow-[0_0_20px_rgba(0,255,179,0.4)] hover:scale-110 transition-transform">
              <Play size={24} fill="currentColor" className="ml-1" />
            </button>
            <SkipForward size={20} className="text-zinc-500 cursor-not-allowed" />
          </div>

          {/* Right: Hub */}
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-3">
              <Volume2 size={16} className="text-zinc-500" />
              <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  animate={{ width: ["30%", "70%", "45%"] }} 
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="h-full bg-[#00FFB3]" 
                />
              </div>
            </div>
            <Settings size={18} className="text-zinc-500 animate-[spin_8s_linear_infinite]" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MBackground;