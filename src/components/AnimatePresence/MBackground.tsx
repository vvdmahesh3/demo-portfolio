"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Search,
  X,
  SkipBack,
  SkipForward,
  Volume2,
  Sparkles,
  Music2,
} from "lucide-react";

interface Song {
  id: string;
  title: string;
  artist: string;
  banner: string;
}

interface Props {
  onClose: () => void;
}

const API_URL = "https://mahesh-backend-hub.onrender.com";

export default function PremiumMusicLab({ onClose }: Props) {
  const playerRef = useRef<any>(null);

  const [playerReady, setPlayerReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Song[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [volume, setVolume] = useState(70);

  // ---------------- YOUTUBE INIT ----------------
  useEffect(() => {
    if (!(window as any).YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    (window as any).onYouTubeIframeAPIReady = () => {
      playerRef.current = new (window as any).YT.Player("yt-player", {
        height: "0",
        width: "0",
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
      });
    };
  }, []);

  // ---------------- SEARCH ----------------
  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/api/music-search?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setResults(data || []);
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

  // ---------------- UI ----------------
  return (
    <div className="fixed inset-0 z-[200] bg-[#050505] text-white overflow-hidden">
      <div id="yt-player" className="hidden" />

      {/* ---------------- PREMIUM TOP INTERFACE ---------------- */}
      <div className="absolute top-0 w-full px-10 pt-10 z-30">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-[32px] border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-xl p-8 overflow-hidden"
        >
          {/* Glow rail */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#00ffb3] to-transparent opacity-70" />

          <div className="flex items-center justify-between">
            {/* Left */}
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                Neural Audio Lab
              </h1>
              <p className="text-white/50 text-sm mt-1">
                High-fidelity interactive music environment
              </p>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs tracking-wider flex items-center gap-2">
                <Sparkles size={14} className="text-[#00ffb3]" />
                ONLINE
              </div>

              <button
                onClick={() => setSearchOpen(true)}
                className="w-12 h-12 rounded-full bg-[#00ffb3] text-black flex items-center justify-center hover:scale-105 active:scale-95 transition"
              >
                <Search />
              </button>

              <button
                onClick={onClose}
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-red-500/20 hover:text-red-400 transition"
              >
                <X />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ---------------- CENTER BRAND ---------------- */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 0.25, scale: 1 }}
          className="text-[140px] font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-[#00ffb3]"
        >
          M
        </motion.h1>
      </div>

      {/* ---------------- BOTTOM PLAYER ---------------- */}
      <div className="absolute bottom-10 w-full px-8 z-40">
        <motion.div
          layout
          className="mx-auto max-w-5xl rounded-[40px] bg-black/60 backdrop-blur-xl border border-white/10 p-6 flex items-center justify-between shadow-[0_40px_120px_rgba(0,0,0,0.8)]"
        >
          {/* Song Info */}
          <div className="flex items-center gap-5 min-w-[280px]">
            {currentSong ? (
              <>
                <motion.div
                  whileHover={{ rotate: 2, scale: 1.05 }}
                  className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-lg"
                >
                  <img
                    src={currentSong.banner}
                    className="w-full h-full object-cover"
                  />
                  {isPlaying && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Music2 className="text-[#00ffb3] animate-pulse" />
                    </div>
                  )}
                </motion.div>

                <div>
                  <h3 className="font-semibold text-sm leading-tight">
                    {currentSong.title}
                  </h3>
                  <p className="text-xs text-[#00ffb3]/70">
                    {currentSong.artist}
                  </p>
                </div>
              </>
            ) : (
              <div
                onClick={() => setSearchOpen(true)}
                className="cursor-pointer text-white/40 hover:text-[#00ffb3] transition"
              >
                Search and play music
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-8">
            <button
              onClick={() =>
                playerRef.current?.seekTo(
                  playerRef.current.getCurrentTime() - 10
                )
              }
              className="opacity-40 hover:opacity-100 transition"
            >
              <SkipBack />
            </button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{
                boxShadow: "0 0 40px rgba(0,255,179,0.6)",
              }}
              onClick={() =>
                isPlaying
                  ? playerRef.current.pauseVideo()
                  : playerRef.current.playVideo()
              }
              className="w-16 h-16 rounded-full bg-[#00ffb3] text-black flex items-center justify-center"
            >
              {isPlaying ? <Pause /> : <Play className="ml-1" />}
            </motion.button>

            <button
              onClick={() =>
                playerRef.current?.seekTo(
                  playerRef.current.getCurrentTime() + 10
                )
              }
              className="opacity-40 hover:opacity-100 transition"
            >
              <SkipForward />
            </button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-3">
            <Volume2 size={16} className="text-[#00ffb3]" />
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => {
                const v = Number(e.target.value);
                setVolume(v);
                playerRef.current?.setVolume(v);
              }}
              className="accent-[#00ffb3] w-24"
            />
          </div>
        </motion.div>
      </div>

      {/* ---------------- SEARCH OVERLAY ---------------- */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[300] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ y: 40, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              className="w-full max-w-4xl rounded-[40px] bg-[#0b0b0b] border border-white/10 p-10"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-lg font-semibold tracking-wide">
                  Music Explorer
                </h2>
                <button
                  onClick={() => setSearchOpen(false)}
                  className="text-white/40 hover:text-red-400 transition"
                >
                  <X />
                </button>
              </div>

              {/* Search */}
              <div className="flex gap-4 mb-8">
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Search any song or artist..."
                  className="flex-1 rounded-xl bg-black/40 border border-white/10 px-5 py-4 outline-none focus:border-[#00ffb3]/40 transition"
                />
                <button
                  onClick={handleSearch}
                  className="px-8 rounded-xl bg-[#00ffb3] text-black font-medium hover:brightness-110 transition"
                >
                  {loading ? "..." : "Search"}
                </button>
              </div>

              {/* Results */}
              <div className="max-h-[420px] overflow-y-auto pr-3 space-y-3 custom-scroll">
                {results.map((song) => (
                  <motion.div
                    key={song.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => selectSong(song)}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] cursor-pointer transition"
                  >
                    <img
                      src={song.banner}
                      className="w-20 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{song.title}</div>
                      <div className="text-xs text-white/50">
                        {song.artist}
                      </div>
                    </div>
                    <Play size={18} className="text-[#00ffb3]" />
                  </motion.div>
                ))}

                {!loading && results.length === 0 && (
                  <div className="text-center py-24 text-white/30 text-sm">
                    Start searching for music 🎵
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: rgba(0,255,179,0.4);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
