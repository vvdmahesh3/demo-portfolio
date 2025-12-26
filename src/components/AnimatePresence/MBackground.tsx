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
  Loader2,
} from "lucide-react";

/* ---------------- TYPES ---------------- */
interface LabProps {
  onClose: () => void;
}

interface Song {
  id: string;
  title: string;
  artist: string;
  banner: string;
}

/* ---------------- COMPONENT ---------------- */
const MBackground: React.FC<LabProps> = ({ onClose }) => {
  /* -------- PLAYER STATE -------- */
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);

  /* -------- SEARCH STATE -------- */
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);

  /* -------- QUEUE STATE -------- */
  const [queue, setQueue] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  /* -------- AUDIO STATE -------- */
  const [volume, setVolume] = useState(70);

  /* -------- CURRENT SONG -------- */
  const [currentSong, setCurrentSong] = useState<Song>({
    id: "vS3_7V99VEE",
    title: "Aakaasam Nee Haddhu Ra",
    artist: "G.V. Prakash",
    banner: "https://img.youtube.com/vi/vS3_7V99VEE/maxresdefault.jpg",
  });

  const playerRef = useRef<any>(null);

  /* -------- BACKEND URL -------- */
  const API_URL = "https://mahesh-backend-hub.onrender.com";

  /* =========================================================
     YOUTUBE IFRAME INITIALIZATION
  ========================================================= */
  useEffect(() => {
    if (!(window as any).YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    (window as any).onYouTubeIframeAPIReady = createPlayer;

    if ((window as any).YT?.Player) {
      createPlayer();
    }

    function createPlayer() {
      if (playerRef.current) return;

      playerRef.current = new (window as any).YT.Player(
        "yt-player-instance",
        {
          height: "0",
          width: "0",
          videoId: currentSong.id,
          playerVars: {
            autoplay: 0,
            controls: 0,
            modestbranding: 1,
            rel: 0,
          },
          events: {
            onReady: (e: any) => {
              e.target.setVolume(volume);
              setPlayerReady(true);
            },
            onStateChange: (e: any) => {
              if (e.data === 1) setIsPlaying(true);
              if (e.data === 2) setIsPlaying(false);

              // AUTO PLAY NEXT
              if (e.data === 0) playNext();
            },
          },
        }
      );
    }

    return () => {
      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, []);

  /* =========================================================
     PLAYER CONTROLS
  ========================================================= */
  const togglePlay = () => {
    if (!playerReady) return;
    isPlaying
      ? playerRef.current.pauseVideo()
      : playerRef.current.playVideo();
  };

  const playNext = () => {
    if (!playerReady) return;
    if (currentIndex + 1 >= queue.length) return;

    const next = queue[currentIndex + 1];
    setCurrentIndex((i) => i + 1);
    setCurrentSong(next);
    playerRef.current.loadVideoById(next.id);
  };

  const playPrev = () => {
    if (!playerReady) return;
    if (currentIndex === 0) return;

    const prev = queue[currentIndex - 1];
    setCurrentIndex((i) => i - 1);
    setCurrentSong(prev);
    playerRef.current.loadVideoById(prev.id);
  };

  /* =========================================================
     SEARCH LOGIC
  ========================================================= */
  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/api/music-search?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();

      setResults(data);
      setQueue(data);
      setCurrentIndex(0);
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const selectSong = (song: Song, index: number) => {
    if (!playerReady) return;

    setCurrentIndex(index);
    setCurrentSong(song);
    playerRef.current.loadVideoById(song.id);
    setIsPlaying(true);
    setSearchOpen(false);
  };

  /* =========================================================
     UI
  ========================================================= */
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
        className="absolute top-8 right-8 p-4 rounded-full bg-white/5 hover:bg-red-500/20 text-white z-[210]"
      >
        <X size={24} />
      </button>

      {/* Background Identity */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
        <motion.h1
          animate={{ scale: isPlaying ? [1, 1.05, 1] : 1 }}
          transition={{ duration: 4, repeat: Infinity }}
          className="text-[60vw] font-black text-white"
        >
          M
        </motion.h1>
      </div>

      {/* Dock */}
      <div className="absolute bottom-10 w-full max-w-4xl px-6">
        <div className="h-24 rounded-[32px] bg-zinc-950/80 backdrop-blur-3xl border border-white/10 flex items-center justify-between px-8">
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => setSearchOpen(true)}
          >
            <img
              src={currentSong.banner}
              className="w-14 h-14 rounded-2xl"
            />
            <div className="hidden md:block">
              <h4 className="text-xs font-black text-white truncate">
                {currentSong.title}
              </h4>
              <p className="text-[9px] text-[#00FFB3] uppercase truncate">
                {currentSong.artist}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <SkipBack onClick={playPrev} />
            <button
              onClick={togglePlay}
              className="w-14 h-14 rounded-full bg-[#00FFB3] flex items-center justify-center"
            >
              {isPlaying ? <Pause /> : <Play />}
            </button>
            <SkipForward onClick={playNext} />
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <Volume2 size={16} />
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
            />
            <Activity className={isPlaying ? "animate-pulse text-[#00FFB3]" : ""} />
            <Settings className={isPlaying ? "animate-spin" : ""} />
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div className="absolute z-[220] w-[90%] max-w-xl bg-zinc-900 rounded-[40px] p-8">
            <div className="flex gap-4 mb-6">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1 bg-black/40 px-4 py-3 rounded-xl"
                placeholder="Search System Records..."
              />
              <button onClick={handleSearch}>
                {loading ? <Loader2 className="animate-spin" /> : "Go"}
              </button>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto">
              {results.map((song, i) => (
                <div
                  key={song.id}
                  onClick={() => selectSong(song, i)}
                  className="flex gap-4 p-3 hover:bg-white/5 cursor-pointer rounded-xl"
                >
                  <img src={song.banner} className="w-12 h-12 rounded-xl" />
                  <div>
                    <h5 className="text-sm text-white truncate">
                      {song.title}
                    </h5>
                    <p className="text-xs text-zinc-500 truncate">
                      {song.artist}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSearchOpen(false)}
              className="mt-6 w-full text-center text-xs text-zinc-500"
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
