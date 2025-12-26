"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, 
  Search, X, Activity, Loader2, Music, Layers 
} from "lucide-react";

interface LabProps { onClose: () => void; }
interface Song { id: string; title: string; artist: string; banner: string; }

const MBackground: React.FC<LabProps> = ({ onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Song[]>([]);
  const [volume, setVolume] = useState(70);
  const [loading, setLoading] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song>({
    id: "vS3_7V99VEE",
    title: "Aakaasam Nee Haddhu Ra",
    artist: "G.V. Prakash",
    banner: "https://img.youtube.com/vi/vS3_7V99VEE/maxresdefault.jpg"
  });

  const playerRef = useRef<any>(null);
  const API_URL = "https://mahesh-backend-hub.onrender.com";

  // Initialize YouTube IFrame API
  useEffect(() => {
    const loadYT = () => {
      if (!(window as any).YT) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      }
      (window as any).onYouTubeIframeAPIReady = createPlayer;
      if ((window as any).YT?.Player) createPlayer();
    };

    function createPlayer() {
      if (playerRef.current) return;
      playerRef.current = new (window as any).YT.Player('yt-player-instance', {
        height: '0', width: '0',
        videoId: currentSong.id,
        playerVars: { 'autoplay': 0, 'controls': 0, 'modestbranding': 1, 'rel': 0 },
        events: {
          'onReady': (event: any) => event.target.setVolume(volume),
          'onStateChange': (event: any) => {
            if (event.data === 1) setIsPlaying(true);
            else if (event.data === 2 || event.data === 0) setIsPlaying(false);
          }
        }
      });
    }

    loadYT();
    return () => { playerRef.current?.destroy(); playerRef.current = null; };
  }, []);

  const togglePlay = () => {
    if (!playerRef.current) return;
    isPlaying ? playerRef.current.pauseVideo() : playerRef.current.playVideo();
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/music-search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data);
    } catch (e) {
      setResults([currentSong]);
    } finally {
      setLoading(false);
    }
  };

  const selectSong = (song: Song) => {
    setCurrentSong(song);
    playerRef.current?.loadVideoById(song.id);
    setIsPlaying(true);
    setSearchOpen(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-[#050505] overflow-hidden flex flex-col items-center justify-center font-mono"
    >
      <div id="yt-player-instance" className="absolute invisible pointer-events-none" />

      {/* --- 1. DYNAMIC NEURAL BACKGROUND --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,179,0.05)_0%,transparent_70%)]" />
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"
        />
        {/* Massive Watermark "M" */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] select-none">
          <motion.h1 
            animate={{ scale: isPlaying ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 8, repeat: Infinity }}
            className="text-[80vw] font-black text-white"
          >M</motion.h1>
        </div>
      </div>

      {/* --- 2. EXIT CONTROL --- */}
      <button 
        onClick={onClose}
        className="absolute top-10 right-10 p-4 rounded-full bg-white/5 border border-white/10 text-white z-[250] hover:bg-red-500/20 transition-all group"
      >
        <X size={20} className="group-hover:rotate-90 transition-transform" />
      </button>

      {/* --- 3. LIQUID CHROME IDENTITY --- */}
      <div className="relative z-10 text-center select-none">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 20 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4 opacity-50">
            <Layers size={14} className="text-[#00FFB3]" />
            <span className="text-[10px] tracking-[0.5em] text-white uppercase font-black">System Identity</span>
          </div>

          <h2 className="text-6xl md:text-9xl font-black text-white tracking-tighter uppercase leading-none relative">
            <span className="relative z-10">VVD MAHESH</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-[#00FFB3] to-cyan-500 bg-[length:100%_200%] animate-[gradient_5s_ease_infinite]">
              PERURI
            </span>
            {/* Glossy Reflection Shadow */}
            <span className="absolute inset-0 blur-3xl bg-[#00FFB3]/10 -z-10 rounded-full" />
          </h2>

          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            className="h-[2px] bg-gradient-to-r from-transparent via-[#00FFB3] to-transparent mx-auto mt-8 opacity-40"
          />
        </motion.div>
      </div>

      {/* --- 4. FLOATING MUSIC DOCK --- */}
      <motion.div 
        layout
        className="absolute bottom-12 w-[95%] max-w-5xl z-20"
      >
        <div className="bg-zinc-950/40 backdrop-blur-3xl border border-white/10 rounded-[40px] p-4 flex flex-col md:flex-row items-center gap-6 shadow-2xl relative group">
          
          {/* Visualizer Side */}
          <div className="flex items-center gap-4 flex-1 w-full px-4">
             <div 
               className="relative w-16 h-16 rounded-3xl overflow-hidden border border-white/20 cursor-pointer group/art"
               onClick={() => setSearchOpen(true)}
             >
               <img src={currentSong.banner} className="w-full h-full object-cover group-hover/art:scale-110 transition-transform duration-500" alt="banner" />
               <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/art:opacity-100 transition-opacity">
                 <Search size={18} className="text-[#00FFB3]" />
               </div>
             </div>
             <div className="flex-1 min-w-0">
                <h4 className="text-sm font-black text-white uppercase truncate tracking-tight">{currentSong.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 rounded-full bg-[#00FFB3] animate-pulse" />
                  <p className="text-[10px] text-[#00FFB3] font-bold uppercase tracking-widest truncate">{currentSong.artist}</p>
                </div>
             </div>
          </div>

          {/* Main Controls */}
          <div className="flex items-center gap-8 bg-white/5 px-8 py-3 rounded-[30px] border border-white/5">
            <button className="text-zinc-500 hover:text-white transition-colors"><SkipBack size={22} /></button>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlay}
              className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
            </motion.button>
            <button className="text-zinc-500 hover:text-white transition-colors"><SkipForward size={22} /></button>
          </div>

          {/* Utilities */}
          <div className="flex items-center gap-6 px-6">
            <div className="hidden lg:flex items-center gap-3">
              <Volume2 size={16} className="text-zinc-500" />
              <input 
                type="range" min="0" max="100" value={volume} 
                onChange={(e) => {
                  const v = parseInt(e.target.value);
                  setVolume(v);
                  playerRef.current?.setVolume(v);
                }}
                className="w-24 accent-[#00FFB3] h-1 rounded-full cursor-pointer opacity-40 hover:opacity-100 transition-opacity" 
              />
            </div>
            <Activity size={18} className={isPlaying ? "text-[#00FFB3] animate-bounce" : "text-zinc-700"} />
            <button onClick={() => setSearchOpen(true)} className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white transition-all">
              <Music size={18} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* --- 5. SEARCH ENGINE OVERLAY --- */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="absolute inset-0 z-[300] bg-black/60 flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[50px] p-10 shadow-3xl overflow-hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xs font-black uppercase tracking-[0.5em] text-[#00FFB3]">Neural Search</h3>
                <button onClick={() => setSearchOpen(false)} className="text-zinc-500 hover:text-white transition-colors"><X size={20}/></button>
              </div>

              <div className="relative group mb-10">
                <input 
                  autoFocus 
                  placeholder="Query track or artist..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-lg text-white focus:outline-none focus:border-[#00FFB3]/50 transition-all placeholder:text-zinc-700"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button 
                  onClick={handleSearch}
                  className="absolute right-3 top-3 bottom-3 bg-[#00FFB3] text-black px-8 rounded-xl font-black uppercase text-[10px] tracking-widest hover:brightness-110"
                >
                  {loading ? <Loader2 className="animate-spin" size={16} /> : "Search"}
                </button>
              </div>

              <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-4">
                {results.map((song) => (
                  <motion.div 
                    key={song.id} 
                    whileHover={{ x: 10 }}
                    onClick={() => selectSong(song)}
                    className="flex items-center gap-6 p-4 rounded-3xl bg-white/[0.02] border border-transparent hover:border-white/10 hover:bg-white/[0.05] cursor-pointer transition-all group/item"
                  >
                    <img src={song.banner} className="w-16 h-16 rounded-2xl object-cover shadow-2xl" alt="art" />
                    <div className="flex-1">
                      <h5 className="font-bold text-white uppercase group-hover/item:text-[#00FFB3] transition-colors">{song.title}</h5>
                      <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mt-1">{song.artist}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #00FFB3; }
      `}</style>
    </motion.div>
  );
};

export default MBackground;