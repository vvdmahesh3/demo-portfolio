"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Play, Pause, SkipBack, SkipForward, Volume2, Search, X, 
  Loader2, Music, Sparkles, ChevronRight, Activity, Cpu, Zap, 
  Layers, Command, Share2, Maximize2, Headphones
} from "lucide-react";

interface LabProps { onClose: () => void; }
interface Song { id: string; title: string; artist: string; banner: string; }

const PremiumMusicInterface: React.FC<LabProps> = ({ onClose }) => {
  // --- CORE STATE ---
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [volume, setVolume] = useState(80);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [systemStatus, setSystemStatus] = useState("CALIBRATING");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const API_URL = "https://mahesh-backend-hub.onrender.com";

  // --- DESIGN INTEGRATION: GROK REFERENCE LOGIC ---
  useEffect(() => {
    const sequence = ["BOOT_SYSTEM_V4", "LINKING_NEURAL_NET", "REF_SYNC: COMPLETE", "READY"];
    sequence.forEach((msg, i) => setTimeout(() => setSystemStatus(msg), i * 700));
  }, []);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // --- YOUTUBE API ENGINE ---
  useEffect(() => {
    if (!(window as any).YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
    (window as any).onYouTubeIframeAPIReady = () => {
      playerRef.current = new (window as any).YT.Player("main-audio-engine", {
        height: "0", width: "0",
        playerVars: { controls: 0, rel: 0, origin: window.location.origin },
        events: {
          onReady: (e: any) => { e.target.setVolume(volume); setPlayerReady(true); },
          onStateChange: (e: any) => {
            if (e.data === 1) setIsPlaying(true);
            if (e.data === 2 || e.data === 0) setIsPlaying(false);
          },
        },
      });
    };
  }, []);

  const selectSong = (song: Song) => {
    setCurrentSong(song);
    playerRef.current?.loadVideoById(song.id);
    setIsPlaying(true);
    setSearchOpen(false);
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/music-search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data);
    } catch { setResults([]); } finally { setLoading(false); }
  };

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="fixed inset-0 z-[500] bg-[#050505] text-white overflow-hidden flex flex-col items-center justify-center font-sans"
    >
      {/* Background Cinematic Grain & Glow */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,179,0.02)_0%,transparent_100%)] pointer-events-none" />
      <div id="main-audio-engine" className="absolute invisible" />

      {/* --- TOP HUD NAVIGATION --- */}
      <div className="absolute top-0 w-full p-8 flex justify-between items-center z-[510] mix-blend-difference">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3 text-[#00FFB3] text-[9px] font-mono tracking-[0.5em] uppercase">
            <Cpu size={14} className={isPlaying ? "animate-pulse" : ""} /> {systemStatus}
          </div>
          <div className="text-white/20 text-[8px] uppercase tracking-widest font-mono">
            CORE_ID: 0x8892_PROT // BANDWIDTH: 1.2 GB/S
          </div>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setSearchOpen(true)} className="p-4 rounded-full bg-white/5 border border-white/10 hover:border-[#00FFB3]/50 hover:bg-[#00FFB3]/10 transition-all text-white/40 hover:text-[#00FFB3]">
            <Search size={20} />
          </button>
          <button onClick={onClose} className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-red-500/10 hover:text-red-500 transition-all">
            <X size={20} />
          </button>
        </div>
      </div>

      {/* --- CENTERPIECE: THE GROK REF DESIGN --- */}
      <div className="relative z-10 text-center select-none pointer-events-none">
        <motion.div 
          className="relative"
          animate={{ rotateX: (mousePos.y - window.innerHeight/2) * -0.01, rotateY: (mousePos.x - window.innerWidth/2) * 0.01 }}
        >
          {/* REFERENCE MATCH: Outline Typography Inspired by Reference */}
          <h2 className="text-[150px] md:text-[220px] font-black uppercase tracking-[-0.05em] leading-[0.8] text-transparent stroke-text opacity-40">
            MAHESH
          </h2>
          <h2 className="text-[150px] md:text-[220px] font-black uppercase tracking-[-0.05em] leading-[0.8] absolute top-0 left-0 w-full text-white mix-blend-overlay">
            MAHESH
          </h2>
          
          <div className="mt-6 flex items-center justify-center gap-10">
             <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-[#00FFB3]/30 to-transparent" />
             <span className="text-[10px] font-mono tracking-[1em] text-[#00FFB3] uppercase font-bold">Digital Architect</span>
             <div className="h-[1px] w-32 bg-gradient-to-l from-transparent via-[#00FFB3]/30 to-transparent" />
          </div>
        </motion.div>
      </div>

      {/* --- PREMIUM BOTTOM PLAYER DOCK --- */}
      <div className="absolute bottom-10 w-full max-w-6xl px-8 z-50">
        <motion.div 
          initial={{ y: 100 }} animate={{ y: 0 }}
          className="h-28 rounded-[40px] bg-black/60 backdrop-blur-3xl border border-white/10 flex items-center justify-between px-10 relative group overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
        >
          {/* Dynamic Visualizer Overlay */}
          <div className="absolute inset-0 opacity-20 pointer-events-none flex items-end gap-1 px-1">
            {Array.from({ length: 120 }).map((_, i) => (
              <motion.div 
                key={i} 
                animate={{ height: isPlaying ? [10, Math.random() * 80, 10] : 4 }}
                className="flex-1 bg-[#00FFB3]"
              />
            ))}
          </div>

          {/* Song Metadata */}
          <div className="flex items-center gap-6 w-[350px] relative z-10">
            {currentSong ? (
              <div className="flex items-center gap-5">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-2xl group/art border border-white/20">
                  <img src={currentSong.banner} className="w-full h-full object-cover transition-transform duration-700 group-hover/art:scale-110" alt="art" />
                  {isPlaying && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Zap size={18} className="text-[#00FFB3] animate-pulse" />
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-white truncate max-w-[200px]">{currentSong.title}</h4>
                  <p className="text-[10px] font-mono text-[#00FFB3] uppercase tracking-[0.3em] mt-1 opacity-60">{currentSong.artist}</p>
                </div>
              </div>
            ) : (
              <div onClick={() => setSearchOpen(true)} className="flex items-center gap-4 cursor-pointer text-white/30 hover:text-white transition-all">
                <div className="w-12 h-12 rounded-full border border-dashed border-white/20 flex items-center justify-center"><Headphones size={20} /></div>
                <span className="text-[10px] uppercase font-mono tracking-[0.4em]">Initialize Audio Stream...</span>
              </div>
            )}
          </div>

          {/* Main Controls */}
          <div className="flex items-center gap-12 relative z-10">
            <button className="text-white/20 hover:text-white transition-colors"><SkipBack size={28} /></button>
            <motion.button 
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              onClick={() => isPlaying ? playerRef.current?.pauseVideo() : playerRef.current?.playVideo()}
              className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.2)]"
            >
              {isPlaying ? <Pause size={36} fill="black" /> : <Play size={36} fill="black" className="ml-1" />}
            </motion.button>
            <button className="text-white/20 hover:text-white transition-colors"><SkipForward size={28} /></button>
          </div>

          {/* Tool Section */}
          <div className="flex items-center gap-8 relative z-10">
            <div className="flex items-center gap-4 bg-white/5 px-6 py-3 rounded-full border border-white/10">
               <Volume2 size={18} className="text-[#00FFB3]" />
               <input 
                  type="range" min="0" max="100" value={volume} 
                  onChange={(e) => { setVolume(parseInt(e.target.value)); playerRef.current?.setVolume(parseInt(e.target.value)); }} 
                  className="w-24 accent-[#00FFB3] h-1 rounded-full cursor-pointer bg-white/10" 
                />
            </div>
            <button onClick={() => setSearchOpen(true)} className="w-14 h-14 rounded-full bg-[#00FFB3] text-black hover:scale-105 active:scale-95 transition-all flex items-center justify-center shadow-lg shadow-[#00FFB3]/20">
              <Layers size={22} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* --- ADVANCED SEARCH PANEL (SIDEBAR STYLE) --- */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-2xl flex justify-end"
          >
            <motion.div 
              initial={{ x: 600 }} animate={{ x: 0 }} exit={{ x: 600 }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="w-full max-w-xl h-full border-l border-white/10 flex flex-col p-10 bg-[#080808]"
            >
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4 text-[#00FFB3] text-xs font-mono font-bold tracking-[0.5em] uppercase">
                   <Command size={18} /> Global_Search
                </div>
                <button onClick={() => setSearchOpen(false)} className="text-white/20 hover:text-white"><X size={28} /></button>
              </div>

              <div className="flex gap-4 mb-10">
                <input 
                  autoFocus value={query} onChange={(e) => setQuery(e.target.value)} 
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="&gt; SEARCH_TRACKS..."
                  className="flex-1 bg-white/5 border border-white/10 px-8 py-5 rounded-2xl text-lg font-mono outline-none focus:border-[#00FFB3] transition-all"
                />
                <button onClick={handleSearch} className="bg-[#00FFB3] text-black px-10 rounded-2xl font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all">
                  {loading ? <Loader2 className="animate-spin" /> : "EXEC"}
                </button>
              </div>

              {/* HIGH-SPEED SCROLLABLE RESULTS AREA */}
              <div className="flex-1 overflow-y-auto pr-4 space-y-3 custom-scrollbar">
                {results.length > 0 ? (
                  results.map((song, i) => (
                    <motion.div 
                      key={song.id}
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                      whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.03)" }}
                      onClick={() => selectSong(song)}
                      className="flex items-center gap-5 p-4 rounded-3xl border border-white/5 cursor-pointer group transition-all"
                    >
                      <div className="w-20 h-14 rounded-xl overflow-hidden shadow-lg flex-shrink-0">
                        <img src={song.banner} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <h5 className="text-[13px] font-black uppercase text-white truncate group-hover:text-[#00FFB3] transition-colors">{song.title}</h5>
                        <p className="text-[9px] font-mono text-white/30 uppercase mt-1">{song.artist}</p>
                      </div>
                      <ChevronRight size={18} className="text-white/10 group-hover:text-[#00FFB3]" />
                    </motion.div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-10">
                    <Activity size={48} className="mb-6" />
                    <span className="text-xs uppercase font-mono tracking-[1em]">Awaiting Query Input</span>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .stroke-text {
          -webkit-text-stroke: 2px rgba(255,255,255,0.15);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #00FFB3;
          border-radius: 10px;
        }
        input[type='range'] {
          -webkit-appearance: none;
        }
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 14px;
          width: 14px;
          border-radius: 50%;
          background: #00FFB3;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(0, 255, 179, 0.4);
        }
      `}</style>
    </motion.div>
  );
};

export default PremiumMusicInterface;