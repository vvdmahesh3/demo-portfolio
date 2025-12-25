"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, 
  Medal, 
  Users, 
  X, 
  FileText, 
  Briefcase, 
  Leaf, 
  Video, 
  ExternalLink, 
  Sparkles, 
  Zap,
  Award
} from "lucide-react";

// ---------------------- Types ----------------------
type Certificate = {
  preview?: string; // path to PDF in public/certs/
  note?: string;    // journey note shown under PDF viewer
};

type Achievement = {
  year: string;
  title: string;
  description: string;
  icon: any;
  category: string;
  certificate?: Certificate;
};

// ---------------------- Helper ----------------------
// Fixes pathing for GitHub Pages subdirectories
const pdf = (path: string) => `${import.meta.env.BASE_URL}${path}`;

// ---------------------- Data ----------------------
const achievements: Achievement[] = [
  {
    year: "2013",
    title: "Best Student Award",
    description: "Honored with the Best Student Award for consistent academic excellence and leadership qualities.",
    icon: Star,
    category: "Academic",
    certificate: {
      preview: pdf("certs/best-student-2013.pdf"),
      note: "This recognition ignited my belief that steady effort and integrity create lasting results. It encouraged me to lead by example and pursue excellence in every task.",
    },
  },
  {
    year: "2015",
    title: "100% Attendance Award",
    description: "Recognized for dedication and discipline by maintaining 100% attendance (Dettol + IMA).",
    icon: Users,
    category: "Academic",
    certificate: {
      preview: pdf("certs/attendance-dettol-ima-2015.pdf"),
      note: "This award taught me the value of showing up consistently — a daily habit that compounds into trust and progress.",
    },
  },
  {
    year: "2018",
    title: "Recycling Championship",
    description: "Awarded for impactful participation in sustainability-driven recycling initiatives (ITC WOW).",
    icon: Leaf,
    category: "Sustainability",
    certificate: {
      preview: pdf("certs/itc-wow-recycling-2018.pdf"),
      note: "Taking part in sustainability shaped my belief that community responsibility plus persistence produce real impact.",
    },
  },
  {
    year: "2019",
    title: "SEERATH Talent Test - 1st Prize",
    description: "Achieved 1st place in a competitive academic exam, demonstrating advanced problem-solving skills.",
    icon: Medal,
    category: "Academic",
    certificate: {
      preview: pdf("certs/seerath-talent-test-2019.pdf"),
      note: "This win reinforced that focused preparation beats uncertainty. It boosted my confidence to tackle harder challenges.",
    },
  },
  {
    year: "2019",
    title: "Microsoft Office Specialist",
    description: "Certified in Microsoft Word, Excel, and PowerPoint — essential enterprise productivity skills.",
    icon: FileText,
    category: "Certification",
    certificate: {
      preview: pdf("certs/microsoft-office-specialist-2019.pdf"),
      note: "Mastering these tools raised my efficiency and attention to detail — skills that multiply the value of every project.",
    },
  },
  {
    year: "2023",
    title: "Internship at Anurag IT Solutions",
    description: "First industry experience in software development, bridging the gap between theory and production.",
    icon: Briefcase,
    category: "Internship",
    certificate: {
      preview: pdf("certs/anurag-it-internship-2023.pdf"),
      note: "This internship taught me how to solve real problems under constraints — where collaboration and grit matter most.",
    },
  },
  {
    year: "2025",
    title: "AWS Cloud Practitioner",
    description: "Certified in AWS foundational cloud concepts, global infrastructure, and security.",
    icon: Award,
    category: "Certification",
    certificate: {
      preview: pdf("certs/aws-cloud-practitioner-2025.pdf"),
      note: "Cloud architectures that serve millions start with clear fundamentals. This certificate launched my cloud-native journey.",
    },
  },
  {
    year: "2025",
    title: "Microsoft Generative AI",
    description: "Advanced AI certification focusing on large language models and generative AI solutions.",
    icon: Award,
    category: "Certification",
    certificate: {
      preview: pdf("certs/microsoft-ai-cert-2025.pdf"),
      note: "This milestone gave me the tools to design intelligent experiences rooted in ethics and practical utility.",
    },
  },
  {
    year: "2025",
    title: "IBM AI Certification",
    description: "Certified in applied AI/ML solutions by IBM, focusing on data science pipelines.",
    icon: Award,
    category: "Certification",
    certificate: {
      preview: pdf("certs/ibm-cert-2025.pdf"),
      note: "Practicing applied AI showed me how models solve real needs — accuracy and explainability are paramount.",
    },
  },
  {
    year: "2025",
    title: "HR Intern at TEN",
    description: "Hands-on HR experience with recruitment, talent management, and onboarding processes.",
    icon: Users,
    category: "Internship",
    certificate: {
      preview: pdf("certs/hr-intern-ten-2025.pdf"),
      note: "Working in HR taught me people-first thinking: hiring and empathy are as critical as technical skills for success.",
    },
  },
  {
    year: "2019",
    title: "Premiere Pro Editor",
    description: "Advanced video editing and post-production certificate (by Karthik Ragavarapu).",
    icon: Video,
    category: "Creative",
    certificate: {
      preview: pdf("certs/PREMIERE PRO BY KARTHIK RAGAVARAPU.pdf"),
      note: "Editing taught me storytelling through visuals — pacing, clarity, and turning raw footage into meaningful messages.",
    },
  },
];

const categories = ["All", "Certification", "Academic", "Internship", "Creative", "Sustainability"];

// ---------------------- Component ----------------------
const Achievements: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const filteredAchievements = selectedCategory === "All" 
    ? achievements 
    : achievements.filter((a) => a.category === selectedCategory);

  return (
    <section id="achievements" className="relative py-24 overflow-hidden transition-colors duration-700 bg-white dark:bg-[#050505] text-zinc-900 dark:text-white font-mono">
      {/* Background Accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-blue-50/50 dark:from-blue-900/10 to-transparent" />
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 dark:border-[#00FFB3]/20 bg-blue-50 dark:bg-[#00FFB3]/5 text-blue-600 dark:text-[#00FFB3] text-[10px] font-black uppercase tracking-widest mb-6">
            <Sparkles size={12} /> The Milestone Track
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-[#00FFB3] dark:to-cyan-400 drop-shadow-sm">Achievements</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto text-sm uppercase tracking-widest leading-relaxed">
            A chronological journey of growth, certified expertise, and architectural milestones.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-20">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 border ${
                selectedCategory === category
                  ? "bg-zinc-900 text-white border-zinc-900 dark:bg-[#00FFB3] dark:text-black dark:border-[#00FFB3] shadow-xl"
                  : "bg-zinc-100 dark:bg-white/5 text-zinc-500 border-zinc-200 dark:border-white/10 hover:border-blue-500 dark:hover:border-[#00FFB3] dark:hover:text-[#00FFB3]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-gradient-to-b from-blue-600/20 via-blue-600 dark:from-[#00FFB3]/20 dark:via-[#00FFB3] to-transparent hidden md:block" />
          
          <div className="space-y-24">
            {filteredAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.title + index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content Card */}
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="p-8 rounded-[32px] bg-zinc-50/50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/5 backdrop-blur-md hover:shadow-2xl dark:hover:shadow-[#00FFB3]/10 transition-all group"
                  >
                    <div className={`flex items-center gap-3 mb-4 ${index % 2 === 0 ? "justify-end" : "justify-start"}`}>
                      <span className="text-blue-600 dark:text-[#00FFB3] font-black text-xs">{achievement.year}</span>
                      <span className="px-3 py-1 rounded-lg bg-zinc-200 dark:bg-white/10 text-zinc-600 dark:text-zinc-400 text-[9px] font-black uppercase tracking-tighter">
                        {achievement.category}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black tracking-tighter mb-3 uppercase group-hover:text-blue-600 dark:group-hover:text-[#00FFB3] transition-colors">
                      {achievement.title}
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-6 font-medium">
                      {achievement.description}
                    </p>
                    {achievement.certificate?.preview ? (
                      <button
                        onClick={() => setSelectedCert(achievement.certificate || null)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 text-white dark:bg-[#00FFB3] dark:text-black text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg"
                      >
                        Verify Identity <ExternalLink size={14} />
                      </button>
                    ) : (
                      <div className={`text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-600 flex items-center gap-2 ${index % 2 === 0 ? "justify-end" : "justify-start"}`}>
                        <Zap size={12} /> Impact Recognized
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Central Icon Junction */}
                <div className="relative z-20">
                  <div className="w-16 h-16 rounded-3xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-[#00FFB3]/30 flex items-center justify-center shadow-2xl group transition-all">
                    <achievement.icon className="text-blue-600 dark:text-[#00FFB3] w-6 h-6 group-hover:scale-110 transition-transform" />
                    <div className="absolute inset-0 rounded-3xl bg-blue-600 dark:bg-[#00FFB3] opacity-0 group-hover:opacity-20 animate-ping" />
                  </div>
                </div>

                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Advanced Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-zinc-950/90 backdrop-blur-2xl flex items-center justify-center z-[100] p-4"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-[#00FFB3]/20 rounded-[40px] shadow-3xl overflow-hidden max-w-5xl w-full max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-zinc-100 dark:border-white/5 flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 dark:bg-[#00FFB3] flex items-center justify-center text-white dark:text-black shadow-lg">
                    <FileText size={16} />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-white">
                    Document_Viewer.exe
                  </span>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-3 rounded-full bg-zinc-200 dark:bg-white/5 hover:bg-red-500 hover:text-white transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {/* PDF Container - FIXED HEIGHT HERE FOR FULL VIEW */}
              <div className="flex-grow bg-zinc-100 dark:bg-zinc-950 p-4 min-h-[500px] h-[65vh]">
                <iframe
                  src={selectedCert.preview}
                  className="w-full h-full rounded-2xl border-none shadow-inner bg-white"
                  title="Achievement Proof"
                />
              </div>

              {/* Retrospective Note */}
              {selectedCert.note && (
                <div className="p-8 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-white/5">
                  <div className="max-w-2xl mx-auto text-center">
                    <div className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-600 dark:text-[#00FFB3] mb-3">
                      Retrospective Note
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-300 text-xs leading-relaxed italic">
                      "{selectedCert.note}"
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Achievements;