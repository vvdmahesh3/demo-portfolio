"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, Pause, SkipBack, SkipForward, Volume2, Search, X, 
  Loader2, Music, Sparkles, ChevronRight, Disc, Activity, Terminal, Cpu, Zap
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
  const [systemStatus, setSystemStatus] = useState("INITIALIZING");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const playerRef = useRef<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const API_URL = "https://mahesh-backend-hub.onrender.com";

  useEffect(() => {
    const sequence = ["CORE_LOADED", "MAHESH_VVD_OS", "NEURAL_LINK_OK", "READY"];
    sequence.forEach((msg, i) => setTimeout(() => setSystemStatus(msg), i * 800));
    
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // YouTube API Logic (Kept from your previous working code)
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
      className="fixed inset-0 z-[200] bg-[#080808] overflow-hidden flex flex-col items-center justify-center font-sans"
    >
      <div id="yt-player-instance" className="absolute invisible" />
      
      {/* --- THE BACKGROUND BRANDING (GROK STYLE) --- */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <motion.div 
          className="relative flex flex-col items-center"
          animate={{
            x: (mousePos.x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0)) * 0.02,
            y: (mousePos.y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0)) * 0.02,
          }}
        >
          {/* Main Large Outline Name */}
          <h1 className="text-[12vw] font-light tracking-[-0.05em] leading-none text-transparent grok-outline opacity-30">
            MAHESH VVD
          </h1>
          <h1 className="text-[8vw] font-black tracking-tighter leading-none text-white/5 -mt-10 italic uppercase">
            PERURI
          </h1>
          
          {/* Subtle Dynamic Glow following mouse */}
          <div 
            className="absolute w-[600px] h-[600px] rounded-full blur-[160px] opacity-10 pointer-events-none"
            style={{
              background: `radial-gradient(circle, #00FFB3 0%, transparent 70%)`,
              left: mousePos.x - 300,
              top: mousePos.y - 300,
              position: 'fixed'
            }}
          />
        </motion.div>
      </div>

      {/* --- MINIMAL HUD TOP --- */}
      <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-start z-50 pointer-events-none">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl flex flex-col gap-1">
          <div className="flex items-center gap-2 text-[#00FFB3] text-[9px] font-mono tracking-widest">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00FFB3] animate-pulse" />
            SYS_STATUS: {systemStatus}
          </div>
          <div className="text-white/20 text-[8px] font-mono">LOCATION: HYD_IN // 17.3850° N</div>
        </div>
        
        <button 
          onClick={onClose} 
          className="pointer-events-auto p-4 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-red-500 hover:bg-red-500/10 transition-all"
        >
          <X size={20} />
        </button>
      </div>

      {/* --- FLOATING MUSIC CONTROLLER (DOCK) --- */}
      <div className="absolute bottom-10 w-full max-w-4xl px-6 z-50">
        <div className="bg-black/60 backdrop-blur-2xl border border-white/10 rounded-[40px] p-4 flex items-center justify-between shadow-2xl">
          {/* Left: Info */}
          <div className="flex items-center gap-4 w-1/3">
            {currentSong ? (
              <>
                <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/10">
                  <img src={currentSong.banner} className="w-full h-full object-cover" alt="art" />
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-xs font-bold text-white truncate uppercase tracking-tight">{currentSong.title}</h4>
                  <p className="text-[10px] text-[#00FFB3] font-mono mt-0.5">{currentSong.artist}</p>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3 text-white/20 px-4">
                <Music size={16} />
                <span className="text-[10px] font-mono uppercase tracking-widest">Awaiting Audio</span>
              </div>
            )}
          </div>

          {/* Center: Controls */}
          <div className="flex items-center gap-8">
            <button onClick={() => playerRef.current?.seekTo(playerRef.current.getCurrentTime() - 10)} className="text-white/30 hover:text-white transition-colors"><SkipBack size={20} /></button>
            <motion.button 
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => isPlaying ? playerRef.current.pauseVideo() : playerRef.current.playVideo()}
              className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center"
            >
              {isPlaying ? <Pause size={24} fill="black" /> : <Play size={24} fill="black" className="ml-1" />}
            </motion.button>
            <button onClick={() => playerRef.current?.seekTo(playerRef.current.getCurrentTime() + 10)} className="text-white/30 hover:text-white transition-colors"><SkipForward size={20} /></button>
          </div>

          {/* Right: Search Toggle */}
          <div className="flex justify-end items-center gap-4 w-1/3">
             <div className="hidden md:flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                <Volume2 size={14} className="text-white/40" />
                <input type="range" min="0" max="100" value={volume} onChange={(e) => { setVolume(parseInt(e.target.value)); playerRef.current?.setVolume(parseInt(e.target.value)); }} className="w-20 accent-[#00FFB3] h-[1px]" />
             </div>
             <button onClick={() => setSearchOpen(true)} className="p-4 rounded-full bg-[#00FFB3] text-black hover:brightness-110 transition-all">
                <Search size={20} />
             </button>
          </div>
        </div>
      </div>

      {/* --- SEARCH OVERLAY --- */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-6"
          >
            <div className="w-full max-w-2xl">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-[#00FFB3] font-mono text-xs tracking-[0.5em] uppercase">Search_Database</h3>
                <button onClick={() => setSearchOpen(false)} className="text-white/40 hover:text-white"><X size={24} /></button>
              </div>
              <div className="flex gap-4 mb-8">
                <input 
                  autoFocus className="flex-1 bg-white/5 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-[#00FFB3]/50 font-mono"
                  placeholder="Enter track or artist..." value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <button onClick={handleSearch} className="bg-white text-black px-8 rounded-2xl font-bold uppercase text-xs tracking-widest">
                  {loading ? <Loader2 className="animate-spin" /> : "Search"}
                </button>
              </div>
              
              <div className="grid grid-cols-1 gap-2 max-h-[50vh] overflow-y-auto custom-scrollbar pr-2">
                {results.map((song) => (
                  <div 
                    key={song.id} onClick={() => { setCurrentSong(song); playerRef.current.loadVideoById(song.id); setSearchOpen(false); }}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 cursor-pointer transition-all group"
                  >
                    <img src={song.banner} className="w-16 h-10 object-cover rounded-lg" alt="" />
                    <div className="flex-1">
                      <div className="text-sm font-bold text-white group-hover:text-[#00FFB3] transition-colors">{song.title}</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-widest">{song.artist}</div>
                    </div>
                    <ChevronRight size={16} className="text-white/20" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .grok-outline {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4);
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
        input[type='range'] { -webkit-appearance: none; background: rgba(255,255,255,0.1); }
        input[type='range']::-webkit-slider-thumb { -webkit-appearance: none; height: 10px; width: 10px; border-radius: 50%; background: #00FFB3; cursor: pointer; }
      `}</style>
    </motion.div>
  );
};

export default MBackground;