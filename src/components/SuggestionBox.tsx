import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, CheckCircle2, Sparkles } from "lucide-react";
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

      // Super cool success effect
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#00FFB3", "#FFD700", "#FFFFFF"],
      });

      setFormData({
        name: "",
        email: "",
        category: "Project Suggestion",
        feedback: "",
      });

      localStorage.removeItem("suggestionBox");

      // Close modal after success
      setTimeout(() => {
        setIsSubmitted(false);
        setIsOpen(false);
      }, 3000);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      alert("❌ Could not send feedback. Please try again.");
    }
  };

  return (
    <>
      {/* --- FLOATING BUTTON WITH ADVANCED UI --- */}
      <div className="fixed bottom-6 left-6 md:left-10 z-50">
        {/* External Glow Pulse */}
        <div className="absolute inset-0 bg-yellow-400 rounded-full animate-sonar opacity-40" />
        
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="relative w-14 h-14 bg-yellow-400 text-black rounded-full shadow-[0_10px_40px_rgba(250,204,21,0.4)] flex items-center justify-center overflow-hidden border-2 border-yellow-200"
        >
          <MessageCircle size={24} />
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop with Heavy Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60]"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="fixed inset-0 flex items-center justify-center z-[70] p-4 pointer-events-none"
            >
              <div className="w-full max-w-md rounded-[2.5rem] overflow-hidden pointer-events-auto
                              bg-white/90 dark:bg-black/80 backdrop-blur-2xl
                              border border-white/20 dark:border-[#00FFB3]/20
                              shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative">
                
                {/* Visual Accent Glow Inside Modal */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#00FFB3]/10 blur-[60px] rounded-full" />

                {/* Header */}
                <div className="flex justify-between items-center px-8 pt-8 pb-4">
                  <div>
                    <h3 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                      Feedback <Sparkles className="text-yellow-400 w-5 h-5" />
                    </h3>
                    <p className="text-xs text-gray-500 font-medium tracking-wide uppercase mt-1">
                      Let's refine the vision
                    </p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-3 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-red-500/10 hover:text-red-500 transition-all group"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Body */}
                <div className="px-8 pb-8">
                  {isSubmitted ? (
                    <motion.div 
                      initial={{ scale: 0.8 }} 
                      animate={{ scale: 1 }} 
                      className="text-center py-10"
                    >
                      <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20">
                        <CheckCircle2 size={40} className="text-green-500" />
                      </div>
                      <h4 className="text-xl font-bold dark:text-white">Transmission Sent!</h4>
                      <p className="text-gray-500 mt-2 text-sm">Your insight has been successfully logged.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Name and Email Row */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Name</label>
                          <input
                            required
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Mahesh"
                            className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent dark:border-white/10 focus:border-[#00FFB3] focus:ring-4 focus:ring-[#00FFB3]/10 outline-none transition-all dark:text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Email</label>
                          <input
                            required
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="id@host.com"
                            className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent dark:border-white/10 focus:border-[#00FFB3] focus:ring-4 focus:ring-[#00FFB3]/10 outline-none transition-all dark:text-white"
                          />
                        </div>
                      </div>

                      {/* Category Selection Chips */}
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Category</label>
                        <div className="flex flex-wrap gap-2">
                          {categories.map((cat) => (
                            <button
                              type="button"
                              key={cat}
                              onClick={() => setFormData((p) => ({ ...p, category: cat }))}
                              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 border ${
                                formData.category === cat
                                  ? "bg-[#00FFB3] border-[#00FFB3] text-black shadow-lg shadow-[#00FFB3]/20 scale-105"
                                  : "bg-transparent border-gray-200 dark:border-white/10 text-gray-500 hover:border-gray-400 dark:hover:border-white/30"
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Message Area */}
                      <div className="space-y-2 relative">
                        <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Your Message</label>
                        <textarea
                          required
                          name="feedback"
                          rows={4}
                          value={formData.feedback}
                          onChange={handleChange}
                          placeholder="What would you like to see next?"
                          className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent dark:border-white/10 focus:border-[#00FFB3] focus:ring-4 focus:ring-[#00FFB3]/10 outline-none transition-all resize-none dark:text-white"
                        />
                        <div className="absolute bottom-4 right-4 text-[9px] font-mono text-gray-400 uppercase tracking-tighter">
                          {formData.feedback.length} Characters
                        </div>
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 rounded-2xl bg-black dark:bg-[#00FFB3] text-white dark:text-black font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 shadow-2xl transition-all disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-white/30 dark:border-black/30 border-t-white dark:border-t-black rounded-full animate-spin" />
                        ) : (
                          <>
                            <Send size={18} />
                            Deploy Feedback
                          </>
                        )}
                      </motion.button>
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