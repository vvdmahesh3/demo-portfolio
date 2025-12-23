// src/components/SuggestionBox.tsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

const FORMSPREE_URL = "https://formspree.io/f/mykgoego";

const SuggestionBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "Project Suggestion",
    feedback: "",
  });

  const categories = [
    "Project Suggestion",
    "UI Feedback",
    "Appreciation",
    "Other",
  ];

  // Restore draft from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("suggestionBox");
    if (saved) setFormData(JSON.parse(saved));
  }, []);

  // Save draft
  useEffect(() => {
    localStorage.setItem("suggestionBox", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.feedback.trim()) {
      alert("Please write your message.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          category: formData.category,
          message: formData.feedback,
        }),
      });

      if (!res.ok) throw new Error("Formspree error");

      setIsSubmitting(false);
      setIsSubmitted(true);

      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });

      setFormData({
        name: "",
        email: "",
        category: "Project Suggestion",
        feedback: "",
      });

      localStorage.removeItem("suggestionBox");

      setTimeout(() => {
        setIsSubmitted(false);
        setIsOpen(false);
      }, 2500);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      alert("❌ Could not send feedback. Please try again.");
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
                   flex items-center justify-center z-50"
      >
        <MessageCircle size={22} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black backdrop-blur-sm z-40"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
            >
              <div
                className="w-full max-w-md rounded-2xl overflow-hidden
                           bg-white text-black border border-blue-500/30
                           dark:bg-black/80 dark:text-white dark:border-[#00FFB3]/40
                           shadow-[0_0_20px_var(--accent)]"
              >
                {/* Header */}
                <div className="flex justify-between items-center p-5 border-b
                                border-blue-500/20 dark:border-[#00FFB3]/20">
                  <h3 className="text-lg font-semibold text-blue-600 dark:text-[#00FFB3]">
                    Suggestion Box
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full hover:bg-blue-500/10 dark:hover:bg-[#00FFB3]/10"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Body */}
                <div className="p-6">
                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <CheckCircle2
                        size={48}
                        className="mx-auto text-blue-600 dark:text-[#00FFB3]"
                      />
                      <p className="mt-3 text-lg font-medium">
                        Feedback sent successfully 🚀
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className="px-3 py-2 rounded-lg bg-gray-100 border
                                     dark:bg-black/40 dark:border-gray-700"
                        />
                        <input
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Email"
                          className="px-3 py-2 rounded-lg bg-gray-100 border
                                     dark:bg-black/40 dark:border-gray-700"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {categories.map((cat) => (
                          <button
                            type="button"
                            key={cat}
                            onClick={() =>
                              setFormData((p) => ({ ...p, category: cat }))
                            }
                            className={`px-3 py-2 rounded-full text-sm border
                              ${
                                formData.category === cat
                                  ? "border-blue-600 text-blue-600 dark:border-[#00FFB3] dark:text-[#00FFB3]"
                                  : "border-gray-300 text-gray-500 dark:border-gray-700"
                              }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>

                      <textarea
                        name="feedback"
                        rows={5}
                        value={formData.feedback}
                        onChange={handleChange}
                        placeholder="Write your message..."
                        className="w-full px-3 py-2 rounded-lg bg-gray-100 border
                                   resize-none dark:bg-black/40 dark:border-gray-700"
                      />

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex justify-center items-center gap-2
                                   bg-blue-600 text-white py-3 rounded-lg
                                   dark:bg-[#00FFB3] dark:text-black"
                      >
                        {isSubmitting ? "Sending..." : <>
                          <Send size={14} /> Send Feedback
                        </>}
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
