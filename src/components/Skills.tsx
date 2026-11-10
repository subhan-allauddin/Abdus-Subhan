import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Code2,
  Database,
  Wrench,
  Sparkles,
  Cpu,
  FileCode2,
  Palette,
  Braces,
  Atom,
  Layers,
  Wind,
  Server,
  Route,
  Webhook,
  GitBranch,
  Smartphone,
  Boxes,
  Terminal,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';

const SKILL_ICON_MAP: Record<string, React.ReactNode> = {
  HTML: <FileCode2 className="w-4 h-4 text-[#22B8F0]" />,
  CSS: <Palette className="w-4 h-4 text-[#22B8F0]" />,
  JavaScript: <Braces className="w-4 h-4 text-[#22B8F0]" />,
  'React.js': <Atom className="w-4 h-4 text-[#22B8F0]" />,
  'Next.js': <Layers className="w-4 h-4 text-[#22B8F0]" />,
  'Tailwind CSS': <Wind className="w-4 h-4 text-[#22B8F0]" />,
  'Node.js': <Server className="w-4 h-4 text-[#A78BFA]" />,
  MongoDB: <Database className="w-4 h-4 text-[#A78BFA]" />,
  'Express.js': <Route className="w-4 h-4 text-[#A78BFA]" />,
  'Next.js API Routes': <Webhook className="w-4 h-4 text-[#A78BFA]" />,
  'Git & GitHub': <GitBranch className="w-4 h-4 text-[#22B8F0]" />,
  'Responsive Design': <Smartphone className="w-4 h-4 text-[#22B8F0]" />,
  'Redux Toolkit': <Boxes className="w-4 h-4 text-[#A78BFA]" />,
  'VS Code & Codex': <Terminal className="w-4 h-4 text-[#22B8F0]" />,
  'Prompt Engineering': <Sparkles className="w-4 h-4 text-[#A78BFA]" />,
};

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const skillsData = PORTFOLIO_DATA.skills;
  const learningTopics = PORTFOLIO_DATA.experience.find(
    (experience) => experience.id === 'exp-generative-ai'
  )?.skills;

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-5 h-5 text-[#22B8F0]" />;
      case 'Database':
        return <Database className="w-5 h-5 text-[#A78BFA]" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-[#22B8F0]" />;
      default:
        return <Cpu className="w-5 h-5 text-[#22B8F0]" />;
    }
  };

  const categories = ['All', ...skillsData.map((group) => group.category)];
  const filteredSkillCategories =
    selectedCategory === 'All'
      ? skillsData
      : skillsData.filter((group) => group.category === selectedCategory);

  return (
    <section id="skills" className="relative overflow-hidden py-20 sm:py-24 bg-[#0D121B]">
      {/* Subtle Top Hairline Divider */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
      {/* Subtle Navy Radial Accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[560px] h-[260px] bg-[#22B8F0]/[0.05] rounded-full blur-[120px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#22B8F0]/10 border border-[#22B8F0]/25 text-[#22B8F0] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Core Skills</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] tracking-tight">
            Skills &amp; Technology Stack
          </h2>
          <p className="text-[#94A3B8] text-sm sm:text-base max-w-xl mx-auto">
            Technologies I use to build fast, scalable, and responsive web applications.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div
          className="flex justify-center flex-wrap gap-2 mb-10"
          role="group"
          aria-label="Filter skills by category"
        >
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                aria-pressed={isActive}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22B8F0] ${
                  isActive
                    ? 'bg-[#22B8F0] text-[#080B12] font-semibold shadow-lg shadow-[#22B8F0]/20'
                    : 'bg-[#191C26] border border-white/[0.08] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Skill Category Cards */}
        <div
          className={`grid gap-6 ${
            filteredSkillCategories.length === 1
              ? 'grid-cols-1 max-w-xl mx-auto'
              : filteredSkillCategories.length === 2
                ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto'
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {filteredSkillCategories.map((group, index) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="group h-full flex flex-col bg-[#191C26] p-5 sm:p-6 rounded-2xl border border-white/[0.08] shadow-xl shadow-black/20 hover:border-[#22B8F0]/35 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between gap-3 mb-5 pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-[#0D121B] border border-white/[0.08] flex items-center justify-center group-hover:border-[#22B8F0]/30 transition-colors">
                    {getCategoryIcon(group.icon)}
                  </div>
                  <h3 className="text-base font-semibold text-[#F8FAFC] truncate">
                    {group.category}
                  </h3>
                </div>
                <span className="shrink-0 px-2.5 py-1 rounded-full bg-[#0D121B] border border-white/[0.08] text-[11px] font-medium text-[#94A3B8]">
                  {group.items.length} skills
                </span>
              </div>

              {/* Skill Items */}
              <div className="space-y-2.5 flex-grow">
                {group.items.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-start gap-3 px-3.5 py-3 rounded-xl bg-[#0D121B]/75 border border-white/[0.06] hover:border-[#22B8F0]/25 hover:bg-[#0D121B] transition-colors"
                  >
                    <div className="w-7 h-7 shrink-0 rounded-lg bg-[#191C26] border border-white/[0.08] flex items-center justify-center mt-0.5">
                      {SKILL_ICON_MAP[skill.name] ?? (
                        <Code2 className="w-4 h-4 text-[#22B8F0]" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#F8FAFC] leading-snug">
                        {skill.name}
                      </p>
                      {skill.description && (
                        <p className="mt-0.5 text-xs leading-relaxed text-[#94A3B8]">
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

        {/* Currently Learning Strip */}
        {learningTopics && learningTopics.length > 0 && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-[#94A3B8] font-medium mr-1">Currently exploring:</span>
            {learningTopics.map((topic) => (
              <span
                key={topic}
                className="px-3 py-1.5 rounded-full bg-[#191C26] border border-[#A78BFA]/25 text-[#A78BFA] font-medium"
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
