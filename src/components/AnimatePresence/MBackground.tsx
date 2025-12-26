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
          playerVars: { controls: 0, rel: 0 },
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
      <div id="yt-player-instance" className="absolute invisible" />

      {/* Exit */}
      <button
        onClick={onClose}
        className="absolute top-8 right-8 p-4 rounded-full bg-white/5 hover:bg-red-500/20 transition-all"
      >
        <X size={22} />
      </button>

      {/* ================= CINEMATIC IDENTITY ================= */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.025] pointer-events-none">
        <motion.h1
          animate={{ scale: isPlaying ? [1, 1.05, 1] : 1 }}
          transition={{ duration: 5, repeat: Infinity }}
          className="text-[60vw] font-black text-white leading-none"
        >
          M
        </motion.h1>
      </div>

      {/* ================= NAME ================= */}
      <div className="relative z-10 text-center px-6">
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-5xl md:text-8xl font-black uppercase tracking-tighter"
          style={{ textShadow: "0 0 35px rgba(0,255,179,0.35)" }}
        >
          V V D MAHESH{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00FFB3] to-cyan-400">
            PERURI
          </span>
        </motion.h2>
        <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-[#00FFB3]/40 to-transparent" />
      </div>

      {/* ================= PLAYER DOCK ================= */}
      <div className="absolute bottom-10 w-full max-w-4xl px-6">
        <div className="h-24 rounded-[32px] bg-zinc-950/80 backdrop-blur-3xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.7)] flex items-center justify-between px-8">
          {/* Song Meta */}
          <div
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-4 cursor-pointer group"
          >
            <img
              src={currentSong.banner}
              className="w-14 h-14 rounded-2xl object-cover shadow-lg group-hover:scale-105 transition"
            />
            <div className="hidden md:block max-w-[160px]">
              <h4 className="text-xs font-black uppercase truncate">
                {currentSong.title}
              </h4>
              <p className="text-[9px] tracking-widest text-[#00FFB3] truncate">
                {currentSong.artist}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-6">
            <SkipBack className="opacity-60 hover:opacity-100" />
            <button
              onClick={togglePlay}
              className="w-14 h-14 rounded-full bg-[#00FFB3] flex items-center justify-center text-black shadow-[0_0_25px_rgba(0,255,179,0.6)] hover:scale-110 transition"
            >
              {isPlaying ? <Pause /> : <Play className="ml-1" />}
            </button>
            <SkipForward className="opacity-60 hover:opacity-100" />
          </div>

          {/* Volume + Status */}
          <div className="hidden sm:flex items-center gap-4">
            <Volume2 size={16} className="opacity-60" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => {
                const v = parseInt(e.target.value);
                setVolume(v);
                playerRef.current?.setVolume(v);
              }}
              className="w-20 accent-[#00FFB3]"
            />
            <Activity
              size={16}
              className={
                isPlaying ? "text-[#00FFB3] animate-pulse" : "opacity-40"
              }
            />
            <Settings
              size={16}
              className={
                isPlaying
                  ? "opacity-60 animate-[spin_12s_linear_infinite]"
                  : "opacity-40"
              }
            />
          </div>
        </div>
      </div>

      {/* ================= SEARCH OVERLAY ================= */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute z-[220] w-[90%] max-w-xl bg-zinc-900/90 border border-white/10 rounded-[40px] p-8 backdrop-blur-2xl"
          >
            <div className="flex gap-4 mb-6">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1 bg-black/40 px-6 py-4 rounded-2xl text-sm focus:outline-none"
                placeholder="Search system records..."
              />
              <button
                onClick={handleSearch}
                className="bg-[#00FFB3] text-black px-6 rounded-2xl font-black text-xs"
              >
                {loading ? <Loader2 className="animate-spin" /> : "EXEC"}
              </button>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto">
              {results.map((song) => (
                <div
                  key={song.id}
                  onClick={() => selectSong(song)}
                  className="flex gap-4 p-3 rounded-2xl hover:bg-white/5 cursor-pointer"
                >
                  <img
                    src={song.banner}
                    className="w-12 h-12 rounded-xl"
                  />
                  <div className="min-w-0">
                    <h5 className="text-sm truncate">{song.title}</h5>
                    <p className="text-xs text-zinc-500 truncate">
                      {song.artist}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSearchOpen(false)}
              className="mt-6 w-full text-center text-xs opacity-60 hover:text-red-500"
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
