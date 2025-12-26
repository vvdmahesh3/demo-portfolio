"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Search, X, Activity, Settings, Loader2 } from "lucide-react";

interface Song { id: string; title: string; artist: string; banner: string; }

const MBackground: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Song[]>([]);
  const [history, setHistory] = useState<Song[]>([]);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song>({
    id: "vS3_7V99VEE",
    title: "Aakaasam Nee Haddhu Ra",
    artist: "G.V. Prakash",
    banner: "https://img.youtube.com/vi/vS3_7V99VEE/maxresdefault.jpg"
  });

  const playerRef = useRef<any>(null);
  const API_URL = "https://mahesh-backend-hub.onrender.com";

  useEffect(() => {
    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
    (window as any).onYouTubeIframeAPIReady = () => {
      playerRef.current = new (window as any).YT.Player('yt-player', {
        height: '0', width: '0', videoId: currentSong.id,
        playerVars: { 'autoplay': 0, 'controls': 0 },
        events: { 'onStateChange': (e: any) => setIsPlaying(e.data === 1) }
      });
    };
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/music-search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data);
    } catch (e) { console.error("Search failed"); }
    setLoading(false);
  };

  const selectSong = (song: Song) => {
    setHistory(prev => [currentSong, ...prev].slice(0, 10));
    setCurrentSong(song);
    playerRef.current?.loadVideoById(song.id);
    setIsPlaying(true);
    setSearchOpen(false);
  };

  const toggleMute = () => {
    if (isMuted) playerRef.current?.unMute();
    else playerRef.current?.mute();
    setIsMuted(!isMuted);
  };

  const skipBack = () => {
    if (history.length > 0) {
      const last = history[0];
      setHistory(prev => prev.slice(1));
      selectSong(last);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center font-mono">
      <div id="yt-player" className="absolute invisible pointer-events-none" />
      <button onClick={onClose} className="absolute top-8 right-8 p-4 rounded-full bg-white/5 text-white z-[210] hover:bg-red-500/20"><X /></button>

      {/* Identity Backdrop */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
        <motion.h1 animate={{ scale: isPlaying ? [1, 1.05, 1] : 1 }} transition={{ duration: 2, repeat: Infinity }} className="text-[60vw] font-black text-white">M</motion.h1>
      </div>

      <h2 className="text-5xl md:text-8xl font-black text-white uppercase mb-2 text-center" style={{ textShadow: "0 0 30px rgba(0,255,179,0.3)" }}>
        V V D MAHESH <span className="text-[#00FFB3]">PERURI</span>
      </h2>

      {/* 🎵 THE PLAYER DOCK */}
      <div className="absolute bottom-10 w-full max-w-4xl px-6">
        <div className="h-24 rounded-[32px] bg-zinc-900/90 border border-white/10 shadow-2xl flex items-center justify-between px-8">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setSearchOpen(true)}>
            <div className="w-14 h-14 rounded-2xl bg-zinc-800 overflow-hidden relative">
              <img src={currentSong.banner} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100"><Search size={18} className="text-[#00FFB3]" /></div>
            </div>
            <div className="hidden md:block">
              <h4 className="text-xs font-black text-white uppercase truncate max-w-[120px]">{currentSong.title}</h4>
              <p className="text-[9px] text-[#00FFB3] uppercase mt-1">{currentSong.artist}</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={skipBack} className="text-zinc-500 hover:text-white"><SkipBack /></button>
            <button onClick={() => isPlaying ? playerRef.current?.pauseVideo() : playerRef.current?.playVideo()} className="w-14 h-14 rounded-full bg-[#00FFB3] flex items-center justify-center text-black hover:scale-110">
              {isPlaying ? <Pause fill="currentColor" /> : <Play fill="currentColor" className="ml-1" />}
            </button>
            <button className="text-zinc-500 hover:text-white"><SkipForward /></button>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-3">
              <button onClick={toggleMute} className="text-zinc-500 hover:text-white">
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <input type="range" min="0" max="100" value={volume} onChange={(e) => {
                const v = parseInt(e.target.value);
                setVolume(v);
                playerRef.current?.setVolume(v);
              }} className="w-20 accent-[#00FFB3]" />
            </div>
            <Activity size={18} className={isPlaying ? "text-[#00FFB3] animate-pulse" : "text-zinc-600"} />
            <Settings size={18} className="text-zinc-600 hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>

      {/* 🔎 SEARCH MODULE */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="absolute z-[220] w-[90%] max-w-xl bg-zinc-950 border border-white/10 rounded-[40px] p-8 shadow-3xl">
            <div className="flex gap-4 mb-6">
              <input autoFocus type="text" placeholder="Search any song..." className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
              <button onClick={handleSearch} className="bg-[#00FFB3] text-black px-8 rounded-2xl font-black uppercase text-xs">
                {loading ? <Loader2 className="animate-spin" /> : "EXECUTE"}
              </button>
            </div>
            <div className="space-y-2 max-h-72 overflow-y-auto pr-2">
              {results.map((song) => (
                <div key={song.id} onClick={() => selectSong(song)} className="flex items-center gap-4 p-2 rounded-2xl hover:bg-white/5 cursor-pointer">
                  <img src={song.banner} className="w-12 h-12 rounded-xl object-cover" />
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-white uppercase truncate">{song.title}</h5>
                    <p className="text-[10px] text-zinc-500 uppercase">{song.artist}</p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setSearchOpen(false)} className="mt-6 text-[10px] text-zinc-500 uppercase font-black w-full hover:text-red-500">Abort Query</button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MBackground;