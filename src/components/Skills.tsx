import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Code2, Database, Wrench, Sparkles, Cpu } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const skillsData = PORTFOLIO_DATA.skills;
  const learningTopics = PORTFOLIO_DATA.experience.find(
    (experience) => experience.id === 'exp-generative-ai'
  )?.skills;

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-5 h-5 text-[#38BDF8]" />;
      case 'Database':
        return <Database className="w-5 h-5 text-[#38BDF8]" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-[#38BDF8]" />;
      default:
        return <Cpu className="w-5 h-5 text-[#38BDF8]" />;
    }
  };

  const categories = ['All', ...skillsData.map((group) => group.category)];
  const filteredSkillCategories =
    selectedCategory === 'All'
      ? skillsData
      : skillsData.filter((group) => group.category === selectedCategory);

  return (
    <section id="skills" className="relative overflow-hidden py-20 bg-[#0D1117]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#38BDF8]/30 to-transparent" />
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/20 text-[#38BDF8] text-xs font-medium uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            Core Skills
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4 tracking-tight">
            Skills & Tech Stack
          </h2>
          <p className="text-[#9CA3AF] mt-2 max-w-xl mx-auto">
            Technologies I use to build fast, scalable, and modern web applications.
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center flex-wrap gap-2 mb-10" aria-label="Filter skills by category">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              aria-pressed={selectedCategory === cat}
              className={`px-4 py-1.5 rounded-full text-sm transition ${selectedCategory === cat
                  ? 'bg-[#38BDF8] text-black shadow-lg shadow-cyan-500/20'
                  : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkillCategories.map((group, index) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-gradient-to-b from-white/[0.06] to-white/[0.025] p-5 sm:p-6 rounded-2xl border border-white/10 shadow-xl shadow-black/10 hover:border-[#38BDF8]/30 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Title */}
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/15 flex items-center justify-center">
                    {getCategoryIcon(group.icon)}
                  </div>
                  <h3 className="text-white font-semibold truncate">{group.category}</h3>
                </div>
                <span className="shrink-0 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium text-[#9CA3AF]">
                  {group.items.length}
                </span>
              </div>

              {/* Skills */}
              <div className="space-y-2.5">
                {group.items.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-start gap-3 px-3.5 py-3 rounded-xl bg-black/15 border border-white/[0.07] hover:bg-white/[0.04] hover:border-white/15 transition-colors"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-[#38BDF8] shadow-[0_0_8px_rgba(56,189,248,0.55)]" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white">{skill.name}</p>
                      {skill.description && (
                        <p className="mt-1 text-xs leading-relaxed text-[#9CA3AF]">
                          {skill.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {learningTopics && learningTopics.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-[#9CA3AF] font-medium">Currently learning:</span>
            {learningTopics.map((topic) => (
              <span
                key={topic}
                className="px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300"
              >
                {topic}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};