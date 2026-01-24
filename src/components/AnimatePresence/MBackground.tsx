"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import {
  Play,
  Pause,
  Search,
  Volume2,
  X,
  SkipBack,
  SkipForward,
  Loader2,
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

/* ---------------- COLOR EXTRACT ---------------- */

function extractAverageColor(imgUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imgUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      canvas.width = 40;
      canvas.height = 40;
      ctx.drawImage(img, 0, 0, 40, 40);

      const data = ctx.getImageData(0, 0, 40, 40).data;
      let r = 0, g = 0, b = 0;

      for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
      }

      const count = data.length / 4;
      resolve(`rgb(${(r / count) | 0}, ${(g / count) | 0}, ${(b / count) | 0})`);
    };

    img.onerror = () => resolve("#00ffb3");
  });
}

/* ---------------- COMPONENT ---------------- */

export default function MBackground({ onClose }: LabProps) {
  const playerRef = useRef<any>(null);

  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(70);

  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);

  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [accent, setAccent] = useState("#00ffb3");

  /* ----------- Magnetic Motion ----------- */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 140, damping: 18 });
  const springY = useSpring(my, { stiffness: 140, damping: 18 });

  const magnetMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set((e.clientX - rect.left - rect.width / 2) / 2);
    my.set((e.clientY - rect.top - rect.height / 2) / 2);
  };

  const magnetReset = () => {
    mx.set(0);
    my.set(0);
  };

  /* ----------- Keyboard Shortcut ----------- */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" || (e.ctrlKey && e.key.toLowerCase() === "k")) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  /* ----------- YouTube Engine ----------- */
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
        playerVars: { controls: 0 },
        events: {
          onReady: (e: any) => {
            e.target.setVolume(volume);
            setReady(true);
          },
          onStateChange: (e: any) => {
            if (e.data === 1) setPlaying(true);
            if (e.data === 2 || e.data === 0) setPlaying(false);
          },
        },
      });
    };
  }, []);

  const playSong = async (song: Song) => {
    if (!ready) return;
    setCurrentSong(song);
    playerRef.current.loadVideoById(song.id);
    setPlaying(true);
    setSearchOpen(false);

    const color = await extractAverageColor(song.banner);
    setAccent(color);
  };

  const searchMusic = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/api/music-search?q=${encodeURIComponent(query)}`
      );
      setResults(await res.json());
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
      className="fixed inset-0 z-[200] bg-[#050505] overflow-hidden flex items-center justify-center"
      style={{ ["--accent" as any]: accent }}
    >
      <div id="yt-player" className="hidden" />

      {/* Ambient Glow */}
      <div
        className="absolute inset-0 blur-[140px]"
        style={{
          background: `radial-gradient(circle at center, var(--accent), transparent 70%)`,
          opacity: playing ? 0.6 : 0.25,
        }}
      />

      {/* Floating Search Button */}
      <button
        onClick={() => setSearchOpen(true)}
        className="fixed top-6 right-6 z-[500] w-14 h-14 rounded-full bg-[var(--accent)] text-black flex items-center justify-center shadow-xl hover:scale-110 transition"
        title="Search ( / or Ctrl+K )"
      >
        <Search />
      </button>

      {/* Main Glass */}
      <div className="relative z-10 w-[92%] max-w-6xl h-[75vh] rounded-[40px] backdrop-blur-3xl bg-white/5 border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.9)] overflow-hidden grid md:grid-cols-2">

        {/* LEFT */}
        <div className="flex flex-col items-center justify-center gap-8 p-10">
          <motion.div
            animate={playing ? { rotate: 360 } : {}}
            transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
            className="relative w-72 h-72 rounded-full"
            style={{ boxShadow: `0 0 120px var(--accent)` }}
          >
            <img
              src={
                currentSong?.banner ||
                "https://images.unsplash.com/photo-1511379938547-c1f69419868d"
              }
              className="absolute inset-6 rounded-full object-cover"
            />
            <div className="absolute inset-[45%] rounded-full bg-black" />
          </motion.div>

          <div className="text-center">
            <h2 className="text-xl font-bold tracking-widest text-white">
              {currentSong?.title || "SELECT A TRACK"}
            </h2>
            <p className="text-xs mt-1 tracking-wider text-[var(--accent)]">
              Press / or click 🔍 to search
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-6">
            <button
              onClick={() =>
                playerRef.current?.seekTo(
                  playerRef.current.getCurrentTime() - 10
                )
              }
              className="icon-btn"
            >
              <SkipBack />
            </button>

            <motion.button
              onMouseMove={magnetMove}
              onMouseLeave={magnetReset}
              style={{ x: springX, y: springY, background: "var(--accent)" }}
              onClick={() =>
                playing
                  ? playerRef.current.pauseVideo()
                  : playerRef.current.playVideo()
              }
              className="w-20 h-20 rounded-full text-black flex items-center justify-center shadow-xl"
            >
              {playing ? <Pause /> : <Play className="ml-1" />}
            </motion.button>

            <button
              onClick={() =>
                playerRef.current?.seekTo(
                  playerRef.current.getCurrentTime() + 10
                )
              }
              className="icon-btn"
            >
              <SkipForward />
            </button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-3 w-full max-w-xs">
            <Volume2 size={18} className="text-[var(--accent)]" />
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
              className="flex-1 accent-[var(--accent)]"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col justify-between p-10">
          <div>
            <h1 className="text-5xl font-black text-white leading-tight">
              IMMERSIVE
              <br />
              MUSIC LAB
            </h1>
            <p className="text-white/40 mt-4 max-w-sm text-sm">
              A reactive interface blending motion, sound and emotion.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setSearchOpen(true)}
              className="action-btn"
            >
              <Search size={18} />
              Search Music
            </button>

            <button onClick={onClose} className="action-btn subtle">
              <X size={18} />
              Exit
            </button>
          </div>
        </div>
      </div>

      {/* SEARCH OVERLAY */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 z-[300] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <div className="w-full max-w-3xl bg-[#060606] rounded-[30px] border border-white/10 p-8">
              <div className="flex gap-3 mb-6">
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && searchMusic()}
                  placeholder="Search any song..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
                />
                <button
                  onClick={searchMusic}
                  className="px-6 rounded-xl font-semibold text-black"
                  style={{ background: "var(--accent)" }}
                >
                  {loading ? <Loader2 className="animate-spin" /> : "Search"}
                </button>
                <button
                  onClick={() => setSearchOpen(false)}
                  className="px-4 rounded-xl bg-white/5 text-white/60"
                >
                  <X />
                </button>
              </div>

              <div className="max-h-[420px] overflow-y-auto space-y-3">
                {results.map((song) => (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    key={song.id}
                    onClick={() => playSong(song)}
                    className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer"
                  >
                    <img
                      src={song.banner}
                      className="w-20 h-12 object-cover rounded-md"
                    />
                    <div>
                      <p className="text-white text-sm font-semibold">
                        {song.title}
                      </p>
                      <p className="text-xs text-white/40">{song.artist}</p>
                    </div>
                  </motion.div>
                ))}

                {!loading && results.length === 0 && (
                  <div className="text-center text-white/20 text-sm py-10">
                    Start typing to search 🎧
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .icon-btn {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          transition: all .3s;
        }
        .icon-btn:hover {
          background: var(--accent);
          color: black;
          transform: scale(1.1);
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 14px 22px;
          border-radius: 999px;
          background: var(--accent);
          color: black;
          font-weight: 600;
          transition: all .3s;
        }
        .action-btn:hover {
          filter: brightness(1.1);
          transform: translateY(-2px);
        }

        .action-btn.subtle {
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.7);
        }
        .action-btn.subtle:hover {
          background: rgba(255,255,255,0.15);
        }
      `}</style>
    </motion.div>
  );
}
