// src/App.tsx
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Achievements from "./components/Achievements";
import Resume from "./components/Resume";
import Contact from "./components/Contact";
import SuggestionBox from "./components/SuggestionBox";
import MBackground from "./components/MBackground"; 
import SmoothScroll from "./components/SmoothScroll";
import { AnimatePresence } from "framer-motion";

function App() {
  // State to manage the Experimental Lab Overlay
  const [isLabOpen, setIsLabOpen] = useState(false);

  return (
    <SmoothScroll>
      <div className="App bg-white dark:bg-[#050505] text-black dark:text-white transition-colors duration-700">
        
        {/* Pass the function to trigger the Lab */}
        <Navbar onMClick={() => setIsLabOpen(true)} />
        
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Achievements />
        <Resume />
        <Contact />
        <SuggestionBox />

        {/* The Experimental Lab Mode Overlay */}
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