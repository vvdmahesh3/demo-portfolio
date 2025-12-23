// src/components/Footer.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 bg-black text-white">
      {/* Animated Top Border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-yellow-400 to-green-400 animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 text-center space-y-10">
        {/* Attitude Quote */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-2xl md:text-3xl font-space font-bold italic text-yellow-400 dark:text-yellow-400"
        >
          “You scrolled all the way down?
          <br className="hidden md:block" /> Now remember the name — Mahesh.”
        </motion.h3>

        {/* Sub Quote */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm md:text-base font-mono text-gray-400"
        >
          That's what it takes to build something great. Let's connect. 🚀
        </motion.p>

        {/* Divider */}
        <div className="w-24 h-1 mx-auto bg-yellow-400 rounded-full animate-pulse" />

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-between items-center gap-6 text-sm pt-8 border-t border-gray-800"
        >
          <span className="tracking-wide font-mono text-xs">
            ⚡ Crafted with passion. Built for impact. | Mahesh © 2024
          </span>

          <a href="/contact" className="hover:text-yellow-400 transition-colors text-sm font-mono">
            Get in touch
          </a>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-yellow-400 text-black rounded-full shadow-md hover:bg-yellow-500 transition-all"
          >
            <ArrowUp size={20} />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;