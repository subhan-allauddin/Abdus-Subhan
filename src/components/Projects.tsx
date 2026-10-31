import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github, Star, Sparkles, FolderGit2, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../data/portfolio';

export const Projects: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const allProjects = PORTFOLIO_DATA.projects;

  const tags = ['All', 'Next.js', 'MongoDB', 'TypeScript', 'Tailwind'];

  const filteredProjects = selectedTag === 'All'
    ? allProjects
    : allProjects.filter((project) =>
        project.tags.some((tag) =>
          tag === selectedTag || (selectedTag === 'Tailwind' && tag === 'Tailwind CSS')
        )
      );

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/20 text-[#38BDF8] text-xs font-semibold tracking-widest uppercase">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Featured Works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Crafted Software Projects
          </h2>
          <p className="text-[#9CA3AF] text-base max-w-2xl mx-auto">
            Projects I have built while learning and practicing.
          </p>
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                selectedTag === tag
                  ? 'bg-[#38BDF8] text-black font-bold shadow-lg shadow-cyan-500/20'
                  : 'bg-white/5 text-[#9CA3AF] hover:bg-white/10 border border-white/10 hover:text-white'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm shadow-2xl hover:border-[#38BDF8]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Background Accent Glow on Hover */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#38BDF8]/10 rounded-full blur-3xl group-hover:bg-[#38BDF8]/20 transition-all duration-500 pointer-events-none" />

              <div>
                {/* Header with Title & Badges */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    {project.featured && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#38BDF8] bg-[#38BDF8]/10 border border-[#38BDF8]/20 px-2.5 py-0.5 rounded-full mb-2 uppercase tracking-wider">
                        <Sparkles className="w-3 h-3" /> Featured Project
                      </span>
                    )}
                    {project.status && (
                      <span className="inline-flex items-center text-[10px] font-bold text-emerald-300 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-0.5 rounded-full mb-2 uppercase tracking-wider">
                        {project.status}
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-white group-hover:text-[#38BDF8] transition-colors flex items-center gap-2">
                      {project.title}
                    </h3>
                  </div>

                  {project.stars !== undefined && (
                    <div className="flex items-center gap-1 text-xs font-mono text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20 shrink-0">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{project.stars}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-[#9CA3AF] text-xs sm:text-sm leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[11px] font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links Footer */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-medium text-[#9CA3AF] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-md p-1"
                  >
                    <Github className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#38BDF8] transition-colors" />
                    <span>View Repository</span>
                  </a>
                ) : (
                  <span className="text-xs text-[#9CA3AF]">Links will be added after completion.</span>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-black bg-[#38BDF8] hover:bg-cyan-300 px-4 py-2 rounded-full transition-all shadow-md shadow-cyan-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-black" />
                  </a>
                )}
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
