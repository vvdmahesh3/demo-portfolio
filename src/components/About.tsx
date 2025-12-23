// src/components/About.tsx
import React, { Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Play } from "lucide-react";
import MusicPlayer from "./MusicPlayer";
import AboutHero from "../assets/about-hero.webp";

// Optional floating lights for 3D motion
const FloatingLights = () => (
  <>
    <ambientLight intensity={0.4} />
    <pointLight position={[2, 2, 3]} intensity={2} color="#00ffb3" />
    <pointLight position={[-2, -2, 1]} intensity={1.5} color="#ff0080" />
  </>
);

const About: React.FC = () => {
  const { scrollYProgress } = useScroll();

  const scale = useTransform(scrollYProgress, [0, 0.3], [1.2, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section
      id="about"
      className="relative h-[200vh] overflow-hidden text-white dark:text-gray-100"
    >
      {/* Sticky cinematic background */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.img
          src={AboutHero}
          alt="Cinematic background"
          style={{ scale, opacity }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0 w-full h-full object-cover brightness-[0.85]"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,138,64,0.25)_0%,rgba(0,0,0,0.85)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black/95" />

        {/* Safe 3D Canvas */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <Suspense fallback={null}>
              <FloatingLights />
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />
            </Suspense>
          </Canvas>
        </div>

        {/* Foreground cinematic text */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-6">
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 
                       bg-gradient-to-r from-[#00FFB3] to-cyan-400 bg-clip-text text-transparent 
                       drop-shadow-[0_0_25px_rgba(0,255,179,0.4)]"
          >
            About Me
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-3xl text-lg md:text-xl font-light text-gray-300 leading-relaxed"
          >
            Today, I stand where <span className="text-[#00FFB3] font-medium">AI</span> fuses with
            design, where logic feels, and failures transform into new beginnings.
            I build not for show, but for <span className="text-[#00FFB3] font-medium">impact</span>.
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            transition={{ duration: 1, delay: 0.7 }}
            className="h-[2px] my-8 bg-gradient-to-r from-transparent via-[#00FFB3] to-transparent"
          />

          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1 }}
            className="text-2xl md:text-4xl font-light leading-relaxed max-w-5xl mx-auto 
                       text-gray-100 italic tracking-wide"
          >
            “This isn’t just a portfolio. It’s a reflection of grit — where{" "}
            <span className="text-[#00FFB3] font-medium">backlogs</span> became{" "}
            <span className="text-[#00FFB3] font-medium">breakthroughs</span>, doubts became designs,
            and silence found <span className="text-[#00FFB3] font-medium">purpose</span>.”
          </motion.blockquote>

          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1.3 }}
            className="mt-10 text-3xl md:text-4xl text-[#00FFB3] font-signature drop-shadow-[0_0_25px_#00FFB3]"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            – V V D Mahesh
          </motion.h3>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="mt-10 flex items-center gap-3 text-sm text-gray-400"
          >
            <Play className="w-4 h-4 text-[#00FFB3]" />
            <span>
              Now Playing: <span className="text-[#00FFB3]">Aakaasam Nee Haddhu Ra</span>
            </span>
          </motion.div>
        </div>
      </div>

      {/* Journey section */}
      <div className="relative z-20 bg-black py-24 px-6 md:px-20 text-gray-300 dark:text-gray-200 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-5xl mx-auto text-center"
        >
          <h4 className="text-3xl md:text-4xl font-semibold mb-6 text-[#00FFB3]">
            My Journey
          </h4>
          <p className="text-lg md:text-xl leading-relaxed">
            From carrying four backlogs to building a{" "}
            <span className="text-[#00FFB3] font-medium">Faculty Management System</span> and
            developing experiences that fuse{" "}
            <span className="text-[#00FFB3] font-medium">AI with Design</span> — every failure shaped
            a skill, every challenge built a story. My work reflects not just logic and design, but{" "}
            <span className="italic">resilience and reinvention</span>.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="max-w-2xl mx-auto pt-10"
        >
          <MusicPlayer />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
