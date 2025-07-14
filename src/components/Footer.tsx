// src/components/Footer.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 transition-all duration-500 bg-black text-white dark:bg-black dark:text-white bg-gradient-to-br from-white via-blue-100 to-purple-100 text-black dark:from-black dark:via-black dark:to-black">
      {/* Animated Top Border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-accent to-green-400 animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 text-center space-y-10">
        {/* Attitude Quote */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-2xl md:text-3xl font-space font-bold italic text-purple-700 dark:text-accent dark:glow-text"
        >
          “You scrolled all the way down? Good.
          <br className="hidden md:block" /> Now remember the name — Mahesh.”
        </motion.h3>

        {/* Sub Quote */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm md:text-base font-mono text-gray-700 dark:text-gray-400"
        >
          Next time you see my name — it won’t be at the bottom. 🐺
        </motion.p>

        {/* Divider */}
        <div className="w-24 h-1 mx-auto bg-accent rounded-full animate-pulse" />

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-between items-center gap-6 text-sm pt-8 border-t border-gray-300 dark:border-gray-800"
        >
          <span className="tracking-wide font-mono text-xs">
            🚀 Crafted in code. Charged with dreams. | Mahesh © 2024
          </span>

          <div className="flex gap-4 text-sm">
            <span className="hover:text-accent transition cursor-pointer">Built for impact</span>
            <span className="text-accent">•</span>
            <span className="hover:text-accent transition cursor-pointer">Designed with edge</span>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-accent text-black rounded-full shadow-md hover:bg-accent/90 transition-all"
          >
            <ArrowUp size={20} />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
