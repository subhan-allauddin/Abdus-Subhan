import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Linkedin,
  Github,
  FileText,
  MapPin,
  Clock,
  Sparkles,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';

export const Contact: React.FC = () => {
  const { personalInfo } = PORTFOLIO_DATA;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Live Field Validation States
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(formData.email.trim());
  const showNameError = touched.name && !formData.name.trim();
  const showEmailError =
    touched.email && (!formData.email.trim() || !isEmailValid);
  const showMessageError = touched.message && !formData.message.trim();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field: 'name' | 'email' | 'message') => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (!isEmailValid) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseBody = await res.text();
      let data: { success?: boolean; error?: string; message?: string };

      try {
        data = JSON.parse(responseBody);
      } catch {
        throw new Error(
          `The server returned an invalid response (HTTP ${res.status}). Please try again later.`
        );
      }

      if (!res.ok) {
        throw new Error(data.error || `Request failed (HTTP ${res.status}). Please try again.`);
      }

      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTouched({ name: false, email: false, message: false });

        setTimeout(() => {
          setStatus('idle');
        }, 5000);
      } else {
        throw new Error(data.error || 'Failed to send message.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Failed to send message.');
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-24 relative bg-[#080B12] overflow-hidden">
      {/* Subtle Top Hairline Divider */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
      {/* Selective Purple & Blue Radial Background Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-20 right-1/4 w-[440px] h-[440px] rounded-full bg-[#A78BFA]/[0.07] blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 left-1/4 w-[420px] h-[420px] rounded-full bg-[#22B8F0]/[0.05] blur-[140px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#A78BFA]/10 border border-[#A78BFA]/25 text-[#A78BFA] text-xs font-semibold tracking-wider uppercase">
            <Mail className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] tracking-tight">
            Let&apos;s Build Something Exceptional
          </h2>
          <p className="text-[#94A3B8] text-sm sm:text-base max-w-2xl mx-auto">
            Whether you have a project idea, an open frontend role, or want to collaborate — feel free to reach out.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Contact Information & Socials */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-5"
          >
            <div className="bg-[#191C26] border border-white/[0.08] rounded-2xl p-6 sm:p-7 shadow-xl shadow-black/25 space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-bold text-[#F8FAFC] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#22B8F0]" />
                  <span>Contact Information</span>
                </h3>
                <p className="text-xs text-[#94A3B8]">
                  Direct channels to reach me for roles, freelance work, or technical discussions.
                </p>
              </div>

              {/* Direct Info List */}
              <div className="space-y-3.5">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="p-4 rounded-xl bg-[#0D121B]/85 border border-white/[0.08] hover:border-[#22B8F0]/40 transition-all flex items-center gap-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22B8F0]"
                >
                  <div className="p-3 rounded-xl bg-[#22B8F0]/10 text-[#22B8F0] group-hover:bg-[#22B8F0] group-hover:text-[#080B12] transition-colors shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] text-[#94A3B8] block font-medium">Direct Email</span>
                    <span className="text-sm font-semibold text-[#F8FAFC] group-hover:text-[#22B8F0] transition-colors truncate block">
                      {personalInfo.email}
                    </span>
                  </div>
                </a>

                <div className="p-4 rounded-xl bg-[#0D121B]/85 border border-white/[0.08] flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-[#A78BFA]/10 text-[#A78BFA] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#94A3B8] block font-medium">Location</span>
                    <span className="text-sm font-semibold text-[#F8FAFC]">
                      {personalInfo.location}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0D121B]/85 border border-white/[0.08] flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#94A3B8] block font-medium">Response Time</span>
                    <span className="text-sm font-semibold text-[#F8FAFC]">
                      Within 24 Hours
                    </span>
                  </div>
                </div>
              </div>

              {/* Social & Resume Buttons */}
              <div className="pt-4 border-t border-white/[0.08]">
                <span className="text-xs text-[#94A3B8] block mb-3 font-medium">
                  Connect Across Networks
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-[#0D121B] border border-white/[0.08] hover:border-[#22B8F0]/40 text-[#94A3B8] hover:text-[#F8FAFC] transition-all text-xs font-medium flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22B8F0]"
                  >
                    <Github className="w-4 h-4 text-[#22B8F0]" />
                    <span>GitHub</span>
                  </a>

                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-[#0D121B] border border-white/[0.08] hover:border-[#22B8F0]/40 text-[#94A3B8] hover:text-[#F8FAFC] transition-all text-xs font-medium flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22B8F0]"
                  >
                    <Linkedin className="w-4 h-4 text-[#22B8F0]" />
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href={personalInfo.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-[#0D121B] border border-white/[0.08] hover:border-[#A78BFA]/40 text-[#94A3B8] hover:text-[#F8FAFC] transition-all text-xs font-medium flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22B8F0]"
                  >
                    <FileText className="w-4 h-4 text-[#A78BFA]" />
                    <span>Resume</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Interactive Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-7"
          >
            <div className="bg-[#191C26] border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-xl shadow-black/25">
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <label
                        htmlFor="contact-name"
                        className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider"
                      >
                        Your Name <span className="text-[#22B8F0]">*</span>
                      </label>
                      {showNameError && (
                        <span className="text-[11px] text-rose-400 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3 h-3" /> Name is required
                        </span>
                      )}
                    </div>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={() => handleBlur('name')}
                      placeholder="Your full name"
                      className={`w-full px-4 py-3 rounded-xl bg-[#0D121B] text-[#F8FAFC] placeholder-[#64748B] text-sm focus:outline-none focus:ring-2 transition-all ${
                        showNameError
                          ? 'border border-rose-500 focus:ring-rose-500/25'
                          : 'border border-white/10 focus:border-[#22B8F0] focus:ring-[#22B8F0]/20'
                      }`}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <label
                        htmlFor="contact-email"
                        className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider"
                      >
                        Email Address <span className="text-[#22B8F0]">*</span>
                      </label>
                      {showEmailError && (
                        <span className="text-[11px] text-rose-400 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3 h-3" />{' '}
                          {!formData.email.trim() ? 'Email is required' : 'Invalid email'}
                        </span>
                      )}
                    </div>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={() => handleBlur('email')}
                      placeholder="you@example.com"
                      className={`w-full px-4 py-3 rounded-xl bg-[#0D121B] text-[#F8FAFC] placeholder-[#64748B] text-sm focus:outline-none focus:ring-2 transition-all ${
                        showEmailError
                          ? 'border border-rose-500 focus:ring-rose-500/25'
                          : 'border border-white/10 focus:border-[#22B8F0] focus:ring-[#22B8F0]/20'
                      }`}
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label
                    htmlFor="contact-subject"
                    className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider block"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry / Job Opportunity"
                    className="w-full px-4 py-3 rounded-xl bg-[#0D121B] border border-white/10 text-[#F8FAFC] placeholder-[#64748B] text-sm focus:outline-none focus:border-[#22B8F0] focus:ring-2 focus:ring-[#22B8F0]/20 transition-all"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <label
                      htmlFor="contact-message"
                      className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider block"
                    >
                      Message <span className="text-[#22B8F0]">*</span>
                    </label>
                    {showMessageError && (
                      <span className="text-[11px] text-rose-400 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3" /> Message is required
                      </span>
                    )}
                  </div>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={() => handleBlur('message')}
                    placeholder="Tell me about your project, timeline, or opportunity..."
                    className={`w-full px-4 py-3 rounded-xl bg-[#0D121B] text-[#F8FAFC] placeholder-[#64748B] text-sm focus:outline-none focus:ring-2 transition-all resize-none ${
                      showMessageError
                        ? 'border border-rose-500 focus:ring-rose-500/25'
                        : 'border border-white/10 focus:border-[#22B8F0] focus:ring-[#22B8F0]/20'
                    }`}
                  />
                </div>

                {/* Error Banner */}
                {status === 'error' && errorMessage && (
                  <div
                    role="alert"
                    className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className={`w-full py-3.5 px-6 rounded-xl text-xs sm:text-sm font-bold tracking-wide text-[#080B12] transition-all duration-200 flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22B8F0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#191C26] ${
                    status === 'success'
                      ? 'bg-emerald-400 shadow-emerald-500/20'
                      : 'bg-gradient-to-r from-[#22B8F0] to-[#38BDF8] hover:brightness-110 shadow-[#22B8F0]/20'
                  } disabled:opacity-80 disabled:cursor-not-allowed`}
                >
                  {status === 'loading' && (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  )}

                  {status === 'success' && (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Message Sent Successfully!</span>
                    </>
                  )}

                  {(status === 'idle' || status === 'error') && (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
