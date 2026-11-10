import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';

export const Experience: React.FC = () => {
  const experiences = PORTFOLIO_DATA.experience;

  return (
    <section id="experience" className="py-20 sm:py-24 relative bg-[#080B12] overflow-hidden">
      {/* Subtle Top Hairline Divider */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
      {/* Selective Purple & Navy Radial Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 -left-24 w-[420px] h-[420px] rounded-full bg-[#A78BFA]/[0.07] blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1/4 -right-24 w-[420px] h-[420px] rounded-full bg-[#1E3A8A]/[0.14] blur-[140px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#A78BFA]/10 border border-[#A78BFA]/25 text-[#A78BFA] text-xs font-semibold tracking-wider uppercase">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] tracking-tight">
            Work Experience &amp; Training
          </h2>
          <p className="text-[#94A3B8] text-sm sm:text-base max-w-2xl mx-auto">
            Hands-on frontend development experience and continuous AI engineering training.
          </p>
        </div>

        {/* Responsive Timeline Layout */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Connecting Line (Left-aligned on mobile, centered on md+) */}
          <div
            aria-hidden="true"
            className="absolute left-4 md:left-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-[#22B8F0]/60 via-[#A78BFA]/50 to-transparent md:-translate-x-1/2"
          />

          <div className="space-y-8 md:space-y-10">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              const isInProgress = Boolean(exp.status);

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Node Badge (Visible on Mobile & Desktop) */}
                  <div
                    className={`absolute left-4 md:left-1/2 -translate-x-1/2 top-6 md:top-1/2 md:-translate-y-1/2 w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#080B12] border-2 flex items-center justify-center shadow-lg z-10 ${
                      isInProgress
                        ? 'border-[#A78BFA] text-[#A78BFA] shadow-[#A78BFA]/20'
                        : 'border-[#22B8F0] text-[#22B8F0] shadow-[#22B8F0]/20'
                    }`}
                  >
                    <Briefcase className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </div>

                  {/* Experience Card */}
                  <div className="w-full pl-11 md:pl-0 md:w-[calc(50%-2.25rem)]">
                    <div className="bg-[#191C26] border border-white/[0.08] rounded-2xl p-5 sm:p-6 shadow-xl shadow-black/25 hover:border-[#A78BFA]/35 transition-all duration-300">
                      {/* Role & Status/Period */}
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2.5">
                        <h3 className="text-base sm:text-lg font-bold text-[#F8FAFC] leading-snug">
                          {exp.role}
                        </h3>
                        {exp.status && (
                          <span className="px-2.5 py-0.5 rounded-full bg-[#A78BFA]/15 border border-[#A78BFA]/30 text-[#A78BFA] text-[10px] font-semibold uppercase tracking-wide shrink-0">
                            {exp.status}
                          </span>
                        )}
                      </div>

                      {/* Company, Location & Period */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs mb-3.5">
                        <span className="font-semibold text-[#22B8F0] uppercase tracking-wider">
                          {exp.company}
                        </span>
                        {exp.location && (
                          <span className="text-[#94A3B8] flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#94A3B8]" />
                            {exp.location}
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0D121B] border border-white/[0.08] text-[#F8FAFC]/90 text-[11px] font-mono">
                          <Calendar className="w-3 h-3 text-[#22B8F0]" />
                          {exp.period}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-[#94A3B8] text-xs sm:text-sm leading-relaxed mb-4">
                        {exp.description}
                      </p>

                      {/* Key Deliverables */}
                      {exp.highlights && exp.highlights.length > 0 && (
                        <div className="space-y-2 mb-4 pt-3.5 border-t border-white/[0.08]">
                          <p className="text-xs font-semibold text-[#F8FAFC]">Key Deliverables</p>
                          <ul className="space-y-1.5 text-xs text-[#94A3B8]">
                            {exp.highlights.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#22B8F0] shrink-0 mt-0.5" />
                                <span className="leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Skill Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 rounded-full bg-[#0D121B] border border-white/[0.08] text-[#94A3B8] text-[11px] font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
