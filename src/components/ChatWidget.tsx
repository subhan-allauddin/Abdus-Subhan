import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bot,
  Sparkles,
  Send,
  X,
  RotateCcw,
  User,
  ExternalLink,
  Maximize2,
  Minimize2,
  Copy,
  Check,
  FileText,
  Briefcase,
  Code2,
  Mail,
  ArrowUpRight,
  Zap,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import subhanPortrait from '../assets/images/Professional Image.jpg';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface ChatWidgetProps {
  onNavigate?: (sectionId: string) => void;
}

const INITIAL_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content: `Hello! 👋 I'm **Abdus Subhan's AI Assistant**, powered by Gemini.

I can help you explore his **experience, frontend tech stack, live projects**, and how he can add value to your engineering team.

What would you like to know?`,
  timestamp: 'Just now',
};

const QUICK_PROMPTS = [
  {
    icon: <Briefcase className="w-3.5 h-3.5 text-sky-400" />,
    label: "Work Experience",
    query: "Tell me about Subhan's experience and what he did at AsraSoft.",
  },
  {
    icon: <Code2 className="w-3.5 h-3.5 text-cyan-400" />,
    label: "Core Tech Stack",
    query: "What is Subhan's primary tech stack and proficiency with React and TypeScript?",
  },
  {
    icon: <Zap className="w-3.5 h-3.5 text-amber-400" />,
    label: "Top Projects",
    query: "What are Subhan's best projects and what technologies did he use?",
  },
  {
    icon: <Mail className="w-3.5 h-3.5 text-emerald-400" />,
    label: "Availability & Hire",
    query: "Is Subhan currently available for hire and how can I contact him?",
  },
];

// Helper to format simple markdown (bold, bullets, links, inline code)
function formatMessageContent(text: string) {
  const lines = text.split('\n');

  return lines.map((line, idx) => {
    const trimmed = line.trim();

    // Headers
    if (trimmed.startsWith('### ')) {
      return (
        <h4 key={idx} className="font-semibold text-white text-sm mt-3 mb-1.5 flex items-center gap-1.5 text-sky-300">
          <Sparkles className="w-3.5 h-3.5" />
          {formatInline(trimmed.slice(4))}
        </h4>
      );
    }
    if (trimmed.startsWith('## ')) {
      return (
        <h3 key={idx} className="font-bold text-white text-sm mt-3.5 mb-2 text-sky-200">
          {formatInline(trimmed.slice(3))}
        </h3>
      );
    }

    // Bullet points
    if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
      const content = trimmed.replace(/^[\*\-•]\s*/, '');
      return (
        <li key={idx} className="ml-3 list-none my-1 text-zinc-300 flex items-start gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 flex-shrink-0" />
          <span className="flex-1">{formatInline(content)}</span>
        </li>
      );
    }

    // Divider
    if (trimmed === '---') {
      return <hr key={idx} className="my-2.5 border-zinc-800" />;
    }

    // Blank line
    if (!trimmed) {
      return <div key={idx} className="h-1.5" />;
    }

    return (
      <p key={idx} className="my-1 leading-relaxed text-zinc-300">
        {formatInline(line)}
      </p>
    );
  });
}

function formatInline(str: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let remaining = str;
  let keyCounter = 0;

  while (remaining.length > 0) {
    const boldMatch = remaining.match(/\*\*(.*?)\*\*/);
    const codeMatch = remaining.match(/`([^`]+)`/);
    const linkMatch = remaining.match(/\[(.*?)\]\((.*?)\)/);

    let firstIndex = -1;
    let matchType: 'bold' | 'code' | 'link' | null = null;

    if (boldMatch && boldMatch.index !== undefined) {
      firstIndex = boldMatch.index;
      matchType = 'bold';
    }

    if (codeMatch && codeMatch.index !== undefined) {
      if (firstIndex === -1 || codeMatch.index < firstIndex) {
        firstIndex = codeMatch.index;
        matchType = 'code';
      }
    }

    if (linkMatch && linkMatch.index !== undefined) {
      if (firstIndex === -1 || linkMatch.index < firstIndex) {
        firstIndex = linkMatch.index;
        matchType = 'link';
      }
    }

    if (matchType === null || firstIndex === -1) {
      parts.push(remaining);
      break;
    }

    if (firstIndex > 0) {
      parts.push(remaining.substring(0, firstIndex));
    }

    if (matchType === 'bold' && boldMatch) {
      parts.push(
        <strong key={keyCounter++} className="font-semibold text-white">
          {boldMatch[1]}
        </strong>
      );
      remaining = remaining.substring(firstIndex + boldMatch[0].length);
    } else if (matchType === 'code' && codeMatch) {
      parts.push(
        <code
          key={keyCounter++}
          className="px-1.5 py-0.5 rounded bg-zinc-800/80 text-sky-300 font-mono text-xs border border-zinc-700/50"
        >
          {codeMatch[1]}
        </code>
      );
      remaining = remaining.substring(firstIndex + codeMatch[0].length);
    } else if (matchType === 'link' && linkMatch) {
      parts.push(
        <a
          key={keyCounter++}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-400 hover:text-sky-300 underline underline-offset-2 inline-flex items-center gap-1 font-medium"
        >
          {linkMatch[1]}
          <ExternalLink className="w-3 h-3 inline" />
        </a>
      );
      remaining = remaining.substring(firstIndex + linkMatch[0].length);
    }
  }

  return parts;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen, messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const payloadMessages = newMessages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: payloadMessages }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate response');
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm having trouble connecting right now. Feel free to contact Subhan directly via email at **subhanallauddin@gmail.com** or use the contact form!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleReset = () => {
    setMessages([INITIAL_MESSAGE]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto select-none">
      {/* CHAT WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 25 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className={`
              ${isExpanded ? 'w-[95vw] sm:w-[640px] md:w-[700px] h-[780px]' : 'w-[94vw] sm:w-[440px] md:w-[460px] h-[640px]'}
              max-h-[88vh] bg-[#090A0F]/95 backdrop-blur-2xl rounded-3xl border border-white/10
              shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_50px_rgba(56,189,248,0.12)]
              flex flex-col overflow-hidden mb-4 ring-1 ring-sky-500/20 transition-all duration-300
            `}
          >
            {/* Ambient Top Glow */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-sky-500/10 via-indigo-500/5 to-transparent pointer-events-none" />

            {/* HEADER */}
            <div className="relative px-5 py-4 border-b border-white/10 bg-[#0d1017]/90 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={subhanPortrait}
                    alt="Abdus Subhan"
                    className="w-10 h-10 rounded-2xl object-cover border border-sky-400/30 shadow-md"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#0d1017] rounded-full flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping opacity-75" />
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-semibold text-white text-sm tracking-tight">Abdus Subhan AI</h3>
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-sky-500/15 border border-sky-500/30 text-[10px] font-medium text-sky-300">
                      <Sparkles className="w-2.5 h-2.5" />
                      Gemini
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Frontend Developer • Active Now
                  </p>
                </div>
              </div>

              {/* Action Controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  title="Reset conversation"
                  aria-label="Reset conversation"
                  className="p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  title={isExpanded ? "Collapse size" : "Expand size"}
                  aria-label={isExpanded ? "Collapse size" : "Expand size"}
                  className="p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all hidden sm:block"
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  aria-label="Close chat"
                  className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* QUICK NAVIGATION BAR (Header Sub-bar) */}
            {onNavigate && (
              <div className="px-4 py-2 bg-[#090A0F]/80 border-b border-white/5 flex items-center gap-2 overflow-x-auto text-[11px] no-scrollbar">
                <span className="text-zinc-500 font-mono uppercase text-[9px] tracking-wider pl-1">Jump to:</span>
                <button
                  onClick={() => onNavigate('skills')}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-sky-500/15 hover:text-sky-300 text-zinc-400 border border-white/5 hover:border-sky-500/30 transition-all whitespace-nowrap"
                >
                  ⚡ Skills
                </button>
                <button
                  onClick={() => onNavigate('experience')}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-sky-500/15 hover:text-sky-300 text-zinc-400 border border-white/5 hover:border-sky-500/30 transition-all whitespace-nowrap"
                >
                  💼 Experience
                </button>
                <button
                  onClick={() => onNavigate('projects')}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-sky-500/15 hover:text-sky-300 text-zinc-400 border border-white/5 hover:border-sky-500/30 transition-all whitespace-nowrap"
                >
                  🚀 Projects
                </button>
                <a
                  href={PORTFOLIO_DATA.personalInfo.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-emerald-500/15 hover:text-emerald-300 text-zinc-400 border border-white/5 hover:border-emerald-500/30 transition-all whitespace-nowrap flex items-center gap-1"
                >
                  <FileText className="w-3 h-3" /> CV
                </a>
              </div>
            )}

            {/* MESSAGES CONTAINER */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-sm select-text scrollbar-thin scrollbar-thumb-zinc-800">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex-shrink-0 flex items-center justify-center text-white mt-1 shadow-md shadow-sky-500/20">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`relative group max-w-[85%] rounded-2xl px-4 py-3.5 transition-all ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-tr-sm shadow-lg shadow-sky-600/20'
                        : 'bg-[#121520] text-zinc-200 border border-white/10 rounded-tl-sm shadow-md'
                    }`}
                  >
                    {/* Content */}
                    <div className="text-[13.5px] leading-relaxed">
                      {msg.role === 'assistant' ? (
                        formatMessageContent(msg.content)
                      ) : (
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      )}
                    </div>

                    {/* Footer / Meta */}
                    <div className="flex items-center justify-between gap-3 mt-2 pt-1 border-t border-white/5">
                      <span
                        className={`text-[10px] ${
                          msg.role === 'user' ? 'text-sky-200/70' : 'text-zinc-500 font-mono'
                        }`}
                      >
                        {msg.timestamp}
                      </span>

                      {msg.role === 'assistant' && (
                        <button
                          onClick={() => handleCopy(msg.id, msg.content)}
                          className="opacity-60 hover:opacity-100 text-zinc-400 hover:text-white p-1 rounded-md transition-opacity flex items-center gap-1 text-[10px]"
                          title="Copy message"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400 font-medium">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-xl bg-zinc-800 border border-white/10 flex-shrink-0 flex items-center justify-center text-zinc-300 mt-1">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Animation */}
              {isLoading && (
                <div className="flex gap-3 items-center justify-start">
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex-shrink-0 flex items-center justify-center text-white shadow-md">
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  </div>
                  <div className="bg-[#121520] border border-white/10 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-2">
                    <span className="text-xs text-zinc-400 font-medium">Subhan AI is typing</span>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              {/* SUGGESTED PROMPT CARDS (Shown on initial screen) */}
              {messages.length <= 1 && !isLoading && (
                <div className="pt-3 space-y-2.5">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-sky-400" />
                    Frequently Asked Questions:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {QUICK_PROMPTS.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(item.query)}
                        className="text-left p-3 rounded-2xl bg-[#121520] hover:bg-[#181d2c] border border-white/5 hover:border-sky-500/40 transition-all group relative overflow-hidden"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="p-1.5 rounded-lg bg-white/5 text-zinc-300 group-hover:scale-110 transition-transform">
                            {item.icon}
                          </span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                        <p className="font-medium text-white text-xs group-hover:text-sky-300 transition-colors">
                          {item.label}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* INPUT FOOTER */}
            <div className="p-3.5 sm:p-4 bg-[#0d1017]/95 border-t border-white/10 z-10">
              <div className="relative flex items-center bg-[#090A0F] border border-white/10 rounded-2xl p-1.5 focus-within:border-sky-400/60 focus-within:ring-2 focus-within:ring-sky-500/20 transition-all shadow-inner">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Subhan's AI anything..."
                  disabled={isLoading}
                  className="flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none disabled:opacity-50"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim() || isLoading}
                  aria-label="Send question"
                  className="w-9 h-9 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 disabled:opacity-30 disabled:hover:from-sky-500 disabled:hover:to-indigo-600 text-white flex items-center justify-center transition-all shadow-md shadow-sky-500/20 flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between text-[10px] text-zinc-500 mt-2 px-1">
                <span>Grounded in Subhan's verified portfolio & resume</span>
                <span className="hidden sm:inline font-mono">Press ↵ to send</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING ACTION TRIGGER PILL */}
      <motion.button
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative group flex items-center gap-3.5 pl-2.5 pr-5 py-2.5 rounded-full bg-[#0c0f18]/95 hover:bg-[#121624] border border-sky-400/30 text-white shadow-[0_12px_40px_rgba(56,189,248,0.25)] hover:shadow-[0_16px_50px_rgba(56,189,248,0.4)] backdrop-blur-xl transition-all"
      >
        {/* Animated Glow Aura */}
        <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 opacity-30 group-hover:opacity-75 blur-md -z-10 transition-opacity animate-pulse-glow" />

        {/* Thumbnail or Bot Icon */}
        <div className="relative">
          <img
            src={subhanPortrait}
            alt="Abdus Subhan"
            className="w-9 h-9 rounded-full object-cover border-2 border-sky-400/50 shadow-sm"
          />
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-[#090A0F] rounded-full" />
        </div>

        {/* Text Details */}
        <div className="text-left flex flex-col">
          <span className="text-[10px] font-mono text-sky-400 uppercase tracking-widest leading-none flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-sky-400 animate-spin" style={{ animationDuration: '4s' }} />
            AI Assistant
          </span>
          <span className="text-xs font-semibold text-white tracking-tight leading-snug mt-0.5">
            {isOpen ? 'Close Chat' : 'Ask Subhan AI'}
          </span>
        </div>

        {/* Toggle Icon */}
        <div className="ml-1 text-zinc-400 group-hover:text-white transition-colors">
          {isOpen ? <X className="w-4 h-4" /> : <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />}
        </div>
      </motion.button>
    </div>
  );
};
