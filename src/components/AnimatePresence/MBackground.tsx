"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Search,
  X,
  Activity,
  Loader2,
  Music,
  Layers,
  ChevronRight,
} from "lucide-react";

/* ================= TYPES ================= */
interface LabProps {
  onClose: () => void;
}

interface Song {
  id: string;
  title: string;
  artist: string;
  banner: string;
}

/* ================= COMPONENT ================= */
const MBackground: React.FC<LabProps> = ({ onClose }) => {
  /* ---------- CORE STATE ---------- */
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);

  /* ---------- SEARCH STATE ---------- */
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);

  /* ---------- NAVIGATION HISTORY ---------- */
  const [history, setHistory] = useState<Song[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  /* ---------- AUDIO STATE ---------- */
  const [volume, setVolume] = useState(70);

  /* ---------- CURRENT SONG ---------- */
  const [currentSong, setCurrentSong] = useState<Song>({
    id: "vS3_7V99VEE",
    title: "Aakaasam Nee Haddhu Ra",
    artist: "G.V. Prakash",
    banner: "https://img.youtube.com/vi/vS3_7V99VEE/maxresdefault.jpg",
  });

  const playerRef = useRef<any>(null);
  const API_URL = "https://mahesh-backend-hub.onrender.com";

  /* ================= YOUTUBE ENGINE ================= */
  useEffect(() => {
    if (!(window as any).YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    (window as any).onYouTubeIframeAPIReady = initPlayer;
    if ((window as any).YT?.Player) initPlayer();

    function initPlayer() {
      if (playerRef.current) return;
      playerRef.current = new (window as any).YT.Player("yt-player-instance", {
        height: "0",
        width: "0",
        videoId: currentSong.id,
        playerVars: { controls: 0, rel: 0, modestbranding: 1, origin: window.location.origin },
        events: {
          onReady: (e: any) => {
            e.target.setVolume(volume);
            setPlayerReady(true);
          },
          onStateChange: (e: any) => {
            if (e.data === 1) setIsPlaying(true);
            if (e.data === 2 || e.data === 0) setIsPlaying(false);
          },
        },
      });
    }
    return () => playerRef.current?.destroy();
  }, []);

  /* ================= CONTROLS & HISTORY ================= */
  const selectSong = (song: Song) => {
    if (!playerReady) return;
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(song);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);

    setCurrentSong(song);
    playerRef.current.loadVideoById(song.id);
    setIsPlaying(true);
    setSearchOpen(false);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const prevSong = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setCurrentSong(prevSong);
      playerRef.current.loadVideoById(prevSong.id);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const nextSong = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setCurrentSong(nextSong);
      playerRef.current.loadVideoById(nextSong.id);
    }
  };

  const togglePlay = () => {
    if (!playerReady) return;
    isPlaying ? playerRef.current.pauseVideo() : playerRef.current.playVideo();
  };

  /* ================= SEARCH ================= */
  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/music-search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-[#050505] overflow-hidden flex flex-col items-center justify-center font-mono"
    >
      <div id="yt-player-instance" className="absolute invisible pointer-events-none" />

      {/* --- EXIT --- */}
      <button
        onClick={onClose}
        className="absolute top-10 right-10 p-4 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-red-500 hover:border-red-500/50 transition-all z-[210]"
      >
        <X size={20} />
      </button>

      {/* --- NEURAL VISUALIZER BACKGROUND --- */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <motion.div
          animate={{
            scale: isPlaying ? [1, 1.15, 1] : 1,
            opacity: isPlaying ? [0.05, 0.15, 0.05] : 0.03,
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="w-[85vw] h-[85vw] rounded-full bg-[radial-gradient(circle,#00FFB3_0%,transparent_70%)] blur-[120px]"
        />
      </div>

      {/* --- CENTERED IDENTITY --- */}
      <div className="relative z-10 text-center px-6 pointer-events-none">
        <motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
          <div className="flex items-center justify-center gap-3 mb-8 opacity-40 tracking-[0.5em] text-[10px] text-white uppercase font-black">
            <Layers size={14} className="text-[#00FFB3]" /> System Link Active
          </div>
          <h2 className="text-6xl md:text-[110px] font-black uppercase tracking-tighter leading-[0.85] text-white">
            VVD MAHESH <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-[#00FFB3] to-cyan-500 drop-shadow-[0_0_40px_rgba(0,255,179,0.3)]">
              PERURI
            </span>
          </h2>
          <div className="mt-12 h-[1px] w-48 bg-gradient-to-r from-transparent via-[#00FFB3]/50 to-transparent mx-auto" />
        </motion.div>
      </div>

      {/* --- PLAYER DOCK --- */}
      <div className="absolute bottom-12 w-full max-w-5xl px-8">
        <div className="h-28 rounded-[45px] bg-zinc-950/50 backdrop-blur-3xl border border-white/10 shadow-2xl flex items-center justify-between px-10 relative">
          
          {/* Metadata & Banner (Fixed Ratio) */}
          <div className="flex items-center gap-6 min-w-[280px]">
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              onClick={() => setSearchOpen(true)}
              className="relative aspect-video w-32 rounded-2xl overflow-hidden border border-white/10 shadow-xl cursor-pointer group"
            >
              <img src={currentSong.banner} className="w-full h-full object-cover" alt="art" />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Search size={20} className="text-[#00FFB3]" />
              </div>
            </motion.div>
            <div className="flex flex-col text-left overflow-hidden">
              <h4 className="text-sm font-black uppercase text-white tracking-tight truncate max-w-[180px]">{currentSong.title}</h4>
              <p className="text-[10px] font-bold tracking-widest text-[#00FFB3] mt-1 uppercase italic">{currentSong.artist}</p>
            </div>
          </div>

          {/* Core Controls */}
          <div className="flex items-center gap-10">
            <button onClick={goBack} disabled={historyIndex <= 0} className="text-white/30 hover:text-[#00FFB3] disabled:opacity-5 transition-all">
              <SkipBack size={24} fill="currentColor" />
            </button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay}
              className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            >
              {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
            </motion.button>
            <button onClick={goForward} disabled={historyIndex >= history.length - 1} className="text-white/30 hover:text-[#00FFB3] disabled:opacity-5 transition-all">
              <SkipForward size={24} fill="currentColor" />
            </button>
          </div>

          {/* Volume & Utility */}
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center gap-2 group/vol">
              <span className="text-[8px] font-black text-[#00FFB3] opacity-0 group-hover/vol:opacity-100 transition-opacity uppercase">{volume}%</span>
              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/5">
                <Volume2 size={16} className="text-white/40" />
                <input
                  type="range" min="0" max="100" value={volume}
                  onChange={(e) => {
                    const v = parseInt(e.target.value);
                    setVolume(v);
                    playerRef.current?.setVolume(v);
                  }}
                  className="w-20 accent-[#00FFB3] h-[2px] bg-white/10 appearance-none cursor-pointer hover:h-[4px] transition-all"
                />
              </div>
            </div>
            <button 
              onClick={() => setSearchOpen(true)}
              className="p-4 rounded-2xl bg-[#00FFB3]/10 text-[#00FFB3] border border-[#00FFB3]/20 hover:bg-[#00FFB3] hover:text-black transition-all"
            >
              <Search size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* --- SEARCH OVERLAY --- */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[300] flex items-center justify-center p-6 bg-black/90 backdrop-blur-2xl">
            <motion.div initial={{ scale: 0.9, y: 40 }} animate={{ scale: 1, y: 0 }} className="w-full max-w-3xl bg-[#0a0a0a] border border-white/10 rounded-[60px] p-12 shadow-3xl relative overflow-hidden">
              
              <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/5">
                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-[#00FFB3]">
                  <Music size={16} /> Dashboard Records
                </div>
                <button onClick={() => setSearchOpen(false)} className="text-white/20 hover:text-red-500 transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex gap-4 mb-10">
                <input 
                  autoFocus value={query} 
                  onChange={(e) => setQuery(e.target.value)} 
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="flex-1 bg-white/5 border border-white/10 px-8 py-6 rounded-3xl text-lg text-white focus:outline-none focus:border-[#00FFB3]/40 transition-all placeholder:text-white/10"
                  placeholder="Query artist or track name..."
                />
                <button onClick={handleSearch} className="bg-[#00FFB3] text-black px-10 rounded-3xl font-black text-xs tracking-widest hover:brightness-110 active:scale-95 transition-all">
                  {loading ? <Loader2 className="animate-spin" /> : "QUERY"}
                </button>
              </div>

              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                {results.length > 0 ? (
                  <>
                    <p className="text-[9px] font-black uppercase text-white/20 tracking-[0.2em] mb-4 italic">Packets found: {results.length}</p>
                    {results.map((song) => (
                      <motion.div 
                        key={song.id} whileHover={{ x: 15 }} onClick={() => selectSong(song)}
                        className="flex gap-6 p-5 rounded-[32px] bg-white/[0.02] border border-transparent hover:border-white/10 hover:bg-white/[0.04] cursor-pointer transition-all group"
                      >
                        <img src={song.banner} className="aspect-video w-36 rounded-xl object-cover shadow-2xl" alt="art" />
                        <div className="flex-1 text-left py-2">
                          <h5 className="text-md font-bold text-white group-hover:text-[#00FFB3] transition-colors uppercase tracking-tight truncate">{song.title}</h5>
                          <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mt-2">{song.artist}</p>
                        </div>
                        <div className="flex items-center pr-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ChevronRight className="text-[#00FFB3]" />
                        </div>
                      </motion.div>
                    ))}
                  </>
                ) : (
                  <div className="text-center py-20 opacity-20 italic text-[10px] font-black uppercase tracking-widest">
                    No active query results...
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #00FFB3; }
        input[type='range']::-webkit-slider-thumb {
          appearance: none; width: 14px; height: 14px;
          background: #00FFB3; border-radius: 50%;
          box-shadow: 0 0 15px #00FFB3; cursor: pointer;
        }
      `}</style>
    </motion.div>
  );
};

export default MBackground;