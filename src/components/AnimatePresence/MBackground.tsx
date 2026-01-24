"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, Search, X, Loader2, Music, ChevronRight, VolumeX, Volume2, Zap } from "lucide-react";

interface LabProps { onClose: () => void; }
interface Song { id: string; title: string; artist: string; banner: string; }

const MBackground: React.FC<LabProps> = ({ onClose }) => {
  // --- CORE SYSTEM STATE ---
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  // --- INTERACTIVE MOTION VALUES ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const playerRef = useRef<any>(null);
  const API_URL = "https://mahesh-backend-hub.onrender.com";

  // ================= 1. INSTANT SEARCH LOGIC =================
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.length > 2) performSearch();
    }, 300); // Fast 300ms trigger

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/music-search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data);
    } catch (e) { console.error("Search Failed", e); }
    setLoading(false);
  };

  // ================= 2. INTERACTION HANDLERS =================
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // YouTube API Bridge
  useEffect(() => {
    if (!(window as any).YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
    (window as any).onYouTubeIframeAPIReady = () => {
      playerRef.current = new (window as any).YT.Player("yt-instance", {
        height: "0", width: "0",
        playerVars: { controls: 0, rel: 0, showinfo: 0 },
        events: {
          onStateChange: (e: any) => setIsPlaying(e.data === 1),
        },
      });
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[500] bg-[#020202] text-white overflow-hidden flex items-center justify-center select-none cursor-crosshair"
    >
      {/* 1. CINEMATIC BACKGROUND LAYERS */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,179,0.03)_0%,transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay noise-bg" />
      </div>

      <div id="yt-instance" className="absolute invisible" />

      {/* 2. THE "LIVING" NAME (DYNAMIC GLOW) */}
      <div className="relative z-10 text-center">
        <motion.div 
          style={{ x: useTransform(smoothX, [0, 2000], [-15, 15]), y: useTransform(smoothY, [0, 1000], [-15, 15]) }}
          className="relative group"
        >
          {/* Main Typography Style: Ultra-Clean Thin Outline */}
          <h1 className="text-[15vw] font-black tracking-[-0.08em] leading-none text-transparent main-outline opacity-10 transition-opacity duration-1000 group-hover:opacity-20">
            MAHESH VVD
          </h1>
          
          {/* Mouse-Driven Neon Trail Mask */}
          <h1 
            className="absolute top-0 left-0 text-[15vw] font-black tracking-[-0.08em] leading-none text-transparent neon-stroke select-none"
            style={{
              maskImage: `radial-gradient(circle 180px at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`,
              WebkitMaskImage: `radial-gradient(circle 180px at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`
            }}
          >
            MAHESH VVD
          </h1>

          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-6">
            <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-[#00FFB3] opacity-20" />
            <span className="text-[12px] font-mono tracking-[1em] text-[#00FFB3] uppercase opacity-40">Architecting Reality</span>
            <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-[#00FFB3] opacity-20" />
          </div>
        </motion.div>
      </div>

      {/* 3. NEURAL FLOATING PLAYER DOCK */}
      <div className="absolute bottom-10 w-full max-w-5xl px-8 z-50">
        <motion.div 
          initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          className="group relative flex items-center justify-between bg-black/40 backdrop-blur-3xl border border-white/5 p-4 rounded-[32px] hover:border-[#00FFB3]/20 transition-all duration-700 shadow-2xl"
        >
          {/* Visualizer Background */}
          <div className="absolute inset-0 overflow-hidden rounded-[32px] pointer-events-none opacity-20">
             <div className="absolute bottom-0 flex items-end gap-1 w-full justify-around h-full">
                {[...Array(40)].map((_, i) => (
                  <motion.div 
                    key={i} animate={{ height: isPlaying ? [5, Math.random() * 40 + 10, 5] : 5 }}
                    className="w-[2px] bg-[#00FFB3]" transition={{ repeat: Infinity, duration: 0.6 }}
                  />
                ))}
             </div>
          </div>

          {/* Left: Metadata */}
          <div className="relative z-10 flex items-center gap-6 min-w-[300px]">
            <div className={`w-16 h-16 rounded-2xl overflow-hidden border border-white/10 transition-transform duration-700 ${isPlaying ? 'rotate-[360deg] scale-110 shadow-[0_0_30px_rgba(0,255,179,0.3)]' : ''}`}>
              {currentSong ? <img src={currentSong.banner} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-white/5 flex items-center justify-center"><Music className="text-white/20" /></div>}
            </div>
            <div>
              <h4 className="text-[11px] font-black uppercase text-white tracking-widest">{currentSong ? currentSong.title : "IDLE_SYSTEM"}</h4>
              <p className="text-[9px] font-mono text-[#00FFB3] opacity-50 mt-1 uppercase tracking-tighter">{currentSong ? currentSong.artist : "Awaiting Frequency"}</p>
            </div>
          </div>

          {/* Center: Controls */}
          <div className="relative z-10 flex items-center gap-10">
            <button onClick={() => playerRef.current?.seekTo(playerRef.current.getCurrentTime() - 10)} className="text-white/20 hover:text-white transition-colors"><SkipBack size={22} /></button>
            <motion.button 
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              onClick={() => isPlaying ? playerRef.current.pauseVideo() : playerRef.current.playVideo()}
              className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center shadow-2xl"
            >
              {isPlaying ? <Pause size={30} fill="black" /> : <Play size={30} fill="black" className="ml-1" />}
            </motion.button>
            <button onClick={() => playerRef.current?.seekTo(playerRef.current.getCurrentTime() + 10)} className="text-white/20 hover:text-white transition-colors"><SkipForward size={22} /></button>
          </div>

          {/* Right: Modern Search UI */}
          <div className="relative z-10 flex items-center gap-6">
            <div className="h-10 w-[1px] bg-white/10" />
            <motion.div 
              animate={{ width: searchOpen ? 300 : 64 }}
              className="h-16 flex items-center bg-white/5 rounded-full border border-white/5 overflow-hidden transition-all duration-500"
            >
               <button onClick={() => setSearchOpen(!searchOpen)} className="w-16 h-16 flex items-center justify-center text-white hover:text-[#00FFB3] transition-colors">
                  <Search size={22} />
               </button>
               {searchOpen && (
                 <input 
                  autoFocus className="flex-1 bg-transparent border-none outline-none text-sm font-mono placeholder:text-white/10"
                  placeholder="SEARCH_SIGNAL..." value={query} onChange={(e) => setQuery(e.target.value)}
                 />
               )}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* 4. INSTANT SEARCH RESULTS DRAWER */}
      <AnimatePresence>
        {searchOpen && results.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
            className="absolute bottom-32 w-full max-w-lg right-10 z-40 bg-black/80 backdrop-blur-3xl border border-white/10 rounded-[32px] p-4 shadow-3xl overflow-hidden"
          >
            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
              {results.map((song) => (
                <motion.div 
                  key={song.id} whileHover={{ x: 10, backgroundColor: "rgba(0, 255, 179, 0.05)" }}
                  onClick={() => { setCurrentSong(song); playerRef.current.loadVideoById(song.id); setSearchOpen(false); }}
                  className="flex items-center gap-4 p-3 rounded-2xl cursor-pointer group transition-all"
                >
                  <img src={song.banner} className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="text-[11px] font-bold text-white group-hover:text-[#00FFB3] truncate">{song.title}</p>
                    <p className="text-[9px] text-white/30 uppercase font-mono">{song.artist}</p>
                  </div>
                  {loading ? <Loader2 className="animate-spin text-[#00FFB3]" size={14} /> : <ChevronRight size={16} className="text-white/10" />}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .main-outline { -webkit-text-stroke: 1px rgba(255,255,255,0.4); }
        .neon-stroke { 
            -webkit-text-stroke: 2px #00FFB3; 
            filter: drop-shadow(0 0 20px rgba(0,255,179,0.8));
        }
        .noise-bg { background-image: url('https://grainy-gradients.vercel.app/noise.svg'); }
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #00FFB3; border-radius: 10px; }
      `}</style>
    </motion.div>
  );
};

export default MBackground;