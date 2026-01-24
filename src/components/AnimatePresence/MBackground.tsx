"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Search,
  X,
  Loader2,
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
  const playerRef = useRef<any>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [volume, setVolume] = useState(70);

  /* -------------------- YouTube Engine -------------------- */
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
          onStateChange: (e: any) => setIsPlaying(e.data === 1),
          onReady: (e: any) => e.target.setVolume(volume),
        },
      });
    };
  }, []);

  /* -------------------- Search -------------------- */
  useEffect(() => {
    if (!query.trim()) return;
    const t = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${API_URL}/api/music-search?q=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        setResults(data);
      } catch {
        setResults([]);
      }
      setLoading(false);
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  const playSong = (song: Song) => {
    setCurrentSong(song);
    playerRef.current?.loadVideoById(song.id);
    setSearchOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[300] bg-[#060707] text-white overflow-hidden"
    >
      <div id="yt-instance" className="hidden" />

      {/* 🌌 Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,179,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black/90" />
      </div>

      {/* ❌ Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/5 hover:bg-red-500/20 flex items-center justify-center transition"
      >
        <X />
      </button>

      {/* 🎧 CENTER BRAND */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center gap-10 pointer-events-none">
        <h1 className="text-[10vw] font-extrabold tracking-tight leading-none opacity-[0.06]">
          MAHESH
        </h1>
      </div>

      {/* 🎚 PLAYER DOCK */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-40">
        <div className="relative flex items-center gap-6 bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[28px] px-6 py-4 shadow-2xl">

          {/* 🎵 Meta */}
          <div className="flex items-center gap-4 min-w-[260px]">
            <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/10 bg-white/5">
              {currentSong ? (
                <img
                  src={currentSong.banner}
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-wide truncate max-w-[220px]">
                {currentSong?.title || "Select a track"}
              </p>
              <p className="text-xs text-emerald-400 opacity-80 truncate">
                {currentSong?.artist || "Awaiting signal"}
              </p>
            </div>
          </div>

          {/* ▶ Controls */}
          <div className="flex items-center gap-8 mx-auto">
            <button
              onClick={() =>
                playerRef.current?.seekTo(
                  playerRef.current.getCurrentTime() - 10
                )
              }
              className="icon-btn"
            >
              <SkipBack size={20} />
            </button>

            <button
              onClick={() =>
                isPlaying
                  ? playerRef.current.pauseVideo()
                  : playerRef.current.playVideo()
              }
              className={`play-btn ${isPlaying ? "pulse" : ""}`}
            >
              {isPlaying ? <Pause /> : <Play className="ml-1" />}
            </button>

            <button
              onClick={() =>
                playerRef.current?.seekTo(
                  playerRef.current.getCurrentTime() + 10
                )
              }
              className="icon-btn"
            >
              <SkipForward size={20} />
            </button>
          </div>

          {/* 🔊 Volume */}
          <div className="flex items-center gap-2 w-40">
            <Volume2 size={16} className="text-emerald-400" />
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
              className="flex-1 accent-emerald-400"
            />
          </div>

          {/* 🔍 Search */}
          <button
            onClick={() => setSearchOpen(true)}
            className="ml-4 w-14 h-14 rounded-full bg-emerald-400 text-black flex items-center justify-center hover:scale-110 transition"
          >
            <Search />
          </button>
        </div>
      </div>

      {/* 🔍 SEARCH DRAWER */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="absolute inset-0 z-[200] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <div className="w-full max-w-4xl h-[70vh] rounded-[32px] border border-white/10 bg-[#0b0c0c] overflow-hidden flex flex-col">

              {/* Search Header */}
              <div className="p-6 border-b border-white/10 flex gap-4 sticky top-0 bg-[#0b0c0c] z-10">
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search songs, artists..."
                  className="flex-1 bg-white/5 rounded-xl px-4 py-3 outline-none text-sm"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="px-4 rounded-xl bg-white/5 hover:bg-white/10"
                >
                  <X />
                </button>
              </div>

              {/* Results */}
              <div className="flex-1 overflow-y-auto custom-scroll p-4 space-y-3">
                {loading && (
                  <div className="text-center py-10 opacity-40">
                    <Loader2 className="animate-spin inline" />
                  </div>
                )}

                {!loading &&
                  results.map((song) => (
                    <motion.div
                      key={song.id}
                      whileHover={{ scale: 1.01 }}
                      onClick={() => playSong(song)}
                      className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-emerald-400/10 cursor-pointer transition"
                    >
                      <img
                        src={song.banner}
                        className="w-20 h-12 rounded-md object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium leading-snug">
                          {song.title}
                        </p>
                        <p className="text-xs text-white/50">
                          {song.artist}
                        </p>
                      </div>
                    </motion.div>
                  ))}

                {!loading && results.length === 0 && query && (
                  <div className="text-center py-16 text-white/30 text-sm">
                    No results found
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Styles */}
      <style>{`
        .icon-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          display:flex;
          align-items:center;
          justify-content:center;
          transition: .3s;
        }
        .icon-btn:hover {
          background: rgba(255,255,255,0.18);
          transform: scale(1.1);
        }

        .play-btn {
          width:72px;
          height:72px;
          border-radius:50%;
          background:#34f5c5;
          color:black;
          display:flex;
          align-items:center;
          justify-content:center;
          box-shadow:0 0 40px rgba(52,245,197,.4);
          transition:.3s;
        }
        .play-btn:hover {
          transform: scale(1.08);
        }
        .pulse {
          animation:pulse 1.6s infinite;
        }
        @keyframes pulse {
          0% { box-shadow:0 0 0 0 rgba(52,245,197,.6);}
          70% { box-shadow:0 0 0 25px rgba(52,245,197,0);}
          100% { box-shadow:0 0 0 0 rgba(52,245,197,0);}
        }

        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: rgba(52,245,197,.6);
          border-radius: 20px;
        }
      `}</style>
    </motion.div>
  );
}
