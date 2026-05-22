// src/components/Footer.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Heart, Sparkles, Terminal } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-20 overflow-hidden bg-white dark:bg-[#020202] text-zinc-900 dark:text-white transition-colors duration-700">
      {/* Dynamic Background Grid & Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-blue-500/10 dark:from-[#00FFB3]/5 to-transparent blur-[100px] opacity-50 rounded-full" />
      </div>

      {/* Animated Top Border - Light traveling */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500 dark:via-[#00FFB3] to-transparent opacity-30" />
      <motion.div 
        animate={{ left: ["-100%", "100%"] }} 
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }} 
        className="absolute top-0 w-1/4 h-[2px] bg-gradient-to-r from-transparent via-blue-500 dark:via-[#00FFB3] to-transparent shadow-[0_0_15px_rgba(0,100,255,0.8)] dark:shadow-[0_0_15px_rgba(0,255,179,0.8)]"
      />

      <div className="max-w-7xl mx-auto px-6 text-center space-y-12 relative z-10">
        
        {/* Attitude Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-tight text-zinc-800 dark:text-zinc-100">
            “You scrolled all the way down?
            <br className="hidden md:block" /> 
            Now remember the name — <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-[#00FFB3] dark:to-[#00FFB3] drop-shadow-md">V V D MAHESH PERURI</span>.”
          </h3>
        </motion.div>

        {/* Sub Quote */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs md:text-sm font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.3em] flex items-center justify-center gap-3 flex-wrap leading-loose"
        >
          <Sparkles size={14} className="text-blue-500 dark:text-[#00FFB3]" /> 
          That's what it takes to build something great. Let's connect. 
          <Sparkles size={14} className="text-blue-500 dark:text-[#00FFB3]" />
        </motion.p>

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 mt-12 border-t border-zinc-200 dark:border-white/10"
        >
          <span className="tracking-widest font-mono text-[10px] md:text-xs text-zinc-500 dark:text-zinc-400 uppercase flex items-center gap-2">
            Crafted with <Heart size={14} className="text-red-500 animate-pulse fill-red-500" /> Built for impact. | Mahesh © 2026
          </span>

          <div className="flex items-center gap-6">
            <a href="mailto:contact@mahesh.com" className="px-6 py-3 rounded-full bg-blue-50 dark:bg-white/5 border border-blue-200 dark:border-white/10 text-blue-600 dark:text-white font-mono text-[10px] uppercase tracking-[0.2em] hover:bg-blue-600 hover:text-white dark:hover:bg-[#00FFB3] dark:hover:text-black dark:hover:border-[#00FFB3] transition-all shadow-lg hover:shadow-blue-500/30 dark:hover:shadow-[#00FFB3]/30">
              Initiate Contact
            </a>

            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 bg-zinc-900 dark:bg-[#00FFB3] text-white dark:text-black rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.2)] dark:shadow-[0_0_30px_rgba(0,255,179,0.3)] hover:bg-blue-600 dark:hover:bg-white transition-all group"
            >
              <ArrowUp size={20} className="group-hover:animate-bounce" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;