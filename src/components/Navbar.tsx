import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Sparkles, FileText, Mail } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import subhanPortrait from '../assets/images/Professional Image.jpg';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

// Animation Variants for Drawer Items
const menuVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.25,
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  },
  open: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  closed: { opacity: 0, y: -10 },
  open: { opacity: 1, y: 0 }
};

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: 'hero' },
    { name: 'Skills', href: 'skills' },
    { name: 'Experience', href: 'experience' },
    { name: 'Projects', href: 'projects' },
  ];

  const handleLinkClick = (href: string) => {
    setIsMobileOpen(false);
    onNavigate(href);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-[#090A0F]/80 backdrop-blur-md border-b border-white/10 shadow-2xl py-3'
        : 'bg-transparent py-4 sm:py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Brand Logo */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleLinkClick('hero')}
            className="group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-lg p-1 transition-transform"
            aria-label={`${PORTFOLIO_DATA.personalInfo.name} Home`}
          >
            <div className="flex items-center space-x-2.5">
              <img
                src={subhanPortrait}
                alt={PORTFOLIO_DATA.personalInfo.name}
                className="w-9 h-9 rounded-xl object-cover border border-sky-400/40 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 group-hover:scale-105 transition-all"
              />
              <div className="flex flex-col">
                <span className="text-sm sm:text-base font-semibold tracking-tight text-white group-hover:text-[#38BDF8] transition-colors flex items-center gap-1">
                  {PORTFOLIO_DATA.personalInfo.name}
                </span>
                <span className="text-[9px] sm:text-[10px] text-[#9CA3AF] font-medium -mt-0.5 tracking-widest uppercase">
                  Front End Developer
                </span>
              </div>
            </div>
          </motion.button>

          {/* Nav Links (Visible on Large Tablets & Desktop - `lg:flex`) */}
          <nav className="hidden lg:flex items-center space-x-1 bg-white/5 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href)}
                  className={`px-3.5 xl:px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 relative ${isActive
                    ? 'text-[#38BDF8] font-semibold'
                    : 'text-[#9CA3AF] hover:text-white hover:bg-white/5'
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBackground"
                      className="absolute inset-0 bg-[#38BDF8]/10 border border-[#38BDF8]/30 rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </button>
              );
            })}
          </nav>

          {/* CTA Action Buttons (Desktop & Large Tablets - `lg:flex`) */}
          <div className="hidden lg:flex items-center space-x-2.5 xl:space-x-3">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={PORTFOLIO_DATA.personalInfo.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 text-xs font-medium text-[#9CA3AF] hover:text-white border border-white/10 hover:border-white/20 rounded-full backdrop-blur-sm transition-all duration-200 flex items-center gap-1.5 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <FileText className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Resume</span>
              <ArrowUpRight className="w-3 h-3 text-[#9CA3AF]" />
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleLinkClick('contact')}
              className="px-4 py-2 bg-[#38BDF8] text-black rounded-full font-bold text-xs hover:bg-cyan-400 shadow-lg shadow-cyan-500/20 transition-all duration-200 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>Get in Touch</span>
            </motion.button>
          </div>

          {/* Tablet Quick Action + Menu Toggle (`lg:hidden`) */}
          <div className="lg:hidden flex items-center gap-2 sm:gap-3">
            {/* Quick Resume Link for Tablets */}
            <a
              href={PORTFOLIO_DATA.personalInfo.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[#9CA3AF] hover:text-white border border-white/10 rounded-full bg-white/5 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-sky-400" />
              <span>CV</span>
            </a>

            {/* Mobile / Tablet Drawer Toggle Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              aria-label="Toggle navigation menu"
            >
              <AnimatePresence mode="wait">
                {isMobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Dropdown Drawer (`lg:hidden`) */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="lg:hidden bg-[#090A0F]/95 border-b border-white/10 backdrop-blur-2xl overflow-hidden shadow-2xl"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {navLinks.map((link) => (
                  <motion.button
                    key={link.name}
                    variants={itemVariants}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleLinkClick(link.href)}
                    className={`w-full text-left px-4 py-3 sm:py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${activeSection === link.href
                      ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white border border-transparent'
                      }`}
                  >
                    <span>{link.name}</span>
                    {activeSection === link.href && (
                      <motion.span
                        layoutId="activeDot"
                        className="w-2 h-2 rounded-full bg-sky-400 shadow-sm shadow-sky-400"
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Drawer Bottom Actions */}
              <motion.div
                variants={itemVariants}
                className="pt-4 mt-2 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-2.5"
              >
                <a
                  href={PORTFOLIO_DATA.personalInfo.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-2.5 px-4 rounded-xl text-sm font-medium text-gray-200 border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center gap-2 transition-colors"
                >
                  <FileText className="w-4 h-4 text-sky-400" />
                  <span>View Resume</span>
                  <ArrowUpRight className="w-4 h-4 text-gray-400" />
                </a>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleLinkClick('contact')}
                  className="w-full text-center py-2.5 px-4 rounded-xl text-sm font-semibold text-black bg-[#38BDF8] hover:bg-cyan-400 flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 transition-colors"
                >
                  <Mail className="w-4 h-4 text-black" />
                  <span>Get In Touch</span>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};