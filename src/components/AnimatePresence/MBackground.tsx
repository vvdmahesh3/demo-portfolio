"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Search,
  Loader2,
  Music,
  ChevronRight,
  Volume2,
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

const API_URL = "https://mahesh-backend-hub.onrender.com";

export default function MBackground({ onClose }: LabProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [volume, setVolume] = useState(70);
  const [progress, setProgress] = useState(0);
  const [bgHue, setBgHue] = useState(180);

  const playerRef = useRef<any>(null);

  // ---------------- SEARCH ----------------
  useEffect(() => {
    const t = setTimeout(() => {
      if (query.length > 2) performSearch();
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/api/music-search?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setResults(data);
    } catch {
      console.error("Search failed");
    }
    setLoading(false);
  };

  // ---------------- YOUTUBE PLAYER ----------------
  useEffect(() => {
    if (!(window as any).YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    (window as any).onYouTubeIframeAPIReady = () => {
      playerRef.current = new (window as any).YT.Player("yt-instance", {
        height: "0",
        width: "0",
        playerVars: { controls: 0 },
        events: {
          onStateChange: (e: any) => {
            setIsPlaying(e.data === 1);
          },
        },
      });
    };
  }, []);

  // ---------------- PROGRESS TRACK ----------------
  useEffect(() => {
    const timer = setInterval(() => {
      if (!playerRef.current) return;
      const duration = playerRef.current.getDuration?.() || 1;
      const current = playerRef.current.getCurrentTime?.() || 0;
      setProgress((current / duration) * 100);
    }, 500);

    return () => clearInterval(timer);
  }, []);

  // ---------------- KEYBOARD SHORTCUTS ----------------
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        isPlaying
          ? playerRef.current?.pauseVideo()
          : playerRef.current?.playVideo();
      }
      if (e.code === "ArrowRight") {
        playerRef.current?.seekTo(
          playerRef.current.getCurrentTime() + 10
        );
      }
      if (e.code === "ArrowLeft") {
        playerRef.current?.seekTo(
          playerRef.current.getCurrentTime() - 10
        );
      }
      if (e.code === "Escape") {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isPlaying]);

  // ---------------- COLOR SHIFT FROM SONG ----------------
  useEffect(() => {
    if (!currentSong) return;
    setBgHue(Math.floor(Math.random() * 360));
  }, [currentSong]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-[#050505] text-white overflow-hidden flex items-center justify-center"
    >
      <div id="yt-instance" className="hidden" />

      {/* Dynamic Ambient Background */}
      <motion.div
        animate={{ background: `radial-gradient(circle at center, hsla(${bgHue},80%,60%,0.18), transparent 70%)` }}
        className="absolute inset-0 transition-all duration-1000"
      />

      {/* Floating Particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: ["0%", "120%"],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          className="absolute w-[2px] h-[40px] bg-[#00ffb3]/20 blur-sm left-[random]"
          style={{ left: `${Math.random() * 100}%` }}
        />
      ))}

      {/* Hero */}
      <div className="absolute top-24 text-center pointer-events-none">
        <h1 className="text-[9vw] font-extrabold tracking-tight text-white/5">
          MUSIC HUB
        </h1>
        <p className="text-[11px] tracking-[0.5em] text-[#00ffb3]/70">
          FUTURE AUDIO INTERFACE
        </p>
      </div>

      {/* PLAYER BAR */}
      <div className="absolute bottom-8 w-full max-w-6xl px-6 z-50">
        <div className="relative bg-black/55 backdrop-blur-3xl border border-white/10 rounded-[34px] p-6 shadow-2xl">

          {/* Progress */}
          <div className="absolute top-0 left-0 w-full h-[3px] bg-white/10 overflow-hidden">
            <motion.div
              animate={{ width: `${progress}%` }}
              className="h-full bg-[#00ffb3]"
            />
          </div>

          <div className="flex items-center justify-between gap-6">

            {/* SONG META */}
            <div className="flex items-center gap-5 min-w-[280px]">
              <motion.div
                animate={isPlaying ? { scale: 1.08, boxShadow: "0 0 25px rgba(0,255,179,0.6)" } : {}}
                className="w-16 h-16 rounded-xl overflow-hidden bg-white/10"
              >
                {currentSong ? (
                  <img src={currentSong.banner} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Music className="opacity-30" />
                  </div>
                )}
              </motion.div>

              <div className="overflow-hidden">
                <motion.div
                  className="text-sm font-semibold whitespace-nowrap"
                  animate={{
                    x:
                      (currentSong?.title?.length ?? 0) > 22
                        ? ["0%", "-40%"]
                        : 0,
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 8,
                    ease: "linear",
                  }}
                >
                  {currentSong?.title || "Select a track"}
                </motion.div>
                <p className="text-xs text-[#00ffb3]/70 mt-1">
                  {currentSong?.artist || "Waiting signal"}
                </p>
              </div>
            </div>

            {/* CONTROLS */}
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
                onClick={() =>
                  isPlaying
                    ? playerRef.current.pauseVideo()
                    : playerRef.current.playVideo()
                }
                className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-xl"
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

            {/* VOLUME + SEARCH */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-xs text-white/60">
                <Volume2 size={16} />
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={volume}
                  onChange={(e) => {
                    setVolume(+e.target.value);
                    playerRef.current?.setVolume(+e.target.value);
                  }}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setSearchOpen(!searchOpen)}
                className="w-12 h-12 rounded-full bg-[#00ffb3] text-black flex items-center justify-center"
              >
                <Search />
              </motion.button>
            </div>
          </div>

          {/* Mini Waveform */}
          <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-[3px] opacity-40">
            {[...Array(40)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  height: isPlaying ? [4, Math.random() * 30 + 5, 4] : 4,
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.6,
                  delay: i * 0.02,
                }}
                className="w-[2px] bg-[#00ffb3]"
              />
            ))}
          </div>
        </div>
      </div>

      {/* SEARCH PANEL */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="absolute bottom-36 right-10 w-[420px] max-h-[520px] bg-black/80 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden"
          >
            <div className="sticky top-0 bg-black/90 p-4 border-b border-white/10">
              <input
                autoFocus
                placeholder="Search music..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent outline-none text-sm"
              />
            </div>

            <div className="max-h-[440px] overflow-y-auto custom-scrollbar p-3">
              {loading && (
                <div className="flex justify-center p-6">
                  <Loader2 className="animate-spin text-[#00ffb3]" />
                </div>
              )}

              {results.map((song) => (
                <motion.div
                  key={song.id}
                  whileHover={{ backgroundColor: "rgba(0,255,179,0.06)" }}
                  onClick={() => {
                    setCurrentSong(song);
                    playerRef.current.loadVideoById(song.id);
                    setSearchOpen(false);
                  }}
                  className="flex items-center gap-4 p-3 rounded-xl cursor-pointer"
                >
                  <img
                    src={song.banner}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm truncate">{song.title}</p>
                    <p className="text-xs text-white/40 truncate">
                      {song.artist}
                    </p>
                  </div>
                  <ChevronRight className="opacity-30" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #00ffb3;
          border-radius: 10px;
        }
      `}</style>
    </motion.div>
  );
}
