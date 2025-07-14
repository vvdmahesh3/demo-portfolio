import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Filter } from 'lucide-react';

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Development' },
    { id: 'ai', label: 'AI/ML' },
    { id: 'desktop', label: 'Desktop Apps' },
    { id: 'tools', label: 'Utilities' },
    { id: 'editing', label: 'Editing & Multimedia' },
  ];

  const projects = [
    {
      id: 1,
      title: 'Faculty Management System',
      category: 'web',
      description: 'Full-stack system with faculty onboarding, attendance, assignment handling, and analytics.',
      tech: ['HTML', 'CSS', 'Python', 'Flask', 'SQLite'],
      image: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg',
      badge: 'Under Development',
    },
    {
      id: 2,
      title: '1M1B Carbon Calculator',
      category: 'ai',
      description: 'AI-powered calculator to estimate household carbon footprint with Tableau charts.',
      tech: ['JS', 'AI', 'Tableau', 'HTML', 'Chart.js'],
      image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg',
      liveUrl: 'https://lovable.dev/projects/1m1b',
      githubUrl: 'https://github.com/vvdmahesh3/1M1B-carbon-calculator',
      badge: 'Featured',
    },
    {
      id: 3,
      title: 'Rhythmize Music Player',
      category: 'desktop',
      description: 'Advanced Tkinter music player with custom GUI and local playlist support.',
      tech: ['Python', 'Tkinter', 'Pygame'],
      image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
    },
    {
      id: 4,
      title: 'Placement Tracker App',
      category: 'web',
      description: 'Dashboard to manage student placements with charts, filters, and admin panel.',
      tech: ['React', 'MongoDB', 'Express', 'Chart.js'],
      image: 'https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg',
      githubUrl: 'https://github.com/vvdmahesh3/Placement-Tracker-Dashboard',
      badge: 'Hackathon Winner',
    },
    {
      id: 5,
      title: 'Pythonic Quiz Game',
      category: 'desktop',
      description: 'KBC-style multiplayer quiz app built with Python & Tkinter.',
      tech: ['Python', 'Tkinter', 'JSON'],
      image: 'https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg',
    },
    {
      id: 6,
      title: 'Client Short Film Edit',
      category: 'editing',
      description: 'Post-production edit with BGM, transitions, subtitles and color grading.',
      tech: ['Premiere Pro', 'After Effects'],
      image: 'https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg',
    },
    {
      id: 7,
      title: 'Reel Mashup Series Vol.1',
      category: 'editing',
      description: 'High-paced emotional mashup with synced beat cuts and viral engagement.',
      tech: ['VN', 'CapCut', 'Kinemaster'],
      image: 'https://images.pexels.com/photos/723567/pexels-photo-723567.jpeg',
    },
    {
      id: 8,
      title: 'Upcoming Portfolio v2',
      category: 'tools',
      description: 'Next-gen portfolio with AI chatbot, typing animation, and resume Q&A.',
      tech: ['React', 'Node.js', 'Langchain', 'OpenAI'],
      image: 'https://images.pexels.com/photos/3861955/pexels-photo-3861955.jpeg',
      badge: 'Coming Soon',
    },
  ];

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="py-20 bg-white dark:bg-black text-black dark:text-white transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Featured <span className="text-accent">Projects</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Explore my development work, editing vibes, and creative experiments!
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-5 py-2 rounded-full border font-medium transition ${
                activeFilter === cat.id
                  ? 'bg-accent text-black shadow-md'
                  : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-300'
              }`}
            >
              <Filter size={14} className="inline mr-1" />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-xl overflow-hidden shadow-lg relative hover:shadow-xl transition-all duration-300 bg-white dark:bg-dark-200 border border-gray-200 dark:border-gray-800"
            >
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
                {project.badge && (
                  <span className="absolute top-4 left-4 bg-accent text-black px-3 py-1 rounded-full text-xs font-bold uppercase animate-pulse">
                    {project.badge}
                  </span>
                )}
              </div>

              <div className="p-5">
                <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">{project.description}</p>
                {project.tech && (
                  <div className="flex flex-wrap gap-2 text-xs">
                    {project.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-full text-gray-600 dark:text-gray-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Links */}
                <div className="flex gap-2 mt-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-accent text-black text-sm rounded-lg hover:bg-white transition"
                    >
                      <ExternalLink size={14} className="inline mr-1" /> Live
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 border border-accent text-accent text-sm rounded-lg hover:bg-accent hover:text-black transition"
                    >
                      <Github size={14} className="inline mr-1" /> Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
