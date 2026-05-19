"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Pause, Volume2, Search, X, Loader2, Sparkles, 
  Activity, Cpu, Zap, Network, Terminal, ShieldAlert,
  Headphones, Database, Move
} from "lucide-react";

interface LabProps { onClose: () => void; }
interface Song { id: string; title: string; artist: string; banner: string; }

/* ──────────────────────────────────────────────────────────── */
/* CANVAS PARTICLE NETWORK (Ultra-Premium Background)          */
/* ──────────────────────────────────────────────────────────── */
const ParticleNetwork: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const numParticles = Math.min(Math.floor(window.innerWidth / 10), 100); // reduced count for stability
    
    let mouse = { x: -1000, y: -1000 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;

      constructor() {
        // Safe check for canvas width/height
        const cw = canvas?.width || window.innerWidth;
        const ch = canvas?.height || window.innerHeight;
        this.x = Math.random() * cw;
        this.y = Math.random() * ch;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
        this.size = Math.random() * 2 + 1;
        this.color = Math.random() > 0.5 ? "#00FFB3" : "#4F46E5";
      }

      update() {
        if (!canvas) return;
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;

        if (distance < maxDist) {
          const force = (maxDist - distance) / maxDist;
          this.x -= dx * force * 0.05;
          this.y -= dy * force * 0.05;
        } else {
          if (this.vx > 1) this.vx *= 0.95;
          if (this.vy > 1) this.vy *= 0.95;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.6;
        ctx.fill();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw Connections
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = particles[i].color;
            ctx.globalAlpha = 1 - (dist / 120);
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        // Mouse connections
        const mdx = particles[i].x - mouse.x;
        const mdy = particles[i].y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 150) {
          ctx.beginPath();
          ctx.strokeStyle = "#FFFFFF";
          ctx.globalAlpha = (1 - (mDist / 150)) * 0.5;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };
    
    // Prevent resizing issues from causing layout thrashing
    let resizeTimeout: any;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
         init();
      }, 200);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    init();
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
};


/* ──────────────────────────────────────────────────────────── */
/* MAIN DASHBOARD COMPONENT                                    */
/* ──────────────────────────────────────────────────────────── */

const UltimatePlayground: React.FC<LabProps> = ({ onClose }) => {
  // Logic State
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [volume, setVolume] = useState(60);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [systemLogs, setSystemLogs] = useState<string[]>([]);
  const [winStatus, setWinStatus] = useState({ w: 1000, h: 800 });
  const [ytReady, setYtReady] = useState(false);
  
  const playerRef = useRef<any>(null);
  const API_URL = "https://mahesh-backend-hub.onrender.com";

  // Handle Safe Window Sizing (Hydration Safe)
  useEffect(() => {
    setWinStatus({ w: window.innerWidth, h: window.innerHeight });
    const handleResize = () => setWinStatus({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Simulate Terminal Boot safely
  useEffect(() => {
    const logs = [
      "INITIALIZING KERNEL_V9.0...",
      "BYPASSING SECURITY PROTOCOLS...",
      "ESTABLISHING SYNAPSE CONNECTION...",
      "ALLOCATING VRAM [==========]",
      "AUDIO_SUBSYSTEM: ONLINE",
      "MAHESH_OS :: UNRESTRICTED ACCESS GRANTED",
    ];
    let i = 0;
    const sysId = window.setInterval(() => {
      if (i < logs.length) {
        setSystemLogs((prev) => [...prev, logs[i]]);
        i++;
      } else {
        clearInterval(sysId);
      }
    }, 400);
    return () => clearInterval(sysId);
  }, []);

  // YouTube Audio API - Safer loading logic
  useEffect(() => {
    const initYTPlayer = () => {
      if (!playerRef.current && (window as any).YT && (window as any).YT.Player) {
        try {
          playerRef.current = new (window as any).YT.Player("lab-audio-engine", {
            height: "0", width: "0",
            playerVars: { controls: 0, rel: 0, origin: window.location.origin },
            events: {
              onReady: (e: any) => {
                e.target.setVolume(volume);
                setYtReady(true);
              },
              onStateChange: (e: any) => {
                if (e.data === 1) setIsPlaying(true);
                if (e.data === 2 || e.data === 0) setIsPlaying(false);
              },
            },
          });
        } catch (e) {
          console.error("YT init error", e);
        }
      }
    };

    if (!(window as any).YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      (window as any).onYouTubeIframeAPIReady = initYTPlayer;
    } else {
      initYTPlayer();
    }
    
    return () => {
      // Ensure player cleanup avoids memory leaks
      if (playerRef.current && playerRef.current.destroy) {
        try { playerRef.current.destroy(); } catch (e) {}
      }
    };
  }, []);

  const selectSong = (song: Song) => {
    setCurrentSong(song);
    if (playerRef.current && playerRef.current.loadVideoById) {
      playerRef.current.loadVideoById(song.id);
      setIsPlaying(true);
    }
    setSearchOpen(false);
    setSystemLogs((prev) => [...prev, `AUDIO_STREAM_INTERCEPT: ${song.title}`]);
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setSystemLogs((prev) => [...prev, `EXECUTING DB_QUERY: "${query}"`]);
    try {
      const res = await fetch(`${API_URL}/api/music-search?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("Network issue");
      const data = await res.json();
      if (Array.isArray(data)) {
        setResults(data);
        setSystemLogs((prev) => [...prev, `MATCHES FOUND: ${data.length}`]);
      } else {
        setResults([]);
        setSystemLogs((prev) => [...prev, `ERROR: INVALID DATA`]);
      }
    } catch { 
      setResults([]); 
      setSystemLogs((prev) => [...prev, `ERROR: CONNECTION TIMEOUT`]);
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[500] bg-[#020202] text-white overflow-hidden font-sans select-none"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,179,0.08)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />
      <ParticleNetwork />
      <div id="lab-audio-engine" className="absolute invisible" />

      {/* Close Button Top Right */}
      <div className="absolute top-8 right-8 z-[600]">
        <button onClick={onClose} className="p-4 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white hover:scale-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(239,68,68,0.2)]">
          <X size={24} />
        </button>
      </div>

      {/* Center Watermark Typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-[12vw] font-black uppercase tracking-tighter opacity-5 text-white/50" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.2)" }}>
          MAHESH_OS
        </h1>
      </div>


      {/* ──────────────────────────────────────────────────────────── */}
      {/* WIDGET DESKTOP SYSTEM (Draggable Glass Panes)                */}
      {/* ──────────────────────────────────────────────────────────── */}

      {/* WIDGET 1: System Command Center */}
      <motion.div 
        drag dragMomentum={false}
        initial={{ x: -100, y: -100, opacity: 0 }} 
        animate={{ x: 40, y: 40, opacity: 1 }} 
        transition={{ type: "spring", damping: 25, stiffness: 200, delay: 0.2 }}
        className="absolute w-[360px] rounded-[32px] bg-black/40 backdrop-blur-3xl border border-[#00FFB3]/20 shadow-[0_20px_60px_rgba(0,255,179,0.1)] overflow-hidden z-[510] flex flex-col cursor-grab active:cursor-grabbing"
      >
        <div className="bg-[#00FFB3]/10 border-b border-[#00FFB3]/20 p-4 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-[#00FFB3]" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#00FFB3]">Command_Core</span>
          </div>
          <Move size={14} className="text-[#00FFB3]/50" />
        </div>
        <div className="p-6 pointer-events-auto">
          <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-2">Architect_Mode</h2>
          <p className="text-xs text-white/50 mb-6 leading-relaxed">Welcome to the advanced playground. This OS-level interface demonstrates complex state management, Canvas API interactions, and fluid physics.</p>
          
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="flex flex-col gap-1 bg-white/5 border border-white/10 p-3 rounded-2xl">
              <span className="text-white/30 text-[8px] uppercase tracking-widest font-mono">CPU_USAGE</span>
              <span className="text-[#00FFB3] text-[12px] font-black font-mono">INTEL_I9</span>
            </div>
            <div className="flex flex-col gap-1 bg-white/5 border border-white/10 p-3 rounded-2xl">
              <span className="text-white/30 text-[8px] uppercase tracking-widest font-mono">NET_SYNC</span>
              <span className="text-[#00FFB3] text-[12px] font-black font-mono">980 MB/S</span>
            </div>
          </div>

          <button onClick={() => setSearchOpen(true)} className="w-full bg-[#00FFB3] text-black py-4 rounded-[20px] font-black text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,255,179,0.3)] flex justify-center items-center gap-2">
            <Database size={16} /> Access Audio DB
          </button>
        </div>
      </motion.div>


      {/* WIDGET 2: Console Terminal */}
      <motion.div 
        drag dragMomentum={false}
        initial={{ x: winStatus.w + 100, y: Math.max(0, winStatus.h - 400), opacity: 0 }} 
        animate={{ x: Math.max(0, winStatus.w - 440), y: Math.max(0, winStatus.h - 380), opacity: 1 }} 
        transition={{ type: "spring", damping: 25, stiffness: 200, delay: 0.4 }}
        className="absolute w-full max-w-[400px] h-[340px] rounded-[32px] bg-[#050505]/80 backdrop-blur-3xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden z-[510] flex flex-col cursor-grab active:cursor-grabbing"
      >
        <div className="bg-white/5 border-b border-white/10 p-4 flex items-center gap-3 pointer-events-none">
          <Terminal size={14} className="text-zinc-400" />
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-400">System_Logs // Root</span>
        </div>
        <div className="p-6 font-mono text-[10px] sm:text-xs overflow-y-auto custom-scrollbar flex-1 space-y-2 pointer-events-auto">
          {systemLogs.map((log, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex gap-3">
              <span className="text-[#00FFB3]">{`>`}</span>
              <span className={log.includes("ERROR") ? "text-red-400" : "text-zinc-300"}>{log}</span>
            </motion.div>
          ))}
          <div className="animate-pulse flex gap-3"><span className="text-[#00FFB3]">{`>`}</span><span className="w-2 h-3 bg-[#00FFB3] inline-block mt-1" /></div>
        </div>
      </motion.div>


      {/* WIDGET 3: Floating Audio Engine */}
      <motion.div 
        drag dragMomentum={false}
        initial={{ x: -100, y: Math.max(0, winStatus.h - 300), opacity: 0 }} 
        animate={{ x: Math.max(40, winStatus.w / 2 - 200), y: Math.max(0, winStatus.h - 200), opacity: 1 }} 
        transition={{ type: "spring", damping: 25, stiffness: 200, delay: 0.6 }}
        className="absolute w-full max-w-[400px] rounded-[36px] bg-black/60 backdrop-blur-3xl border border-[#00FFB3]/10 shadow-[0_30px_80px_rgba(0,255,179,0.1)] p-6 z-[520] cursor-grab active:cursor-grabbing flex items-center gap-6"
      >
        {/* Dynamic Visualizer Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-end gap-[2px] px-6 py-4 mix-blend-screen overflow-hidden rounded-[36px]">
          {Array.from({ length: 60 }).map((_, i) => (
            <motion.div 
              key={i} 
              animate={{ height: isPlaying ? [5, Math.random() * 80, 5] : 2 }}
              transition={{ duration: 0.4 + Math.random(), repeat: Infinity }}
              className="flex-1 bg-[#00FFB3] rounded-t-sm"
            />
          ))}
        </div>

        <div className="relative w-20 h-20 rounded-[24px] overflow-hidden shadow-2xl border border-white/20 flex-shrink-0 pointer-events-auto">
          {currentSong ? (
            <>
              <img src={currentSong.banner} className="w-full h-full object-cover" alt="art" />
              {isPlaying && <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><Activity size={24} className="text-[#00FFB3]" /></div>}
            </>
          ) : (
            <div className="w-full h-full bg-white/5 flex items-center justify-center"><Headphones size={24} className="text-white/20" /></div>
          )}
        </div>

        <div className="flex-1 overflow-hidden pointer-events-auto">
          <h4 className="text-sm font-black uppercase tracking-widest text-white truncate w-full">{currentSong ? currentSong.title : "NO_AUDIO_TRACK"}</h4>
          <p className="text-[9px] font-mono text-[#00FFB3] uppercase tracking-[0.2em] mt-1 truncate w-full">{currentSong ? currentSong.artist : "AWAITING SELECTION"}</p>
          
          <div className="flex items-center gap-4 mt-4">
            <button 
              onClick={() => { if(currentSong) { isPlaying ? playerRef.current?.pauseVideo() : playerRef.current?.playVideo() } else setSearchOpen(true) }}
              className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(255,255,255,0.4)]"
            >
              {isPlaying ? <Pause size={20} fill="black" /> : <Play size={20} fill="black" className="ml-0.5" />}
            </button>
            
            <div className="flex flex-1 items-center gap-2">
              <Volume2 size={12} className="text-white/40" />
              <input 
                type="range" min="0" max="100" value={volume} 
                onChange={(e) => { setVolume(parseInt(e.target.value)); if (playerRef.current?.setVolume) playerRef.current.setVolume(parseInt(e.target.value)); }} 
                className="w-full accent-[#00FFB3] h-1 rounded-full cursor-pointer bg-white/10" 
              />
            </div>
          </div>
        </div>
      </motion.div>


      {/* ──────────────────────────────────────────────────────────── */}
      {/* SEARCH OVERLAY (Full Screen takeover)                        */}
      {/* ──────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }} animate={{ opacity: 1, backdropFilter: "blur(40px)" }} exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[1000] bg-black/60 flex items-center justify-center p-4 md:p-10 pointer-events-auto"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 50, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="w-full max-w-4xl max-h-[85vh] rounded-[40px] bg-[#0A0A0A] border border-[#00FFB3]/20 shadow-[0_0_100px_rgba(0,255,179,0.1)] flex flex-col overflow-hidden"
            >
              <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-[#00FFB3]/5 to-transparent">
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tighter text-white flex items-center gap-3">
                    <Database className="text-[#00FFB3]" /> Neural_Audio_DB 
                  </h3>
                  <p className="text-[#00FFB3]/60 text-[10px] font-mono tracking-widest uppercase mt-2">Accessing Global Subnetworks</p>
                </div>
                
                <div className="flex items-center gap-4 flex-1 max-w-md w-full relative">
                  <Search size={18} className="absolute left-6 text-white/30" />
                  <input 
                    autoFocus value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    placeholder="SEARCH PROTOCOL..."
                    className="w-full bg-black/50 border border-white/10 pl-14 pr-6 py-4 rounded-[20px] text-sm font-black tracking-widest uppercase outline-none focus:border-[#00FFB3] transition-colors text-white"
                  />
                  <button onClick={() => setSearchOpen(false)} className="p-4 rounded-[20px] bg-white/5 hover:bg-red-500/20 text-white/50 hover:text-red-500 transition-all font-mono shadow-md">
                    ESC
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-black/20">
                {loading ? (
                   <div className="h-full flex flex-col items-center justify-center text-[#00FFB3]">
                     <Loader2 size={48} className="animate-spin mb-4" />
                     <span className="font-mono text-xs uppercase tracking-widest">Compiling Results...</span>
                   </div>
                ) : results.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {results.map((song, i) => (
                      <motion.div 
                        key={song.id}
                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05, type: "spring" }}
                        whileHover={{ scale: 1.02, backgroundColor: "rgba(0,255,179,0.05)", borderColor: "rgba(0,255,179,0.3)" }}
                        onClick={() => selectSong(song)}
                        className="flex items-center gap-5 p-4 rounded-[24px] border border-white/5 cursor-pointer transition-all group relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#00FFB3]/0 via-[#00FFB3]/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        <img src={song.banner} className="w-16 h-16 rounded-[16px] object-cover shadow-lg border border-white/10 group-hover:border-[#00FFB3]/50" alt="" />
                        <div className="flex-1 overflow-hidden relative z-10">
                          <h5 className="text-[12px] font-black uppercase text-white truncate group-hover:text-[#00FFB3] transition-colors">{song.title}</h5>
                          <p className="text-[9px] font-mono text-white/40 uppercase mt-1 tracking-widest">{song.artist}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-black/50 group-hover:bg-[#00FFB3] group-hover:text-black transition-colors mr-2">
                          <Play size={14} fill="currentColor" className="ml-0.5" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-30 my-10">
                    <ShieldAlert size={64} className="text-[#00FFB3] mb-6" />
                    <span className="text-sm uppercase font-black tracking-widest text-[#00FFB3]">Database Offline / No Query</span>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-white mt-2">Execute a search protocol to stream data</span>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 255, 179, 0.3); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #00FFB3; }
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background: #00FFB3;
          box-shadow: 0 0 10px #00FFB3;
        }
      `}</style>
    </motion.div>
  );
};

export default UltimatePlayground;