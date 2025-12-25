import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { 
  Play, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Maximize2, 
  Youtube,
  Settings,
  Activity
} from "lucide-react";

const MBackground: React.FC = () => {
  const containerRef = useRef(null);
  
  // Advanced Scroll Parallax for the "M" Backdrop
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const mScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.5]);
  const mOpacity = useTransform(scrollYProgress, [0, 0.4], [0.1, 0.02]);
  const mBlur = useTransform(scrollYProgress, [0, 0.5], ["blur(0px)", "blur(20px)"]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[150vh] w-full bg-white dark:bg-[#050505] transition-colors duration-1000 overflow-hidden"
    >
      {/* 1. BACKGROUND IDENTITY LAYER */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none">
        <motion.h1 
          style={{ scale: mScale, opacity: mOpacity, filter: mBlur }}
          className="text-[60vw] font-black text-zinc-900 dark:text-white leading-none select-none"
        >
          M
        </motion.h1>
        
        {/* Dynamic Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.1] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* 2. FOREGROUND CONTENT: CONCEPTUAL TEXT */}
      <div className="relative z-10 container mx-auto px-6 -mt-[80vh] pb-40">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-[1px] bg-[#00FFB3]" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#00FFB3]">Experimental Lab v4.0</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase mb-8">
            The Neural <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-[#00FFB3] dark:to-cyan-400">
              Workspace.
            </span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 font-medium text-lg leading-relaxed max-w-lg">
            A creative sandbox where interaction design meets automated systems. 
            This space is dedicated to exploring media APIs and glass-morphic controller architectures.
          </p>
        </motion.div>
      </div>

      {/* 3. THE "RICH" MUSIC DOCK SKELETON (Bottom Center) */}
      <div className="fixed bottom-10 left-0 w-full flex justify-center px-6 z-[100]">
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
          className="w-full max-w-3xl h-24 rounded-[32px] bg-zinc-100/80 dark:bg-zinc-900/60 backdrop-blur-3xl border border-zinc-200 dark:border-white/10 shadow-2xl flex items-center justify-between px-8 relative group"
        >
          {/* Subtle Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-[#00FFB3]/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* LEFT: Song Metadata Placeholder */}
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-zinc-200 dark:bg-zinc-800 overflow-hidden relative shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00FFB3]/20 to-transparent" />
                <Youtube className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-zinc-400" size={20} />
            </div>
            <div className="hidden md:block">
              <h4 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-tight">System Anthem</h4>
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest flex items-center gap-2">
                <Activity size={10} className="text-[#00FFB3]" /> Ready to Sync
              </p>
            </div>
          </div>

          {/* CENTER: Playback Controls */}
          <div className="flex items-center gap-6 relative z-10">
            <button className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
              <SkipBack size={20} fill="currentColor" />
            </button>
            <button className="w-12 h-12 rounded-full bg-zinc-900 dark:bg-[#00FFB3] flex items-center justify-center text-white dark:text-black shadow-xl hover:scale-110 active:scale-95 transition-all">
              <Play size={20} fill="currentColor" className="ml-1" />
            </button>
            <button className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
              <SkipForward size={20} fill="currentColor" />
            </button>
          </div>

          {/* RIGHT: Utility Hub */}
          <div className="flex items-center gap-5 relative z-10">
            <div className="hidden sm:flex items-center gap-3 h-8 px-4 rounded-full bg-zinc-200 dark:bg-white/5 border border-zinc-300 dark:border-white/5">
              <Volume2 size={14} className="text-zinc-400" />
              <div className="w-16 h-1 bg-zinc-300 dark:bg-zinc-800 rounded-full overflow-hidden">
                <motion.div 
                   animate={{ width: ["20%", "80%", "50%"] }} 
                   transition={{ repeat: Infinity, duration: 5 }}
                   className="h-full bg-blue-600 dark:bg-[#00FFB3]" 
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all">
                <Maximize2 size={16} />
              </button>
              <button className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all">
                <Settings size={16} className="animate-[spin_4s_linear_infinite]" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 4. ADDITIONAL TEXT SECTION (FOR SCROLLING) */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
           <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-400">Interaction Architecture</h3>
              <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                This music controller is built to prove that functional tools can be beautiful. By integrating the YouTube Music API, 
                I turn a static portfolio into a living media environment. It uses Framer Motion for spring physics and 
                Tailwind CSS for complex glassmorphism effects.
              </p>
           </div>
           <div className="border-l border-zinc-200 dark:border-white/5 pl-8 space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-400">Design Philosophy</h3>
              <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed italic">
                "Speed is nothing without soul. Technology should feel as natural as breathing."
              </p>
           </div>
        </div>
      </div>
    </section>
  );
};

export default MBackground;