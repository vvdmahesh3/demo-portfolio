// src/App.tsx
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Achievements from "./components/Achievements";
import Resume from "./components/Resume";
import Contact from "./components/Contact";
import SuggestionBox from "./components/SuggestionBox";
import MBackground from "./components/MBackground"; // The Identity/Lab section
import SmoothScroll from "./components/SmoothScroll"; 

function App() {
  return (
    <SmoothScroll>
      <div className="App bg-white dark:bg-black text-black dark:text-white transition-colors duration-700">
        <Navbar />
        {/* Professional Core */}
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Achievements />
        <Resume />
        
        {/* Interaction Layers */}
        <Contact />
        <SuggestionBox />

        {/* The Creative Finale / Experimental Lab */}
        <MBackground /> 
      </div>
    </SmoothScroll>
  );
}

export default App;