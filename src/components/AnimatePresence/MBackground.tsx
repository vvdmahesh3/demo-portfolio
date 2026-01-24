"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, Pause, SkipBack, SkipForward, Volume2, Search, X, 
  Loader2, Music, Sparkles, ChevronRight, Cpu, Zap, Radio, 
  Mic2, Share2, Info, Command
} from "lucide-react";

interface LabProps { onClose: () => void; }
interface Song { id: string; title: string; artist: string; banner: string; }

const NexusInterface: React.FC<LabProps> = ({ onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [volume, setVolume] = useState(70);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [systemStatus, setSystemStatus] = useState("CORE_BOOT");

  const playerRef = useRef<any>(null);
  const API_URL = "https://mahesh-backend-hub.onrender.com";

  // --- BOOT SEQUENCE ANIMATION ---
  useEffect(() => {
    const sequence = ["INITIALIZING...", "SYST_LINK: OK", "NEXUS_READY"];
    sequence.forEach((msg, i) => setTimeout(() => setSystemStatus(msg), i * 1000));
  }, []);

  // --- YOUTUBE ENGINE CORE ---
  useEffect(() => {
    if (!(window as any).YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
    (window as any).onYouTubeIframeAPIReady = () => {
      playerRef.current = new (window as any).YT.Player("nexus-player-core", {
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

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/music-search?q=${encodeURIComponent(query)}`);
      setResults(await res.json());
    } catch { setResults([]); } finally { setLoading(false); }
  };

  const selectSong = (song: Song) => {
    setCurrentSong(song);
    playerRef.current.loadVideoById(song.id);
    setIsPlaying(true);
    setSearchOpen(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-[#020202] text-white overflow-hidden selection:bg-[#00FFB3] selection:text-black"
    >
      {/* --- CINEMATIC AMBIANCE --- */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#00FFB3]/5 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/5 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] pointer-events-none" />
      </div>

      <div id="nexus-player-core" className="absolute invisible" />

      {/* --- HUD NAVIGATION --- */}
      <nav className="absolute top-0 w-full p-10 flex justify-between items-start z-50">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#00FFB3] animate-ping" />
            <span className="text-[10px] font-black tracking-[0.5em] uppercase text-white/80">{systemStatus}</span>
          </div>
          <div className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Node: 0xMAHESH_SERVER // 22ms</div>
        </div>
        <button 
          onClick={onClose} 
          className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/50 transition-all group"
        >
          <X size={20} className="group-hover:rotate-90 transition-transform" />
        </button>
      </nav>

      {/* --- MAIN STAGE --- */}
      <main className="relative z-10 h-full flex flex-col items-center justify-center">
        
        {/* BIG CENTER IDENTITY */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="text-center pointer-events-none"
        >
          <h1 className="text-8xl md:text-[160px] font-black tracking-tighter leading-[0.8] mb-4">
            MAHESH<span className="text-transparent bg-clip-text bg-gradient-to-b from-[#00FFB3] to-[#00FFB3]/20">.</span>
          </h1>
          <div className="flex items-center justify-center gap-4 opacity-30">
            <div className="h-[1px] w-12 bg-white" />
            <span className="text-[10px] uppercase tracking-[1em]">Creative Engineer</span>
            <div className="h-[1px] w-12 bg-white" />
          </div>
        </motion.div>

        {/* --- DYNAMIC PLAYER SUMMONER --- */}
        <div className="mt-24 relative min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!currentSong ? (
              <motion.div
                key="summoner"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="flex flex-col items-center gap-6"
              >
                <button 
                  onClick={() => setSearchOpen(true)}
                  className="group relative w-32 h-32 flex items-center justify-center bg-white/5 border border-white/10 rounded-full hover:border-[#00FFB3]/50 transition-all"
                >
                  <Search size={40} className="text-white group-hover:text-[#00FFB3] transition-colors" />
                  <div className="absolute inset-0 rounded-full border border-[#00FFB3]/20 animate-pulse" />
                </button>
                <p className="text-[10px] font-mono text-white/30 tracking-[0.3em] uppercase">Click to Initialize Audio</p>
              </motion.div>
            ) : (
              <motion.div
                key="active-player"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-xl bg-white/[0.02] border border-white/10 backdrop-blur-3xl rounded-[40px] p-8 relative overflow-hidden group hover:border-[#00FFB3]/30 transition-all"
              >
                {/* Visualizer Overlay */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#00FFB3]/10 overflow-hidden">
                  <motion.div 
                    animate={isPlaying ? { x: ["-100%", "100%"] } : {}}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="w-full h-full bg-[#00FFB3]"
                  />
                </div>

                <div className="flex items-center gap-8">
                  {/* Rotating Vinyl */}
                  <div className="relative">
                    <motion.div 
                      animate={isPlaying ? { rotate: 360 } : {}}
                      transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                      className="w-32 h-32 rounded-full border-2 border-white/20 p-1 bg-black overflow-hidden shadow-2xl"
                    >
                      <img src={currentSong.banner} className="w-full h-full object-cover rounded-full opacity-80" alt="art" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 bg-[#020202] rounded-full border border-white/20" />
                      </div>
                    </motion.div>
                    <button 
                      onClick={() => setSearchOpen(true)}
                      className="absolute -bottom-2 -right-2 p-3 bg-white text-black rounded-full hover:bg-[#00FFB3] transition-all"
                    >
                      <Search size={14} />
                    </button>
                  </div>

                  <div className="flex-1">
                    <div className="mb-6">
                      <h3 className="text-xl font-black uppercase tracking-tight truncate">{currentSong.title}</h3>
                      <p className="text-[#00FFB3] font-mono text-[10px] uppercase mt-1 opacity-60">ID: {currentSong.artist}</p>
                    </div>

                    <div className="flex items-center gap-6">
                      <button onClick={() => playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10)} className="text-white/40 hover:text-white transition-colors"><SkipBack /></button>
                      <button 
                        onClick={() => isPlaying ? playerRef.current.pauseVideo() : playerRef.current.playVideo()}
                        className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl"
                      >
                        {isPlaying ? <Pause fill="black" /> : <Play fill="black" className="ml-1" />}
                      </button>
                      <button onClick={() => playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10)} className="text-white/40 hover:text-white transition-colors"><SkipForward /></button>
                    </div>
                  </div>
                </div>

                {/* Bottom Stats */}
                <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center text-[9px] font-mono text-white/20">
                  <div className="flex gap-4">
                    <span>BITRATE: 320KBPS</span>
                    <span>SOURCE: NEXUS_SERVER</span>
                  </div>
                  <div className="flex items-center gap-4">
                     <Volume2 size={12} />
                     <input 
                      type="range" min="0" max="100" value={volume} 
                      onChange={(e) => { setVolume(parseInt(e.target.value)); playerRef.current.setVolume(e.target.value); }}
                      className="w-20 accent-[#00FFB3] bg-white/10 h-0.5 rounded-full"
                     />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* --- ADVANCED SEARCH COMMAND CENTER --- */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-8"
          >
            <motion.div 
              initial={{ y: 50, scale: 0.95 }} animate={{ y: 0, scale: 1 }}
              className="w-full max-w-3xl"
            >
              <div className="flex items-center gap-4 mb-12">
                <Command size={20} className="text-[#00FFB3]" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">Global Audio Search</span>
                <div className="h-[1px] flex-1 bg-white/10" />
                <button onClick={() => setSearchOpen(false)}><X className="text-white/20 hover:text-red-500" /></button>
              </div>

              <div className="flex gap-4 mb-12 group">
                <input 
                  autoFocus
                  placeholder="&gt; SEARCH_QUERY_..."
                  className="flex-1 bg-white/5 border border-white/10 px-8 py-6 rounded-3xl text-xl font-mono text-white focus:border-[#00FFB3]/50 outline-none transition-all"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <button 
                  onClick={handleSearch}
                  className="bg-[#00FFB3] text-black px-10 rounded-3xl font-black text-xs uppercase hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,255,179,0.2)]"
                >
                  {loading ? <Loader2 className="animate-spin" /> : "EXECUTE"}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                {results.map((song) => (
                  <motion.div 
                    key={song.id}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.03)" }}
                    onClick={() => selectSong(song)}
                    className="flex items-center gap-5 p-4 rounded-2xl border border-white/5 bg-white/[0.01] cursor-pointer group"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                      <img src={song.banner} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold truncate group-hover:text-[#00FFB3] transition-colors uppercase tracking-tight">{song.title}</h4>
                      <p className="text-[10px] text-white/30 font-mono mt-1">{song.artist}</p>
                    </div>
                    <ChevronRight size={16} className="text-white/10 group-hover:text-[#00FFB3]" />
                  </motion.div>
                ))}
                {results.length === 0 && !loading && (
                  <div className="col-span-2 text-center py-20 opacity-10 text-[10px] font-black uppercase tracking-[2em]">Awaiting Input</div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 255, 179, 0.3); border-radius: 10px; }
        input[type='range'] { -webkit-appearance: none; }
        input[type='range']::-webkit-slider-thumb { -webkit-appearance: none; height: 10px; width: 10px; border-radius: 50%; background: #00FFB3; cursor: pointer; }
      `}</style>
    </motion.div>
  );
};

export default NexusInterface;