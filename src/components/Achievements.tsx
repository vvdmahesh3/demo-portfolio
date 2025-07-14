import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Star, Medal, AlignCenterVertical as Certificate, Users } from 'lucide-react';

const Achievements: React.FC = () => {
  const achievements = [
    {
      year: '2024',
      title: 'ITC ISRC Sustainability Champion',
      description: 'Recognized for outstanding contribution to sustainable development projects',
      icon: Star,
      color: 'bg-green-500',
      category: 'Sustainability'
    },
    {
      year: '2024',
      title: '1M1B Green Internship',
      description: 'Successfully completed comprehensive green technology internship program',
      icon: Certificate,
      color: 'bg-blue-500',
      category: 'Internship'
    },
    {
      year: '2024',
      title: 'Microsoft Generative AI Certification',
      description: 'Advanced certification in AI and machine learning technologies',
      icon: Award,
      color: 'bg-purple-500',
      category: 'Certification'
    },
    {
      year: '2024',
      title: 'AWS Cloud Practitioner',
      description: 'Foundational cloud computing certification from Amazon Web Services',
      icon: Certificate,
      color: 'bg-orange-500',
      category: 'Certification'
    },
    {
      year: '2024',
      title: 'Google Digital Marketing',
      description: 'Comprehensive digital marketing and analytics certification',
      icon: Award,
      color: 'bg-red-500',
      category: 'Certification'
    },
    {
      year: '2021',
      title: 'RMC Cup Cricket Championship',
      description: 'Led school cricket team to victory as captain and top performer',
      icon: Trophy,
      color: 'bg-accent',
      category: 'Sports'
    },
    {
      year: '2019',
      title: 'SEERATH Talent Test - 1st Prize',
      description: 'First place in competitive talent assessment examination',
      icon: Medal,
      color: 'bg-yellow-500',
      category: 'Academic'
    },
    {
      year: '2019',
      title: 'Dettol Attendance Award',
      description: 'Perfect attendance recognition for academic excellence',
      icon: Users,
      color: 'bg-indigo-500',
      category: 'Academic'
    }
  ];

  const categories = ['All', 'Certification', 'Sustainability', 'Sports', 'Academic', 'Internship'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredAchievements = selectedCategory === 'All' 
    ? achievements 
    : achievements.filter(achievement => achievement.category === selectedCategory);

  return (
    <section id="achievements" className="py-20 bg-gray-50 dark:bg-dark-100">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-space font-bold mb-6">
            My <span className="text-accent">Achievements</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Milestones that mark my journey of continuous learning and excellence
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-inter font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-accent text-black shadow-lg'
                  : 'bg-white dark:bg-dark-200 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-300'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-accent via-blue-500 to-purple-500 rounded-full"></div>
          
          <div className="space-y-12">
            {filteredAchievements.map((achievement, index) => (
              <motion.div
                key={`${achievement.year}-${achievement.title}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-white dark:bg-dark-200 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 ${achievement.color} text-white text-sm font-semibold rounded-full`}>
                        {achievement.category}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                        {achievement.year}
                      </span>
                    </div>
                    <h3 className="font-space font-bold text-xl mb-2 text-gray-900 dark:text-white">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {achievement.description}
                    </p>
                  </motion.div>
                </div>
                
                <div className="relative flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className={`w-16 h-16 ${achievement.color} rounded-full flex items-center justify-center shadow-lg border-4 border-white dark:border-dark-100`}
                  >
                    <achievement.icon size={28} className="text-white" />
                  </motion.div>
                  
                  {/* Glow Effect */}
                  <div className={`absolute w-16 h-16 ${achievement.color} rounded-full opacity-20 animate-pulse`}></div>
                </div>
                
                <div className="w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: '8+', label: 'Achievements', icon: Trophy },
            { number: '5+', label: 'Certifications', icon: Certificate },
            { number: '3+', label: 'Internships', icon: Users },
            { number: '100%', label: 'Dedication', icon: Star }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center bg-white dark:bg-dark-200 p-6 rounded-xl shadow-lg"
            >
              <stat.icon size={32} className="text-accent mx-auto mb-2" />
              <div className="text-3xl font-space font-bold text-accent mb-1">{stat.number}</div>
              <div className="text-gray-600 dark:text-gray-400 font-inter">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;