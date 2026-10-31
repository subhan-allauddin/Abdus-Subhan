import React from 'react';
import { motion } from 'motion/react';
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  FileText,
  Sparkles,
  Code2,
  Terminal,
  Zap,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import subhanPortrait from '../assets/images/Professional Image.jpg';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { personalInfo } = PORTFOLIO_DATA;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const floatingBadges = [
    { text: 'React 19 & Next.js', icon: <Zap className="w-3.5 h-3.5 text-amber-400" /> },
    { text: 'Tailwind CSS v4', icon: <Code2 className="w-3.5 h-3.5 text-sky-400" /> },
    { text: 'Framer Motion', icon: <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> },
    { text: 'Learning Generative AI', icon: <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> },
  ];

  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6"
          >

            {/* Status */}
            <motion.div variants={itemVariants} className="inline-flex items-center">
              <div className="px-3.5 py-1.5 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/20 text-[#38BDF8] text-xs font-mono uppercase tracking-[0.2em] flex items-center gap-2 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#38BDF8]"></span>
                </span>
                <span>Available for Work</span>
              </div>
            </motion.div>

            {/* Headline + Tagline + Role */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.05]">
                Crafting Digital{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#6366F1]">
                  Masterpieces.
                </span>
              </h1>

              {/* 🔥 Tagline */}
              <p className="text-lg sm:text-xl font-semibold text-white max-w-xl">
                Building high-performance, visually striking web experiences.
              </p>

              {/* Role */}
              <p className="text-base sm:text-lg font-medium text-[#9CA3AF] flex items-center gap-2">
                <span className="text-[#38BDF8]">⚡</span>
                {personalInfo.role}
              </p>
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-[#9CA3AF] max-w-2xl leading-relaxed"
            >
              {personalInfo.bio}
            </motion.p>

            {/* Badges */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2.5 pt-1">
              {floatingBadges.map((badge, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white text-xs font-medium flex items-center gap-1.5 backdrop-blur-sm hover:border-[#38BDF8]/40 transition-colors"
                >
                  {badge.icon}
                  <span>{badge.text}</span>
                </div>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => onNavigate('projects')}
                className="px-6 py-3 rounded-full text-xs font-bold text-black bg-[#38BDF8] hover:bg-cyan-300 shadow-xl shadow-cyan-500/20 transition-all duration-200 flex items-center gap-2 active:scale-95"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3 rounded-full text-xs font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all duration-200 flex items-center gap-2 active:scale-95"
              >
                <Mail className="w-4 h-4 text-[#38BDF8]" />
                <span>Contact Me</span>
              </button>

              <a
                href={personalInfo.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-full text-xs font-medium text-[#9CA3AF] hover:text-white border border-transparent hover:border-white/10 hover:bg-white/5 transition-all duration-200 flex items-center gap-1.5"
              >
                <FileText className="w-4 h-4 text-[#9CA3AF]" />
                <span>Resume</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </motion.div>

          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl flex flex-col items-center">
              <img
                src={subhanPortrait}
                alt={personalInfo.name}
                className="w-full max-w-[320px] object-contain"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};