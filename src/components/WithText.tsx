// src/components/WithText.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const keywords = [
  "Code",
  "Design",
  "AI",
  "Innovation",
  "Creativity",
  "Excellence",
  "Hardworking",
  "Vision",
  "Impact",
];

export default function WithText() {
  const [hovered, setHovered] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <div
      className="flex items-center justify-center text-lg md:text-xl font-medium text-gray-800 dark:text-gray-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={() => {
        if (!hovered) return;
        setIndex((prev) => (prev + 1) % keywords.length);
      }}
    >
      <span className="mr-2">with</span>
      <motion.span
        key={index}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.4 }}
        className="
          font-semibold 
          text-blue-600 dark:text-green-400 
          shadow-[0_0_10px_rgba(37,99,235,0.5)] dark:shadow-[0_0_12px_#00FFB3]
        "
      >
        {hovered ? keywords[index] : "AI"}
      </motion.span>
    </div>
  );
}
