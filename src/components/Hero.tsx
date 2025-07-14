import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import Typewriter from 'typewriter-effect';

const Hero: React.FC = () => {
  const scrollToNext = () => {
    const nextSection = document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen pt-24 flex flex-col justify-center items-center text-center px-6 bg-[#F5F7FA] dark:bg-black transition-all"
    >
      {/* 🔠 Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-6xl md:text-8xl lg:text-9xl font-space font-bold mb-2 text-black dark:text-white"
      >
        I{' '}
        <span className="text-lightAccent dark:text-accent hover:shadow-[0_0_12px_#00ccff] dark:hover:shadow-[0_0_12px_#00FFB3] transition-all">
          BUILD
        </span>
      </motion.h1>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-6xl md:text-8xl lg:text-9xl font-space font-bold mb-4 text-accent dark:text-accent"
      >
        THE FUTURE
      </motion.h1>

      {/* 🔁 Typing Effect */}
      <div className="text-xl text-gray-700 dark:text-gray-300 font-inter mb-6 h-10 flex items-center justify-center">
        <Typewriter
          options={{
            strings: [
              'With AI ⚙️',
              'With Code 👨‍💻',
              'With Passion 💚',
              'With Purpose 🚀',
              'With Soul ✨',
            ],
            autoStart: true,
            loop: true,
            delay: 60,
            deleteSpeed: 30,
          }}
        />
      </div>

      {/* ✨ Signature Quote + Welcome + Name */}
      <div className="mt-6 flex flex-col items-center gap-2">
        <p className="text-center text-md md:text-lg italic font-medium transition-all duration-500 dark:text-glow-white text-glow-black">
          “Built by VVD Mahesh — not in a day, but through every failure that taught me how.”
        </p>

        <h1 className="mt-4 text-[2.5rem] md:text-[3.5rem] font-handwriting neon-signature glow-underline relative inline-block">
          VVD Mahesh Peruri
        </h1>
      </div>

      {/* 🚀 CTA + Socials */}
      <div className="flex gap-4 mt-10 mb-12 items-center">
        <motion.a
          href="#about"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white border-2 border-lightAccent text-black shadow-[0_0_8px_#00ccff] hover:shadow-[0_0_16px_#00ccff] transition-all bg-gradient-to-b from-white to-transparent font-semibold px-6 py-3 rounded-full hover:shadow-xl dark:bg-accent dark:text-black dark:border-none"
        >
          Explore My Journey
        </motion.a>
        <a
          href="https://github.com/vvdmahesh3"
          target="_blank"
          rel="noopener noreferrer"
          className="text-lightAccent dark:text-accent hover:shadow-[0_0_8px_#00ccff] dark:hover:shadow-[0_0_8px_#00FFB3] transition-all"
        >
          <Github className="w-6 h-6" />
        </a>
        <a
          href="https://linkedin.com/in/vvdmahesh3"
          target="_blank"
          rel="noopener noreferrer"
          className="text-lightAccent dark:text-accent hover:shadow-[0_0_8px_#00ccff] dark:hover:shadow-[0_0_8px_#00FFB3] transition-all"
        >
          <Linkedin className="w-6 h-6" />
        </a>
        <a
          href="mailto:vvdmahesh3@gmail.com"
          className="text-lightAccent dark:text-accent hover:shadow-[0_0_8px_#00ccff] dark:hover:shadow-[0_0_8px_#00FFB3] transition-all"
        >
          <Mail className="w-6 h-6" />
        </a>
      </div>

      {/* ⬇️ Scroll Down Icon */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="cursor-pointer"
        onClick={scrollToNext}
      >
        <ChevronDown className="w-6 h-6 text-lightAccent dark:text-accent" />
      </motion.div>
    </section>
  );
};

export default Hero;
