"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, Pause, SkipBack, SkipForward, Volume2, Search, X, 
  Loader2, Music, Sparkles, ChevronRight, Disc, Activity, Terminal, Cpu, Zap
} from "lucide-react";

interface LabProps { onClose: () => void; }
interface Song { id: string; title: string; artist: string; banner: string; }

const MBackground: React.FC<LabProps> = ({ onClose }) => {
  // --- CORE STATE ---
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [volume, setVolume] = useState(70);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // --- SYSTEM SIMULATION STATES ---
  const [isDevMode, setIsDevMode] = useState(false);
  const [systemStatus, setSystemStatus] = useState("INITIALIZING");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, v: 0 });

  const playerRef = useRef<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastMouse = useRef({ x: 0, y: 0, time: 0 });
  const API_URL = "https://mahesh-backend-hub.onrender.com";

  // ================= 1. AI BOOT SEQUENCE =================
  useEffect(() => {
    const sequence = ["LOADING CORE...", "NEURAL_NET: OK", "USER_DETECTED", "SYSTEM OPERATIONAL"];
    sequence.forEach((msg, i) => {
      setTimeout(() => setSystemStatus(msg), i * 600);
    });
  }, []);

  // ================= 2. MATH-DRIVEN MOUSE VELOCITY =================
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const dt = now - lastMouse.current.time;
      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;
      const velocity = Math.sqrt(dx * dx + dy * dy) / (dt || 1);
      
      setMousePos({ x: e.clientX, y: e.clientY, v: velocity });
      lastMouse.current = { x: e.clientX, y: e.clientY, time: now };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ================= 3. MAGNETIC NEURAL SIMULATION (CANVAS) =================
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: any[] = [];
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number; y: number; baseX: number; baseY: number; size: number; density: number;
      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 2 + 1;
        this.density = (Math.random() * 30) + 1;
      }
      draw() {
        ctx!.fillStyle = isDevMode ? "rgba(0, 255, 179, 1)" : "rgba(0, 255, 179, 0.4)";
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }
      update() {
        let dx = mousePos.x - this.x;
        let dy = mousePos.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = 200;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < maxDistance) {
          this.x -= directionX;
          this.y -= directionY;
        } else {
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx / 15;
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy / 15;
          }
        }
      }
    }

    const init = () => {
      particles = [];
      const particleCount = (canvas.width * canvas.height) / 8000;
      for (let i = 0; i < particleCount; i++) particles.push(new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.draw();
        p.update();
        for (let j = i; j < particles.length; j++) {
          let dx = particles[i].x - particles[j].x;
          let dy = particles[i].y - particles[j].y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            ctx.strokeStyle = `rgba(0, 255, 179, ${1 - distance / 100 - 0.75})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize(); init(); animate();
    return () => window.removeEventListener("resize", resize);
  }, [mousePos, isDevMode]);

  // ================= 4. YOUTUBE ENGINE =================
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
    setIsTransitioning(true);
    setCurrentSong(song);
    playerRef.current.loadVideoById(song.id);
    setIsPlaying(true);
    setSearchOpen(false);
    setTimeout(() => setIsTransitioning(false), 500);
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
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className={`fixed inset-0 z-[200] bg-[#020202] overflow-hidden flex flex-col items-center justify-center ${isTransitioning ? 'animate-hit' : ''}`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40 pointer-events-none" />
      <div id="yt-player-instance" className="absolute invisible" />

      {/* --- HUD HEADER (Concept 1 & 9) --- */}
      <div className="absolute top-0 left-0 w-full p-10 flex justify-between items-start pointer-events-none z-[210]">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-[#00FFB3] text-[10px] font-black uppercase tracking-[0.4em]">
            <Cpu size={14} className={isPlaying ? "animate-pulse" : ""} /> {systemStatus}
          </div>
          <div className="text-white/20 text-[8px] uppercase tracking-[0.2em] font-mono">
            NODE: 0xMAHESH_HUB // LATENCY: 0.12ms
          </div>
        </div>
        <div className="flex gap-4 pointer-events-auto">
          <button 
            onClick={() => setIsDevMode(!isDevMode)} 
            className={`p-3 rounded-xl border transition-all ${isDevMode ? 'bg-[#00FFB3]/20 border-[#00FFB3] text-[#00FFB3]' : 'bg-white/5 border-white/10 text-white/40'}`}
          >
            <Terminal size={18} />
          </button>
          <button onClick={onClose} className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-red-500 hover:bg-red-500/10 transition-all">
            <X size={20} />
          </button>
        </div>
      </div>

      {/* --- CENTERED IDENTITY (Concept 7: Cinematic Tilt) --- */}
      <div className="relative z-10 text-center pointer-events-none select-none">
        <motion.div 
           style={{ 
             rotateX: (mousePos.y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0)) * -0.01, 
             rotateY: (mousePos.x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0)) * 0.01 
           }}
        >
          <h2 className="text-7xl md:text-[140px] font-black uppercase tracking-tighter leading-[0.75] text-white">
            V V D MAHESH <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-[#00FFB3] to-[#00FFB3] drop-shadow-[0_0_60px_rgba(0,255,179,0.5)] italic">
              PERURI
            </span>
          </h2>
          <div className="mt-10 flex items-center justify-center gap-6 opacity-40">
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-[#00FFB3]" />
            <span className="text-[10px] tracking-[0.8em] text-white uppercase font-mono">Digital Architect</span>
            <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-[#00FFB3]" />
          </div>
        </motion.div>
      </div>

      {/* --- PLAYGROUND DATA (Concept 8) --- */}
      <AnimatePresence>
        {isDevMode && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none border border-[#00FFB3]/10 z-40"
          >
            <div className="absolute top-28 left-10 p-4 bg-black/80 backdrop-blur-md border border-[#00FFB3]/20 rounded-lg font-mono text-[9px] text-[#00FFB3] leading-relaxed">
              &gt; RAW_X: {mousePos.x}px<br/>
              &gt; RAW_Y: {mousePos.y}px<br/>
              &gt; VELOCITY: {mousePos.v.toFixed(3)}<br/>
              &gt; AUDIO_MODE: YOUTUBE_EXT
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HUD PLAYER DOCK (Concept 4 & 5) --- */}
      <div className="absolute bottom-12 w-full max-w-5xl px-8 z-50">
        <div className="h-28 rounded-[35px] bg-black/40 backdrop-blur-3xl border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.9)] flex items-center justify-between px-10 relative overflow-hidden group hover:border-[#00FFB3]/30 transition-all duration-500">
          
          {/* Top Edge Frequency Visualizer */}
          <div className="absolute top-0 left-0 w-full flex items-end gap-[2px] h-[3px]">
             {[...Array(60)].map((_, i) => (
               <motion.div 
                 key={i} 
                 animate={isPlaying ? { height: [2, Math.random() * 15, 2], opacity: [0.2, 0.8, 0.2] } : { height: 1, opacity: 0.1 }} 
                 className="flex-1 bg-[#00FFB3]"
               />
             ))}
          </div>

          {/* Metadata */}
          <div className="flex items-center gap-6 min-w-[320px]">
            {currentSong ? (
              <div className="flex items-center gap-5">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-white/20 shadow-2xl transition-transform group-hover:rotate-3">
                  <img src={currentSong.banner} className="w-full h-full object-cover" alt="art" />
                  {isPlaying && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Zap size={20} className="text-[#00FFB3] animate-pulse" />
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-[11px] font-black uppercase text-white tracking-widest truncate max-w-[180px]">{currentSong.title}</h4>
                  <p className="text-[9px] font-bold text-[#00FFB3] uppercase tracking-[0.3em] mt-1 opacity-60">ID // {currentSong.artist}</p>
                </div>
              </div>
            ) : (
              <div onClick={() => setSearchOpen(true)} className="flex items-center gap-4 cursor-pointer text-white/20 hover:text-[#00FFB3] transition-all">
                <Activity size={20} className="animate-pulse" />
                <span className="text-[10px] uppercase font-black tracking-[0.5em]">System Idle // Initialize</span>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-10">
            <button onClick={() => playerRef.current?.seekTo(playerRef.current.getCurrentTime() - 10)} className="text-white/10 hover:text-white transition-colors"><SkipBack size={26} /></button>
            <motion.button 
              whileHover={{ scale: 1.1, boxShadow: "0 0 40px rgba(0, 255, 179, 0.4)" }} 
              whileTap={{ scale: 0.9 }} 
              onClick={() => isPlaying ? playerRef.current.pauseVideo() : playerRef.current.playVideo()} 
              className="w-20 h-20 rounded-full bg-[#00FFB3] text-black flex items-center justify-center shadow-2xl"
            >
              {isPlaying ? <Pause size={32} fill="black" /> : <Play size={32} fill="black" className="ml-1" />}
            </motion.button>
            <button onClick={() => playerRef.current?.seekTo(playerRef.current.getCurrentTime() + 10)} className="text-white/10 hover:text-white transition-colors"><SkipForward size={26} /></button>
          </div>

          {/* Tools */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 bg-white/5 px-5 py-2.5 rounded-full border border-white/5">
               <Volume2 size={16} className="text-[#00FFB3]" />
               <input type="range" min="0" max="100" value={volume} onChange={(e) => { setVolume(parseInt(e.target.value)); playerRef.current?.setVolume(parseInt(e.target.value)); }} className="w-24 accent-[#00FFB3] h-[2px] cursor-pointer" />
            </div>
            <button onClick={() => setSearchOpen(true)} className="w-16 h-16 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-black hover:bg-[#00FFB3] flex items-center justify-center transition-all">
              <Search size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* --- DASHBOARD SEARCH OVERLAY (With Cinematic Scroll) --- */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            className="absolute inset-0 z-[300] flex items-center justify-center p-6 bg-black/95 backdrop-blur-3xl"
          >
            <motion.div 
              initial={{ y: 50, scale: 0.95 }} animate={{ y: 0, scale: 1 }} 
              className="w-full max-w-3xl bg-[#050505] border border-white/10 rounded-[50px] p-12 relative shadow-3xl overflow-hidden"
            >
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-3 text-[10px] font-black text-[#00FFB3] uppercase tracking-[0.6em]">
                  <Sparkles size={18} className="animate-spin-slow" /> Global Interface Search
                </div>
                <button onClick={() => setSearchOpen(false)} className="text-white/20 hover:text-red-500 transition-colors"><X size={24} /></button>
              </div>

              <div className="flex gap-4 mb-10">
                <input 
                  autoFocus value={query} 
                  onChange={(e) => setQuery(e.target.value)} 
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()} 
                  className="flex-1 bg-white/[0.03] border border-white/10 px-8 py-6 rounded-3xl text-white outline-none focus:border-[#00FFB3]/50 transition-all text-lg font-mono placeholder:text-white/5" 
                  placeholder="&gt; SEARCH_QUERY_..." 
                />
                <button onClick={handleSearch} className="bg-[#00FFB3] text-black px-12 rounded-3xl font-black text-xs tracking-widest uppercase hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,255,179,0.3)]">
                  {loading ? <Loader2 className="animate-spin" /> : "QUERY"}
                </button>
              </div>

              {/* DYNAMIC SCROLLABLE RESULTS AREA */}
              <div className="space-y-4 max-h-[480px] overflow-y-auto pr-6 custom-scrollbar">
                {results.length > 0 ? (
                  results.map((song) => (
                    <motion.div 
                      key={song.id} 
                      whileHover={{ x: 15, backgroundColor: "rgba(0, 255, 179, 0.05)" }} 
                      onClick={() => selectSong(song)} 
                      className="flex items-center gap-6 p-5 rounded-[35px] bg-white/[0.02] border border-transparent hover:border-[#00FFB3]/20 cursor-pointer transition-all group"
                    >
                      <div className="relative w-28 aspect-video rounded-2xl overflow-hidden shadow-2xl">
                        <img src={song.banner} className="w-full h-full object-cover" alt="art" />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors flex items-center justify-center">
                           <Play size={16} className="text-white opacity-0 group-hover:opacity-100 transition-opacity translate-y-1 group-hover:translate-y-0 duration-300" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h5 className="text-[13px] font-black text-white group-hover:text-[#00FFB3] uppercase tracking-wide transition-colors">{song.title}</h5>
                        <p className="text-[10px] text-white/30 uppercase mt-1 font-bold tracking-[0.2em]">{song.artist}</p>
                      </div>
                      <ChevronRight size={20} className="text-white/10 group-hover:text-[#00FFB3] group-hover:translate-x-1 transition-all" />
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-24 text-white/5 text-[11px] font-black uppercase tracking-[1.5em] italic">
                    {loading ? "SEARCHING_DATA_..." : "AWAITING_SIGNAL"}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .animate-spin-slow { animation: spin 15s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input[type='range'] { -webkit-appearance: none; background: rgba(255,255,255,0.05); }
        input[type='range']::-webkit-slider-thumb { -webkit-appearance: none; height: 12px; width: 12px; border-radius: 50%; background: #00FFB3; cursor: pointer; }
      `}</style>
    </motion.div>
  );
};

export default MBackground;