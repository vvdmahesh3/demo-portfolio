// src/components/About.tsx
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Sparkles, MoveRight, Quote, Zap, ShieldCheck, Target } from "lucide-react";
import AboutHero from "../assets/about-hero.webp";

const About: React.FC = () => {
  const containerRef = useRef(null);

  // High-performance scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Sophisticated Parallax
  const heroScale = useTransform(smoothProgress, [0, 0.3], [1.1, 1]);
  const heroX = useTransform(smoothProgress, [0, 0.3], ["0%", "5%"]);
  const contentY = useTransform(smoothProgress, [0, 0.4], [50, -50]);
  
  // FIX: Adjusted opacity ranges so the quote stays visible longer
  const quoteOpacity = useTransform(smoothProgress, [0.7, 0.85], [0, 1]);
  const quoteScale = useTransform(smoothProgress, [0.7, 0.9], [0.9, 1]);

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative min-h-[350vh] bg-white dark:bg-[#050505] text-zinc-900 dark:text-zinc-100 transition-colors duration-700"
    >
      {/* 1. CINEMATIC HERO STAGE (OFFSET LAYOUT) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col lg:flex-row">
        
        {/* RIGHT PANEL: IMAGE */}
        <motion.div 
          style={{ scale: heroScale, x: heroX }}
          className="relative h-[50vh] lg:h-full lg:w-1/2 overflow-hidden order-1 lg:order-2"
        >
          <img
            src={AboutHero}
            alt="VVD Mahesh"
            className="w-full h-full object-cover brightness-[0.9] dark:brightness-[0.5] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-white dark:from-[#050505] via-transparent to-transparent" />
        </motion.div>

        {/* LEFT PANEL: CORE IDENTITY */}
        <div className="flex-1 flex flex-col justify-center px-8 lg:px-20 z-10 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-100 dark:border-[#00FFB3]/20 bg-blue-50 dark:bg-[#00FFB3]/5 text-blue-600 dark:text-[#00FFB3] text-[10px] font-black uppercase tracking-[0.3em] mb-8">
               ⚡ Think • Build • Repeat
            </div>
            
            <h2 className="text-6xl lg:text-8xl font-black tracking-tighter uppercase mb-6 leading-[0.9]">
              V V D <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-[#00FFB3] dark:to-cyan-400">
                MAHESH <br /> PERURI.
              </span>
            </h2>
            
            <p className="max-w-md text-zinc-500 dark:text-zinc-400 font-medium text-lg leading-relaxed italic border-l-2 border-zinc-200 dark:border-zinc-800 pl-6">
              "My journey was never about perfect outcomes. It was about turning confusion into clarity and effort into evolution."
            </p>
          </motion.div>
        </div>
      </div>

      {/* 2. THE GRID NARRATIVE */}
      <div className="relative z-20 w-full bg-white dark:bg-[#050505]">
        <div className="container mx-auto px-6 py-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* STATS COLUMN */}
          <motion.div 
            style={{ y: contentY }}
            className="lg:col-span-4 space-y-8"
          >
            <FeatureCard 
              icon={<Zap className="text-orange-500" />}
              title="⚡ BUILT THROUGH STRUGGLES"
              desc="Every obstacle became a lesson, every setback became motivation to move forward."
            />
            <FeatureCard 
              icon={<ShieldCheck className="text-blue-500" />}
              title="🛡️ LEARNING BY BUILDING"
              desc="Projects are more than code. They are proof of curiosity, effort, and growth."
            />
            <FeatureCard 
              icon={<Target className="text-[#00FFB3]" />}
              title="🎯 CHASING BETTER, DAILY"
              desc="Not focused on being perfect, focused on becoming better than yesterday"
            />
          </motion.div>

          {/* MAIN NARRATIVE CONTENT */}
          <div className="lg:col-span-8 lg:pl-12 space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter mb-8 dark:text-white">
                TURNING CHALLENGES INTO <br /> 
                <span className="text-blue-600 dark:text-[#00FFB3]">REAL-WORLD SOLUTIONS.</span>
              </h3>
              
              <div className="columns-1 md:columns-2 gap-10 space-y-8 text-zinc-600 dark:text-zinc-400 leading-loose text-lg font-medium">
                <p>
                  My journey was never built on perfect grades, easy paths, or instant results. It was shaped by mistakes, confusion, setbacks, and the determination to keep moving forward. Every challenge taught me something valuable, every failure revealed a lesson, and every difficult phase became part of my growth.
                </p>
                
                <p>
                  I learned that progress is not about moving fast, it is about moving with purpose. Today, I focus on building practical projects that connect creativity with technology, solving real problems while continuously evolving as a developer, learner, and future engineer.
                </p>

                <p className="p-8 rounded-3xl bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5 italic">
                  "Growth begins where comfort ends, and <span className="text-blue-600 dark:text-[#00FFB3]">progress begins where excuses stop.</span>"
                </p>
              </div>

              <div className="mt-12 flex flex-wrap gap-6 items-center">
                <button className="px-8 py-4 rounded-2xl bg-zinc-900 text-white dark:bg-[#00FFB3] dark:text-black font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:scale-105 transition-transform shadow-2xl">
                  EXPLORE MY JOURNEY <MoveRight size={16} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      </div>

      {/* 3. FINAL ELEVATION QUOTE - STICKY MOMENT */}
      <div className="h-screen sticky top-0 z-30 flex items-center justify-center overflow-hidden bg-white dark:bg-[#050505]">
        <motion.div 
          style={{ opacity: quoteOpacity, scale: quoteScale }}
          className="text-center px-6 max-w-5xl"
        >
          <Quote className="w-12 h-12 mx-auto mb-8 text-blue-600 dark:text-[#00FFB3] opacity-50" />
          <h2 className="text-4xl lg:text-7xl font-black tracking-tight leading-tight dark:text-white mb-10">
            “PRESSURE DIDN'T BREAK ME. IT REVEALED WHO I COULD BECOME.!”
          </h2>
          <div className="h-1 w-24 bg-blue-600 dark:bg-[#00FFB3] mx-auto rounded-full shadow-[0_0_20px_#00FFB3]" />
          
          <div className="mt-20 font-mono text-[10px] uppercase tracking-[0.5em] text-zinc-400 animate-pulse">
            "YOUR NEXT MOVE MATTERS MORE THAN YOUR LAST MISTAKE..!
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <motion.div 
    whileHover={{ x: 10 }}
    className="p-8 rounded-[32px] bg-white dark:bg-zinc-900/40 border border-zinc-100 dark:border-white/5 shadow-xl transition-all group"
  >
    <div className="mb-6 p-3 w-fit rounded-2xl bg-zinc-50 dark:bg-zinc-800/50">
      {icon}
    </div>
    <h4 className="text-xl font-bold mb-3 dark:text-white group-hover:text-blue-600 dark:group-hover:text-[#00FFB3] transition-colors uppercase tracking-tighter">{title}</h4>
    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
      {desc}
    </p>
  </motion.div>
);

export default About;