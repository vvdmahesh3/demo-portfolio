// src/components/MBackground.tsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, 
  Youtube, Settings, Activity, X, Search, Loader2 
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
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Song[]>([]);
  const [volume, setVolume] = useState(70);
  const [loading, setLoading] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song>({
    id: "vS3_7V99VEE", // Default: Aakaasam Nee Haddhu Ra
    title: "System Anthem",
    artist: "Mahesh Identity",
    banner: "https://img.youtube.com/vi/vS3_7V99VEE/maxresdefault.jpg"
  });

  // YouTube Player Reference
  const playerRef = useRef<any>(null);

  // Load YouTube API
  useEffect(() => {
    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    (window as any).onYouTubeIframeAPIReady = () => {
      playerRef.current = new (window as any).YT.Player('hidden-player', {
        height: '0',
        width: '0',
        videoId: currentSong.id,
        playerVars: { 'autoplay': 0, 'controls': 0, 'modestbranding': 1 },
        events: {
          'onStateChange': (event: any) => {
            // YT.PlayerState.PLAYING = 1, PAUSED = 2
            if (event.data === 1) setIsPlaying(true);
            if (event.data === 2) setIsPlaying(false);
          }
        }
      });
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) playerRef.current?.pauseVideo();
    else playerRef.current?.playVideo();
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    // Simulate high-speed technical query
    setTimeout(() => {
      setResults([
        { id: "vS3_7V99VEE", title: "Aakaasam Nee Haddhu Ra", artist: "G.V. Prakash", banner: "https://img.youtube.com/vi/vS3_7V99VEE/0.jpg" },
        { id: "Y-N0V0X1B4k", title: "Resilience Protocol", artist: "Mahesh Systems", banner: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300" },
        { id: "dQw4w9WgXcQ", title: "Never Gonna Give You Up", artist: "Rick Astley", banner: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" }
      ]);
      setLoading(false);
    }, 800);
  };

  const selectSong = (song: Song) => {
    setCurrentSong(song);
    playerRef.current?.loadVideoById(song.id);
    setIsPlaying(true);
    setSearchOpen(false);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(e.target.value);
    setVolume(v);
    playerRef.current?.setVolume(v);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black overflow-hidden flex flex-col items-center justify-center font-mono"
    >
      {/* Headless Player Instance */}
      <div id="hidden-player" className="absolute invisible pointer-events-none"></div>

      {/* Close Button */}
      <button 
        onClick={onClose} 
        className="absolute top-8 right-8 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white z-[210] transition-all group"
      >
        <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* 1. CINEMATIC BACKGROUND IDENTITY */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 select-none">
        <motion.h1 
          animate={{ scale: isPlaying ? [1, 1.05, 1] : 1 }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="text-[60vw] font-black text-white"
        >
          M
        </motion.h1>
      </div>

      {/* 2. IDENTITY TEXT */}
      <div className="relative z-10 text-center px-6">
        <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase mb-2"
              style={{ textShadow: "0 0 35px rgba(255, 255, 255, 0.2)" }}>
            V V D MAHESH <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFB3] to-cyan-400">PERURI</span>
          </h2>
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#00FFB3]/50 to-transparent mt-4" />
        </motion.div>
      </div>

      {/* 3. THE INTERACTIVE DOCK */}
      <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="absolute bottom-10 w-full max-w-4xl px-6">
        <div className="h-24 rounded-[32px] bg-zinc-950/80 backdrop-blur-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-between px-8 relative group overflow-hidden">
          
          {/* Left: Search Trigger & Banner */}
          <div className="flex items-center gap-4 relative z-10">
            <div className="relative group/search cursor-pointer" onClick={() => setSearchOpen(!searchOpen)}>
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/10 overflow-hidden shadow-lg transition-transform group-hover/search:scale-105">
                <img src={currentSong.banner} alt="Banner" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover/search:opacity-100 transition-opacity">
                  <Search size={18} className="text-[#00FFB3]" />
                </div>
              </div>
            </div>
            <div className="hidden md:block text-left">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">{currentSong.title}</h4>
              <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mt-1">{currentSong.artist}</p>
            </div>
          </div>

          {/* Center: Playback Engine */}
          <div className="flex items-center gap-6 relative z-10">
            <button className="text-zinc-600 hover:text-white transition-colors"><SkipBack size={20} /></button>
            <button 
              onClick={togglePlay}
              className="w-14 h-14 rounded-full bg-[#00FFB3] flex items-center justify-center text-black shadow-[0_0_20px_rgba(0,255,179,0.4)] hover:scale-110 active:scale-95 transition-all"
            >
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
            </button>
            <button className="text-zinc-600 hover:text-white transition-colors"><SkipForward size={20} /></button>
          </div>

          {/* Right: Technical Utilities */}
          <div className="flex items-center gap-6 relative z-10">
            <div className="hidden sm:flex items-center gap-3">
              <Volume2 size={16} className="text-zinc-500" />
              <input 
                type="range" min="0" max="100" 
                value={volume} onChange={handleVolume}
                className="w-20 accent-[#00FFB3] bg-white/10 h-1 rounded-full cursor-pointer" 
              />
            </div>
            <Activity size={18} className={isPlaying ? "text-[#00FFB3] animate-pulse" : "text-zinc-600"} />
            <Settings size={18} className={`text-zinc-500 hover:text-white cursor-pointer ${isPlaying ? 'animate-[spin_10s_linear_infinite]' : ''}`} />
          </div>
        </div>
      </motion.div>

      {/* 4. SEARCH MODULE OVERLAY */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
            className="absolute bottom-40 w-full max-w-xl bg-zinc-950/90 border border-white/10 rounded-[32px] p-6 backdrop-blur-3xl z-50 shadow-2xl"
          >
            <div className="flex gap-3 mb-6">
              <input 
                autoFocus
                type="text" 
                placeholder="Query System Records..."
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00FFB3]/50"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button onClick={handleSearch} className="bg-[#00FFB3] text-black px-6 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-transform">
                {loading ? <Loader2 className="animate-spin" size={16} /> : "Execute"}
              </button>
            </div>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {results.length > 0 ? results.map((song) => (
                <div 
                  key={song.id}
                  onClick={() => selectSong(song)}
                  className="flex items-center gap-4 p-2 rounded-2xl hover:bg-white/5 cursor-pointer transition-all border border-transparent hover:border-white/5 group/item"
                >
                  <img src={song.banner} className="w-12 h-12 rounded-xl object-cover shadow-lg" />
                  <div className="text-left">
                    <h5 className="text-xs font-bold text-white uppercase group-hover/item:text-[#00FFB3] transition-colors">{song.title}</h5>
                    <p className="text-[10px] text-zinc-500 uppercase">{song.artist}</p>
                  </div>
                </div>
              )) : (
                <div className="text-center py-8 text-zinc-600 text-xs uppercase tracking-widest">
                  Enter Command to Search Media
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MBackground;