import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import subhanPortrait from '../assets/images/subhan-portrait-enhanced.jpg';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { personalInfo } = PORTFOLIO_DATA;

  const scrollToTop = () => {
    onNavigate('hero');
  };

  const navItems = [
    { label: 'About', id: 'hero' },
    { label: 'Skills', id: 'skills' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <footer className="relative bg-[#080B12] border-t border-white/[0.08] pt-12 pb-8 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[420px] h-32 bg-[#22B8F0]/[0.06] rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-white/[0.08] items-center">
          {/* Brand & Summary */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl overflow-hidden border border-[#22B8F0]/35 bg-[#191C26]">
                <img
                  src={subhanPortrait}
                  alt={personalInfo.name}
                  width={36}
                  height={36}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <span className="text-base font-bold text-[#F8FAFC] tracking-tight">
                  {personalInfo.name}
                  <span className="text-[#22B8F0]">.</span>
                </span>
                <p className="text-[11px] text-[#94A3B8]">{personalInfo.role}</p>
              </div>
            </div>
            <p className="text-xs text-[#94A3B8] max-w-sm leading-relaxed">
              {personalInfo.tagline}
            </p>
          </div>

          {/* Quick Navigation */}
          <nav aria-label="Footer navigation" className="md:col-span-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-[#94A3B8]">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className="hover:text-[#22B8F0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22B8F0] rounded px-1 py-0.5"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Back to Top */}
          <div className="md:col-span-2 flex justify-start md:justify-end">
            <button
              type="button"
              onClick={scrollToTop}
              className="px-4 py-2.5 rounded-full bg-[#191C26] border border-white/[0.08] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#22B8F0]/40 hover:-translate-y-0.5 transition-all flex items-center gap-2 text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22B8F0] active:scale-[0.97]"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#22B8F0]" />
            </button>
          </div>
        </div>

        {/* Bottom Copyright & Social Links */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#94A3B8] gap-4">
          <p>
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#191C26]/70 border border-white/[0.08] hover:border-[#22B8F0]/40 hover:text-[#22B8F0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22B8F0]"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#191C26]/70 border border-white/[0.08] hover:border-[#22B8F0]/40 hover:text-[#22B8F0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22B8F0]"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="p-2 rounded-lg bg-[#191C26]/70 border border-white/[0.08] hover:border-[#22B8F0]/40 hover:text-[#22B8F0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22B8F0]"
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
