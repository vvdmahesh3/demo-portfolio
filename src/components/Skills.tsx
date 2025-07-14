import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Database, Cloud, Brain, Wrench } from 'lucide-react';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: 'Languages',
      icon: Code,
      color: 'from-blue-500 to-cyan-400',
      skills: ['Python', 'JavaScript', 'Java', 'C', 'HTML/CSS']
    },
    {
      title: 'Frameworks',
      icon: Palette,
      color: 'from-purple-500 to-pink-400',
      skills: ['React', 'Flask', 'Django', 'Tailwind CSS', 'Bootstrap']
    },
    {
      title: 'Databases',
      icon: Database,
      color: 'from-green-500 to-teal-400',
      skills: ['MySQL', 'Firebase', 'SQLite', 'MongoDB']
    },
    {
      title: 'Tools & Cloud',
      icon: Cloud,
      color: 'from-orange-500 to-yellow-400',
      skills: ['GitHub', 'Figma', 'AWS', 'VS Code', 'Canva']
    },
    {
      title: 'AI/ML',
      icon: Brain,
      color: 'from-emerald-500 to-lime-400',
      skills: ['Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Seaborn']
    },
    {
      title: 'Other Tools',
      icon: Wrench,
      color: 'from-red-500 to-pink-500',
      skills: ['Tableau', 'Tkinter', 'Git', 'Postman']
    }
  ];

  return (
    <section
      id="skills"
      className="py-20 bg-gray-50 dark:bg-black text-black dark:text-white transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-space font-bold mb-6">
            Technical <span className="text-accent">Skills</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Clean, growing, and built with love for every line of code I touch.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-dark-200 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all"
            >
              <div className="flex items-center mb-4">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-tr ${category.color} flex items-center justify-center text-white`}
                >
                  <category.icon size={20} />
                </div>
                <h3 className="ml-3 text-xl font-bold">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {category.skills.map((skill, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1 rounded-full bg-gray-100 dark:bg-dark-300 text-sm text-gray-700 dark:text-gray-300 font-medium border border-gray-300 dark:border-gray-600 transition"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
