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
  Settings,
  Loader2,
  Music,
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

      playerRef.current = new (window as any).YT.Player(
        "yt-player-instance",
        {
          height: "0",
          width: "0",
          videoId: currentSong.id,
          playerVars: { controls: 0, rel: 0, modestbranding: 1 },
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
        }
      );
    }

    return () => {
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, []);

  /* ================= CONTROLS ================= */
  const togglePlay = () => {
    if (!playerReady) return;
    isPlaying
      ? playerRef.current.pauseVideo()
      : playerRef.current.playVideo();
  };

  /* ================= SEARCH ================= */
  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(
        `${API_URL}/api/music-search?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setResults(data);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const selectSong = (song: Song) => {
    if (!playerReady) return;
    setCurrentSong(song);
    playerRef.current.loadVideoById(song.id);
    setIsPlaying(true);
    setSearchOpen(false);
  };

  /* ================= UI ================= */
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black overflow-hidden flex flex-col items-center justify-center font-mono"
    >
      {/* Invisible Player */}
      <div id="yt-player-instance" className="absolute invisible pointer-events-none" />

      {/* Exit Button */}
      <button
        onClick={onClose}
        className="absolute top-8 right-8 p-4 rounded-full bg-white/5 hover:bg-red-500/20 text-white/70 hover:text-white transition-all z-[210]"
      >
        <X size={24} />
      </button>

      {/* ================= BACKGROUND GRADIENT GLOW ================= */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,179,0.05)_0%,transparent_70%)] pointer-events-none" />

      {/* ================= CENTERED NAME IDENTITY ================= */}
      <div className="relative z-10 text-center px-6 pointer-events-none">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 
            className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none text-white"
            style={{ 
              textShadow: "0 0 50px rgba(0,255,179,0.4), 0 0 100px rgba(0,255,179,0.2)"
            }}
          >
            V V D MAHESH <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00FFB3] via-cyan-400 to-blue-500">
              PERURI
            </span>
          </h2>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-10 h-[2px] bg-gradient-to-r from-transparent via-[#00FFB3] to-transparent mx-auto"
          />
        </motion.div>
      </div>

      {/* ================= PLAYER DOCK ================= */}
      <div className="absolute bottom-10 w-full max-w-4xl px-6">
        <div className="h-24 rounded-[40px] bg-zinc-950/70 backdrop-blur-3xl border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.8)] flex items-center justify-between px-8 relative overflow-hidden">
          
          {/* Song Meta (Fixed Width to prevent UI jumping) */}
          <div className="flex items-center gap-4 min-w-[200px] max-w-[250px]">
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-2xl border border-white/5">
                <img
                  src={currentSong.banner}
                  className="w-full h-full object-cover"
                  alt="banner"
                />
            </div>
            <div className="flex flex-col overflow-hidden">
              <h4 className="text-[11px] font-black uppercase truncate text-white tracking-tight">
                {currentSong.title}
              </h4>
              <p className="text-[9px] font-bold tracking-[0.2em] text-[#00FFB3] truncate mt-1">
                {currentSong.artist}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-8">
            <button className="text-white/40 hover:text-white transition-colors">
              <SkipBack size={20} />
            </button>
            <button
              onClick={togglePlay}
              className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-110 active:scale-95 transition-all"
            >
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
            </button>
            <button className="text-white/40 hover:text-white transition-colors">
              <SkipForward size={20} />
            </button>
          </div>

          {/* Utilities & Visible Search Trigger */}
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-3 bg-white/5 px-4 py-2 rounded-2xl border border-white/5">
              <Volume2 size={14} className="text-white/40" />
              <input
                type="range" min="0" max="100" value={volume}
                onChange={(e) => {
                  const v = parseInt(e.target.value);
                  setVolume(v);
                  playerRef.current?.setVolume(v);
                }}
                className="w-16 accent-[#00FFB3] h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
              />
            </div>
            
            {/* Visual Search Indicator */}
            <button 
              onClick={() => setSearchOpen(true)}
              className="p-3 rounded-2xl bg-[#00FFB3]/10 text-[#00FFB3] border border-[#00FFB3]/20 hover:bg-[#00FFB3] hover:text-black transition-all"
              title="Search Music"
            >
              <Search size={18} strokeWidth={2.5} />
            </button>

            <Activity
              size={18}
              className={isPlaying ? "text-[#00FFB3] animate-pulse" : "text-white/20"}
            />
          </div>
        </div>
      </div>

      {/* ================= SEARCH OVERLAY ================= */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="absolute inset-0 z-[220] flex items-center justify-center p-6 bg-black/60"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-xl bg-zinc-900/90 border border-white/10 rounded-[48px] p-10 shadow-[0_50px_100px_rgba(0,0,0,1)] relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Music size={16} className="text-[#00FFB3]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50">Neural Search</span>
                </div>
                <button onClick={() => setSearchOpen(false)} className="text-white/30 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="flex gap-4 mb-8">
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="flex-1 bg-white/5 border border-white/10 px-6 py-5 rounded-[24px] text-sm text-white focus:outline-none focus:border-[#00FFB3]/50 transition-all placeholder:text-white/20"
                  placeholder="Query system records..."
                />
                <button
                  onClick={handleSearch}
                  className="bg-[#00FFB3] text-black px-8 rounded-[24px] font-black text-[11px] tracking-widest hover:brightness-110 active:scale-95 transition-all"
                >
                  {loading ? <Loader2 className="animate-spin" /> : "EXECUTE"}
                </button>
              </div>

              <div className="space-y-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                {results.length > 0 ? results.map((song) => (
                  <motion.div
                    key={song.id}
                    whileHover={{ x: 10 }}
                    onClick={() => selectSong(song)}
                    className="flex gap-5 p-4 rounded-3xl bg-white/[0.02] border border-transparent hover:border-white/10 hover:bg-white/5 cursor-pointer transition-all group"
                  >
                    <img
                      src={song.banner}
                      className="w-14 h-14 rounded-2xl object-cover shadow-xl"
                      alt="art"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="text-sm font-bold text-white group-hover:text-[#00FFB3] transition-colors truncate uppercase">{song.title}</h5>
                      <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">
                        {song.artist}
                      </p>
                    </div>
                  </motion.div>
                )) : (
                  <div className="text-center py-10 opacity-20 text-[10px] font-black uppercase tracking-widest">
                    Waiting for input...
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #00FFB3; }
      `}</style>
    </motion.div>
  );
};

export default MBackground;