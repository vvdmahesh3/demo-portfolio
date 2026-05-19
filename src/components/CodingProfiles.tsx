// src/components/CodingProfiles.tsx
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  SiLeetcode,
  SiHackerrank,
  SiGithub,
  SiCodechef,
  SiGeeksforgeeks,
  SiCodeforces,
} from "react-icons/si";
import { ExternalLink, Terminal, Sparkles, Code2 } from "lucide-react";
import type { IconType } from "react-icons";

/* ─────────── PROFILE DATA ─────────── */
interface CodingProfile {
  platform: string;
  handle: string;
  url: string;
  icon: IconType;
  color: string;
  bgGlow: string;
  stats: { label: string; value: string }[];
  tagline: string;
}

const PROFILES: CodingProfile[] = [
  {
    platform: "GitHub",
    handle: "@vvdmahesh3",
    url: "https://github.com/vvdmahesh3",
    icon: SiGithub,
    color: "#f0f0f0",
    bgGlow: "rgba(240,240,240,0.1)",
    stats: [
      { label: "Repos", value: "30+" },
      { label: "Commits", value: "3000+" },
      { label: "Stars", value: "15+" },
    ],
    tagline: "Open source • Full-Stack • AI Projects",
  },
  {
    platform: "LeetCode",
    handle: "@vvdmahesh3",
    url: "https://leetcode.com/u/VVD_Mahesh36/",
    icon: SiLeetcode,
    color: "#FFA116",
    bgGlow: "rgba(255,161,22,0.1)",
    stats: [
      { label: "Problems", value: "150+" },
      { label: "Contest", value: "Active" },
      { label: "Streak", value: "30d" },
    ],
    tagline: "DSA • Algorithms • Problem Solving",
  },
  {
    platform: "HackerRank",
    handle: "@vvdmahesh3",
    url: "https://www.hackerrank.com/profile/immahesh300",
    icon: SiHackerrank,
    color: "#00EA64",
    bgGlow: "rgba(0,234,100,0.1)",
    stats: [
      { label: "Badges", value: "5★" },
      { label: "Certs", value: "3" },
      { label: "Skills", value: "Gold" },
    ],
    tagline: "Certifications • Python • SQL",
  },
  {
    platform: "GeeksForGeeks",
    handle: "@vvdmahesh3",
    url: "https://www.geeksforgeeks.org/profile/immahevszy",
    icon: SiGeeksforgeeks,
    color: "#2F8D46",
    bgGlow: "rgba(47,141,70,0.1)",
    stats: [
      { label: "Articles", value: "5+" },
      { label: "Score", value: "200+" },
      { label: "Rank", value: "Active" },
    ],
    tagline: "Data Structures • Practice • Learning",
  },


];

/* ─────────── MATRIX / CODE RAIN EFFECT ─────────── */
const CodeRainColumn: React.FC<{ delay: number; left: string; speed: number }> = ({
  delay,
  left,
  speed,
}) => {
  const chars = "01アイウエオカキクケコ{}[]<>=/+*";
  const randomChars = Array.from({ length: 20 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  );

  return (
    <motion.div
      className="absolute top-0 font-mono text-[10px] leading-4 text-[#00FFB3]/20 dark:text-[#00FFB3]/15 pointer-events-none select-none whitespace-pre"
      style={{ left }}
      initial={{ y: "-100%" }}
      animate={{ y: "100%" }}
      transition={{
        duration: speed,
        repeat: Infinity,
        delay,
        ease: "linear",
      }}
    >
      {randomChars.map((c, i) => (
        <div key={i} style={{ opacity: 0.1 + (i / 20) * 0.6 }}>
          {c}
        </div>
      ))}
    </motion.div>
  );
};

/* ─────────── PROFILE CARD ─────────── */
const ProfileCard: React.FC<{
  profile: CodingProfile;
  index: number;
}> = ({ profile, index }) => {
  const Icon = profile.icon;

  return (
    <motion.a
      href={profile.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 60, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative block rounded-[32px] overflow-hidden border border-zinc-200 dark:border-white/[0.06] bg-white dark:bg-zinc-950/60 backdrop-blur-xl transition-all duration-500 hover:shadow-2xl"
      style={{
        // @ts-ignore
        "--card-glow": profile.bgGlow,
      } as React.CSSProperties}
    >
      {/* Top accent line */}
      <div
        className="h-[2px] w-full opacity-60 group-hover:opacity-100 transition-opacity"
        style={{ background: `linear-gradient(90deg, transparent, ${profile.color}, transparent)` }}
      />

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at 50% 0%, ${profile.bgGlow}, transparent 70%)`,
        }}
      />

      <div className="relative p-8">
        {/* Header Row */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            {/* Icon Container */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-500 group-hover:shadow-lg"
              style={{
                borderColor: `${profile.color}30`,
                backgroundColor: `${profile.color}08`,
              }}
            >
              <Icon
                className="text-2xl transition-all duration-500 grayscale group-hover:grayscale-0"
                style={{ color: profile.color }}
              />
            </div>
            <div>
              <h3 className="text-lg font-black uppercase tracking-tight text-zinc-900 dark:text-white group-hover:text-[#00FFB3] dark:group-hover:text-[#00FFB3] transition-colors">
                {profile.platform}
              </h3>
              <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 tracking-wider">
                {profile.handle}
              </p>
            </div>
          </div>

          {/* External link */}
          <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/5 opacity-40 group-hover:opacity-100 group-hover:bg-[#00FFB3] group-hover:border-[#00FFB3] transition-all duration-300">
            <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-black transition-colors" />
          </div>
        </div>

        {/* Tagline */}
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600 mb-6">
          {profile.tagline}
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3">
          {profile.stats.map((stat) => (
            <div
              key={stat.label}
              className="p-3 rounded-xl bg-zinc-50/80 dark:bg-white/[0.03] border border-zinc-100 dark:border-white/[0.04] text-center"
            >
              <div className="text-lg font-black text-zinc-900 dark:text-white leading-none mb-1">
                {stat.value}
              </div>
              <div className="text-[8px] font-bold uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.a>
  );
};

/* ─────────── MAIN SECTION ─────────── */
const CodingProfiles: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      id="coding-profiles"
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-zinc-50 dark:bg-[#030303] transition-colors duration-700"
    >
      {/* ── Background Effects ── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-[#00FFB3]/[0.03] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/[0.03] rounded-full blur-[120px]" />
      </motion.div>

      {/* Code rain columns (dark mode only) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden dark:block opacity-40">
        {Array.from({ length: 12 }).map((_, i) => (
          <CodeRainColumn
            key={i}
            delay={i * 1.5}
            left={`${(i / 12) * 100}%`}
            speed={8 + Math.random() * 6}
          />
        ))}
      </div>

      {/* Dot grid pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 dark:border-[#00FFB3]/20 bg-blue-50 dark:bg-[#00FFB3]/5 text-blue-600 dark:text-[#00FFB3] text-[10px] font-black uppercase tracking-[0.3em] mb-8">
            <Terminal size={12} /> Competitive Edge
          </div>

          <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-6 text-zinc-900 dark:text-white">
            CODING{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-[#00FFB3] dark:to-cyan-400">
              PROFILES
            </span>
          </h2>

          <p className="text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto text-sm leading-relaxed font-medium">
            Where I grind algorithms, solve problems, and push code daily.
            Every commit, every contest, every green square tells a story.
          </p>
        </motion.div>

        {/* ── Terminal Status Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-6 mb-16 flex-wrap"
        >
          {[
            { label: "Platforms", value: "6+", icon: Code2 },
            { label: "Problems Solved", value: "400+", icon: Terminal },
            { label: "Active Streak", value: "Ongoing", icon: Sparkles },
          ].map((metric) => (
            <div
              key={metric.label}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white dark:bg-white/[0.03] border border-zinc-100 dark:border-white/5"
            >
              <metric.icon className="w-4 h-4 text-blue-600 dark:text-[#00FFB3]" />
              <div>
                <div className="text-sm font-black text-zinc-900 dark:text-white">
                  {metric.value}
                </div>
                <div className="text-[8px] font-bold uppercase tracking-widest text-zinc-400">
                  {metric.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Profile Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROFILES.map((profile, i) => (
            <ProfileCard key={profile.platform} profile={profile} index={i} />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.5em] text-zinc-400 dark:text-zinc-600">
            "Consistency compounds. Every problem solved is a neuron strengthened."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CodingProfiles;
