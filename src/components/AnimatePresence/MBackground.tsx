"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, Pause, SkipBack, SkipForward, Volume2, Search, X, 
  Loader2, Music, Sparkles, ChevronRight, Activity, Terminal, 
  Cpu, Zap, Maximize2, ListMusic, Waves
} from "lucide-react";

interface LabProps { onClose: () => void; }
interface Song { id: string; title: string; artist: string; banner: string; }

const PremiumMBackground: React.FC<LabProps> = ({ onClose }) => {
  // --- CORE STATE ---
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [volume, setVolume] = useState(70);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // --- SYSTEM STATES ---
  const [systemStatus, setSystemStatus] = useState("SYSTEM_OFFLINE");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const playerRef = useRef<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const API_URL = "https://mahesh-backend-hub.onrender.com";

  // Boot sequence
  useEffect(() => {
    const sequence = ["BOOT_SEQUENCE_ALPHA", "LOADING_SHADERS", "NEURAL_LINK_ESTABLISHED", "SYSTEM_READY"];
    sequence.forEach((msg, i) => setTimeout(() => setSystemStatus(msg), i * 800));
  }, []);

  // Cursor Tracking
  useEffect(() => {
    const handleMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // ================= YOUTUBE ENGINE =================
  useEffect(() => {
    if (!(window as any).YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
    (window as any).onYouTubeIframeAPIReady = () => {
      playerRef.current = new (window as any).YT.Player("premium-player", {
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
    setIsTransitioning(true);
    setCurrentSong(song);
    playerRef.current?.loadVideoById(song.id);
    setIsPlaying(true);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/music-search?q=${encodeURIComponent(query)}`);
      setResults(await res.json());
    } catch { setResults([]); } finally { setLoading(false); }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="fixed inset-0 z-[500] bg-[#050505] text-white font-sans overflow-hidden selection:bg-[#00FFB3] selection:text-black"
    >
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,179,0.03)_0%,transparent_70%)] pointer-events-none" />
      <div id="premium-player" className="absolute invisible" />

      {/* --- TOP NAVIGATION BAR --- */}
      <nav className="absolute top-0 w-full h-20 px-8 flex items-center justify-between z-[600] border-b border-white/5 backdrop-blur-md">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-[#00FFB3] animate-pulse" />
             <span className="font-mono text-[10px] tracking-[0.3em] text-[#00FFB3] uppercase">{systemStatus}</span>
          </div>
          <div className="h-4 w-[1px] bg-white/10" />
          <span className="font-mono text-[10px] text-white/30 tracking-widest uppercase">LATENCY: 0.004ms</span>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSearchOpen(!searchOpen)}
            className="group flex items-center gap-3 bg-white/5 hover:bg-[#00FFB3] px-6 py-2.5 rounded-full border border-white/10 hover:border-[#00FFB3] transition-all duration-500"
          >
            <Search size={16} className="text-white group-hover:text-black transition-colors" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white group-hover:text-black">Open Terminal</span>
          </button>
          <button onClick={onClose} className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/50 transition-all text-white/40 hover:text-red-500">
            <X size={20} />
          </button>
        </div>
      </nav>

      {/* --- MAIN INTERFACE (ABOVE THE 'M') --- */}
      <main className="relative h-full w-full flex flex-col items-center justify-center p-20">
        
        {/* Abstract "Neural Mesh" Visualizer */}
        <div className="absolute top-[15%] w-full flex justify-center pointer-events-none">
          <div className="relative">
            <motion.div 
              animate={{ 
                scale: isPlaying ? [1, 1.05, 1] : 1,
                rotate: isPlaying ? [0, 5, -5, 0] : 0
              }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="w-[500px] h-[300px] rounded-full bg-[#00FFB3]/5 blur-[120px]" 
            />
            {/* Geometric accents above the name */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[800px] h-[1px] bg-gradient-to-r from-transparent via-[#00FFB3]/20 to-transparent" />
              <div className="absolute w-[1px] h-[400px] bg-gradient-to-b from-transparent via-[#00FFB3]/20 to-transparent" />
            </div>
          </div>
        </div>

        {/* HERO TITLE - Designer Quality Fonts */}
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h1 className="text-[120px] md:text-[180px] font-black tracking-tighter leading-[0.8] mb-4">
              <span className="block text-white">MAHESH</span>
              <span className="block italic bg-clip-text text-transparent bg-gradient-to-r from-[#00FFB3] to-[#00ffee] drop-shadow-[0_0_30px_rgba(0,255,179,0.3)]">PERURI</span>
            </h1>
            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="h-[1px] w-12 bg-[#00FFB3]/40" />
              <span className="text-xs font-mono tracking-[0.6em] text-white/40 uppercase">Interactive Architect</span>
              <div className="h-[1px] w-12 bg-[#00FFB3]/40" />
            </div>
          </motion.div>
        </div>
      </main>

      {/* --- MODERN MUSIC DOCK (Bottom Bar) --- */}
      <footer className="absolute bottom-8 left-0 w-full px-8 z-[700]">
        <motion.div 
          layout
          className="max-w-6xl mx-auto h-24 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[30px] flex items-center justify-between px-8 shadow-2xl"
        >
          {/* Track Info */}
          <div className="flex items-center gap-5 w-[30%]">
            <AnimatePresence mode="wait">
              {currentSong ? (
                <motion.div 
                  key={currentSong.id}
                  initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                  className="flex items-center gap-4"
                >
                  <div className="relative group">
                    <img src={currentSong.banner} alt="art" className="w-14 h-14 rounded-xl object-cover border border-white/10 group-hover:scale-105 transition-transform duration-500" />
                    {isPlaying && <Waves className="absolute bottom-1 right-1 text-[#00FFB3] animate-bounce" size={14} />}
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="text-sm font-bold text-white truncate w-48">{currentSong.title}</h4>
                    <p className="text-[10px] font-mono text-[#00FFB3] uppercase tracking-wider opacity-60">{currentSong.artist}</p>
                  </div>
                </motion.div>
              ) : (
                <div className="flex items-center gap-4 text-white/20">
                  <div className="w-14 h-14 rounded-xl bg-white/5 border border-dashed border-white/10 flex items-center justify-center">
                    <Music size={20} />
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-widest">No Signal Detected</span>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Master Controls */}
          <div className="flex items-center gap-8">
            <button className="text-white/30 hover:text-white transition-colors"><SkipBack size={22} /></button>
            <motion.button 
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => isPlaying ? playerRef.current?.pauseVideo() : playerRef.current?.playVideo()}
              className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
            </motion.button>
            <button className="text-white/30 hover:text-white transition-colors"><SkipForward size={22} /></button>
          </div>

          {/* Utility Box */}
          <div className="flex items-center gap-8 w-[30%] justify-end">
            <div className="flex items-center gap-3">
              <Volume2 size={16} className="text-white/40" />
              <input 
                type="range" min="0" max="100" value={volume} 
                onChange={(e) => {
                  const v = parseInt(e.target.value);
                  setVolume(v);
                  playerRef.current?.setVolume(v);
                }}
                className="w-24 accent-[#00FFB3] h-1 rounded-full cursor-pointer opacity-50 hover:opacity-100 transition-opacity" 
              />
            </div>
            <button onClick={() => setSearchOpen(true)} className="p-3 bg-white/5 rounded-xl border border-white/10 hover:border-[#00FFB3]/50 text-white/40 hover:text-[#00FFB3] transition-all">
              <ListMusic size={20} />
            </button>
          </div>
        </motion.div>
      </footer>

      {/* --- SEARCH OVERLAY (Upgraded with Sidebar Results) --- */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-md flex justify-end"
          >
            <motion.div 
              initial={{ x: 400 }} animate={{ x: 0 }} exit={{ x: 400 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-md h-full bg-[#080808] border-l border-white/10 p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-10">
                <h3 className="font-mono text-xs tracking-[0.5em] text-[#00FFB3] uppercase">Search_Engine</h3>
                <button onClick={() => setSearchOpen(false)} className="text-white/20 hover:text-white"><X size={24} /></button>
              </div>

              <div className="relative mb-8">
                <input 
                  autoFocus value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Query track or artist..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm font-mono outline-none focus:border-[#00FFB3]/50 transition-all"
                />
                <button onClick={handleSearch} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#00FFB3]">
                  {loading ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
                </button>
              </div>

              {/* Scrollable Results Area */}
              <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                {results.length > 0 ? (
                  results.map((song) => (
                    <motion.div 
                      key={song.id}
                      whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.03)" }}
                      onClick={() => selectSong(song)}
                      className="flex items-center gap-4 p-3 rounded-2xl border border-transparent hover:border-white/10 cursor-pointer group"
                    >
                      <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={song.banner} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className="text-xs font-bold text-white truncate uppercase tracking-tight">{song.title}</p>
                        <p className="text-[10px] text-white/30 font-mono mt-1">{song.artist}</p>
                      </div>
                      <ChevronRight size={14} className="text-white/10 group-hover:text-[#00FFB3]" />
                    </motion.div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
                    <Activity size={40} className="mb-4" />
                    <p className="text-[10px] font-mono tracking-[0.3em] uppercase">No active data stream</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&family=JetBrains+Mono:wght@100..800&display=swap');
        
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #00FFB3; }

        input[type='range'] {
          -webkit-appearance: none;
          background: rgba(255,255,255,0.05);
        }
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background: #fff;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(0,0,0,0.5);
        }
      `}</style>
    </motion.div>
  );
};

export default PremiumMBackground;