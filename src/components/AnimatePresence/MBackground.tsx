"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, Pause, SkipBack, SkipForward, Volume2, Search, X, 
  Loader2, Music, Sparkles, ChevronRight, Disc, Activity
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
  const [volume, setVolume] = useState(70);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  const playerRef = useRef<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const API_URL = "https://mahesh-backend-hub.onrender.com";

  // ================= 1. HIGH-END NEURAL ANIMATION (MATCHES VIDEO) =================
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: any[] = [];
    let mouse = { x: -100, y: -100, active: false };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number; y: number; baseX: number; baseY: number; size: number;
      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 2 + 1;
      }
      draw() {
        ctx!.fillStyle = "rgba(0, 255, 179, 0.5)";
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }
      update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = 200;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * 5;
        let directionY = forceDirectionY * force * 5;

        if (distance < maxDistance) {
          this.x -= directionX;
          this.y -= directionY;
        } else {
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx / 20;
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy / 20;
          }
        }
      }
    }

    const init = () => {
      particles = [];
      const particleCount = (canvas.width * canvas.height) / 9000;
      for (let i = 0; i < particleCount; i++) particles.push(new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
        particles[i].update();
        for (let j = i; j < particles.length; j++) {
          let dx = particles[i].x - particles[j].x;
          let dy = particles[i].y - particles[j].y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            ctx.strokeStyle = `rgba(0, 255, 179, ${1 - distance / 100 - 0.7})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
    resize(); init(); animate();
    return () => window.removeEventListener("resize", resize);
  }, []);

  // ================= 2. YOUTUBE PLAYER LOGIC =================
  useEffect(() => {
    if (!(window as any).YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
    (window as any).onYouTubeIframeAPIReady = () => {
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
    };
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-[#020202] overflow-hidden flex flex-col items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-60" />
      <div id="yt-player-instance" className="absolute invisible" />

      {/* --- REFINED EXIT --- */}
      <button onClick={onClose} className="absolute top-10 right-10 p-3 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-[#00FFB3] hover:scale-110 transition-all z-[210] backdrop-blur-md">
        <X size={20} />
      </button>

      {/* --- CENTERED IDENTITY (V V D MAHESH PERURI) --- */}
      <div className="relative z-10 text-center pointer-events-none select-none">
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, ease: "easeOut" }}>
          <div className="flex items-center justify-center gap-3 mb-6 opacity-40 tracking-[0.6em] text-[10px] text-white uppercase font-black">
             <Activity size={14} className="text-[#00FFB3]" /> Neural Interface Active
          </div>
          <h2 className="text-6xl md:text-[130px] font-black uppercase tracking-tighter leading-[0.8] text-white">
            V V D MAHESH <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00FFB3] via-emerald-400 to-cyan-500 drop-shadow-[0_0_50px_rgba(0,255,179,0.5)] italic">
              PERURI
            </span>
          </h2>
          <motion.p animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ repeat: Infinity, duration: 3 }} className="mt-8 text-[10px] tracking-[1em] text-white/50 uppercase ml-[1em]">
            Creative Engineering
          </motion.p>
        </motion.div>
      </div>

      {/* --- DYNAMIC PLAYER DOCK --- */}
      <div className="absolute bottom-12 w-full max-w-5xl px-8 z-50">
        <div className="h-28 rounded-[40px] bg-black/40 backdrop-blur-3xl border border-white/5 shadow-[0_20px_80px_rgba(0,0,0,0.8)] flex items-center justify-between px-10 relative overflow-hidden group">
          
          {/* Internal Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#00FFB3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          {/* Left: Metadata */}
          <div className="flex items-center gap-6 min-w-[300px]">
            {currentSong ? (
              <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex items-center gap-5">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-white/10 rotate-3 shadow-2xl">
                  <img src={currentSong.banner} className="w-full h-full object-cover" alt="art" />
                  {isPlaying && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Disc className="w-8 h-8 text-[#00FFB3] animate-spin-slow" />
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase text-white tracking-widest truncate max-w-[160px]">{currentSong.title}</h4>
                  <p className="text-[9px] font-bold text-[#00FFB3] uppercase tracking-[0.2em] mt-1">SST // {currentSong.artist}</p>
                </div>
              </motion.div>
            ) : (
              <div onClick={() => setSearchOpen(true)} className="flex items-center gap-4 cursor-pointer text-white/20 hover:text-[#00FFB3] transition-all group/call">
                <Music className="w-6 h-6 group-hover/call:rotate-12 transition-transform" />
                <span className="text-[10px] uppercase font-black tracking-[0.4em]">Initialize Audio System</span>
              </div>
            )}
          </div>

          {/* Center: Controls */}
          <div className="flex items-center gap-10">
            <button onClick={() => playerRef.current?.seekTo(playerRef.current.getCurrentTime() - 10)} className="text-white/20 hover:text-white transition-colors"><SkipBack size={24} /></button>
            <motion.button 
              whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(255,255,255,0.2)" }} 
              whileTap={{ scale: 0.9 }} 
              onClick={() => isPlaying ? playerRef.current.pauseVideo() : playerRef.current.playVideo()} 
              className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center"
            >
              {isPlaying ? <Pause size={30} fill="black" /> : <Play size={30} fill="black" className="ml-1" />}
            </motion.button>
            <button onClick={() => playerRef.current?.seekTo(playerRef.current.getCurrentTime() + 10)} className="text-white/20 hover:text-white transition-colors"><SkipForward size={24} /></button>
          </div>

          {/* Right: Volume & Search */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/5">
               <Volume2 size={16} className="text-[#00FFB3]" />
               <input type="range" min="0" max="100" value={volume} onChange={(e) => { setVolume(parseInt(e.target.value)); playerRef.current?.setVolume(parseInt(e.target.value)); }} className="w-20 accent-[#00FFB3] h-[2px] cursor-pointer" />
            </div>
            <button onClick={() => setSearchOpen(true)} className="w-14 h-14 rounded-full bg-[#00FFB3] text-black flex items-center justify-center hover:shadow-[0_0_20px_#00FFB3] transition-all">
              <Search size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* --- ADVANCED SEARCH OVERLAY WITH SCROLL --- */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[300] flex items-center justify-center p-6 bg-black/90 backdrop-blur-3xl">
            <motion.div initial={{ y: 100, scale: 0.9 }} animate={{ y: 0, scale: 1 }} className="w-full max-w-2xl bg-[#080808] border border-white/10 rounded-[50px] p-10 relative overflow-hidden shadow-3xl">
              
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3 text-[10px] font-black text-[#00FFB3] uppercase tracking-[0.5em]">
                  <Sparkles size={16} /> Signal Search
                </div>
                <button onClick={() => setSearchOpen(false)} className="text-white/20 hover:text-red-500 transition-colors"><X size={24} /></button>
              </div>

              <div className="flex gap-4 mb-8">
                <input 
                  autoFocus value={query} 
                  onChange={(e) => setQuery(e.target.value)} 
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()} 
                  className="flex-1 bg-white/5 border border-white/10 px-8 py-5 rounded-[25px] text-white outline-none focus:border-[#00FFB3]/50 transition-all font-bold tracking-wide" 
                  placeholder="Query artist, track, or genre..." 
                />
                <button onClick={handleSearch} className="bg-[#00FFB3] text-black px-10 rounded-[25px] font-black text-[11px] tracking-widest uppercase hover:brightness-110 active:scale-95 transition-all">
                  {loading ? <Loader2 className="animate-spin" /> : "SEARCH"}
                </button>
              </div>

              {/* RESULTS AREA WITH SCROLL BAR */}
              <div className="space-y-3 max-h-[450px] overflow-y-auto pr-4 custom-scrollbar">
                {results.length > 0 ? (
                  results.map((song) => (
                    <motion.div 
                      key={song.id} 
                      whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.05)" }} 
                      onClick={() => selectSong(song)} 
                      className="flex items-center gap-5 p-4 rounded-[30px] bg-white/[0.02] border border-transparent hover:border-[#00FFB3]/30 cursor-pointer transition-all group"
                    >
                      <div className="relative w-24 aspect-video rounded-xl overflow-hidden shadow-lg">
                        <img src={song.banner} className="w-full h-full object-cover" alt="art" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                      </div>
                      <div className="flex-1">
                        <h5 className="text-[12px] font-black text-white group-hover:text-[#00FFB3] uppercase tracking-tight transition-colors">{song.title}</h5>
                        <p className="text-[9px] text-white/30 uppercase mt-1 font-bold tracking-widest">{song.artist}</p>
                      </div>
                      <ChevronRight size={18} className="text-white/10 group-hover:text-[#00FFB3] transition-colors" />
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-20 text-white/10 text-[10px] font-black uppercase tracking-[1em]">
                    {loading ? "Searching Database..." : "No Signals Found"}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .animate-spin-slow { animation: spin 8s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </motion.div>
  );
};

export default MBackground;