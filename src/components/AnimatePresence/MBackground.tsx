// src/components/MBackground.tsx
import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, 
  Youtube, Settings, Activity, X, Share2
} from "lucide-react";

interface LabProps {
  onClose: () => void;
}

const MBackground: React.FC<LabProps> = ({ onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(65);
  
  // Magnetic Effect Logic for the Close Button
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black overflow-hidden flex flex-col items-center justify-center font-mono"
    >
      {/* MAGNETIC CLOSE BUTTON */}
      <motion.button 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClose}
        style={{ x: smoothX, y: smoothY }}
        className="absolute top-10 right-10 p-5 rounded-full bg-white/5 border border-white/10 text-white z-[210] transition-colors hover:bg-[#00FFB3]/10 hover:text-[#00FFB3] group"
      >
        <X size={24} className="group-hover:rotate-90 transition-transform duration-500" />
      </motion.button>

      {/* 1. CINEMATIC BACKGROUND */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.h1 
          animate={{ 
            scale: isPlaying ? [1, 1.05, 1] : 1,
            opacity: isPlaying ? [0.03, 0.06, 0.03] : 0.03 
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-[60vw] font-black text-white leading-none select-none opacity-[0.03]"
        >
          M
        </motion.h1>
        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* 2. CENTER CONTENT - THE IDENTITY */}
      <div className="relative z-10 text-center px-6">
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative"
        >
          <h2 
            className="text-5xl md:text-9xl font-black text-white tracking-tighter uppercase mb-2 leading-none"
            style={{ 
                textShadow: "0 0 50px rgba(0, 255, 179, 0.2)",
                fontFamily: "var(--font-mono), monospace" 
            }}
          >
            V V D MAHESH <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFB3] to-cyan-400" style={{ filter: "drop-shadow(0 0 25px rgba(0,255,179,0.6))" }}>PERURI</span>
          </h2>
          
          <div className="flex justify-center items-center gap-4 mt-6">
            <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-[#00FFB3]/40" />
            <span className="text-[10px] tracking-[0.6em] text-[#00FFB3] uppercase font-bold animate-pulse">Neural Workspace Active</span>
            <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-[#00FFB3]/40" />
          </div>
        </motion.div>
      </div>

      {/* 3. THE INTERACTIVE MUSIC COMMANDER */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.4 }}
        className="absolute bottom-10 w-full max-w-5xl px-6"
      >
        <div className="h-28 rounded-[40px] bg-zinc-950/40 backdrop-blur-3xl border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.8)] flex items-center justify-between px-10 relative group overflow-hidden">
          
          {/* Scanning Line Effect */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-[#00FFB3]/20 animate-[scan_4s_linear_infinite]" />

          {/* LEFT: Metadata & Active Viz */}
          <div className="flex items-center gap-6 relative z-10">
            <div className="w-16 h-16 rounded-[24px] bg-zinc-900 border border-white/5 flex items-center justify-center relative overflow-hidden group/thumb shadow-2xl">
                <Youtube className={`transition-all duration-500 ${isPlaying ? 'text-[#00FFB3] scale-110' : 'text-zinc-600'}`} size={24} />
                {isPlaying && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-[#00FFB3] animate-pulse" />
                )}
            </div>
            <div className="hidden lg:block text-left">
              <h4 className="text-xs font-black text-white uppercase tracking-wider mb-1">System Anthem</h4>
              <div className="flex items-center gap-2">
                <div className="flex gap-[2px] items-end h-3">
                   {[0.4, 0.7, 0.3, 0.9].map((h, i) => (
                     <motion.div 
                       key={i}
                       animate={{ height: isPlaying ? ["20%", "100%", "20%"] : "20%" }}
                       transition={{ repeat: Infinity, duration: h + 0.5, delay: i * 0.1 }}
                       className="w-[2px] bg-[#00FFB3]"
                     />
                   ))}
                </div>
                <p className="text-[9px] text-[#00FFB3] font-bold uppercase tracking-[0.2em]">Ready to Sync</p>
              </div>
            </div>
          </div>

          {/* CENTER: Playback Engine */}
          <div className="flex items-center gap-8 relative z-10">
            <button className="text-zinc-600 hover:text-white transition-all hover:scale-110"><SkipBack size={22} /></button>
            
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 rounded-full bg-[#00FFB3] flex items-center justify-center text-black shadow-[0_0_30px_rgba(0,255,179,0.5)] hover:scale-110 active:scale-95 transition-all"
            >
              {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
            </button>

            <button className="text-zinc-600 hover:text-white transition-all hover:scale-110"><SkipForward size={22} /></button>
          </div>

          {/* RIGHT: System Utilities */}
          <div className="flex items-center gap-8 relative z-10">
            <div className="hidden sm:flex items-center gap-4">
              <Volume2 size={18} className="text-zinc-500" />
              <input 
                type="range" 
                min="0" max="100" 
                value={volume}
                onChange={(e) => setVolume(parseInt(e.target.value))}
                className="w-24 accent-[#00FFB3] bg-white/10 h-1 rounded-full cursor-pointer hover:accent-[#00FFB3] transition-all"
              />
            </div>
            <div className="flex gap-4">
              <Share2 size={18} className="text-zinc-500 hover:text-white cursor-pointer transition-colors" />
              <Settings size={18} className={`text-zinc-500 cursor-pointer hover:text-white ${isPlaying ? 'animate-[spin_8s_linear_infinite]' : ''}`} />
            </div>
          </div>
        </div>
      </motion.div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(112px); opacity: 0; }
        }
      `}</style>
    </motion.div>
  );
};

export default MBackground;