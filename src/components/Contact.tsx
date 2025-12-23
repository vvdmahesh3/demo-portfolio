// src/components/Contact.tsx
import React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Instagram,
  MessageCircle,
  Globe,
} from "lucide-react";

const Contact: React.FC = () => {
  const contactDetails = [
    { icon: Mail, label: "immahesh300@gmail.com", href: "mailto:immahesh300@gmail.com" },
    { icon: Phone, label: "+91 8106073636", href: "tel:+918106073636" },
    { icon: MapPin, label: "Andhra Pradesh, India", href: "#" },
  ];

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com/vvdmahesh3" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/vvdmahesh3" },
    { icon: Instagram, label: "Instagram", href: "https://instagram.com/im_mahesh_362006" },
    { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/918106073636" },
    { icon: Globe, label: "Portfolio", href: "https://vvdmahesh3.github.io/demo-portfolio/" },
  ];

  return (
    <section
      id="contact"
      className="relative py-24 overflow-hidden transition-colors duration-700
                 bg-white text-black dark:bg-black dark:text-white"
    >
      {/* Background glow / particles */}
      <div className="absolute inset-0">
        {/* Light mode glow */}
        <div className="absolute w-[800px] h-[800px] bg-blue-600/10 dark:bg-transparent rounded-full blur-3xl -top-40 -left-40 animate-pulse"></div>
        <div className="absolute w-[600px] h-[600px] bg-blue-600/5 dark:bg-transparent rounded-full blur-3xl bottom-0 right-0"></div>
        {/* Dark mode glow */}
        <div className="absolute w-[800px] h-[800px] hidden dark:block bg-[#00FFB3]/10 rounded-full blur-3xl -top-40 -left-40 animate-pulse"></div>
        <div className="absolute w-[600px] h-[600px] hidden dark:block bg-[#00FFB3]/5 rounded-full blur-3xl bottom-0 right-0"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            ⚡ Let’s{" "}
            <span className="text-blue-600 dark:text-[#00FFB3]">Build Together</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have a project idea, collaboration, or just want to vibe?  
            Reach out — let’s make something impactful.
          </p>
        </motion.div>

        {/* Contact Details */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <div className="space-y-6">
            {contactDetails.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className="flex items-center gap-4 p-4 rounded-xl 
                           bg-gray-100/80 border border-blue-600/30 text-black 
                           hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] 
                           dark:bg-black/40 dark:border-[#00FFB3]/30 dark:text-white 
                           dark:hover:shadow-[0_0_25px_#00FFB3] 
                           transition"
              >
                <item.icon size={22} className="text-blue-600 dark:text-[#00FFB3]" />
                <span className="text-sm">{item.label}</span>
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-6">
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="mailto:immahesh300@gmail.com"
              className="px-8 py-4 rounded-full 
                         bg-blue-600 text-white font-semibold shadow-lg 
                         hover:bg-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] 
                         dark:bg-[#00FFB3] dark:text-black 
                         dark:hover:bg-[#00e69f] dark:hover:shadow-[0_0_30px_#00FFB3] 
                         transition"
            >
              ✉ Email Me
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              href="https://wa.me/918106073636"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full border 
                         border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white 
                         dark:border-[#00FFB3] dark:text-[#00FFB3] 
                         dark:hover:bg-[#00FFB3] dark:hover:text-black 
                         font-semibold shadow-md transition"
            >
              💬 WhatsApp Me
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              href="https://linkedin.com/in/vvdmahesh3"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full 
                         bg-gray-100 border border-blue-600/40 text-blue-600 
                         hover:bg-blue-600 hover:text-white 
                         dark:bg-black/50 dark:border-[#00FFB3]/40 dark:text-[#00FFB3] 
                         dark:hover:bg-[#00FFB3] dark:hover:text-black 
                         font-semibold shadow-md transition"
            >
              🔗 Connect on LinkedIn
            </motion.a>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 mb-10">
          {socialLinks.map((social, idx) => (
            <a
              key={idx}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full flex items-center justify-center 
                         bg-gray-100 border border-blue-600/30 text-blue-600 
                         hover:bg-blue-600 hover:text-white hover:scale-110 
                         dark:bg-black/50 dark:border-[#00FFB3]/30 dark:text-[#00FFB3] 
                         dark:hover:bg-[#00FFB3] dark:hover:text-black 
                         transition"
              title={social.label}
            >
              <social.icon size={20} />
            </a>
          ))}
        </div>

        {/* Outro tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-500 text-sm italic">
            — Mahesh ✍ Always curious, always building.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
