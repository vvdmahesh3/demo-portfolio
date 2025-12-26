// src/components/Resume.tsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Bot,
  Send,
  FileText,
  X,
  Github,
  Keyboard,
  Briefcase,
  Code,
  Cpu
} from "lucide-react";
import ReactMarkdown from "react-markdown";

/* ---------------- CountUp helper ---------------- */
const CountUp: React.FC<{ end: number; suffix?: string }> = ({ end, suffix = "" }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const frameRate = 30;
    const totalFrames = Math.round(duration / frameRate);
    const increment = end / Math.max(1, totalFrames);
    let frame = 0;
    const id = window.setInterval(() => {
      frame++;
      start = Math.round(increment * frame);
      if (frame >= totalFrames) {
        setVal(end);
        clearInterval(id);
      } else {
        setVal(start);
      }
    }, frameRate);
    return () => clearInterval(id);
  }, [end]);
  return <span>{val}{suffix}</span>;
};

/* ---------------- Interfaces ---------------- */
interface ResumeCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  action: () => void;
  primary?: boolean;
  highlight?: boolean;
}

/* ---------------- Main Component ---------------- */
const Resume: React.FC = () => {
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  // Configuration
  const resumePdfUrl = "./VVD_Mahesh(Resume).pdf"; 
  const API_URL = "https://mahesh-backend-hub.onrender.com";

  const suggestions = [
    "List internships",
    "Show top 5 skills",
    "Major achievements",
    "Education summary",
    "Certifications list",
  ];

  const handleAsk = async (overrideQuestion?: string) => {
    const q = overrideQuestion || question;
    if (!q.trim()) return;
    
    setLoading(true);
    setAnswer("");
    try {
      const res = await fetch(`${API_URL}/api/ask-resume`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q.trim() }),
      });
      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      setAnswer(data.answer || "⚠️ No answer returned.");
    } catch (err) {
      console.error("Ask error", err);
      setAnswer("⚠️ Assistant is offline or not reachable. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { number: 3000, suffix: "+", label: "GitHub Commits", icon: <Github size={24} />, color: "text-blue-500" },
    { textOnly: "Editor", label: "Freelance Status", icon: <Briefcase size={24} />, color: "text-[#00FFB3]" },
    { number: 10, suffix: "+", label: "Production Apps", icon: <Code size={24} />, color: "text-yellow-500" },
    { number: 90, suffix: " WPM", label: "Typing Velocity", icon: <Keyboard size={24} />, color: "text-sky-500" },
  ];

  return (
    <section id="resume" className="py-24 relative overflow-hidden bg-white dark:bg-[#050505] transition-colors duration-700">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Intelligence Hub Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-100 dark:border-[#00FFB3]/20 bg-blue-50 dark:bg-[#00FFB3]/5 text-blue-600 dark:text-[#00FFB3] text-[10px] font-black uppercase tracking-[0.3em] mb-6">
              <Cpu size={12} /> Data Extraction Module
            </div>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase text-zinc-900 dark:text-white">
              RESU<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-[#00FFB3] dark:to-cyan-400">ME</span>
            </h2>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex flex-col items-start md:items-end text-left md:text-right">
            <p className="text-zinc-500 dark:text-zinc-400 font-mono text-xs uppercase tracking-widest max-w-xs leading-relaxed">
              Spotlighting my journey — Preview the system or query the Neural Assistant for specific data points.
            </p>
          </motion.div>
        </div>

        {/* Action & Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Left: Quick Stats Terminal */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-6 rounded-[32px] bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/5 flex flex-col justify-between"
              >
                <div className={`${s.color} opacity-80 mb-4`}>{s.icon}</div>
                <div>
                  <div className="text-2xl font-black dark:text-white leading-none">
                    {"number" in s ? <CountUp end={s.number as number} suffix={s.suffix || ""} /> : s.textOnly}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-zinc-400 mt-2 font-bold">{s.label}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Primary Interaction Console */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4 h-full">
            <ResumeCard 
              icon={<Download className="text-white dark:text-black" />} 
              title="Download" 
              subtitle="PDF FORMAT (240KB)"
              action={() => {
                 const link = document.createElement('a');
                 link.href = resumePdfUrl;
                 link.download = 'VVD_Mahesh_Resume.pdf';
                 link.click();
              }}
              primary
            />
            <ResumeCard 
              icon={<FileText className="text-blue-600 dark:text-[#00FFB3]" />} 
              title="Preview" 
              subtitle="IN-BROWSER VIEW"
              action={() => setPreviewOpen(true)}
            />
            <ResumeCard 
              icon={<Bot className="text-blue-600 dark:text-[#00FFB3]" />} 
              title="AI Query" 
              subtitle={assistantOpen ? "ACTIVE LINK" : "NEURAL ASSISTANT"}
              action={() => setAssistantOpen(!assistantOpen)}
              highlight={assistantOpen}
            />
          </div>
        </div>

        {/* Neural Assistant Interface */}
        <AnimatePresence>
          {assistantOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-12"
            >
              <div className="p-8 rounded-[40px] bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-[#00FFB3]/20 backdrop-blur-3xl shadow-3xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-2 h-2 rounded-full bg-[#00FFB3] animate-pulse" />
                  <h3 className="text-sm font-black uppercase tracking-[0.3em] dark:text-white">Mahesh_GPT Interface</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex flex-wrap gap-2">
                      {suggestions.map((s, idx) => (
                        <button
                          key={idx}
                          onClick={() => { setQuestion(s); handleAsk(s); }}
                          className="px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-white/5 hover:border-blue-600 dark:hover:border-[#00FFB3] transition-all"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-3 bg-white dark:bg-black/40 p-2 rounded-[24px] border border-zinc-200 dark:border-white/10 shadow-inner">
                      <input
                        type="text"
                        placeholder="Ask My Resume..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                        className="flex-1 bg-transparent px-4 py-2 text-sm focus:outline-none dark:text-white font-mono"
                      />
                      <button
                        onClick={() => handleAsk()}
                        disabled={loading}
                        className="p-4 rounded-2xl bg-zinc-900 dark:bg-[#00FFB3] text-white dark:text-black hover:scale-105 active:scale-95 transition-all shadow-xl disabled:opacity-50"
                      >
                        <Send size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Terminal Style Output */}
                  <div className="bg-zinc-100 dark:bg-black p-6 rounded-3xl border border-zinc-200 dark:border-white/5 min-h-[200px] font-mono text-sm leading-relaxed overflow-y-auto max-h-[300px]">
                    {loading ? (
                      <div className="flex items-center gap-4 text-blue-600 dark:text-[#00FFB3]">
                        <div className="flex gap-1">
                          {[0, 0.15, 0.3].map(d => (
                            <motion.span key={d} animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: d }}>_</motion.span>
                          ))}
                        </div>
                        <span className="text-[10px] font-black tracking-widest uppercase">Analyzing_Data_Packets...</span>
                      </div>
                    ) : answer ? (
                      <div className="dark:text-zinc-300 prose prose-invert prose-sm max-w-none">
                        <ReactMarkdown>{answer}</ReactMarkdown>
                      </div>
                    ) : (
                      <div className="text-zinc-400 italic">Waiting for command input or suggestion select...</div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fullscreen PDF Preview Overlay */}
        <AnimatePresence>
          {previewOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-zinc-950/90 backdrop-blur-xl flex items-center justify-center z-[100] p-4">
              <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-[40px] shadow-3xl overflow-hidden max-w-5xl w-full h-[90vh] flex flex-col">
                <div className="p-6 border-b border-zinc-100 dark:border-white/5 flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/50">
                   <div className="flex items-center gap-3">
                     <FileText size={18} className="text-blue-600 dark:text-[#00FFB3]"/>
                     <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-white">Resume_Document_v2.5</span>
                   </div>
                   <button onClick={() => setPreviewOpen(false)} className="p-3 rounded-full bg-zinc-100 dark:bg-white/5 hover:bg-red-500 hover:text-white transition-all shadow-sm"><X size={20}/></button>
                </div>
                <iframe 
                  src={resumePdfUrl} 
                  className="w-full flex-grow bg-white" 
                  title="Resume PDF View"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

/* ---------------- Helper Component ---------------- */
const ResumeCard: React.FC<ResumeCardProps> = ({ icon, title, subtitle, action, primary = false, highlight = false }) => (
  <motion.button
    whileHover={{ y: -8 }}
    onClick={action}
    className={`p-8 rounded-[40px] border flex flex-col items-center justify-center text-center transition-all duration-500 group shadow-lg w-full ${
      primary 
        ? "bg-zinc-900 dark:bg-[#00FFB3] border-zinc-900 dark:border-[#00FFB3]" 
        : highlight
          ? "bg-blue-600 dark:bg-[#00FFB3] border-blue-600 dark:border-[#00FFB3]"
          : "bg-white dark:bg-zinc-900/40 border-zinc-200 dark:border-white/5"
    }`}
  >
    <div className={`mb-6 p-4 rounded-2xl ${primary ? "bg-white/10 dark:bg-black/10" : "bg-zinc-50 dark:bg-white/5"}`}>
      {icon}
    </div>
    <h3 className={`text-xl font-black uppercase tracking-tighter mb-1 ${primary ? "text-white dark:text-black" : highlight ? "text-white dark:text-black" : "text-zinc-900 dark:text-white"}`}>
      {title}
    </h3>
    <p className={`text-[9px] font-black tracking-widest uppercase ${primary ? "text-white/60 dark:text-black/60" : highlight ? "text-white/60 dark:text-black/60" : "text-zinc-400"}`}>
      {subtitle}
    </p>
  </motion.button>
);

export default Resume;