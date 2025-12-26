"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Loader2 
} from "lucide-react";

interface LabProps { 
  onClose: () => void; 
}

interface Song { 
  id: string; 
  title: string; 
  artist: string; 
  banner: string; 
}

const MBackground: React.FC<LabProps> = ({ onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false); // ✅ Explicitly defined state
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Song[]>([]);
  const [volume, setVolume] = useState(70);
  const [loading, setLoading] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song>({
    id: "vS3_7V99VEE", // Default System Anthem
    title: "Aakaasam Nee Haddhu Ra",
    artist: "G.V. Prakash",
    banner: "https://img.youtube.com/vi/vS3_7V99VEE/maxresdefault.jpg"
  });

  const playerRef = useRef<any>(null);
  
  // ✅ Connected to your live Render Backend
  const API_URL = "https://mahesh-backend-hub.onrender.com"; 

  // Initialize YouTube IFrame API
  useEffect(() => {
    // Standard YT API Setup
    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    // Function to run when API is ready
    (window as any).onYouTubeIframeAPIReady = () => {
      createPlayer();
    };

    // If already loaded
    if ((window as any).YT && (window as any).YT.Player) {
      createPlayer();
    }

    function createPlayer() {
      if (playerRef.current) return;
      playerRef.current = new (window as any).YT.Player('yt-player-instance', {
        height: '0',
        width: '0',
        videoId: currentSong.id,
        playerVars: { 
          'autoplay': 0, 
          'controls': 0, 
          'modestbranding': 1,
          'rel': 0 
        },
        events: {
          'onReady': (event: any) => {
            event.target.setVolume(volume);
          },
          'onStateChange': (event: any) => {
            // PLAYING = 1, PAUSED = 2
            if (event.data === 1) setIsPlaying(true);
            else if (event.data === 2 || event.data === 0) setIsPlaying(false);
          }
        }
      });
    }

    return () => {
       // Component unmount cleanup
       if (playerRef.current && playerRef.current.destroy) {
         playerRef.current.destroy();
         playerRef.current = null;
       }
    };
  }, []);

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/music-search?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("Backend offline");
      const data = await res.json();
      setResults(data);
    } catch (e) { 
      console.error("Search Error", e);
      // Local fallback for stability
      setResults([currentSong]);
    } finally {
      setLoading(false);
    }
  };

  const selectSong = (song: Song) => {
    setCurrentSong(song);
    if (playerRef.current) {
      playerRef.current.loadVideoById(song.id);
      setIsPlaying(true);
    }
    setSearchOpen(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
      className="fixed inset-0 z-[200] bg-black overflow-hidden flex flex-col items-center justify-center font-mono"
    >
      {/* Invisible YouTube IFrame */}
      <div id="yt-player-instance" className="absolute invisible pointer-events-none" />
      
      {/* EXIT LAB BUTTON */}
      <button 
        onClick={onClose} 
        className="absolute top-8 right-8 p-4 rounded-full bg-white/5 hover:bg-red-500/20 text-white z-[210] transition-all group"
      >
        <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* 1. CINEMATIC BACKGROUND IDENTITY */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
        <motion.h1 
          animate={{ scale: isPlaying ? [1, 1.05, 1] : 1 }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="text-[60vw] font-black text-white leading-none"
        >
          M
        </motion.h1>
      </div>

      {/* 2. IDENTITY NAME TEXT */}
      <div className="relative z-10 text-center px-6">
        <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h2 
            className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase mb-2 leading-none" 
            style={{ textShadow: "0 0 35px rgba(0, 255, 179, 0.3)" }}
          >
            V V D MAHESH <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFB3] to-cyan-400">PERURI</span>
          </h2>
          <motion.div 
             initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ delay: 0.5, duration: 1 }}
             className="h-[1px] bg-gradient-to-r from-transparent via-[#00FFB3]/40 to-transparent mt-6" 
          />
        </motion.div>
      </div>

      {/* 3. THE DOCK (INTERACTIVE PLAYER BAR) */}
      <div className="absolute bottom-10 w-full max-w-4xl px-6">
        <div className="h-24 rounded-[32px] bg-zinc-950/80 backdrop-blur-3xl border border-white/10 shadow-2xl flex items-center justify-between px-8 relative overflow-hidden group">
          
          {/* Metadata + Banner Trigger for Search */}
          <div 
            className="flex items-center gap-4 cursor-pointer group/banner" 
            onClick={() => setSearchOpen(true)}
          >
            <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/10 overflow-hidden relative shadow-lg group-hover/banner:scale-105 transition-transform">
              <img src={currentSong.banner} alt="Current Song" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover/banner:opacity-100 transition-opacity">
                <Search size={18} className="text-[#00FFB3]" />
              </div>
            </div>
            <div className="hidden md:block text-left max-w-[150px]">
              <h4 className="text-xs font-black text-white uppercase tracking-wider truncate">{currentSong.title}</h4>
              <p className="text-[9px] text-[#00FFB3] font-bold uppercase tracking-[0.2em] mt-1 truncate">
                {currentSong.artist}
              </p>
            </div>
          </div>

          {/* Core Controls */}
          <div className="flex items-center gap-6">
            <button className="text-zinc-600 hover:text-white transition-colors"><SkipBack size={20} /></button>
            
            <button 
              onClick={togglePlay} 
              className="w-14 h-14 rounded-full bg-[#00FFB3] flex items-center justify-center text-black shadow-[0_0_20px_rgba(0,255,179,0.4)] hover:scale-110 active:scale-95 transition-all"
            >
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
            </button>

            <button className="text-zinc-600 hover:text-white transition-colors"><SkipForward size={20} /></button>
          </div>

          {/* Volume + Live Indicators */}
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-3">
              <Volume2 size={16} className="text-zinc-500" />
              <input 
                type="range" min="0" max="100" value={volume} 
                onChange={(e) => {
                  const v = parseInt(e.target.value);
                  setVolume(v);
                  playerRef.current?.setVolume(v);
                }} 
                className="w-20 accent-[#00FFB3] bg-white/10 h-1 rounded-full cursor-pointer hover:accent-[#00FFB3]" 
              />
            </div>
            <Activity 
              size={18} 
              className={isPlaying ? "text-[#00FFB3] animate-pulse" : "text-zinc-600"} 
            />
            <Settings 
              size={18} 
              className={`text-zinc-500 ${isPlaying ? 'animate-[spin_10s_linear_infinite]' : ''}`} 
            />
          </div>
        </div>
      </div>

      {/* 4. CENTERED SEARCH OVERLAY MODULE */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.9, y: 20 }} 
            className="absolute z-[220] w-[90%] max-w-xl bg-zinc-900 border border-white/10 rounded-[40px] p-8 shadow-[0_20px_100px_rgba(0,0,0,0.8)] backdrop-blur-2xl"
          >
            <div className="flex gap-4 mb-8">
              <input 
                autoFocus type="text" 
                placeholder="Search System Records..." 
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-[#00FFB3]/50 transition-all" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()} 
              />
              <button 
                onClick={handleSearch} 
                className="bg-[#00FFB3] text-black px-8 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-transform"
              >
                {loading ? <Loader2 className="animate-spin" size={16} /> : "Execute"}
              </button>
            </div>

            <div className="space-y-4 max-h-72 overflow-y-auto pr-2 custom-scrollbar">
              {results.length > 0 ? results.map((song) => (
                <div 
                  key={song.id} 
                  onClick={() => selectSong(song)} 
                  className="flex items-center gap-5 p-3 rounded-3xl hover:bg-white/5 cursor-pointer border border-transparent hover:border-white/10 transition-all group/item"
                >
                  <img src={song.banner} className="w-14 h-14 rounded-2xl object-cover shadow-lg" />
                  <div className="text-left flex-1 min-w-0">
                    <h5 className="text-sm font-bold text-white uppercase group-hover/item:text-[#00FFB3] transition-colors truncate">{song.title}</h5>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider truncate">{song.artist}</p>
                  </div>
                </div>
              )) : (
                <div className="text-center py-10 text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em]">
                  Waiting for Command input...
                </div>
              )}
            </div>
            
            <button 
              onClick={() => setSearchOpen(false)} 
              className="mt-6 text-[10px] text-zinc-600 uppercase font-black tracking-widest hover:text-red-500 transition-colors w-full text-center"
            >
              Abort Query
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MBackground;