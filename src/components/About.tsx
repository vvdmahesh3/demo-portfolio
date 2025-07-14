import React from 'react';
import { motion } from 'framer-motion';
import Image from '../assets/profile.png';
import MusicPlayer from './MusicPlayer';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.7fr_2.3fr] gap-10 items-start">

        {/* 👤 Profile + Music */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center w-full"
        >
          <div className="relative group w-80 h-80 mb-8 rounded-full bg-gradient-to-br from-accent/30 to-lightAccent/30 p-2 shadow-2xl transition-transform transform hover:scale-105">
            <motion.img
              src={Image}
              alt="Mahesh Profile"
              className="rounded-full w-full h-full object-cover border-4 border-accent shadow-[0_0_30px_#00FFB3]"
              animate={{ rotate: [0, 1, -1, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-dashed border-accent opacity-50"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          {/* 🎵 Music Player */}
          <div className="w-full">
            <MusicPlayer />
          </div>
        </motion.div>

        {/* 📝 About Me Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="h-[40rem] overflow-y-auto pr-4 text-[1.05rem] leading-relaxed text-gray-800 dark:text-gray-300 font-jetbrains"
        >
          <h3 className="text-3xl font-poppins font-bold text-black dark:text-white mb-4">💬 About Me</h3>

          <p className="mb-4">
            <strong>In my diploma first year</strong>, I had four backlogs and barely knew how to code.
            Most of my friends were ahead — confident, skilled, prepared. I was just trying to catch up.
            But what they didn’t see was the fire that failure sparked in me.
          </p>

          <p className="mb-4">
            <strong>What changed?</strong> Hard work that no one clapped for. Ego reshaped into quiet ambition.
            Late nights turned into silent progress. That’s how I discovered a version of myself I didn’t know existed —
            and I’ve been building him ever since.
          </p>

          <p className="mb-4">
            I’m <strong>Peruri Veera Venkata Durga Mahesh</strong>, currently pursuing B.Tech in Computer Science & Engineering at
            Pragati Engineering College, with a focus on Artificial Intelligence and Machine Learning.
            But I’m not just a student of code — I’m a student of the grind, the growth, and the gut-check moments
            that define who you really are.
          </p>

          <p className="mb-4">
            <strong>👨‍💻 Coding Life</strong><br />
            I started from scratch, but built myself line by line — just like the projects I now create.
            Developed real-world applications like <em>Rythmize</em> (a music player), <em>Placement Tracker</em>,
            and a full-scale <em>Faculty Management System</em> with 11 connected features.
            Completed <strong>4+ internships</strong> across domains — at <em>1M1B, TEN, Vaishnav Technologies</em>, and more —
            learning how tech meets the real world.
            Every function I write isn’t just solving a problem — it’s solving my story.
          </p>

          <p className="mb-4">
            <strong>🎨 Creative Life</strong><br />
            Some express with code. I express with color, timing, and rhythm too.
            As a visual storyteller, I design banners, reels, UI layouts, and interactive components that don’t just look good —
            <strong>they feel alive</strong>. For me, pixels aren’t decoration —
            <strong>they’re emotion, alignment, and message</strong>.
          </p>

          <p className="mb-4">
            <strong>🚀 Now</strong><br />
            I stand at a rare crossroad — where AI meets UI, where logic meets feeling, where failure meets rebirth.
            I don’t build for applause or trends. <strong>I build for impact</strong> — soulful tools with real meaning.
          </p>

          <blockquote className="italic text-accent border-l-4 border-accent pl-4 mt-4">
            “This isn’t just a portfolio. It’s a digital reflection of grit — where backlogs became breakthroughs,
            doubts became designs, and silence found purpose. Every scroll, every section, every line here carries
            the weight of my journey. <strong>Welcome to it.</strong>”
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
