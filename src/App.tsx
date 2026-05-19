// src/App.tsx
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import CodingProfiles from "./components/CodingProfiles";
import Achievements from "./components/Achievements";
import Resume from "./components/Resume";
import Contact from "./components/Contact";
import SuggestionBox from "./components/SuggestionBox";
import Footer from "./components/Footer";
import MobileWarning from "./components/MobileWarning";
import MBackground from "./components/AnimatePresence/MBackground";
import SmoothScroll from "./components/SmoothScroll";

function App() {
  const [isLabOpen, setIsLabOpen] = useState(false);

  return (
    <SmoothScroll>
      <div className="bg-white dark:bg-[#050505] text-black dark:text-white transition-colors duration-700">
        
        {/* Mobile Experience Warning */}
        <MobileWarning />

        {/* Navbar controls Lab */}
        <Navbar onMClick={() => setIsLabOpen(true)} />

        {/* NORMAL PORTFOLIO */}
        <Hero />
        <About />
        <Projects />
        <Skills />
        <CodingProfiles />
        <Achievements />
        <Resume />
        <Contact />
        <SuggestionBox />
        <Footer />

        {/* 🚨 LAB OVERLAY — ONLY HERE */}
        <AnimatePresence>
          {isLabOpen && (
            <MBackground onClose={() => setIsLabOpen(false)} />
          )}
        </AnimatePresence>

      </div>
    </SmoothScroll>
  );
}

export default App;
