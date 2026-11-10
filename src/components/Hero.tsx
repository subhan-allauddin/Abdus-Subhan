import React from 'react';
import { motion } from 'motion/react';
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  FileText,
  ExternalLink,
  MapPin,
  Code2,
  Layers,
  Sparkles,
  Zap,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import subhanPortrait from '../assets/images/subhan-portrait-enhanced.jpg';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { personalInfo } = PORTFOLIO_DATA;

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 1, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  const coreHighlights = [
    { text: 'React.js & Next.js', icon: <Zap className="w-3.5 h-3.5 text-[#22B8F0]" /> },
    { text: 'Tailwind CSS', icon: <Code2 className="w-3.5 h-3.5 text-[#22B8F0]" /> },
    { text: 'Responsive UI', icon: <Layers className="w-3.5 h-3.5 text-[#A78BFA]" /> },
    { text: 'Learning Generative AI', icon: <Sparkles className="w-3.5 h-3.5 text-[#A78BFA]" /> },
  ];

  return (
    <section
      id="hero"
      className="relative bg-[#080B12] pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 overflow-hidden"
    >
      {/* Subtle Navy & Blue Ambient Radial Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/4 w-[520px] h-[520px] rounded-full bg-[#22B8F0]/[0.06] blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 right-0 w-[460px] h-[460px] rounded-full bg-[#1E3A8A]/[0.14] blur-[140px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Availability Status Pill */}
            <motion.div variants={itemVariants} className="inline-flex items-center justify-center lg:justify-start">
              <div className="px-3.5 py-1.5 rounded-full bg-[#22B8F0]/10 border border-[#22B8F0]/25 text-[#22B8F0] text-xs font-medium tracking-wide flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22B8F0] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22B8F0]" />
                </span>
                <span>Available for Frontend Opportunities</span>
              </div>
            </motion.div>

            {/* Name, Headline & Role */}
            <motion.div variants={itemVariants} className="space-y-3.5">
              <p className="text-sm sm:text-base font-medium text-[#94A3B8]">
                Hi, I&apos;m{' '}
                <span className="text-[#F8FAFC] font-semibold whitespace-nowrap">{personalInfo.name}</span>
                <span className="mx-2 text-white/20 hidden sm:inline">•</span>
                <span className="block sm:inline text-[#22B8F0] font-medium mt-0.5 sm:mt-0">
                  {personalInfo.role}
                </span>
              </p>

              <h1 className="text-3xl sm:text-5xl lg:text-[3.4rem] font-bold tracking-tight text-[#F8FAFC] leading-[1.1]">
                Crafting Clean,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22B8F0] via-[#60A5FA] to-[#A78BFA]">
                  Modern Web
                </span>{' '}
                Experiences.
              </h1>

              <p className="text-base sm:text-lg font-medium text-[#F8FAFC]/90 max-w-xl mx-auto lg:mx-0">
                {personalInfo.tagline}
              </p>
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-[#94A3B8] max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              {personalInfo.bio}
            </motion.p>

            {/* Core Stack Highlights */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center lg:justify-start gap-2 pt-1"
            >
              {coreHighlights.map((item) => (
                <div
                  key={item.text}
                  className="px-3 py-1.5 rounded-full bg-[#191C26] border border-white/[0.08] text-[#F8FAFC]/90 text-xs font-medium flex items-center gap-1.5 hover:border-[#22B8F0]/35 transition-colors"
                >
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>

            {/* Primary & Secondary CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2"
            >
              <button
                type="button"
                onClick={() => onNavigate('projects')}
                className="px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-[#080B12] bg-[#22B8F0] hover:bg-[#38C4F5] shadow-lg shadow-[#22B8F0]/20 transition-all duration-200 flex items-center gap-2 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22B8F0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080B12]"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-[#F8FAFC] bg-[#191C26] hover:bg-[#1F2432] border border-white/10 hover:border-[#22B8F0]/40 transition-all duration-200 flex items-center gap-2 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22B8F0]"
              >
                <Mail className="w-4 h-4 text-[#22B8F0]" />
                <span>Contact Me</span>
              </button>

              <a
                href={personalInfo.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-full text-xs sm:text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] border border-white/[0.08] hover:border-white/20 bg-white/[0.02] hover:bg-[#191C26] transition-all duration-200 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22B8F0]"
              >
                <FileText className="w-4 h-4 text-[#22B8F0]" />
                <span>Resume</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </motion.div>

            {/* Quick Facts & Social Links */}
            <motion.div
              variants={itemVariants}
              className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-center lg:justify-between gap-4 text-xs text-[#94A3B8]"
            >
              <div className="flex flex-wrap items-center justify-center gap-5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[#F8FAFC]">{personalInfo.projectsCompleted}</span>
                  <span>Projects Built</span>
                </div>
                <span className="h-3.5 w-px bg-white/10 hidden sm:inline-block" />
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#22B8F0]" />
                  <span>{personalInfo.location}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="p-2 rounded-full bg-[#191C26] border border-white/[0.08] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#22B8F0]/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22B8F0]"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="p-2 rounded-full bg-[#191C26] border border-white/[0.08] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#22B8F0]/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22B8F0]"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Portrait Presentation */}
          <motion.div
            initial={{ scale: 0.98, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[400px] group">
              {/* Soft Blue Radial Glow Behind Portrait */}
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-[2rem] bg-radial from-[#22B8F0]/20 via-[#1E3A8A]/10 to-transparent blur-2xl opacity-75 group-hover:opacity-95 transition-opacity duration-500 pointer-events-none"
              />

              {/* Outer Card Frame */}
              <div className="relative bg-[#191C26]/95 border border-white/10 group-hover:border-[#22B8F0]/35 rounded-3xl p-3.5 sm:p-4 shadow-2xl shadow-black/50 transition-colors duration-300">
                {/* Inner Portrait Container */}
                <div className="relative rounded-2xl overflow-hidden bg-[#0D121B] border border-white/[0.08] aspect-square">
                  <img
                    src={subhanPortrait}
                    alt={`${personalInfo.name} — ${personalInfo.role}`}
                    width={960}
                    height={960}
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                  />
                  {/* Subtle bottom vignette to blend seamlessly */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#080B12]/60 to-transparent"
                  />
                </div>

                {/* Clean Identity Strip */}
                <div className="mt-3 px-1.5 flex items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-semibold text-[#F8FAFC]">{personalInfo.name}</p>
                    <p className="text-[11px] text-[#94A3B8]">{personalInfo.role}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0D121B] border border-white/[0.08] text-[10px] font-medium text-[#22B8F0]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22B8F0]" />
                    Open to Work
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
