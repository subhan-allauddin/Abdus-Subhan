import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, FileText, Mail } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import subhanPortrait from '../assets/images/subhan-portrait-enhanced.jpg';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

const menuVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.22,
      when: 'afterChildren',
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
  open: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.28,
      when: 'beforeChildren',
      staggerChildren: 0.04,
    },
  },
};

const itemVariants = {
  closed: { opacity: 0, y: -8 },
  open: { opacity: 1, y: 0 },
};

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile navigation drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileOpen]);

  const navLinks = [
    { name: 'About', href: 'hero' },
    { name: 'Skills', href: 'skills' },
    { name: 'Experience', href: 'experience' },
    { name: 'Projects', href: 'projects' },
    { name: 'Contact', href: 'contact' },
  ];

  const handleLinkClick = (href: string) => {
    setIsMobileOpen(false);
    onNavigate(href);
  };

  return (
    <motion.header
      initial={{ y: -12 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080B12]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-xl shadow-black/30 py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <button
            type="button"
            onClick={() => handleLinkClick('hero')}
            className="group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22B8F0] rounded-xl p-1 -ml-1 transition-transform active:scale-[0.98]"
            aria-label={`${PORTFOLIO_DATA.personalInfo.name} Home`}
          >
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-[#22B8F0]/35 bg-[#191C26] shadow-md shadow-[#22B8F0]/10 group-hover:border-[#22B8F0]/70 transition-colors">
                <img
                  src={subhanPortrait}
                  alt={PORTFOLIO_DATA.personalInfo.name}
                  width={36}
                  height={36}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm sm:text-[15px] font-semibold tracking-tight text-[#F8FAFC] group-hover:text-[#22B8F0] transition-colors">
                  {PORTFOLIO_DATA.personalInfo.name}
                </span>
                <span className="text-[10px] text-[#94A3B8] font-medium tracking-[0.14em] uppercase">
                  {PORTFOLIO_DATA.personalInfo.role}
                </span>
              </div>
            </div>
          </button>

          {/* Desktop Navigation Pill */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-1 bg-[#0D121B]/85 p-1.5 rounded-full border border-white/[0.08] backdrop-blur-md"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <button
                  key={link.name}
                  type="button"
                  onClick={() => handleLinkClick(link.href)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`px-3.5 xl:px-4 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22B8F0] ${
                    isActive
                      ? 'text-[#22B8F0] font-semibold'
                      : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/[0.04]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBackground"
                      className="absolute inset-0 bg-[#22B8F0]/12 border border-[#22B8F0]/30 rounded-full"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-2.5">
            <a
              href={PORTFOLIO_DATA.personalInfo.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 text-xs font-medium text-[#94A3B8] hover:text-[#F8FAFC] bg-[#191C26]/70 hover:bg-[#191C26] border border-white/[0.08] hover:border-white/20 rounded-full transition-all duration-200 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22B8F0]"
            >
              <FileText className="w-3.5 h-3.5 text-[#22B8F0]" />
              <span>Resume</span>
              <ArrowUpRight className="w-3 h-3 text-[#94A3B8]" />
            </a>

            <button
              type="button"
              onClick={() => handleLinkClick('contact')}
              className="px-4 py-2 bg-[#22B8F0] hover:bg-[#38C4F5] text-[#080B12] rounded-full font-semibold text-xs shadow-lg shadow-[#22B8F0]/20 transition-all duration-200 flex items-center gap-1.5 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22B8F0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080B12]"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Get in Touch</span>
            </button>
          </div>

          {/* Mobile & Tablet Actions */}
          <div className="lg:hidden flex items-center gap-2 sm:gap-3">
            <a
              href={PORTFOLIO_DATA.personalInfo.resume}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Resume"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-medium text-[#94A3B8] hover:text-[#F8FAFC] border border-white/[0.08] hover:border-white/20 rounded-full bg-[#191C26]/80 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-[#22B8F0]" />
              <span className="hidden sm:inline">Resume</span>
            </a>

            <button
              type="button"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-expanded={isMobileOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={isMobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="p-2 rounded-xl bg-[#191C26] border border-white/[0.08] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22B8F0]"
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Dropdown Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            id="mobile-nav-drawer"
            role="region"
            aria-label="Mobile Navigation Drawer"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="lg:hidden bg-[#080B12]/95 border-b border-white/[0.08] backdrop-blur-2xl overflow-hidden shadow-2xl"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href;
                  return (
                    <motion.button
                      key={link.name}
                      type="button"
                      variants={itemVariants}
                      onClick={() => handleLinkClick(link.href)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                        isActive
                          ? 'bg-[#22B8F0]/12 text-[#22B8F0] border border-[#22B8F0]/30'
                          : 'text-[#94A3B8] hover:bg-[#191C26] hover:text-[#F8FAFC] border border-transparent'
                      }`}
                    >
                      <span>{link.name}</span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-[#22B8F0]" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <motion.div
                variants={itemVariants}
                className="pt-3 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-2.5"
              >
                <a
                  href={PORTFOLIO_DATA.personalInfo.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl text-sm font-medium text-[#F8FAFC] border border-white/[0.08] bg-[#191C26] hover:border-white/20 flex items-center justify-center gap-2 transition-colors"
                >
                  <FileText className="w-4 h-4 text-[#22B8F0]" />
                  <span>View Resume</span>
                  <ArrowUpRight className="w-4 h-4 text-[#94A3B8]" />
                </a>

                <button
                  type="button"
                  onClick={() => handleLinkClick('contact')}
                  className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-[#080B12] bg-[#22B8F0] hover:bg-[#38C4F5] flex items-center justify-center gap-2 shadow-lg shadow-[#22B8F0]/20 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Get In Touch</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
