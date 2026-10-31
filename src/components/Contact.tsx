import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  Sparkles
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
    email: false,
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Live Email Regex Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(formData.email);
  const showEmailError = touched.email && formData.email.length > 0 && !isEmailValid;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseBody = await res.text();
      let data: { success?: boolean; error?: string; message?: string };

      try {
        data = JSON.parse(responseBody);
      } catch {
        throw new Error(`The server returned an invalid response (HTTP ${res.status}). Please try again later.`);
      }

      if (!res.ok) {
        throw new Error(data.error || `Request failed (HTTP ${res.status}). Please try again.`);
      }

      if (data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTouched({ email: false });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setStatus('idle');
        }, 5000);
      } else {
        throw new Error(data.error || 'Failed to send message.');
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Failed to send message.");
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/20 text-[#38BDF8] text-xs font-semibold tracking-widest uppercase">
            <Mail className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Let's Build Something Exceptional
          </h2>
          <p className="text-[#9CA3AF] text-base max-w-2xl mx-auto">
            Whether you have a groundbreaking product idea, an open position, or just want to discuss modern frontend architecture — my inbox is always open.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Contact Information & Socials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm shadow-2xl space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#38BDF8]" />
                Contact Information
              </h3>

              {/* Direct Info List */}
              <div className="space-y-4">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#38BDF8]/30 transition-all flex items-center space-x-4 group"
                >
                  <div className="p-3 rounded-xl bg-[#38BDF8]/10 text-[#38BDF8] group-hover:bg-[#38BDF8] group-hover:text-black transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-[#9CA3AF] block font-medium">Direct Email</span>
                    <span className="text-sm font-semibold text-white group-hover:text-[#38BDF8] transition-colors">
                      {personalInfo.email}
                    </span>
                  </div>
                </a>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center space-x-4">
                  <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-[#9CA3AF] block font-medium">Location</span>
                    <span className="text-sm font-semibold text-white">
                      {personalInfo.location}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center space-x-4">
                  <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-[#9CA3AF] block font-medium">Response Guarantee</span>
                    <span className="text-sm font-semibold text-white">
                      Within 24 Hours
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Link Buttons */}
              <div className="pt-4 border-t border-white/10">
                <span className="text-xs text-[#9CA3AF] block mb-3 font-medium">Connect Across Networks</span>
                <div className="grid grid-cols-3 gap-2.5">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-[#38BDF8]/40 hover:bg-[#38BDF8]/10 text-[#9CA3AF] hover:text-white transition-all text-xs font-medium flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                  >
                    <Github className="w-4 h-4 text-[#38BDF8]" />
                    <span>GitHub</span>
                  </a>

                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-[#38BDF8]/40 hover:bg-[#38BDF8]/10 text-[#9CA3AF] hover:text-white transition-all text-xs font-medium flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                  >
                    <Linkedin className="w-4 h-4 text-[#38BDF8]" />
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href={personalInfo.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-[#38BDF8]/40 hover:bg-[#38BDF8]/10 text-[#9CA3AF] hover:text-white transition-all text-xs font-medium flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                  >
                    <FileText className="w-4 h-4 text-[#38BDF8]" />
                    <span>Resume</span>
                  </a>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right Interactive Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-sm shadow-2xl">

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                      Your Name <span className="text-[#38BDF8]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition-all"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor="contact-email" className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                        Email Address <span className="text-[#38BDF8]">*</span>
                      </label>
                      {showEmailError && (
                        <span className="text-[11px] text-rose-400 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3 h-3" /> Invalid Email
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
                      placeholder="alex@company.com"
                      className={`w-full px-4 py-3 rounded-2xl bg-white/5 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-1 transition-all ${showEmailError
                        ? 'border border-rose-500 focus:ring-rose-400'
                        : 'border border-white/10 focus:border-[#38BDF8] focus:ring-[#38BDF8]'
                        }`}
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-subject" className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry / Job Opportunity"
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition-all"
                  />
                </div>

                {/* Message Textarea */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                    Message <span className="text-[#38BDF8]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, timeline, or requirements..."
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition-all resize-none"
                  />
                </div>

                {/* Error Banner */}
                {status === 'error' && errorMessage && (
                  <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className={`w-full py-3.5 px-6 rounded-full text-xs font-bold uppercase tracking-widest text-black transition-all duration-200 flex items-center justify-center gap-2 shadow-xl active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${status === 'success'
                    ? 'bg-emerald-500 text-black shadow-emerald-500/25'
                    : 'bg-[#38BDF8] hover:bg-cyan-300 shadow-cyan-500/20'
                    } disabled:opacity-80 disabled:cursor-not-allowed`}
                >
                  {status === 'loading' && (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      <span>Sending Message...</span>
                    </>
                  )}

                  {status === 'success' && (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-black" />
                      <span>Message Sent Successfully!</span>
                    </>
                  )}

                  {(status === 'idle' || status === 'error') && (
                    <>
                      <Send className="w-4 h-4 text-black" />
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
