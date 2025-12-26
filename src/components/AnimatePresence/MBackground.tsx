"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, Pause, SkipBack, SkipForward, Volume2, Search, X, 
  Activity, Loader2, Music, Layers, ChevronRight, Sparkles
} from "lucide-react";

interface LabProps { onClose: () => void; }
interface Song { id: string; title: string; artist: string; banner: string; }

const MBackground: React.FC<LabProps> = ({ onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<Song[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [volume, setVolume] = useState(70);
  const [currentSong, setCurrentSong] = useState<Song | null>(null); // Start with null

  const playerRef = useRef<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const API_URL = "https://mahesh-backend-hub.onrender.com";

  // ================= 1. NEURAL BACKGROUND ANIMATION =================
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: any[] = [];
    let animationFrameId: number;
    let mouse = { x: 0, y: 0 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number; y: number; vx: number; vy: number;
      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;
      }
    }

    const init = () => {
      particles = Array.from({ length: 80 }, () => new Particle());
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(0, 255, 179, 0.15)";
      ctx.lineWidth = 0.5;

      particles.forEach((p, i) => {
        p.update();
        particles.slice(i + 1).forEach(p2 => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });

        // Mouse connection
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 200) {
          ctx.strokeStyle = `rgba(0, 255, 179, ${1 - mDist / 200})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
          ctx.strokeStyle = "rgba(0, 255, 179, 0.15)";
        }
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
    resize(); init(); draw();
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // ================= 2. YOUTUBE ENGINE =================
  useEffect(() => {
    if (!(window as any).YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
    (window as any).onYouTubeIframeAPIReady = () => initPlayer();
    if ((window as any).YT?.Player) initPlayer();

    function initPlayer() {
      if (playerRef.current) return;
      playerRef.current = new (window as any).YT.Player("yt-player-instance", {
        height: "0", width: "0",
        playerVars: { controls: 0, rel: 0, origin: window.location.origin },
        events: {
          onReady: (e: any) => { e.target.setVolume(volume); setPlayerReady(true); },
          onStateChange: (e: any) => {
            if (e.data === 1) setIsPlaying(true);
            if (e.data === 2 || e.data === 0) setIsPlaying(false);
          },
        },
      });
    }
  }, []);

  const selectSong = (song: Song) => {
    if (!playerReady) return;
    setCurrentSong(song);
    playerRef.current.loadVideoById(song.id);
    setIsPlaying(true);
    setSearchOpen(false);
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/music-search?q=${encodeURIComponent(query)}`);
      setResults(await res.json());
    } catch { setResults([]); } finally { setLoading(false); }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black overflow-hidden flex flex-col items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40 pointer-events-auto" />
      <div id="yt-player-instance" className="absolute invisible" />

      {/* --- REFINED EXIT --- */}
      <button onClick={onClose} className="absolute top-8 right-8 p-3 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-[#00FFB3] transition-all z-[210] backdrop-blur-md">
        <X size={18} />
      </button>

      {/* --- IDENTITY SECTION --- */}
      <div className="relative z-10 text-center pointer-events-none">
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2 }}>
          <div className="flex items-center justify-center gap-2 mb-6 opacity-60 tracking-[0.8em] text-[9px] text-white uppercase font-black">
             System Link Active <Sparkles size={12} className="text-[#00FFB3] animate-pulse" />
          </div>
          <h2 className="text-5xl md:text-[120px] font-black uppercase tracking-tighter leading-[0.8] text-white">
            VVD MAHESH <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-[#00FFB3] to-[#00FFB3] drop-shadow-[0_10px_40px_rgba(0,255,179,0.4)]">
              PERURI
            </span>
          </h2>
        </motion.div>
      </div>

      {/* --- ADVANCED PLAYER DOCK --- */}
      <div className="absolute bottom-10 w-full max-w-4xl px-6 z-[100]">
        <div className="h-24 rounded-3xl bg-black/40 backdrop-blur-3xl border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex items-center justify-between px-8">
          
          {currentSong ? (
            <div className="flex items-center gap-5 min-w-[250px] group">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-white/10 shadow-lg">
                <img src={currentSong.banner} className="w-full h-full object-cover" alt="art" />
                {isPlaying && (
                    <div className="absolute inset-0 flex items-end justify-center gap-0.5 pb-2 bg-black/40">
                        {[...Array(4)].map((_, i) => (
                            <motion.div key={i} animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }} className="w-1 bg-[#00FFB3] rounded-full" />
                        ))}
                    </div>
                )}
              </div>
              <div className="text-left">
                <h4 className="text-xs font-black uppercase text-white tracking-wide truncate max-w-[150px]">{currentSong.title}</h4>
                <p className="text-[9px] font-bold text-[#00FFB3] uppercase tracking-widest mt-0.5">{currentSong.artist}</p>
              </div>
            </div>
          ) : (
            <div onClick={() => setSearchOpen(true)} className="flex items-center gap-4 cursor-pointer text-white/20 hover:text-white/40 transition-colors">
                <Music size={20} />
                <span className="text-[10px] uppercase font-bold tracking-[0.3em]">Select Track to Initialize</span>
            </div>
          )}

          <div className="flex items-center gap-8">
            <button onClick={() => playerRef.current?.pauseVideo()} className="text-white/20 hover:text-white transition-colors"><SkipBack size={20} /></button>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => isPlaying ? playerRef.current.pauseVideo() : playerRef.current.playVideo()} className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-xl">
              {isPlaying ? <Pause size={24} fill="black" /> : <Play size={24} fill="black" className="ml-1" />}
            </motion.button>
            <button onClick={() => playerRef.current?.playVideo()} className="text-white/20 hover:text-white transition-colors"><SkipForward size={20} /></button>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
               <Volume2 size={14} className="text-white/30" />
               <input type="range" min="0" max="100" value={volume} onChange={(e) => { setVolume(parseInt(e.target.value)); playerRef.current?.setVolume(parseInt(e.target.value)); }} className="w-16 accent-[#00FFB3] h-[2px] cursor-pointer" />
            </div>
            <button onClick={() => setSearchOpen(true)} className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:bg-[#00FFB3] hover:text-black transition-all">
              <Search size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* --- SEARCH OVERLAY (Same logic, but cleaner UI) --- */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[300] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl">
            <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[40px] p-10 relative shadow-3xl">
              <div className="flex items-center justify-between mb-8">
                <span className="text-[9px] font-black uppercase tracking-widest text-[#00FFB3]">Database Query</span>
                <button onClick={() => setSearchOpen(false)} className="text-white/20 hover:text-red-500"><X size={20} /></button>
              </div>
              <div className="flex gap-3 mb-8">
                <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()} className="flex-1 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-white outline-none focus:border-[#00FFB3]/50" placeholder="Search track name..." />
                <button onClick={handleSearch} className="bg-[#00FFB3] text-black px-8 rounded-2xl font-black text-[10px] tracking-widest uppercase">
                  {loading ? <Loader2 className="animate-spin" /> : "Search"}
                </button>
              </div>
              <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                {results.map((song) => (
                  <div key={song.id} onClick={() => selectSong(song)} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 cursor-pointer group transition-all">
                    <img src={song.banner} className="w-20 aspect-video rounded-lg object-cover" alt="art" />
                    <div className="flex-1">
                      <h5 className="text-[11px] font-bold text-white group-hover:text-[#00FFB3] uppercase">{song.title}</h5>
                      <p className="text-[9px] text-white/30 uppercase mt-1">{song.artist}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        input[type='range'] { -webkit-appearance: none; background: rgba(255,255,255,0.1); border-radius: 5px; }
        input[type='range']::-webkit-slider-thumb { -webkit-appearance: none; height: 10px; width: 10px; border-radius: 50%; background: #00FFB3; box-shadow: 0 0 10px #00FFB3; cursor: pointer; }
      `}</style>
    </motion.div>
  );
};

export default MBackground;