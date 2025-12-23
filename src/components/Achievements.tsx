"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Award,
  Star,
  Medal,
  Users,
  X,
  FileText,
  Briefcase,
  Leaf,
  Brush,
  Laptop,
  Video,
  Dumbbell, // Sports category
} from "lucide-react";

type Certificate = {
  preview?: string; // path to PDF in public/certs/
  note?: string; // journey note shown under PDF viewer
};

type Achievement = {
  year: string;
  title: string;
  description: string;
  icon: any;
  category: string;
  certificate?: Certificate;
};

const achievements: Achievement[] = [
  {
    year: "2013",
    title: "Best Student Award",
    description:
      "Honored with the Best Student Award for consistent academic excellence and leadership qualities.",
    icon: Star,
    category: "Academic",
    certificate: {
      preview: "/certs/best-student-2013.pdf",
      note: "This recognition ignited my belief that steady effort and integrity create lasting results. It encouraged me to lead by example and pursue excellence in every task.",
    },
  },
  {
    year: "2015",
    title: "100% Attendance Award (Dettol + IMA)",
    description:
      "Recognized for dedication and discipline by maintaining 100% attendance.",
    icon: Users,
    category: "Academic",
    certificate: {
      preview: "/certs/attendance-dettol-ima-2015.pdf",
      note: "This award taught me the value of showing up consistently — a small, daily habit that compounds into trust and tangible progress.",
    },
  },
  {
    year: "2018",
    title: "Recycling Championship (ITC WOW)",
    description:
      "Awarded for impactful participation in sustainability-driven recycling initiatives.",
    icon: Leaf,
    category: "Sustainability",
    certificate: {
      preview: "/certs/itc-wow-recycling-2018.pdf",
      note: "Taking part in sustainability work showed me how community action creates real change. It shaped my belief that responsibility + persistence produce impact.",
    },
  },
  {
    year: "2019",
    title: "SEERATH Talent Test - 1st Prize",
    description:
      "Achieved 1st place in a competitive academic exam, demonstrating problem-solving skills.",
    icon: Medal,
    category: "Academic",
    certificate: {
      preview: "/certs/seerath-talent-test-2019.pdf",
      note: "This win reinforced that focused preparation and curiosity beat uncertainty. It boosted my confidence to tackle harder challenges.",
    },
  },
  {
    year: "2019",
    title: "Microsoft Office Specialist",
    description:
      "Certified in Microsoft Word, Excel, and PowerPoint — essential productivity skills.",
    icon: FileText,
    category: "Certification",
    certificate: {
      preview: "/certs/microsoft-office-specialist-2019.pdf",
      note: "Mastering these tools raised my efficiency and attention to detail — practical skills that multiply the value of every project I touch.",
    },
  },
  {
    year: "2023",
    title: "Internship at Anurag IT Solutions",
    description: "First industry experience in software development.",
    icon: Briefcase,
    category: "Internship",
    certificate: {
      preview: "/certs/anurag-it-internship-2023.pdf",
      note: "This internship bridged theory with practice, teaching me how to solve real problems under constraints — collaboration, grit, and clarity mattered most.",
    },
  },
  {
    year: "2025",
    title: "AWS Cloud Practitioner",
    description: "Certified in AWS foundational cloud concepts.",
    icon: Award,
    category: "Certification",
    certificate: {
      preview: "/certs/aws-cloud-practitioner-2025.pdf",
      note: "Cloud concepts expanded my view of scale: architectures that serve millions start with clear fundamentals. This certificate launched my cloud journey.",
    },
  },
  {
    year: "2025",
    title: "Google Certification",
    description: "Certified in advanced digital marketing and analytics.",
    icon: Award,
    category: "Certification",
    certificate: {
      preview: "/certs/google-cert-2025.pdf",
      note: "Learning analytics taught me that measurable outcomes guide better decisions — how to reach people with clarity and purpose.",
    },
  },
  {
    year: "2025",
    title: "Microsoft Generative AI Certification",
    description: "Advanced AI + ML certification in generative models.",
    icon: Award,
    category: "Certification",
    certificate: {
      preview: "/certs/microsoft-ai-cert-2025.pdf",
      note: "This milestone gave me the tools to design intelligent experiences. It reinforced that creative AI must be rooted in ethics and usefulness.",
    },
  },
  {
    year: "2025",
    title: "IBM AI Certification",
    description: "Certified in applied AI/ML solutions by IBM.",
    icon: Award,
    category: "Certification",
    certificate: {
      preview: "/certs/ibm-cert-2025.pdf",
      note: "Practicing applied AI showed me how models solve real needs — accuracy, explainability, and impact matter more than novelty.",
    },
  },
  {
    year: "2025",
    title: "Reliance Cloud Certification",
    description: "Cloud certification under Reliance programs.",
    icon: Award,
    category: "Certification",
    certificate: {
      preview: "/certs/reliance-cert-2025.pdf",
      note: "This certificate strengthened my cloud fundamentals and the ability to design practical, reliable solutions for production systems.",
    },
  },
  {
    year: "2025",
    title: "TCS iON Career Edge",
    description: "Completed Young Professional program from TCS iON.",
    icon: Award,
    category: "Certification",
    certificate: {
      preview: "/certs/tcs-cert-2025.pdf",
      note: "This program sharpened professional skills — communication, discipline, and the mindset expected in industry roles.",
    },
  },
  {
    year: "2025",
    title: "Adobe Certification",
    description: "Certified in Adobe Creative Cloud tools.",
    icon: Brush,
    category: "Certification",
    certificate: {
      preview: "/certs/adobe-cert-2025.pdf",
      note: "Design and visual storytelling amplified how I present ideas. This certification helped me craft clearer, more polished deliverables.",
    },
  },
  {
    year: "2025",
    title: "ServiceNow Certification",
    description: "Certified in ServiceNow enterprise applications.",
    icon: Award,
    category: "Certification",
    certificate: {
      preview: "/certs/servicenow-cert-2025.pdf",
      note: "Enterprise workflows taught me that good tools simplify complex human processes. This certificate proved my readiness for enterprise environments.",
    },
  },
  {
    year: "2025",
    title: "HP Certification",
    description: "Certified in HP systems and services.",
    icon: Award,
    category: "Certification",
    certificate: {
      preview: "/certs/hp-cert-2025.pdf",
      note: "This certification added practical hardware and systems understanding — useful when software must work seamlessly on real machines.",
    },
  },
  {
    year: "2025",
    title: "HR Intern at TEN",
    description:
      "Hands-on HR experience with recruitment and onboarding processes.",
    icon: Users,
    category: "Internship",
    certificate: {
      preview: "/certs/hr-intern-ten-2025.pdf",
      note: "Working in HR taught me people-first thinking: hiring, onboarding and empathy are as critical as technical skills for team success.",
    },
  },
  {
    year: "2025",
    title: "Green Intern at 1M1B",
    description: "Data visualization + sustainability internship using Tableau.",
    icon: Leaf,
    category: "Internship",
    certificate: {
      preview: "/certs/green-intern-1m1b-2025.pdf",
      note: "Sustainability work combined data with purpose. Visualizing impact taught me that clear insights drive better choices for people and planet.",
    },
  },
  {
    year: "2025",
    title: "Geekster Certification",
    description: "Software development certification from Geekster.",
    icon: Award,
    category: "Certification",
    certificate: {
      preview: "/certs/geekster-cert-2025.pdf",
      note: "This program sharpened full-stack thinking — delivering features end-to-end, with quality and speed.",
    },
  },
  {
    year: "2025",
    title: "Simplilearn Certification",
    description: "Certified in advanced online courses by Simplilearn.",
    icon: Award,
    category: "Certification",
    certificate: {
      preview: "/certs/simplilearn-cert-2025.pdf",
      note: "Continuous learning is my engine. This course helped me add practical modern skills to my toolkit quickly.",
    },
  },
  {
    year: "2025",
    title: "Udemy Certification",
    description: "Certified in professional development courses by Udemy.",
    icon: Award,
    category: "Certification",
    certificate: {
      preview: "/certs/udemy-cert-2025.pdf",
      note: "Self-driven learning on practical topics improved my ability to pick useful skills and apply them immediately.",
    },
  },
  {
    year: "2019",
    title: "Premiere Pro (by Karthik Ragavarapu)",
    description: "Advanced video editing and post-production certificate.",
    icon: Video,
    category: "Creative",
    certificate: {
      preview: "/certs/PREMIERE PRO BY KARTHIK RAGAVARAPU.pdf",
      note: "Editing taught me storytelling through visuals — pacing, clarity and emotion. This training turned raw footage into meaningful messages.",
    },
  },
];

const categories = [
  "All",
  "Certification",
  "Academic",
  "Internship",
  "Creative",
  "Sustainability",
  "Sports",
];

const Achievements: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const filteredAchievements =
    selectedCategory === "All"
      ? achievements
      : achievements.filter((a) => a.category === selectedCategory);

  return (
    <section
      id="achievements"
      className="py-20 font-mono transition-colors duration-700
                 bg-white text-black dark:bg-black dark:text-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-mono font-bold mb-6">
            My{" "}
            <span className="text-blue-600 dark:text-[#00FFB3]">
              Achievements
            </span>
          </h2>
          <p className="text-lg font-mono text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A journey of milestones, certifications, internships, and growth.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-mono font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-blue-600 text-white dark:bg-[#00FFB3] dark:text-black shadow-lg"
                  : "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-[#00FFB3] dark:text-[#00FFB3] dark:hover:bg-[#00FFB3] dark:hover:text-black"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-600 dark:bg-[#00FFB3] shadow-[0_0_20px_rgba(37,99,235,0.6)] dark:shadow-[0_0_20px_#00FFB3] rounded-full"></div>

          <div className="space-y-16">
            {filteredAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.title + index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className={`flex items-center ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Card */}
                <div
                  className={`w-1/2 ${
                    index % 2 === 0 ? "pr-8 text-right" : "pl-8"
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.02, y: -3 }}
                    className="bg-white dark:bg-black border border-blue-600/30 dark:border-[#00FFB3]/30 p-6 rounded-xl shadow-md hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] dark:hover:shadow-[0_0_25px_#00FFB3] transition-all"
                  >
                    <div
                      className={`flex items-center gap-3 mb-3 ${
                        index % 2 === 0 ? "justify-end" : "justify-start"
                      }`}
                    >
                      <span className="px-3 py-1 border border-blue-600 text-blue-600 dark:border-[#00FFB3] dark:text-[#00FFB3] text-xs rounded-full font-mono">
                        {achievement.category}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                        {achievement.year}
                      </span>
                    </div>
                    <h3 className="font-mono font-semibold text-lg mb-2 text-blue-600 dark:text-[#00FFB3]">
                      {achievement.title}
                    </h3>
                    <p className="font-mono text-gray-700 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                      {achievement.description}
                    </p>

                    {achievement.certificate?.preview ? (
                      <button
                        onClick={() =>
                          setSelectedCert(achievement.certificate || null)
                        }
                        className="px-4 py-2 text-sm font-mono rounded-lg bg-blue-600 text-white hover:bg-blue-700 dark:bg-[#00FFB3] dark:text-black dark:hover:bg-[#00e69f] transition"
                      >
                        View Certificate
                      </button>
                    ) : (
                      <span className="text-xs text-gray-500 italic font-mono">
                        No certificate available — experience was impactful.
                      </span>
                    )}
                  </motion.div>
                </div>

                {/* Icon */}
                <div className="relative flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-blue-600 dark:bg-[#00FFB3] flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.6)] dark:shadow-[0_0_15px_#00FFB3] border-4 border-white dark:border-black">
                    <achievement.icon
                      size={22}
                      className="text-white dark:text-black"
                    />
                  </div>
                </div>

                <div className="w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Certificate Modal — PDF viewer + Journey Note */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="relative bg-white dark:bg-black/90 border border-blue-600 dark:border-[#00FFB3] rounded-xl shadow-lg p-6 max-w-4xl w-full"
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-400 transition"
                aria-label="Close certificate"
              >
                <X size={22} />
              </button>

              {/* PDF Viewer */}
              <iframe
                src={selectedCert.preview ?? ""}
                className="w-full h-[68vh] rounded-md mb-4"
                title="Certificate PDF"
              />

              {/* Journey Note */}
              {selectedCert.note && (
                <p className="font-mono text-gray-700 dark:text-gray-300 text-sm italic leading-relaxed text-center px-3">
                  {selectedCert.note}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Achievements;