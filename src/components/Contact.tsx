import React from 'react';
import { motion } from 'framer-motion';
import {
  Mail, Phone, MapPin,
  Github, Linkedin, Instagram, MessageCircle,
  Globe, BookText, Youtube, Code2
} from 'lucide-react';
import { useTheme } from 'next-themes';

const Contact: React.FC = () => {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  const contactDetails = [
    { icon: Mail, label: 'immahesh300@gmail.com', href: 'mailto:immahesh300@gmail.com' },
    { icon: Phone, label: '+91 9989352994', href: 'tel:+919989352994' },
    { icon: MapPin, label: 'Andhra Pradesh, India', href: '#' },
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/vvdmahesh3' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/vvdmahesh3' },
    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/im_mahesh_362006' },
    { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/919989352994' },
    { icon: Globe, label: 'Dev.to', href: 'https://dev.to/vvdmahesh3' },
    { icon: BookText, label: 'Notion', href: 'https://notion.so' },
  ];

  const futureSocials = [
    { icon: Youtube, label: 'YouTube' },
    { icon: Code2, label: 'LeetCode' },
    { icon: Code2, label: 'HackerRank' },
    { icon: Code2, label: 'CodeChef' },
  ];

  return (
    <section
      id="contact"
      className={`py-20 transition-all duration-500 ${
        isDark
          ? 'bg-black text-white'
          : 'bg-gradient-to-br from-white via-blue-50 to-purple-50 text-black'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Let’s <span className="text-accent">Connect</span>
          </h2>
          <p className="text-lg text-gray-400 dark:text-gray-600 max-w-xl mx-auto">
            Have a project idea, collaboration, or just want to vibe? Reach out directly!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            {contactDetails.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all border ${
                  isDark
                    ? 'bg-dark-200 border-gray-800'
                    : 'bg-white border-gray-200 shadow-md'
                } hover:border-l-4 border-accent`}
              >
                <item.icon size={22} className="text-accent" />
                <span className="text-sm">{item.label}</span>
              </a>
            ))}
          </div>

          <div className="flex flex-col items-start justify-between h-full space-y-6">
            <div className="space-y-2">
              <p className="text-lg text-gray-300 dark:text-gray-600 font-mono">
                ⚡ Let’s build, create, and ship something impactful together.
              </p>
              <p className="text-sm text-gray-500">You can also DM me on socials:</p>
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-dark-300 text-accent flex items-center justify-center hover:scale-110 hover:bg-accent hover:text-black transition-all"
                  title={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>

            <div className="mt-4">
              <p className="text-xs text-gray-500 mb-2">🚧 Platforms I’ll add soon:</p>
              <div className="flex flex-wrap gap-3 opacity-40">
                {futureSocials.map((item, idx) => (
                  <div
                    key={idx}
                    className="w-10 h-10 rounded-full bg-dark-300 text-gray-500 flex items-center justify-center cursor-not-allowed"
                    title={`${item.label} – Coming soon`}
                  >
                    <item.icon size={20} />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
