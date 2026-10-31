import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Calendar, MapPin, ChevronRight, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';

export const Experience: React.FC = () => {
  const experiences = PORTFOLIO_DATA.experience;

  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/20 text-[#38BDF8] text-xs font-semibold tracking-widest uppercase">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Work Experience
          </h2>
          <p className="text-[#9CA3AF] text-base max-w-2xl mx-auto">
            My learning and hands-on experience so far.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Timeline Bar */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#38BDF8] via-[#6366F1] to-transparent -translate-x-1/2 opacity-30 hidden sm:block" />

          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`relative flex flex-col sm:flex-row items-center ${isEven ? 'sm:flex-row-reverse' : ''
                    }`}
                >
                  {/* Timeline Node Badge */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#090A0F] border-2 border-[#38BDF8] text-[#38BDF8] flex items-center justify-center shadow-lg shadow-cyan-500/30 z-10 hidden sm:flex">
                    <Briefcase className="w-4 h-4" />
                  </div>

                  {/* Experience Content Box */}
                  <div className="w-full sm:w-[calc(50%-2.5rem)]">
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm shadow-2xl hover:border-[#38BDF8]/30 transition-all duration-300">

                      {/* Period Pill & Company */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="text-lg font-bold text-white flex items-center gap-2">
                          {exp.role}
                        </span>
                        <div className="flex flex-wrap items-center gap-2">
                          {exp.status && (
                            <span className="px-2.5 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-300 text-[10px] font-semibold">
                              {exp.status}
                            </span>
                          )}
                          <div className="px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-mono font-medium flex items-center gap-1.5">
                            <Calendar className="w-3 h-3 text-[#38BDF8]" />
                            <span>{exp.period}</span>
                          </div>
                        </div>
                      </div>

                      {/* Company Name & Location */}
                      <div className="text-xs font-semibold text-[#38BDF8] uppercase tracking-wider mb-3 flex items-center gap-3">
                        <span>{exp.company}</span>
                        {exp.location && (
                          <span className="text-xs font-normal text-[#9CA3AF] flex items-center gap-1 normal-case">
                            <MapPin className="w-3 h-3 text-[#9CA3AF]" />
                            {exp.location}
                          </span>
                        )}
                      </div>

                      {/* Role Summary Description */}
                      <p className="text-[#9CA3AF] text-xs sm:text-sm leading-relaxed mb-4">
                        {exp.description}
                      </p>

                      {/* Key Achievement Highlights */}
                      {exp.highlights && exp.highlights.length > 0 && (
                        <div className="space-y-2 mb-4 pt-3 border-t border-white/10">
                          <p className="text-xs font-semibold text-white">Key Deliverables:</p>
                          <ul className="space-y-1.5 text-xs text-[#9CA3AF]">
                            {exp.highlights.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#38BDF8] shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Skill Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[11px] font-medium"
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
