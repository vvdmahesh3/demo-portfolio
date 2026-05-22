"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { 
  Play, Pause, Volume2, Search, X, Loader2, Sparkles, 
  Activity, Cpu, Zap, Network, Terminal, ShieldAlert,
  Headphones, Database, Move, User, Mail, Send, Lock
} from "lucide-react";

interface LabProps { onClose: () => void; }

/* ──────────────────────────────────────────────────────────── */
/* PARTICLE NETWORK                                            */
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
    const numParticles = Math.min(Math.floor(window.innerWidth / 15), 80);
    
    let mouse = { x: -1000, y: -1000 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;

      constructor() {
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

        if (this.x < 0) { this.x = 0; this.vx *= -1; }
        else if (this.x > canvas.width) { this.x = canvas.width; this.vx *= -1; }

        if (this.y < 0) { this.y = 0; this.vy *= -1; }
        else if (this.y > canvas.height) { this.y = canvas.height; this.vy *= -1; }

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;

        if (distance > 0 && distance < maxDist) {
          const force = (maxDist - distance) / maxDist;
          this.x -= dx * force * 0.05;
          this.y -= dy * force * 0.05;
        } else {
          if (Math.abs(this.vx) > 1) this.vx *= 0.95;
          if (Math.abs(this.vy) > 1) this.vy *= 0.95;
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
/* UTILS & COMPONENTS                                          */
/* ──────────────────────────────────────────────────────────── */

const TypewriterText = ({ text, delay = 0, onComplete, className = "" }: { text: string, delay?: number, onComplete?: () => void, className?: string }) => {
  const [displayed, setDisplayed] = useState("");
  const completedRef = useRef(false);
  
  useEffect(() => {
    let i = 0;
    let timeout: NodeJS.Timeout;
    let startTimeout: NodeJS.Timeout;
    let isMounted = true;

    const type = () => {
      if (!isMounted) return;
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
        timeout = setTimeout(type, 15 + Math.random() * 30);
      } else if (onComplete && !completedRef.current) {
        completedRef.current = true;
        onComplete();
      }
    };
    
    startTimeout = setTimeout(type, delay);
    return () => { 
      isMounted = false;
      clearTimeout(timeout); 
      clearTimeout(startTimeout); 
    };
  }, [text, delay, onComplete]);

  return <span className={`whitespace-pre-wrap ${className}`}>{displayed}</span>;
};

const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(0);

  return (
    <div className="flex flex-col items-start gap-3 font-mono text-xs md:text-sm text-[#00FFB3] max-w-xl px-6 w-full pointer-events-none">
      <TypewriterText text="> SCANNING VISITOR BIOMETRICS..." delay={0} onComplete={() => setStep(1)} />
      {step >= 1 && <TypewriterText text="> ESTABLISHING SECURE CONNECTION TO MAHESH LABS..." delay={300} onComplete={() => setStep(2)} />}
      {step >= 2 && <TypewriterText text="> LOADING INTELLIGENCE SYSTEMS... [██████████] 100%" delay={300} onComplete={() => setStep(3)} />}
      {step >= 3 && <TypewriterText text="> ACCESS GRANTED. WELCOME." delay={300} onComplete={() => setTimeout(onComplete, 1200)} />}
      
      <motion.div animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-3 h-5 bg-[#00FFB3] mt-2" />
    </div>
  );
};


const SKILLS = [
  "React", "TypeScript", "Node.js", "Python", 
  "AI/ML", "AWS", "Docker", "TailwindCSS",
  "PostgreSQL", "MongoDB", "Framer Motion"
];

const SkillGalaxy = () => {
  return (
    <div className="relative w-80 h-80 flex items-center justify-center pointer-events-auto">
      <div className="z-10 w-24 h-24 rounded-full bg-black border border-[#00FFB3]/50 shadow-[0_0_50px_rgba(0,255,179,0.4)] flex flex-col items-center justify-center relative cursor-pointer group hover:scale-105 transition-transform">
        <div className="absolute inset-0 bg-[#00FFB3]/10 rounded-full animate-ping opacity-50" />
        <Cpu size={24} className="text-[#00FFB3] mb-1 group-hover:scale-125 transition-transform duration-500" />
        <span className="text-[8px] font-black tracking-widest text-[#00FFB3] group-hover:text-white transition-colors">MAHESH CORE</span>
      </div>
      
      {SKILLS.map((skill, i) => {
        const angle = (i / SKILLS.length) * 360;
        return (
          <motion.div
            key={skill}
            className="absolute origin-center"
            initial={{ rotate: angle }}
            animate={{ rotate: angle + 360 }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            style={{ width: "340px", height: "32px", display: "flex", justifyContent: "flex-end" }}
          >
            <motion.div 
              className="px-4 py-2 rounded-full bg-black/80 border border-[#00FFB3]/30 text-[#00FFB3] text-[10px] font-black tracking-widest backdrop-blur-md hover:bg-[#00FFB3] hover:text-black hover:scale-110 transition-all shadow-[0_0_15px_rgba(0,255,179,0.1)]"
              initial={{ rotate: -angle }}
              animate={{ rotate: -(angle + 360) }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            >
              {skill}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

const ProfileCard = () => (
  <div className="px-12 py-10 rounded-[40px] bg-white/[0.03] border border-white/10 backdrop-blur-2xl text-center shadow-[0_0_50px_rgba(0,255,179,0.1)] flex flex-col items-center">
    <div className="w-28 h-28 bg-gradient-to-tr from-[#00FFB3] to-blue-500 rounded-full mb-6 p-[2px] shadow-[0_0_30px_rgba(0,255,179,0.4)]">
      <div className="w-full h-full bg-[#050505] rounded-full flex items-center justify-center overflow-hidden relative">
        <div className="absolute inset-0 bg-[#00FFB3]/10 animate-pulse" />
        <User size={40} className="text-[#00FFB3] relative z-10" />
      </div>
    </div>
    <h2 className="text-4xl font-black uppercase text-white tracking-widest mb-2 drop-shadow-lg">Mahesh</h2>
    <p className="text-[#00FFB3] font-mono text-xs tracking-[0.3em] uppercase">Full Stack & AI Engineer</p>
    <div className="mt-8 pt-6 border-t border-white/10 flex gap-4">
      <div className="px-4 py-2 rounded-lg bg-white/5 font-mono text-[10px] text-white/50 tracking-widest">STATUS: ONLINE</div>
      <div className="px-4 py-2 rounded-lg bg-[#00FFB3]/10 font-mono text-[10px] text-[#00FFB3] tracking-widest">CLEARANCE: ROOT</div>
    </div>
  </div>
);

const AiProfile = () => {
  const [showCard, setShowCard] = useState(false);
  return (
    <div className="flex flex-col items-center gap-8 pointer-events-auto max-w-2xl w-full px-6">
      {!showCard ? (
        <div className="font-mono text-[#00FFB3] text-sm md:text-base text-left w-full flex flex-col gap-2 bg-black/40 p-8 rounded-3xl border border-[#00FFB3]/30 backdrop-blur-xl">
          <TypewriterText text="> INITIALIZING MAHESH CORE..." delay={0} />
          <TypewriterText text="> Loading Neural Weights... [██████████] 100%" delay={1200} />
          <TypewriterText text="> Vitals Scan: Human=98%, Coffee=89%, Sleep=Critical Low ⚠️" delay={2800} />
          <TypewriterText text="> Extracting Identity Profile. Bypassing Firewalls..." delay={4500} onComplete={() => setTimeout(() => setShowCard(true), 800)} />
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9, rotateY: 90 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }} transition={{ type: "spring", damping: 20 }}>
          <ProfileCard />
        </motion.div>
      )}
    </div>
  );
};

const HireCard = () => (
  <motion.div
    initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring" }}
    className="flex flex-col items-center gap-6 pointer-events-auto bg-black/40 p-10 rounded-[40px] border border-white/10 backdrop-blur-xl shadow-[0_0_40px_rgba(0,255,179,0.15)]"
  >
    <h3 className="text-2xl font-black uppercase tracking-widest text-white mb-2">Initiate Secure Connection</h3>
    <p className="font-mono text-[#00FFB3] text-xs tracking-widest uppercase mb-4">Ready to build the future?</p>
    <a href="mailto:contact@mahesh.com" className="px-10 py-5 rounded-[20px] bg-[#00FFB3] text-black font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(0,255,179,0.4)] flex items-center gap-3">
      <Mail size={20} /> Transmit Message
    </a>
  </motion.div>
);

const PROJECT_DATA = [
  { name: "CrisisSignal AI", desc: "Disaster Prediction Engine", icon: ShieldAlert },
  { name: "Placement Tracker", desc: "Real-time Dashboard Analytics", icon: Activity },
  { name: "WorkFreeMusic", desc: "Audio Streaming Platform", icon: Headphones }
];

const ProjectsVisualizer = () => {
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setScanning(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (scanning) {
    return (
      <div className="flex flex-col items-center justify-center font-mono text-[#00FFB3] text-sm gap-4 bg-black/40 p-12 rounded-[40px] border border-[#00FFB3]/30 backdrop-blur-xl">
        <Activity size={48} className="animate-spin text-[#00FFB3]" />
        <TypewriterText text="> Accessing Construction Archives..." delay={0} />
        <TypewriterText text="> Decrypting project data... [████████] 100%" delay={1000} />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 pointer-events-auto max-w-[90vw]">
      {PROJECT_DATA.map((p, i) => (
        <motion.div
          key={p.name}
          initial={{ y: 50, opacity: 0, rotateX: -30 }} animate={{ y: 0, opacity: 1, rotateX: 0 }} transition={{ delay: i * 0.1, type: "spring", damping: 15 }}
          whileHover={{ y: -10, scale: 1.05, borderColor: "rgba(0,255,179,0.8)" }}
          className="w-56 h-64 rounded-3xl bg-black/40 border border-[#00FFB3]/20 backdrop-blur-md p-6 flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(0,255,179,0.1)] cursor-pointer relative overflow-hidden group transition-all"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#00FFB3]/0 to-[#00FFB3]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="w-16 h-16 rounded-2xl bg-[#00FFB3]/10 flex items-center justify-center mb-6 border border-[#00FFB3]/30 group-hover:scale-110 transition-transform duration-500">
            <p.icon size={28} className="text-[#00FFB3]" />
          </div>
          <h3 className="text-sm font-black uppercase text-white mb-2 relative z-10">{p.name}</h3>
          <p className="text-[10px] font-mono text-[#00FFB3] uppercase tracking-widest relative z-10">{p.desc}</p>
        </motion.div>
      ))}
    </div>
  );
};

const HelpCard = ({ onSelect }: { onSelect: (cmd: string) => void }) => {
  const commands = [
    { cmd: "whoami", desc: "Initialize Profile Core" },
    { cmd: "skills", desc: "Access Technical Matrix" },
    { cmd: "projects", desc: "View Construction Archives" },
    { cmd: "contact", desc: "Open Secure Channel" },
    { cmd: "clear", desc: "Purge System Output" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
      className="p-8 rounded-[30px] bg-black/40 border border-[#00FFB3]/30 backdrop-blur-xl pointer-events-auto min-w-[300px] sm:min-w-[400px] shadow-[0_0_40px_rgba(0,255,179,0.15)]"
    >
      <h3 className="text-xl font-black uppercase text-white tracking-widest mb-6 flex items-center gap-3">
        <Terminal size={24} className="text-[#00FFB3]" /> SYSTEM_MANUAL
      </h3>
      <div className="flex flex-col gap-3">
        {commands.map((c, i) => (
          <motion.div 
            key={c.cmd} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }} onClick={() => onSelect(c.cmd)}
            className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-[#00FFB3]/20 border border-transparent hover:border-[#00FFB3]/50 cursor-pointer group transition-all"
          >
            <span className="font-black text-[#00FFB3] uppercase tracking-widest text-xs group-hover:text-white transition-colors">{c.cmd}</span>
            <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest group-hover:text-[#00FFB3] transition-colors">{c.desc}</span>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-white/10 text-center font-mono text-[9px] text-[#00FFB3] uppercase tracking-widest animate-pulse">
        * HINT: Discover secrets. Try 'dream', 'future', 'sudo', or 'status' *
      </div>
    </motion.div>
  );
};

const EasterEgg = ({ cmd }: { cmd: string }) => {
  let content = "";
  if (cmd === "dream") content = "> To create systems that blur the line between magic and logic.\n> And maybe sleep 8 hours.";
  if (cmd === "hack") content = "> ACCESS DENIED. ⚠️\n> UNAUTHORIZED INTRUSION DETECTED.\n> INITIATING COUNTERMEASURES...\n> Just kidding. I'm open source.";
  if (cmd === "coffee") content = "> SYSTEM REPORT:\n> Caffeine levels depleted.\n> Recommended action: ☕ + `npm run dev`";
  if (cmd === "future") content = "> PREDICTIVE ENGINE LOADED... \n> 2026: Mastering AI & Advanced Systems \n> 2027: Building massive scalable architectures \n> 2030: Uploading consciousness to the cloud.";
  if (cmd === "matrix") content = "> Wake up, Neo.\n> The portfolio has you.";

  return (
    <div className="bg-black/60 p-8 rounded-3xl border border-[#00FFB3]/40 backdrop-blur-xl font-mono text-[#00FFB3] text-sm md:text-base tracking-widest uppercase max-w-xl text-left leading-loose shadow-[0_0_30px_rgba(0,255,179,0.2)] pointer-events-auto">
       <TypewriterText text={content} />
    </div>
  );
};

const SudoMode = () => (
  <motion.div 
    initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
    className="p-10 rounded-[40px] bg-red-900/40 border border-red-500/50 backdrop-blur-2xl text-center pointer-events-auto shadow-[0_0_60px_rgba(239,68,68,0.3)] max-w-xl"
  >
    <Lock size={56} className="text-red-500 mx-auto mb-6 animate-pulse" />
    <h3 className="text-3xl font-black uppercase tracking-[0.3em] text-red-500 mb-2">ROOT ACCESS</h3>
    <p className="font-mono text-red-400 text-xs mb-8 uppercase tracking-widest">God Mode Activated. Full control granted.</p>
    <div className="text-left font-mono text-xs md:text-sm text-red-300 space-y-2 bg-black/50 p-6 rounded-2xl border border-red-500/30">
      <TypewriterText text="> Bypassing security protocols..." delay={0} />
      <TypewriterText text="> Disabling firewalls... [OK]" delay={1000} />
      <TypewriterText text="> All systems un-restricted. Welcome, Admin." delay={2000} />
    </div>
  </motion.div>
);

const AskMahesh = ({ question }: { question: string }) => {
  const responses = [
    "I'm currently focused on building intelligent systems that scale.",
    "That's an interesting question! I believe the future belongs to those who combine AI with great user experiences.",
    "My neural network is still pondering that one. Try asking me about my projects or skills!",
    "Error 404: Sleep not found. Please provide coffee to process complex queries.",
    "I build, therefore I am. Let's create something awesome together."
  ];
  const response = responses[Math.floor(Math.random() * responses.length)];
  
  return (
    <div className="bg-black/60 p-8 rounded-3xl border border-[#00FFB3]/40 backdrop-blur-xl font-mono text-left max-w-2xl px-6 pointer-events-auto shadow-[0_0_30px_rgba(0,255,179,0.2)] w-[90vw]">
      <p className="text-white/40 mb-6 text-[10px] tracking-widest uppercase border-b border-white/10 pb-4">Query: {question}</p>
      <div className="text-[#00FFB3] text-sm md:text-base leading-loose tracking-widest uppercase">
        <TypewriterText text={`> ${response}`} />
      </div>
    </div>
  );
};


/* ──────────────────────────────────────────────────────────── */
/* BRAIN MAP & FINAL EXPLORATION LAYER                         */
/* ──────────────────────────────────────────────────────────── */

const BRAIN_NODES = [
  { id: 'ai', label: 'AI & ML', desc: '> Obsessed with making machines understand patterns. The future is neural.', x: -160, y: -130 },
  { id: 'dev', label: 'Development', desc: '> Code is poetry that executes. Building highly scalable architectures.', x: 160, y: -130 },
  { id: 'projects', label: 'Projects', desc: '> CrisisSignal, Placement Tracker... turning coffee into functional software.', x: -240, y: 20 },
  { id: 'career', label: 'Career', desc: '> Seeking environments where I can build the impossible alongside smart people.', x: 240, y: 20 },
  { id: 'learning', label: 'Learning', desc: '> Currently exploring WebGL, Advanced AI agents, and complex system design.', x: -140, y: 170 },
  { id: 'goals', label: 'Goals', desc: '> To create products that solve real human problems at an unprecedented scale.', x: 140, y: 170 },
  { id: 'random', label: 'Random', desc: '> Why do we press harder on the remote control when the batteries are almost dead?', x: 0, y: 240 }
];

const BrainMap = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-5xl h-[600px] flex items-center justify-center pointer-events-auto">
      {/* SVG Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
        <g style={{ transform: "translate(50%, 50%)" }}>
          {BRAIN_NODES.map(n => (
            <motion.line
              key={`line-${n.id}`}
              x1="0" y1="0" x2={n.x} y2={n.y}
              stroke={activeNode === n.id ? "#00FFB3" : "rgba(0,255,179,0.15)"}
              strokeWidth={activeNode === n.id ? "2" : "1"}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, type: "spring", delay: 0.2 }}
            />
          ))}
        </g>
      </svg>

      {/* Center Core */}
      <motion.div 
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
        className="absolute z-20 w-24 h-24 bg-black border-2 border-[#00FFB3] rounded-full flex flex-col items-center justify-center cursor-pointer shadow-[0_0_50px_rgba(0,255,179,0.4)] hover:scale-110 transition-transform"
        onClick={() => setActiveNode(null)}
      >
        <Network size={28} className="text-[#00FFB3] mb-1" />
        <span className="text-[9px] font-black tracking-widest text-white">MAHESH</span>
      </motion.div>

      {/* Nodes */}
      {BRAIN_NODES.map((n, i) => (
        <motion.div
          key={n.id}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ x: n.x, y: n.y, opacity: 1 }}
          transition={{ delay: 0.5 + i * 0.1, type: "spring", damping: 12 }}
          onClick={() => setActiveNode(n.id)}
          className={`absolute z-10 flex flex-col items-center justify-center cursor-pointer transition-all ${
            activeNode === n.id ? "scale-125 z-30" : "hover:scale-110"
          }`}
        >
          <div className={`px-4 py-2 rounded-full border backdrop-blur-md whitespace-nowrap shadow-lg ${
            activeNode === n.id ? "bg-[#00FFB3] text-black border-[#00FFB3]" : "bg-black/80 text-[#00FFB3] border-[#00FFB3]/30"
          }`}>
             <span className="text-[10px] font-black tracking-widest uppercase">{n.label}</span>
          </div>
          
          {/* Expanded Memory Content */}
          <AnimatePresence>
            {activeNode === n.id && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                animate={{ opacity: 1, y: 15, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: 5 }}
                className="absolute top-full w-64 p-5 rounded-2xl bg-black/95 border border-[#00FFB3]/50 text-[#00FFB3] text-xs font-mono text-center shadow-[0_20px_40px_rgba(0,255,179,0.3)] pointer-events-none"
              >
                <TypewriterText text={n.desc} delay={0} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

const FinalLayer = ({ count, total }: { count: number, total: number }) => (
  <motion.div 
    initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
    className="p-10 rounded-[40px] bg-black/60 border border-[#00FFB3]/50 backdrop-blur-2xl text-center pointer-events-auto shadow-[0_0_80px_rgba(0,255,179,0.3)] max-w-2xl w-full"
  >
    <Sparkles size={56} className="text-[#00FFB3] mx-auto mb-6 animate-pulse" />
    <h3 className="text-3xl md:text-4xl font-black uppercase tracking-[0.3em] text-white mb-8">CONGRATULATIONS</h3>
    <div className="font-mono text-sm md:text-base text-[#00FFB3] space-y-6 mb-8 bg-[#00FFB3]/5 p-8 rounded-2xl border border-[#00FFB3]/20">
      <TypewriterText text="> You didn't just view a portfolio." delay={0} />
      <TypewriterText text="> You explored Mahesh's world." delay={1500} />
      <div className="pt-4 border-t border-[#00FFB3]/20 flex flex-col gap-2">
        <TypewriterText text={`> Exploration Completion: ${Math.round((count/total)*100)}%`} delay={3500} />
        <TypewriterText text={`> Hidden Discoveries: ${count}/${total}`} delay={4500} />
      </div>
    </div>
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 6 }}
      className="text-white/50 text-xs font-mono uppercase tracking-widest animate-pulse"
    >
      {count < total ? "* One secret remains hidden in the shadows... *" : "YOU HAVE FOUND EVERYTHING. YOU ARE A LEGEND."}
    </motion.div>
  </motion.div>
);


/* ──────────────────────────────────────────────────────────── */
/* MAIN DASHBOARD COMPONENT                                    */
/* ──────────────────────────────────────────────────────────── */

const UltimatePlayground: React.FC<LabProps> = ({ onClose }) => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<React.ReactNode | null>(null);
  const [booted, setBooted] = useState(false);
  
  // Secrets Tracking System
  const [secretsFound, setSecretsFound] = useState<string[]>([]);
  const TOTAL_SECRETS = 8; // ask, dream, hack, coffee, future, matrix, sudo, brain_map

  const addSecret = (secret: string) => {
    if (!secretsFound.includes(secret)) {
      const next = [...secretsFound, secret];
      setSecretsFound(next);
      
      // Auto-hijack screen when reaching 7th secret for cinematic effect
      if (next.length === 7) {
        setTimeout(() => {
          setOutput(<FinalLayer count={7} total={TOTAL_SECRETS} />);
        }, 6000);
      } else if (next.length === 8) {
        setTimeout(() => {
          setOutput(<FinalLayer count={8} total={TOTAL_SECRETS} />);
        }, 4000);
      }
    }
  };

  // Reality Distortion Parallax (3D effect on mouse move)
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

  const rotateX = useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [8, -8]);
  const rotateY = useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const processCommand = (cmdStr: string) => {
    const cmd = cmdStr.trim().toLowerCase();
    
    const isMatch = (keywords: string[]) => keywords.some(k => cmd.includes(k));

    if (cmd.startsWith("ask ")) {
      setOutput(<AskMahesh question={cmdStr.substring(4).trim()} />);
      addSecret("ask");
    } else if (isMatch(["skill", "tech", "stack", "use", "know", "tools", "language"])) {
      setOutput(<SkillGalaxy />);
    } else if (isMatch(["who", "about", "bio", "profile", "you", "mahesh"])) {
      setOutput(<AiProfile />);
    } else if (isMatch(["hire", "contact", "email", "message", "touch", "reach"])) {
      setOutput(<HireCard />);
    } else if (isMatch(["project", "work", "portfolio", "build", "make", "create"])) {
      setOutput(<ProjectsVisualizer />);
    } else if (isMatch(["help", "list", "cmd", "commands", "menu", "options", "ls"])) {
      setOutput(<HelpCard onSelect={processCommand} />);
    } else if (["dream", "hack", "coffee", "future", "matrix"].includes(cmd)) {
      setOutput(<EasterEgg cmd={cmd} />);
      addSecret(cmd);
    } else if (cmd === "sudo" || cmd === "root") {
      setOutput(<SudoMode />);
      addSecret("sudo");
    } else if (isMatch(["clear", "clean", "reset", "cls"])) {
      setOutput(null);
    } else if (isMatch(["status", "progress", "end", "secret"])) {
      setOutput(<FinalLayer count={secretsFound.length} total={TOTAL_SECRETS} />);
    } else if (cmd !== "") {
      setOutput(
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="px-10 py-8 bg-red-500/10 border border-red-500/30 rounded-[30px] backdrop-blur-xl text-center pointer-events-auto shadow-[0_0_40px_rgba(239,68,68,0.2)]">
          <ShieldAlert size={40} className="text-red-500 mx-auto mb-4 animate-pulse" />
          <p className="text-red-400 font-mono text-sm tracking-widest uppercase mb-6">ERROR: UNKNOWN PROTOCOL '{cmd}'</p>
          <button onClick={() => processCommand("help")} className="px-6 py-3 rounded-full bg-red-500/20 text-white font-mono text-xs uppercase hover:bg-red-500 hover:text-black transition-colors border border-red-500/50">
            Access System Manual
          </button>
        </motion.div>
      );
    }
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    processCommand(input);
    if (input.trim() !== "") setInput("");
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-[500] bg-[#020202] text-white overflow-hidden font-sans select-none flex flex-col items-center justify-center"
      style={{ perspective: 1500 }}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,179,0.08)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />
      <ParticleNetwork />

      {/* Interactive Brain Map Icon */}
      {booted && (
        <motion.div 
          initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 2, type: "spring" }}
          onClick={() => {
             addSecret("brain_map");
             setOutput(<BrainMap />);
          }}
          className="absolute top-8 left-1/2 -translate-x-1/2 z-[600] pointer-events-auto group cursor-pointer"
        >
          <div className="relative flex items-center justify-center p-3 rounded-full bg-black/40 border border-[#00FFB3]/50 backdrop-blur-md hover:bg-[#00FFB3] transition-all shadow-[0_0_30px_rgba(0,255,179,0.3)] hover:shadow-[0_0_50px_rgba(0,255,179,0.8)]">
            <div className="absolute inset-0 bg-[#00FFB3]/30 rounded-full animate-ping opacity-50 group-hover:opacity-0" />
            <Network size={20} className="text-[#00FFB3] group-hover:text-black relative z-10 transition-colors" />
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity font-mono text-[9px] text-[#00FFB3] uppercase tracking-widest whitespace-nowrap bg-black/90 px-4 py-2 rounded-xl border border-[#00FFB3]/40 shadow-xl pointer-events-none">
            Open Neural Map
          </div>
        </motion.div>
      )}

      {/* Close Button */}
      <div className="absolute top-8 right-8 z-[600] pointer-events-auto">
        <button onClick={onClose} className="p-4 rounded-full bg-white/5 border border-white/10 text-white/50 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all">
          <X size={24} />
        </button>
      </div>

      {/* Central Interactive Output Area (With 3D Reality Distortion) */}
      <motion.div 
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative z-10 w-full flex-1 flex items-center justify-center pointer-events-none"
      >
        {!booted ? (
           <BootSequence onComplete={() => setBooted(true)} />
        ) : (
          <AnimatePresence mode="wait">
            {output ? (
              <motion.div key="output" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="absolute inset-0 flex items-center justify-center">
                {output}
              </motion.div>
            ) : (
              <motion.div key="idle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="flex flex-col items-center justify-center text-center max-w-2xl px-6 pointer-events-none">
                <Terminal size={48} className="text-[#00FFB3] mb-6 animate-pulse drop-shadow-[0_0_15px_rgba(0,255,179,0.8)]" />
                <h1 className="text-3xl md:text-5xl font-black uppercase tracking-[0.3em] text-white mb-6 drop-shadow-lg">SYSTEM_READY</h1>
                
                <div className="bg-[#00FFB3]/5 border border-[#00FFB3]/20 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-[0_0_30px_rgba(0,255,179,0.1)]">
                  <p className="font-mono text-[#00FFB3] tracking-widest uppercase text-xs md:text-sm mb-3">
                    Welcome to the Interactive Interface.
                  </p>
                  <p className="font-mono text-white/70 text-[10px] md:text-xs leading-loose uppercase tracking-wide">
                    This is not a standard portfolio. You have root access to my neural network. 
                    Type commands below to navigate, discover hidden secrets, and explore my world.
                  </p>
                  <div className="pt-5 mt-5 border-t border-[#00FFB3]/20">
                    <p className="font-mono text-[#00FFB3] text-[10px] md:text-xs animate-pulse uppercase tracking-widest">
                      [ Try typing <span className="text-black bg-[#00FFB3] px-2 py-1 rounded mx-1 font-black shadow-[0_0_10px_rgba(0,255,179,0.5)]">'help'</span> to begin ]
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </motion.div>

      {/* Command Line Input */}
      {booted && (
        <form onSubmit={handleCommand} className="absolute bottom-12 md:bottom-20 w-full max-w-3xl px-6 pointer-events-auto z-[510]">
          <motion.div 
            initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
            className="relative flex items-center shadow-[0_20px_50px_rgba(0,255,179,0.1)] group"
          >
            <span className="absolute left-8 text-[#00FFB3] font-black text-xl animate-pulse">{`>`}</span>
            <input 
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="TYPE COMMAND HERE (TRY: 'HELP', 'WHOAMI', OR 'ASK WHY AI?')..."
              className="w-full bg-[#0A0A0A]/80 backdrop-blur-2xl border border-[#00FFB3]/30 focus:border-[#00FFB3] rounded-[24px] py-6 pl-16 pr-8 text-white font-mono uppercase tracking-widest text-[10px] md:text-sm outline-none transition-all placeholder:text-white/20"
            />
            <button type="submit" className="absolute right-4 p-4 rounded-2xl bg-[#00FFB3]/10 text-[#00FFB3] group-focus-within:bg-[#00FFB3] group-focus-within:text-black hover:bg-[#00FFB3] hover:text-black transition-colors">
              <Send size={16} />
            </button>
          </motion.div>
        </form>
      )}

    </motion.div>
  );
};

export default UltimatePlayground;