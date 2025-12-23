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

function App() {
  return (
    <div className="App bg-white dark:bg-black text-black dark:text-white transition-colors duration-700">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Achievements />
      <Resume />
      <Contact />
      <SuggestionBox />
    </div>
  );
}

export default App;
