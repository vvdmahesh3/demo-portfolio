// src/components/ResumeQA.tsx

import React, { useState } from 'react';
import resumeData from './resumeData.json';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const ResumeQA: React.FC = () => {
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [customQuestion, setCustomQuestion] = useState('');
  const [customAnswer, setCustomAnswer] = useState('');

  const qaPairs = [
    {
      q: 'What internships has Mahesh done?',
      a: resumeData.internships.join(', '),
      emoji: '💼',
    },
    {
      q: "What are Mahesh's technical skills?",
      a: resumeData.skills.join(', '),
      emoji: '🧠',
    },
    {
      q: 'What is Mahesh currently studying?',
      a: resumeData.education,
      emoji: '📚',
    },
    {
      q: 'What certifications does Mahesh have?',
      a: resumeData.certifications.join(', '),
      emoji: '📜',
    },
    {
      q: 'What projects has Mahesh worked on?',
      a: resumeData.projects.join(', '),
      emoji: '💡',
    },
    {
      q: 'What are Mahesh’s achievements?',
      a: resumeData.achievements.join(', '),
      emoji: '🏆',
    },
  ];

  const handleToggle = (question: string) => {
    setActiveQuestion(activeQuestion === question ? null : question);
  };

  const handleCustomAsk = () => {
    const q = customQuestion.toLowerCase();
    if (q.includes('intern')) setCustomAnswer(resumeData.internships.join(', '));
    else if (q.includes('skill')) setCustomAnswer(resumeData.skills.join(', '));
    else if (q.includes('study') || q.includes('education')) setCustomAnswer(resumeData.education);
    else if (q.includes('certi')) setCustomAnswer(resumeData.certifications.join(', '));
    else if (q.includes('project')) setCustomAnswer(resumeData.projects.join(', '));
    else if (q.includes('achieve')) setCustomAnswer(resumeData.achievements.join(', '));
    else setCustomAnswer("Hmm... I couldn’t find that in Mahesh’s resume.");
  };

  return (
    <div className="p-8 rounded-xl shadow-2xl border transition-all duration-300 bg-gradient-to-br from-white via-sky-50 to-purple-100 text-black border-gray-200 dark:bg-zinc-900 dark:text-white dark:border-gray-800">
      <h3 className="text-3xl font-bold mb-8 text-accent flex items-center justify-center gap-2">
        <MessageCircle size={28} className="text-accent" /> Talk to My Resume
      </h3>

      {/* Q&A Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {qaPairs.map(({ q, a, emoji }, idx) => (
          <div
            key={idx}
            onClick={() => handleToggle(q)}
            className="cursor-pointer border border-accent rounded-lg p-4 hover:scale-105 transition-all duration-300 bg-white text-black shadow-sm hover:shadow-md dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
          >
            <div className="text-center text-sm font-semibold text-accent">{emoji} {q}</div>
            {activeQuestion === q && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-xs p-2 rounded transition-all bg-blue-50 text-gray-700 dark:bg-zinc-900 dark:text-gray-300"
              >
                {a}
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Custom Input */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
        <input
          type="text"
          placeholder="Ask something else..."
          value={customQuestion}
          onChange={(e) => setCustomQuestion(e.target.value)}
          className="w-full sm:w-2/3 px-4 py-2 rounded-lg border focus:outline-none bg-white text-black border-gray-300 dark:bg-zinc-800 dark:text-white dark:border-gray-600"
        />
        <button
          onClick={handleCustomAsk}
          className="bg-accent text-black px-6 py-2 rounded-lg font-semibold hover:bg-accent/90 transition-all"
        >
          Ask
        </button>
      </div>

      {customAnswer && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-accent font-mono text-center"
        >
          💬 {customAnswer}
        </motion.p>
      )}
    </div>
  );
};

export default ResumeQA;
