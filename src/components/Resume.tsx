// src/components/Resume.tsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Bot } from 'lucide-react';
import ResumeQA from '../components/ResumeQA';

const Resume: React.FC = () => {
  const [showQA, setShowQA] = useState(false);

  return (
    <section
      id="resume"
      className="py-20 transition-all duration-500 bg-gradient-to-br from-white via-blue-50 to-purple-100 text-black dark:bg-black dark:text-white"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          My{' '}
          <span className="text-blue-700 dark:text-accent dark:glow-soft">
            Resume
          </span>
        </motion.h2>

        {/* Subtitle */}
        <p className="text-lg mb-10 text-gray-600 dark:text-gray-400">
          Download my resume or explore it interactively.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-10">
          <a
            href="/VVD_Mahesh(Resume).pdf"
            download
            className="px-6 py-4 bg-accent text-black font-semibold rounded-full hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-2xl"
          >
            <Download className="inline mr-2" /> Download Resume
          </a>

          <button
            onClick={() => setShowQA(!showQA)}
            className={`px-6 py-4 border-2 font-semibold rounded-full flex items-center justify-center gap-2 transition-all duration-300 shadow-md ${
              showQA
                ? 'bg-white text-black border-blue-500 dark:bg-dark-300 dark:text-white dark:border-accent'
                : 'text-blue-600 border-blue-400 hover:bg-blue-500 hover:text-white dark:text-accent dark:border-accent dark:hover:bg-accent dark:hover:text-black'
            }`}
          >
            <Bot size={20} />
            {showQA ? 'Close Q&A' : 'Talk to My Resume'}
          </button>
        </div>

        {/* Resume Q&A Section */}
        {showQA && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4"
          >
            <ResumeQA />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Resume;
