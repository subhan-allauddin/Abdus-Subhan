import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Github, Star, Sparkles, FolderGit2, ArrowUpRight, Clock } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';

export const Projects: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const allProjects = PORTFOLIO_DATA.projects;

  const tags = [
    'All',
    'Next.js',
    'React',
    'JavaScript',
    'TypeScript',
    'Tailwind',
    'Bootstrap',
    'Generative AI',
  ];

  const filteredProjects =
    selectedTag === 'All'
      ? allProjects
      : allProjects.filter((project) =>
          project.tags.some(
            (tag) =>
              tag.toLowerCase() === selectedTag.toLowerCase() ||
              (selectedTag === 'Tailwind' && tag.toLowerCase().includes('tailwind'))
          )
        );

  return (
    <section id="projects" className="py-20 sm:py-24 relative bg-[#0D121B] overflow-hidden">
      {/* Subtle Top Hairline Divider */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
      {/* Subtle Blue Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-12 right-1/4 w-[460px] h-[280px] rounded-full bg-[#22B8F0]/[0.05] blur-[130px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#22B8F0]/10 border border-[#22B8F0]/25 text-[#22B8F0] text-xs font-semibold tracking-wider uppercase">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Featured Works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] tracking-tight">
            Crafted Software Projects
          </h2>
          <p className="text-[#94A3B8] text-sm sm:text-base max-w-2xl mx-auto">
            Projects I have built while learning, practicing, and exploring modern web architecture.
          </p>
        </div>

        {/* Tag Filters */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-10"
          role="group"
          aria-label="Filter projects by technology"
        >
          {tags.map((tag) => {
            const isActive = selectedTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                aria-pressed={isActive}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22B8F0] ${
                  isActive
                    ? 'bg-[#22B8F0] text-[#080B12] font-semibold shadow-lg shadow-[#22B8F0]/20'
                    : 'bg-[#191C26] text-[#94A3B8] hover:text-[#F8FAFC] border border-white/[0.08] hover:border-white/20'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
              className="group relative h-full bg-[#191C26] border border-white/[0.08] rounded-2xl p-6 shadow-xl shadow-black/25 hover:border-[#22B8F0]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Subtle Corner Glow on Hover */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-20 -right-20 w-40 h-40 bg-[#22B8F0]/[0.08] rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />

              <div className="relative z-10">
                {/* Status / Featured Badges */}
                <div className="flex items-center justify-between gap-3 mb-3 min-h-[24px]">
                  <div className="flex flex-wrap items-center gap-2">
                    {project.featured && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#22B8F0] bg-[#22B8F0]/10 border border-[#22B8F0]/25 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        <Sparkles className="w-3 h-3" />
                        Featured
                      </span>
                    )}
                    {project.status && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#A78BFA] bg-[#A78BFA]/10 border border-[#A78BFA]/25 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        <Clock className="w-3 h-3" />
                        {project.status}
                      </span>
                    )}
                    {!project.featured && !project.status && (
                      <span className="inline-flex items-center text-[10px] font-medium text-[#94A3B8] bg-[#0D121B] border border-white/[0.08] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        Project
                      </span>
                    )}
                  </div>

                  {project.stars !== undefined && (
                    <div className="flex items-center gap-1 text-xs font-mono text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20 shrink-0">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{project.stars}</span>
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-[#F8FAFC] group-hover:text-[#22B8F0] transition-colors mb-2.5">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-[#94A3B8] text-xs sm:text-sm leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full bg-[#0D121B] border border-white/[0.08] text-[#94A3B8] text-[11px] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Footer */}
              <div className="relative z-10 pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#94A3B8] hover:text-[#F8FAFC] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22B8F0] rounded-lg px-2 py-1.5 -ml-2 hover:bg-white/[0.04]"
                  >
                    <Github className="w-4 h-4 text-[#94A3B8] group-hover:text-[#22B8F0] transition-colors" />
                    <span>GitHub</span>
                  </a>
                ) : (
                  <span className="text-xs text-[#94A3B8]">Repository coming soon</span>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#080B12] bg-[#22B8F0] hover:bg-[#38C4F5] px-4 py-2 rounded-full transition-all shadow-md shadow-[#22B8F0]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22B8F0]"
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
