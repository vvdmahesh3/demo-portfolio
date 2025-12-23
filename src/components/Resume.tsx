// src/components/Resume.tsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";
import ReactMarkdown from "react-markdown";

/* ---------------- CountUp helper ---------------- */
const CountUp: React.FC<{ end: number; suffix?: string }> = ({
  end,
  suffix = "",
}) => {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
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

  return (
    <span>
      {val}
      {suffix}
    </span>
  );
};

/* ---------------- Main Component ---------------- */
const Resume: React.FC = () => {
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5174";

  const suggestions = [
    "List internships",
    "Show top 5 skills",
    "Major achievements",
    "Education summary",
    "Certifications list",
  ];

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");
    try {
      const res = await fetch(`${API_URL}/api/ask-resume`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: question.trim() }),
      });
      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      setAnswer(data.answer || "⚠️ No answer returned.");
  } catch (err) {
    console.error("Ask error", err);
    setAnswer("⚠️ Assistant is offline or not reachable. Please check your connection or server URL in .env file.");
  } finally {
    setLoading(false);
  }
  };

  const stats = [
    {
      number: 3000,
      suffix: "+",
      label: "GitHub Commits",
      icon: <Github size={32} />,
      color: "text-blue-600 dark:text-white",
    },
    {
      textOnly: "Freelancer",
      label: "Editor",
      icon: <Briefcase size={32} />,
      color: "text-blue-600 dark:text-[#00FFB3]",
    },
    {
      number: 10,
      suffix: "+",
      label: "Real-World Projects",
      icon: <Code size={32} />,
      color: "text-yellow-500",
    },
    {
      number: 90,
      suffix: " WPM",
      label: "Typing (Accuracy 90%)",
      icon: <Keyboard size={32} />,
      color: "text-sky-500",
    },
  ];

  return (
    <section
      id="resume"
      className="py-24 relative overflow-hidden transition-colors duration-700
                 bg-white text-black dark:bg-black dark:text-white"
    >
      {/* Radial Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full 
                        bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.08),transparent_70%)] 
                        dark:bg-[radial-gradient(circle_at_center,rgba(0,255,179,0.08),transparent_70%)] 
                        animate-pulse" />
      </div>

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          My{" "}
          <span className="text-blue-600 dark:text-[#00FFB3]">Resume</span>
        </motion.h2>

        <p className="text-lg mb-12 text-gray-600 dark:text-gray-400">
          A spotlight on my journey — preview or download it, or ask my{" "}
          <span className="text-blue-600 dark:text-[#00FFB3]">
            AI assistant
          </span>
          .
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center justify-center text-center"
            >
              <div className={`${s.color} mb-3`}>{s.icon}</div>
              <div className="text-3xl font-bold">
                {"number" in s ? (
                  <CountUp end={s.number as number} suffix={s.suffix || ""} />
                ) : (
                  s.textOnly
                )}
              </div>
              <div className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12">
          <a
            href="/VVD_Mahesh(Resume).pdf"
            download
            className="px-6 py-3 bg-blue-600 dark:bg-[#00FFB3] 
                       text-white dark:text-black font-semibold rounded-full 
                       hover:bg-blue-700 dark:hover:bg-[#00e69f] 
                       transition-all shadow-lg flex items-center gap-2"
          >
            <Download size={18} /> Download Resume
          </a>

          <button
            onClick={() => setPreviewOpen(true)}
            className="px-6 py-3 border border-blue-600 text-blue-600 
                       hover:bg-blue-600 hover:text-white 
                       dark:border-[#00FFB3] dark:text-[#00FFB3] 
                       dark:hover:bg-[#00FFB3] dark:hover:text-black 
                       rounded-full font-semibold transition-all shadow-md flex items-center gap-2"
          >
            <FileText size={18} /> Preview Resume
          </button>

          <button
            onClick={() => setAssistantOpen((p) => !p)}
            className="px-6 py-3 border border-blue-600 text-blue-600 
                       hover:bg-blue-600 hover:text-white 
                       dark:border-[#00FFB3] dark:text-[#00FFB3] 
                       dark:hover:bg-[#00FFB3] dark:hover:text-black 
                       rounded-full font-semibold transition-all shadow-md flex items-center gap-2"
          >
            <Bot size={18} />
            {assistantOpen ? "Close Assistant" : "Ask My Resume"}
          </button>
        </div>

        {/* PDF Preview */}
        {previewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          >
            <div className="relative bg-white dark:bg-black p-6 rounded-xl max-w-5xl w-full h-[85vh] shadow-lg border border-blue-600/40 dark:border-[#00FFB3]/40">
              <button
                onClick={() => setPreviewOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-black dark:hover:text-white"
              >
                <X size={24} />
              </button>
              <iframe
                src="/VVD_Mahesh(Resume).pdf"
                className="w-full h-full rounded-lg"
                title="Resume PDF Preview"
              ></iframe>
            </div>
          </motion.div>
        )}

        {/* Assistant */}
        {assistantOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="max-w-3xl mx-auto bg-white/80 dark:bg-black/50 
                       border border-blue-600/30 dark:border-[#00FFB3]/30 
                       rounded-xl p-6 shadow-lg relative"
          >
            <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-[#00FFB3]">
              🤖 Ask Mahesh’s Resume
            </h3>

            {/* Suggestions */}
            <div className="flex flex-wrap gap-2 mb-4">
              {suggestions.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuestion(s);
                    setTimeout(() => handleAsk(), 100);
                  }}
                  className="px-3 py-1.5 rounded-full text-xs 
                             bg-gray-200 text-gray-700 hover:bg-blue-600 hover:text-white 
                             dark:bg-white/10 dark:text-gray-300 dark:hover:bg-[#00FFB3] dark:hover:text-black 
                             transition"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-3 mb-4">
              <input
                type="text"
                placeholder="Ask e.g. 'List internships' or 'What are his skills?'"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg border border-blue-600/40 dark:border-[#00FFB3]/40 
                           bg-white text-black dark:bg-black dark:text-white focus:outline-none"
              />
              <button
                onClick={handleAsk}
                disabled={loading}
                className="px-5 py-2 rounded-lg 
                           bg-blue-600 text-white hover:bg-blue-700 
                           dark:bg-[#00FFB3] dark:text-black dark:hover:bg-[#00e69f] 
                           font-semibold transition flex items-center gap-2"
              >
                <Send size={18} />
                {loading ? "Thinking…" : "Ask"}
              </button>
            </div>

            {/* Answer */}
            <div className="min-h-[60px]">
              {loading ? (
                <div className="flex items-center gap-2 text-blue-600 dark:text-[#00FFB3]">
                  <motion.span
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut" }}
                  >
                    ●
                  </motion.span>
                  <motion.span
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.9,
                      ease: "easeInOut",
                      delay: 0.15,
                    }}
                  >
                    ●
                  </motion.span>
                  <motion.span
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.9,
                      ease: "easeInOut",
                      delay: 0.3,
                    }}
                  >
                    ●
                  </motion.span>
                  <span className="text-gray-600 dark:text-gray-300 ml-2">
                    Assistant is thinking...
                  </span>
                </div>
              ) : answer ? (
                <div className="text-left text-gray-800 dark:text-gray-200 
                                bg-gray-100 dark:bg-black/40 
                                border border-blue-600/20 dark:border-[#00FFB3]/20 
                                p-4 rounded-lg prose prose-blue dark:prose-invert">
                  <ReactMarkdown>{answer}</ReactMarkdown>
                </div>
              ) : (
                <div className="text-gray-600 dark:text-gray-400">
                  Ask a question or choose a suggestion.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Resume;
