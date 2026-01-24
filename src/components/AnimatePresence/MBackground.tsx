"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, Pause, SkipBack, SkipForward, Volume2, Search, X, 
  Loader2, Music, Sparkles, ChevronRight, Disc, Activity, Zap
} from "lucide-react";

interface LabProps { onClose: () => void; }
interface Song { id: string; title: string; artist: string; banner: string; }

const MBackground: React.FC<LabProps> = ({ onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [volume, setVolume] = useState(70);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const playerRef = useRef<any>(null);
  const API_URL = "https://mahesh-backend-hub.onrender.com";

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // YouTube Engine
  useEffect(() => {
    if (!(window as any).YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
    (window as any).onYouTubeIframeAPIReady = () => {
      playerRef.current = new (window as any).YT.Player("yt-player-instance", {
        height: "0", width: "0",
        playerVars: { controls: 0, rel: 0 },
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
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-[#050505] overflow-hidden flex flex-col items-center justify-center font-sans"
    >
      <div id="yt-player-instance" className="absolute invisible" />

      {/* --- RECTIVE GROK-STYLE BACKGROUND --- */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="relative group">
            {/* The base outline name */}
            <h1 className="text-[14vw] font-black tracking-tighter leading-none text-transparent grok-base-outline opacity-20">
                MAHESH VVD
            </h1>
            
            {/* The Glowing Layer (Masked by Mouse) */}
            <h1 
                className="absolute top-0 left-0 text-[14vw] font-black tracking-tighter leading-none text-transparent grok-glow-outline select-none"
                style={{
                    maskImage: `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
                    WebkitMaskImage: `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`
                }}
            >
                MAHESH VVD
            </h1>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center -mt-6"
            >
                <span className="text-white/10 text-4xl md:text-6xl font-black italic tracking-widest uppercase">PERURI</span>
            </motion.div>
        </div>
      </div>

      {/* --- TOP NAV --- */}
      <div className="absolute top-0 w-full p-10 flex justify-between items-center z-50">
         <div className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-gradient-to-r from-[#00FFB3] to-transparent" />
            <span className="font-mono text-[10px] text-[#00FFB3] tracking-[0.5em] uppercase animate-pulse">System Active</span>
         </div>
         <button onClick={onClose} className="group p-4 rounded-full bg-white/5 hover:bg-red-500/20 transition-all border border-white/10">
            <X size={20} className="text-white/40 group-hover:text-red-500 transition-colors" />
         </button>
      </div>

      {/* --- DYNAMIC GLASS PLAYER --- */}
      <div className="absolute bottom-12 w-full flex justify-center px-6 z-50">
        <motion.div 
            layout
            className="relative flex items-center gap-8 bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-4 pl-8 pr-4 rounded-[100px] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
            {/* Play/Pause Main Trigger */}
            <button 
                onClick={() => isPlaying ? playerRef.current.pauseVideo() : playerRef.current.playVideo()}
                className="relative w-16 h-16 rounded-full bg-white flex items-center justify-center text-black shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
                {isPlaying ? <Pause size={28} fill="black" /> : <Play size={28} fill="black" className="ml-1" />}
                {isPlaying && <span className="absolute inset-0 rounded-full border border-white animate-ping opacity-20" />}
            </button>

            {/* Song Info Section */}
            <div className="flex flex-col min-w-[180px]">
                <h4 className="text-xs font-black text-white uppercase tracking-wider truncate w-40">
                    {currentSong ? currentSong.title : "SELECT FREQUENCY"}
                </h4>
                <p className="text-[10px] text-[#00FFB3] font-mono mt-1 opacity-60">
                    {currentSong ? currentSong.artist : "AWAITING SIGNAL"}
                </p>
            </div>

            {/* Frequency Visualizer (Pure CSS) */}
            <div className="flex items-end gap-1 h-8 px-4 opacity-40">
                {[...Array(8)].map((_, i) => (
                    <motion.div 
                        key={i}
                        animate={{ height: isPlaying ? [10, 32, 12, 28, 10] : 4 }}
                        transition={{ repeat: Infinity, duration: 0.5 + Math.random(), ease: "easeInOut" }}
                        className="w-[3px] bg-white rounded-full"
                    />
                ))}
            </div>

            {/* Floating Search Toggle */}
            <button 
                onClick={() => setSearchOpen(true)}
                className="w-16 h-16 rounded-full bg-[#00FFB3] flex items-center justify-center text-black group hover:scale-110 transition-transform"
            >
                <Search size={24} className="group-hover:rotate-12 transition-transform" />
            </button>
        </motion.div>
      </div>

      {/* --- DESIGNER SEARCH OVERLAY --- */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }} 
            animate={{ opacity: 1, backdropFilter: "blur(40px)" }} 
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="absolute inset-0 z-[100] bg-black/80 flex flex-col items-center justify-center p-10"
          >
            <div className="w-full max-w-4xl">
                <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-6">
                    <div>
                        <h2 className="text-white text-5xl font-black italic uppercase tracking-tighter">Music Hub</h2>
                        <p className="text-[#00FFB3] font-mono text-[10px] tracking-[0.4em] mt-2">v2.0_INTERFACE_ACTIVE</p>
                    </div>
                    <button onClick={() => setSearchOpen(false)} className="text-white/20 hover:text-white mb-2 transition-colors"><X size={32} /></button>
                </div>

                <div className="relative mb-12 group">
                    <input 
                        autoFocus className="w-full bg-transparent border-b-2 border-white/10 p-6 text-4xl text-white outline-none focus:border-[#00FFB3] transition-all font-light placeholder:text-white/5"
                        placeholder="Search for vibes..." value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                    <button onClick={handleSearch} className="absolute right-0 bottom-6 text-[#00FFB3] p-4 group-hover:scale-125 transition-transform">
                        {loading ? <Loader2 className="animate-spin" /> : <ChevronRight size={40} />}
                    </button>
                </div>
              
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[40vh] overflow-y-auto custom-scrollbar pr-4">
                    {results.map((song) => (
                    <motion.div 
                        key={song.id} 
                        whileHover={{ x: 10 }}
                        onClick={() => { setCurrentSong(song); playerRef.current.loadVideoById(song.id); setSearchOpen(false); }}
                        className="flex items-center gap-6 p-4 rounded-2xl bg-white/5 border border-transparent hover:border-[#00FFB3]/30 cursor-pointer transition-all group"
                    >
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden shadow-2xl">
                            <img src={song.banner} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Play size={20} fill="white" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="text-sm font-black text-white group-hover:text-[#00FFB3] transition-colors uppercase tracking-tight">{song.title}</div>
                            <div className="text-[10px] text-white/30 uppercase tracking-widest mt-1 font-mono">{song.artist}</div>
                        </div>
                    </motion.div>
                    ))}
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .grok-base-outline {
            -webkit-text-stroke: 1px rgba(255, 255, 255, 0.1);
        }
        .grok-glow-outline {
            -webkit-text-stroke: 1.5px #00FFB3;
            filter: drop-shadow(0 0 15px rgba(0, 255, 179, 0.6));
        }
        .custom-scrollbar::-webkit-scrollbar { width: 2px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #00FFB3; }
      `}</style>
    </motion.div>
  );
};

export default MBackground;