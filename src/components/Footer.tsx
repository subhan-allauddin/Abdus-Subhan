import React from 'react';
import { motion } from 'motion/react';
import { ArrowUp, Code, Github, Linkedin, Mail, Heart } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import subhanPortrait from '../assets/images/Professional Image.jpg';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { personalInfo } = PORTFOLIO_DATA;

  const scrollToTop = () => {
    onNavigate('hero');
  };

  return (
    <footer className="relative bg-[#090A0F] border-t border-white/10 pt-12 pb-8 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10 items-center">

          {/* Brand & Tagline */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center space-x-2.5">
              <img
                src={subhanPortrait}
                alt={personalInfo.name}
                className="w-9 h-9 rounded-xl object-cover border border-sky-400/40 shadow-md shadow-cyan-500/20"
              />
              <span className="text-lg font-bold text-white tracking-tight">
                {personalInfo.name}<span className="text-[#38BDF8]">.</span>
              </span>
            </div>
            <p className="text-xs text-[#9CA3AF] max-w-md leading-relaxed">
              Front-End Developer with hands-on internship experience.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-4 flex flex-wrap gap-4 text-xs font-medium text-[#9CA3AF]">
            <button
              onClick={() => onNavigate('hero')}
              className="hover:text-[#38BDF8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded"
            >
              About
            </button>
            <button
              onClick={() => onNavigate('skills')}
              className="hover:text-[#38BDF8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded"
            >
              Skills
            </button>
            <button
              onClick={() => onNavigate('experience')}
              className="hover:text-[#38BDF8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded"
            >
              Experience
            </button>
            <button
              onClick={() => onNavigate('projects')}
              className="hover:text-[#38BDF8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded"
            >
              Projects
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-[#38BDF8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded"
            >
              Contact
            </button>
          </div>

          {/* Back to Top Button */}
          <div className="md:col-span-2 flex justify-start md:justify-end">
            <button
              onClick={scrollToTop}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-[#9CA3AF] hover:text-white hover:border-[#38BDF8]/40 hover:bg-[#38BDF8]/10 transition-all flex items-center gap-2 text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 active:scale-95"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4 text-[#38BDF8]" />
            </button>
          </div>

        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p className="flex items-center gap-1">
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>

          <div className="flex items-center space-x-4">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="hover:text-sky-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
