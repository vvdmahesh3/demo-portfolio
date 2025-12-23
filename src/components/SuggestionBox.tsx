// src/components/SuggestionBox.tsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5174";

const SuggestionBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "suggestion",
    feedback: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [
    { value: "suggestion", label: "Project Suggestion" },
    { value: "feedback", label: "UI Feedback" },
    { value: "praise", label: "Appreciation" },
    { value: "other", label: "Other" },
  ];

  useEffect(() => {
    const saved = localStorage.getItem("suggestionBox");
    if (saved) setFormData(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("suggestionBox", JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (e: any) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.feedback.trim()) {
      alert("Please write a message.");
      return;
    }
    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Server error");

      setIsSubmitting(false);
      setIsSubmitted(true);
      confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
      setFormData({ name: "", email: "", category: "suggestion", feedback: "" });
      localStorage.removeItem("suggestionBox");
      setTimeout(() => {
        setIsSubmitted(false);
        setIsOpen(false);
      }, 2500);
    } catch (err: any) {
      console.error("Send feedback failed", err);
      setIsSubmitting(false);
      alert("❌ Could not send feedback. Try again later.");
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 md:left-10 w-14 h-14 
                   bg-yellow-400 text-black rounded-full shadow-lg 
                   hover:shadow-[0_0_15px_var(--accent)] 
                   transition-all duration-300 flex items-center justify-center z-50"
      >
        <MessageCircle size={22} />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/70 dark:bg-black/70 bg-white/70 backdrop-blur-sm z-40"
            />

            {/* Centered Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
            >
              <div
                className="w-full max-w-md 
                           bg-white border border-blue-600/40 text-black
                           dark:bg-black/80 dark:border-[#00FFB3]/50 dark:text-white
                           rounded-2xl shadow-[0_0_20px_var(--accent)] overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b 
                                border-blue-600/30 dark:border-[#00FFB3]/30">
                  <h3 className="font-semibold text-lg 
                                 text-blue-600 dark:text-[#00FFB3]">
                    Suggestion Box
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full hover:bg-blue-600/10 dark:hover:bg-[#00FFB3]/10"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  {isSubmitted ? (
                    <div className="text-center py-6">
                      <CheckCircle2
                        size={48}
                        className="mx-auto text-blue-600 dark:text-[#00FFB3]"
                      />
                      <h4 className="font-medium text-lg text-blue-600 dark:text-[#00FFB3] mt-3">
                        Thank you — feedback received
                      </h4>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Name & Email */}
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your name"
                          className="px-3 py-2 rounded-lg 
                                     bg-gray-100 border border-gray-300 
                                     focus:border-blue-600 text-sm text-black
                                     dark:bg-black/40 dark:border-gray-700 dark:text-white 
                                     dark:focus:border-[#00FFB3]"
                        />
                        <input
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="you@email.com"
                          className="px-3 py-2 rounded-lg 
                                     bg-gray-100 border border-gray-300 
                                     focus:border-blue-600 text-sm text-black
                                     dark:bg-black/40 dark:border-gray-700 dark:text-white 
                                     dark:focus:border-[#00FFB3]"
                        />
                      </div>

                      {/* Category */}
                      <div className="grid grid-cols-2 gap-2">
                        {categories.map((cat) => (
                          <label
                            key={cat.value}
                            className={`px-3 py-2 rounded-full text-center cursor-pointer transition-all text-sm
                              ${
                                formData.category === cat.value
                                  ? "bg-blue-600/10 border border-blue-600 text-blue-600 dark:bg-[#00FFB3]/10 dark:border-[#00FFB3] dark:text-[#00FFB3]"
                                  : "bg-gray-100 border border-gray-300 text-gray-500 hover:border-blue-400 dark:bg-black/40 dark:border-gray-700 dark:text-gray-400 dark:hover:border-[#00FFB3]/40"
                              }`}
                          >
                            <input
                              type="radio"
                              name="category"
                              value={cat.value}
                              checked={formData.category === cat.value}
                              onChange={handleInputChange}
                              className="sr-only"
                            />
                            {cat.label}
                          </label>
                        ))}
                      </div>

                      {/* Feedback */}
                      <textarea
                        name="feedback"
                        value={formData.feedback}
                        onChange={handleInputChange}
                        rows={5}
                        placeholder="Write your feedback here..."
                        className="w-full px-3 py-2 rounded-lg 
                                   bg-gray-100 border border-gray-300 focus:border-blue-600 text-sm text-black
                                   dark:bg-black/40 dark:border-gray-700 dark:text-white dark:focus:border-[#00FFB3]
                                   resize-none"
                      />

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 
                                   bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 
                                   dark:bg-[#00FFB3] dark:text-black dark:hover:bg-[#00e69f]
                                   transition-all"
                      >
                        {isSubmitting ? "Sending..." : <><Send size={14}/> Send Feedback</>}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SuggestionBox;
