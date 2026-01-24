"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, Search, X, Loader2, Music, ChevronRight, Volume2, Zap, Activity, Cpu } from "lucide-react";

interface LabProps { onClose: () => void; }
interface Song { id: string; title: string; artist: string; banner: string; }

const MBackground: React.FC<LabProps> = ({ onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const playerRef = useRef<any>(null);
  const API_URL = "https://mahesh-backend-hub.onrender.com";

  // Instant Search Engine
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.length > 2) performSearch();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/music-search?q=${encodeURIComponent(query)}`);
      setResults(await res.json());
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    if (!(window as any).YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
    (window as any).onYouTubeIframeAPIReady = () => {
      playerRef.current = new (window as any).YT.Player("yt-instance", {
        height: "0", width: "0",
        playerVars: { controls: 0, rel: 0 },
        events: { onStateChange: (e: any) => setIsPlaying(e.data === 1) },
      });
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[500] bg-[#030303] text-white overflow-hidden flex items-center justify-center font-sans select-none"
    >
      <div id="yt-instance" className="absolute invisible" />
      
      {/* --- CINEMATIC DESIGNER BACKGROUND --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,179,0.05)_0%,transparent_80%)]" />
        <div className="absolute inset-0 opacity-20 mix-blend-overlay noise-bg" />
      </div>

      {/* --- THE "IDENTITY" - GROK STYLE EVOLVED --- */}
      <div className="relative z-10 text-center pointer-events-none">
        <motion.div style={{ x: useTransform(smoothX, [0, 2000], [-20, 20]), y: useTransform(smoothY, [0, 1000], [-20, 20]) }}>
          <h1 className="text-[16vw] font-black tracking-[-0.06em] leading-none text-transparent main-outline opacity-5">
            MAHESH VVD
          </h1>
          <h1 
            className="absolute top-0 left-0 text-[16vw] font-black tracking-[-0.06em] leading-none text-transparent neon-stroke"
            style={{
              maskImage: `radial-gradient(circle 220px at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`,
              WebkitMaskImage: `radial-gradient(circle 220px at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`
            }}
          >
            MAHESH VVD
          </h1>
          <motion.h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter text-white/10 -mt-10 group-hover:text-white/20 transition-colors">
            PERURI
          </motion.h2>
        </motion.div>
      </div>

      {/* --- TOP HUD SYSTEM --- */}
      <div className="absolute top-0 w-full p-10 flex justify-between items-start z-50 pointer-events-none">
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-lg backdrop-blur-xl">
                <div className="w-2 h-2 rounded-full bg-[#00FFB3] animate-pulse" />
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#00FFB3]">System_Active: Ready</span>
            </div>
            <span className="text-[8px] font-mono text-white/20 ml-1">COORD: 17.3850° N, 78.4867° E</span>
        </div>
        <button onClick={onClose} className="pointer-events-auto p-4 rounded-full bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/50 transition-all group">
            <X size={20} className="text-white/40 group-hover:text-red-500" />
        </button>
      </div>

      {/* --- THE NEURAL PLAYER DOCK --- */}
      <div className="absolute bottom-10 w-full max-w-5xl px-8 z-50">
        <motion.div 
            initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="relative flex items-center justify-between bg-black/60 backdrop-blur-[50px] border border-white/10 p-5 rounded-[40px] shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden"
        >
            {/* Real-time Frequency Bar */}
            <div className="absolute bottom-0 left-0 w-full h-1 flex items-end gap-0.5 opacity-30">
                {[...Array(80)].map((_, i) => (
                    <motion.div key={i} animate={{ height: isPlaying ? [2, Math.random() * 20 + 2, 2] : 2 }} className="flex-1 bg-[#00FFB3]" transition={{ repeat: Infinity, duration: 0.5 }} />
                ))}
            </div>

            {/* Song Details with Marquee */}
            <div className="flex items-center gap-6 w-1/3">
                <div className={`w-14 h-14 rounded-2xl overflow-hidden border border-white/10 transition-transform duration-700 ${isPlaying ? 'scale-110 rotate-[10deg]' : ''}`}>
                    {currentSong ? <img src={currentSong.banner} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-white/5 flex items-center justify-center"><Music className="text-white/10" /></div>}
                </div>
                <div className="overflow-hidden flex-1">
                    <div className="whitespace-nowrap flex gap-10">
                        <h4 className="text-xs font-black uppercase tracking-widest text-white">
                            {currentSong ? currentSong.title : "SELECT_SIGNAL"}
                        </h4>
                    </div>
                    <p className="text-[9px] font-mono text-[#00FFB3] uppercase mt-1 tracking-widest opacity-60">
                        {currentSong ? currentSong.artist : "Awaiting Frequency"}
                    </p>
                </div>
            </div>

            {/* Centered Controls */}
            <div className="flex items-center gap-10">
                <button onClick={() => playerRef.current?.seekTo(playerRef.current.getCurrentTime() - 10)} className="text-white/20 hover:text-white transition-colors"><SkipBack size={22} /></button>
                <motion.button 
                    whileHover={{ scale: 1.1, boxShadow: "0 0 40px rgba(0, 255, 179, 0.2)" }} whileTap={{ scale: 0.9 }}
                    onClick={() => isPlaying ? playerRef.current.pauseVideo() : playerRef.current.playVideo()}
                    className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center shadow-2xl"
                >
                    {isPlaying ? <Pause size={32} fill="black" /> : <Play size={32} fill="black" className="ml-1" />}
                </motion.button>
                <button onClick={() => playerRef.current?.seekTo(playerRef.current.getCurrentTime() + 10)} className="text-white/20 hover:text-white transition-colors"><SkipForward size={22} /></button>
            </div>

            {/* Advanced Search Toggle */}
            <div className="flex justify-end items-center gap-6 w-1/3">
                <div className="h-10 w-[1px] bg-white/10" />
                <button 
                    onClick={() => setSearchOpen(!searchOpen)}
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${searchOpen ? 'bg-red-500/10 text-red-500' : 'bg-[#00FFB3] text-black hover:scale-110'}`}
                >
                    {searchOpen ? <X size={24} /> : <Search size={24} />}
                </button>
            </div>
        </motion.div>
      </div>

      {/* --- THE MASTER SEARCH INTERFACE --- */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, backdropFilter: "blur(0px)" }} 
            animate={{ opacity: 1, scale: 1, backdropFilter: "blur(40px)" }} 
            exit={{ opacity: 0, scale: 0.9, backdropFilter: "blur(0px)" }}
            className="absolute inset-0 z-[100] bg-black/80 flex flex-col items-center justify-center p-10"
          >
            <div className="w-full max-w-5xl">
                <div className="flex flex-col mb-12">
                    <h2 className="text-7xl font-black italic uppercase tracking-tighter text-white">Music Hub</h2>
                    <div className="flex items-center gap-3 mt-2">
                        <Zap size={14} className="text-[#00FFB3]" />
                        <span className="text-[10px] font-mono tracking-[0.5em] text-[#00FFB3] uppercase">v3.0_Interface_Advanced</span>
                    </div>
                </div>

                <div className="relative mb-12">
                    <input 
                        autoFocus className="w-full bg-transparent border-b-2 border-white/10 p-6 text-5xl font-light text-white outline-none focus:border-[#00FFB3] transition-all placeholder:text-white/5"
                        placeholder="Type track or artist..." value={query} onChange={(e) => setQuery(e.target.value)}
                    />
                    <div className="absolute right-0 bottom-6 flex items-center gap-4">
                        {loading && <Loader2 className="animate-spin text-[#00FFB3]" size={32} />}
                        <Search size={40} className="text-white/10" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[45vh] overflow-y-auto custom-scrollbar pr-6">
                    {results.map((song) => (
                        <motion.div 
                            key={song.id} whileHover={{ x: 15, backgroundColor: "rgba(255,255,255,0.03)" }}
                            onClick={() => { setCurrentSong(song); playerRef.current.loadVideoById(song.id); setSearchOpen(false); }}
                            className="flex items-center gap-6 p-4 rounded-3xl border border-white/5 bg-white/[0.02] cursor-pointer group transition-all"
                        >
                            <img src={song.banner} className="w-24 h-16 rounded-xl object-cover shadow-2xl group-hover:scale-105 transition-transform" />
                            <div className="flex-1">
                                <h5 className="text-sm font-black text-white group-hover:text-[#00FFB3] uppercase tracking-tight truncate">{song.title}</h5>
                                <p className="text-[10px] font-mono text-white/30 uppercase mt-1 tracking-widest">{song.artist}</p>
                            </div>
                            <ChevronRight size={20} className="text-white/10 group-hover:text-[#00FFB3] group-hover:translate-x-2 transition-all" />
                        </motion.div>
                    ))}
                    {!loading && results.length === 0 && (
                        <div className="col-span-2 py-20 text-center text-white/5 text-[10px] font-mono tracking-[2em] uppercase">Awaiting_Signal</div>
                    )}
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .main-outline { -webkit-text-stroke: 1px rgba(255,255,255,0.2); }
        .neon-stroke { 
            -webkit-text-stroke: 2px #00FFB3; 
            filter: drop-shadow(0 0 25px rgba(0,255,179,0.9));
        }
        .noise-bg { background-image: url('https://grainy-gradients.vercel.app/noise.svg'); }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #00FFB3; border-radius: 10px; }
      `}</style>
    </motion.div>
  );
};

export default MBackground;