import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bot,
  Sparkles,
  Send,
  Square,
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
  ChevronRight,
  RefreshCw,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import subhanPortrait from '../assets/images/subhan-portrait-enhanced.jpg';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isError?: boolean;
}

interface ChatWidgetProps {
  onNavigate?: (sectionId: string) => void;
}

const INITIAL_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content: `Hello! 👋 I'm **Abdus Subhan's AI Assistant**, powered by Gemini.

I can quickly answer questions about his **frontend experience, React & Next.js stack, live projects**, and availability.

What would you like to know?`,
  timestamp: 'Just now',
};

const QUICK_PROMPTS = [
  {
    icon: <Briefcase className="w-3.5 h-3.5 text-[#22B8F0]" />,
    label: 'Work & Training',
    query:
      "Tell me about Subhan's frontend experience at Computing Yard, Utech Digital, and his AI training at Bano Qabil.",
  },
  {
    icon: <Code2 className="w-3.5 h-3.5 text-[#A78BFA]" />,
    label: 'Core Tech Stack',
    query: "What is Subhan's primary frontend and backend tech stack?",
  },
  {
    icon: <Zap className="w-3.5 h-3.5 text-amber-400" />,
    label: 'Top Projects',
    query: "What are Subhan's featured projects and their live links?",
  },
  {
    icon: <Mail className="w-3.5 h-3.5 text-emerald-400" />,
    label: 'Availability & Hire',
    query: 'Is Subhan currently available for work and how can I contact him?',
  },
];

// Helper to format simple markdown (headers, bold, italics, bullets with nesting, links, bare URLs, inline code)
function formatMessageContent(text: string) {
  const lines = text.split('\n');

  return lines.map((line, idx) => {
    const trimmed = line.trim();

    if (trimmed.startsWith('### ')) {
      return (
        <h4
          key={idx}
          className="font-semibold text-[#22B8F0] text-sm mt-3 mb-1.5 flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
          <span>{formatInline(trimmed.slice(4))}</span>
        </h4>
      );
    }
    if (trimmed.startsWith('## ')) {
      return (
        <h3 key={idx} className="font-bold text-[#F8FAFC] text-sm mt-3.5 mb-2">
          {formatInline(trimmed.slice(3))}
        </h3>
      );
    }

    const bulletMatch = line.match(/^(\s*)([\*\-•])\s+(.*)$/);
    if (bulletMatch) {
      const indent = bulletMatch[1].length;
      const content = bulletMatch[3];
      const isNested = indent >= 2;
      return (
        <li
          key={idx}
          className={`${isNested ? 'ml-5 sm:ml-6' : 'ml-1.5'} list-none my-1 text-[#CBD5E1] flex items-start gap-2`}
        >
          <span
            className={`rounded-full mt-2 flex-shrink-0 ${
              isNested ? 'w-1 h-1 bg-[#A78BFA]' : 'w-1.5 h-1.5 bg-[#22B8F0]'
            }`}
          />
          <span className="flex-1">{formatInline(content)}</span>
        </li>
      );
    }

    if (trimmed === '---') {
      return <hr key={idx} className="my-2.5 border-white/10" />;
    }

    if (!trimmed) {
      return <div key={idx} className="h-1.5" />;
    }

    return (
      <p key={idx} className="my-1 leading-relaxed text-[#CBD5E1]">
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
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    const codeMatch = remaining.match(/`([^`]+)`/);
    const linkMatch = remaining.match(/\[(.*?)\]\(((?:https?:\/\/|mailto:)[^\s)]+)\)/);
    const urlMatch = remaining.match(/(https?:\/\/[^\s)<>]+)/);
    const italicMatch = remaining.match(/(?<!\*)\*([^*\n]+?)\*(?!\*)|(?<!_)_([^_\n]+?)_(?!_)/);

    let firstIndex = -1;
    let matchType: 'bold' | 'code' | 'link' | 'url' | 'italic' | null = null;

    if (boldMatch?.index !== undefined) {
      firstIndex = boldMatch.index;
      matchType = 'bold';
    }
    if (codeMatch?.index !== undefined && (firstIndex === -1 || codeMatch.index < firstIndex)) {
      firstIndex = codeMatch.index;
      matchType = 'code';
    }
    if (linkMatch?.index !== undefined && (firstIndex === -1 || linkMatch.index < firstIndex)) {
      firstIndex = linkMatch.index;
      matchType = 'link';
    }
    if (urlMatch?.index !== undefined && (firstIndex === -1 || urlMatch.index < firstIndex)) {
      firstIndex = urlMatch.index;
      matchType = 'url';
    }
    if (italicMatch?.index !== undefined && (firstIndex === -1 || italicMatch.index < firstIndex)) {
      firstIndex = italicMatch.index;
      matchType = 'italic';
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
        <strong key={keyCounter++} className="font-semibold text-[#F8FAFC]">
          {boldMatch[1]}
        </strong>
      );
      remaining = remaining.substring(firstIndex + boldMatch[0].length);
    } else if (matchType === 'italic' && italicMatch) {
      const italicContent = italicMatch[1] ?? italicMatch[2];
      parts.push(
        <em key={keyCounter++} className="italic text-[#E2E8F0]">
          {italicContent}
        </em>
      );
      remaining = remaining.substring(firstIndex + italicMatch[0].length);
    } else if (matchType === 'code' && codeMatch) {
      parts.push(
        <code
          key={keyCounter++}
          className="px-1.5 py-0.5 rounded bg-[#080B12] text-[#22B8F0] font-mono text-xs border border-white/10"
        >
          {codeMatch[1]}
        </code>
      );
      remaining = remaining.substring(firstIndex + codeMatch[0].length);
    } else if (matchType === 'link' && linkMatch) {
      const href = linkMatch[2];
      const isMailto = href.startsWith('mailto:');
      parts.push(
        <a
          key={keyCounter++}
          href={href}
          target={isMailto ? undefined : '_blank'}
          rel={isMailto ? undefined : 'noopener noreferrer'}
          className="text-[#22B8F0] hover:underline underline-offset-2 inline-flex items-center gap-1 font-medium"
        >
          {linkMatch[1]}
          {!isMailto && <ExternalLink className="w-3 h-3 inline shrink-0" />}
        </a>
      );
      remaining = remaining.substring(firstIndex + linkMatch[0].length);
    } else if (matchType === 'url' && urlMatch) {
      const cleanUrl = urlMatch[1].replace(/[.,;:!?]+$/, '');
      const trailing = urlMatch[1].slice(cleanUrl.length);
      parts.push(
        <a
          key={keyCounter++}
          href={cleanUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#22B8F0] hover:underline underline-offset-2 inline-flex items-center gap-1 font-medium break-all"
        >
          {cleanUrl}
          <ExternalLink className="w-3 h-3 inline shrink-0" />
        </a>
      );
      if (trailing) parts.push(trailing);
      remaining = remaining.substring(firstIndex + urlMatch[0].length);
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
  const [streamingId, setStreamingId] = useState<string | null>(null);
  const [lastUserQuery, setLastUserQuery] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const scrollToBottom = (behavior: ScrollBehavior = 'auto') => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior,
      });
    } else {
      messagesEndRef.current?.scrollIntoView({ behavior });
    }
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom(streamingId ? 'auto' : 'smooth');
    }
  }, [isOpen, messages, isLoading, streamingId]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 220);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Cleanup active stream on unmount
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  // Isolate mouse wheel/touchpad scrolling to chat container only
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container || !isOpen) return;

    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation();
      e.preventDefault();
      container.scrollTop += e.deltaY;
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [isOpen]);

  const handleStop = () => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    setIsLoading(false);
    setStreamingId(null);
  };

  const handleJump = (sectionId: string) => {
    if (window.innerWidth < 640) {
      setIsOpen(false);
    }
    onNavigate?.(sectionId);
  };

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    setLastUserQuery(text);

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const historyBase = messages.filter((m) => m.id !== 'welcome' && !m.isError);
    const payloadMessages = [...historyBase, userMsg].slice(-12).map((m) => ({
      role: m.role,
      content: m.content,
    }));

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;
    const timeoutId = window.setTimeout(() => controller.abort(), 25000);

    const botMsgId = (Date.now() + 1).toString();
    const botTimestamp = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'text/event-stream, application/json',
        },
        body: JSON.stringify({ messages: payloadMessages, stream: true }),
        signal: controller.signal,
      });

      const contentType = res.headers.get('content-type') || '';

      // Handle SSE streaming response
      if (res.ok && contentType.includes('text/event-stream') && res.body) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let accumulated = '';
        let messageInserted = false;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const events = buffer.split('\n\n');
          buffer = events.pop() ?? '';

          for (const event of events) {
            const dataLines = event
              .split('\n')
              .filter((line) => line.startsWith('data:'))
              .map((line) => line.slice(5).trim());

            if (dataLines.length === 0) continue;

            for (const rawData of dataLines) {
              if (!rawData) continue;
              let parsed: { delta?: string; done?: boolean; error?: string };
              try {
                parsed = JSON.parse(rawData);
              } catch {
                continue;
              }

              if (parsed.error) {
                throw new Error(parsed.error);
              }

              if (parsed.delta) {
                accumulated += parsed.delta;

                if (!messageInserted) {
                  messageInserted = true;
                  setIsLoading(false);
                  setStreamingId(botMsgId);
                  setMessages((prev) => [
                    ...prev,
                    {
                      id: botMsgId,
                      role: 'assistant',
                      content: accumulated,
                      timestamp: botTimestamp,
                    },
                  ]);
                } else {
                  setMessages((prev) =>
                    prev.map((m) => (m.id === botMsgId ? { ...m, content: accumulated } : m))
                  );
                }
              }
            }
          }
        }

        if (!accumulated) {
          throw new Error('No response received from AI assistant.');
        }

        setStreamingId(null);
        return;
      }

      // Fallback: standard JSON response
      const data = await res.json();
      if (!res.ok || !data.success || !data.reply) {
        throw new Error(data.error || 'Failed to generate response');
      }

      setMessages((prev) => [
        ...prev,
        {
          id: botMsgId,
          role: 'assistant',
          content: data.reply,
          timestamp: botTimestamp,
        },
      ]);
    } catch (err) {
      if (controller.signal.aborted) {
        // User stopped generation cleanly or timed out
        setStreamingId(null);
        setIsLoading(false);
        return;
      }

      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: botMsgId,
          role: 'assistant',
          isError: true,
          content:
            "I'm having trouble connecting right now. You can retry below or reach Subhan directly at **subhanallauddin@gmail.com** or via the Contact form.",
          timestamp: botTimestamp,
        },
      ]);
    } finally {
      window.clearTimeout(timeoutId);
      abortControllerRef.current = null;
      setIsLoading(false);
      setStreamingId(null);
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
    handleStop();
    setLastUserQuery(null);
    setMessages([INITIAL_MESSAGE]);
  };

  const isBusy = isLoading || streamingId !== null;

  return (
    <div className="fixed inset-x-3 bottom-3 sm:inset-auto sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-auto select-none">
      {/* CHAT WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chat-assistant-window"
            role="dialog"
            aria-modal="false"
            aria-label="Abdus Subhan AI Assistant"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            className={`
              ${isExpanded ? 'w-full sm:w-[620px] md:w-[680px] h-[760px]' : 'w-full sm:w-[420px] md:w-[440px] h-[580px] sm:h-[610px]'}
              max-h-[calc(100dvh-5.5rem)] sm:max-h-[85vh] bg-[#0D121B]/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-white/10
              shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(34,184,240,0.12)]
              flex flex-col overflow-hidden mb-2 sm:mb-3.5 ring-1 ring-[#22B8F0]/20 transition-all duration-300
            `}
          >
            {/* Ambient Top Glow */}
            <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#22B8F0]/10 via-[#A78BFA]/5 to-transparent pointer-events-none" />

            {/* HEADER */}
            <div className="relative px-4 sm:px-5 py-3.5 border-b border-white/10 bg-[#191C26]/95 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={subhanPortrait}
                    alt="Abdus Subhan"
                    className="w-10 h-10 rounded-2xl object-cover object-top border border-[#22B8F0]/35 shadow-md"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#191C26] rounded-full flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-white rounded-full" />
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-semibold text-[#F8FAFC] text-sm tracking-tight">
                      Abdus Subhan AI
                    </h3>
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#22B8F0]/15 border border-[#22B8F0]/30 text-[10px] font-medium text-[#22B8F0]">
                      <Sparkles className="w-2.5 h-2.5" />
                      Gemini
                    </span>
                  </div>
                  <p className="text-[11px] text-[#94A3B8] flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Frontend Developer • Instant Reply
                  </p>
                </div>
              </div>

              {/* Action Controls */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleReset}
                  title="Reset conversation"
                  aria-label="Reset conversation"
                  className="p-2 text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5 rounded-xl transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  title={isExpanded ? 'Collapse size' : 'Expand size'}
                  aria-label={isExpanded ? 'Collapse size' : 'Expand size'}
                  className="p-2 text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5 rounded-xl transition-all hidden sm:block"
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  aria-label="Close chat"
                  className="p-2 text-[#94A3B8] hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* QUICK NAVIGATION BAR */}
            {onNavigate && (
              <div className="px-4 py-2 bg-[#080B12]/70 border-b border-white/[0.06] flex items-center gap-2 overflow-x-auto text-[11px] no-scrollbar">
                <span className="text-[#94A3B8] font-mono uppercase text-[9px] tracking-wider pl-0.5 shrink-0">
                  Jump to:
                </span>
                <button
                  type="button"
                  onClick={() => handleJump('skills')}
                  className="px-2.5 py-1 rounded-lg bg-[#191C26] hover:border-[#22B8F0]/40 hover:text-[#22B8F0] text-[#94A3B8] border border-white/[0.08] transition-all whitespace-nowrap"
                >
                  Skills
                </button>
                <button
                  type="button"
                  onClick={() => handleJump('experience')}
                  className="px-2.5 py-1 rounded-lg bg-[#191C26] hover:border-[#A78BFA]/40 hover:text-[#A78BFA] text-[#94A3B8] border border-white/[0.08] transition-all whitespace-nowrap"
                >
                  Experience
                </button>
                <button
                  type="button"
                  onClick={() => handleJump('projects')}
                  className="px-2.5 py-1 rounded-lg bg-[#191C26] hover:border-[#22B8F0]/40 hover:text-[#22B8F0] text-[#94A3B8] border border-white/[0.08] transition-all whitespace-nowrap"
                >
                  Projects
                </button>
                <a
                  href={PORTFOLIO_DATA.personalInfo.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-[#191C26] hover:border-emerald-400/40 hover:text-emerald-300 text-[#94A3B8] border border-white/[0.08] transition-all whitespace-nowrap flex items-center gap-1"
                >
                  <FileText className="w-3 h-3" /> CV
                </a>
              </div>
            )}

            {/* MESSAGES CONTAINER */}
            <div
              ref={messagesContainerRef}
              data-lenis-prevent="true"
              data-lenis-prevent-wheel="true"
              className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-sm select-text overscroll-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {messages.map((msg) => {
                const isCurrentlyStreaming = streamingId === msg.id;

                return (
                  <div
                    key={msg.id}
                    className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#22B8F0] to-[#A78BFA] flex-shrink-0 flex items-center justify-center text-[#080B12] mt-1 shadow-md">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div
                      className={`relative group max-w-[85%] rounded-2xl px-4 py-3 transition-all ${
                        msg.role === 'user'
                          ? 'bg-[#22B8F0] text-[#080B12] font-medium rounded-tr-sm shadow-lg shadow-[#22B8F0]/15'
                          : 'bg-[#191C26] text-[#F8FAFC] border border-white/[0.08] rounded-tl-sm shadow-md'
                      }`}
                    >
                      {/* Content */}
                      <div className="text-[13.5px] leading-relaxed">
                        {msg.role === 'assistant' ? (
                          <>
                            {formatMessageContent(msg.content)}
                            {isCurrentlyStreaming && (
                              <span className="inline-block w-1.5 h-3.5 ml-1 align-middle bg-[#22B8F0] animate-pulse rounded-sm" />
                            )}
                          </>
                        ) : (
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                        )}
                      </div>

                      {/* Footer / Meta */}
                      <div
                        className={`flex items-center justify-between gap-3 mt-2 pt-1.5 border-t ${
                          msg.role === 'user' ? 'border-black/10' : 'border-white/[0.06]'
                        }`}
                      >
                        <span
                          className={`text-[10px] ${
                            msg.role === 'user'
                              ? 'text-[#080B12]/70 font-medium'
                              : 'text-[#94A3B8] font-mono'
                          }`}
                        >
                          {msg.timestamp}
                        </span>

                        {msg.role === 'assistant' && !isCurrentlyStreaming && (
                          <div className="flex items-center gap-2">
                            {msg.isError && lastUserQuery && (
                              <button
                                type="button"
                                onClick={() => handleSend(lastUserQuery)}
                                className="text-[#22B8F0] hover:underline p-1 rounded-md flex items-center gap-1 text-[10px] font-medium"
                              >
                                <RefreshCw className="w-3 h-3" />
                                <span>Retry</span>
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleCopy(msg.id, msg.content)}
                              className="text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5 p-1.5 rounded-lg transition-all flex items-center gap-1 text-[11px]"
                              title="Copy message"
                              aria-label="Copy message to clipboard"
                            >
                              {copiedId === msg.id ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                  <span className="text-emerald-400 font-medium">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {msg.role === 'user' && (
                      <div className="w-7 h-7 rounded-xl bg-[#191C26] border border-white/10 flex-shrink-0 flex items-center justify-center text-[#94A3B8] mt-1">
                        <User className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Pre-first-token Typing Indicator */}
              {isLoading && (
                <div className="flex gap-2.5 items-center justify-start">
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#22B8F0] to-[#A78BFA] flex-shrink-0 flex items-center justify-center text-[#080B12] shadow-md">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  </div>
                  <div className="bg-[#191C26] border border-white/[0.08] px-4 py-2.5 rounded-2xl rounded-tl-sm flex items-center gap-2">
                    <span className="text-xs text-[#94A3B8] font-medium">
                      Subhan AI is thinking
                    </span>
                    <div className="flex items-center gap-1">
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-[#22B8F0] animate-bounce"
                        style={{ animationDelay: '0ms' }}
                      />
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-[#22B8F0] animate-bounce"
                        style={{ animationDelay: '150ms' }}
                      />
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] animate-bounce"
                        style={{ animationDelay: '300ms' }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SUGGESTED PROMPT CARDS */}
              {messages.length <= 1 && !isBusy && (
                <div className="pt-2 space-y-2.5">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-[#94A3B8] flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#22B8F0]" />
                    Quick Questions:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {QUICK_PROMPTS.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSend(item.query)}
                        className="text-left p-3 rounded-2xl bg-[#191C26] hover:bg-[#1E2330] border border-white/[0.08] hover:border-[#22B8F0]/40 transition-all group"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="p-1.5 rounded-lg bg-[#0D121B] border border-white/[0.06] group-hover:scale-105 transition-transform">
                            {item.icon}
                          </span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-[#22B8F0] transition-colors" />
                        </div>
                        <p className="font-medium text-[#F8FAFC] text-xs group-hover:text-[#22B8F0] transition-colors">
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
            <div className="p-3.5 sm:p-4 bg-[#191C26]/95 border-t border-white/10 z-10">
              <div className="relative flex items-center bg-[#080B12] border border-white/10 rounded-2xl p-1.5 focus-within:border-[#22B8F0]/60 focus-within:ring-2 focus-within:ring-[#22B8F0]/20 transition-all">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Subhan's AI anything..."
                  disabled={isBusy}
                  className="flex-1 bg-transparent px-3 py-2 text-sm text-[#F8FAFC] placeholder-[#64748B] focus:outline-none disabled:opacity-60"
                />
                {isBusy ? (
                  <button
                    type="button"
                    onClick={handleStop}
                    aria-label="Stop response"
                    title="Stop generating"
                    className="w-9 h-9 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 text-rose-300 flex items-center justify-center transition-all flex-shrink-0"
                  >
                    <Square className="w-3.5 h-3.5 fill-current" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSend()}
                    disabled={!inputValue.trim()}
                    aria-label="Send question"
                    className="w-9 h-9 rounded-xl bg-[#22B8F0] hover:bg-[#38C4F5] disabled:opacity-30 text-[#080B12] flex items-center justify-center transition-all shadow-md shadow-[#22B8F0]/20 flex-shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between text-[10px] text-[#94A3B8] mt-2 px-1">
                <span>Grounded in Subhan&apos;s verified portfolio</span>
                <span className="hidden sm:inline font-mono">Press ↵ to send</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING ACTION TRIGGER PILL */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="chat-assistant-window"
        aria-label={isOpen ? 'Close Subhan AI Assistant' : 'Open Subhan AI Assistant'}
        className="relative group flex items-center gap-2.5 sm:gap-3.5 pl-2 pr-3.5 py-2 sm:pl-2.5 sm:pr-5 sm:py-2.5 rounded-full bg-[#191C26]/95 hover:bg-[#1F2432] border border-[#22B8F0]/35 text-[#F8FAFC] shadow-[0_12px_36px_rgba(34,184,240,0.2)] hover:shadow-[0_16px_44px_rgba(34,184,240,0.32)] backdrop-blur-xl transition-all"
      >
        {/* Subtle Glow Aura */}
        <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#22B8F0]/30 to-[#A78BFA]/30 opacity-40 group-hover:opacity-75 blur-md -z-10 transition-opacity" />

        {/* Thumbnail */}
        <div className="relative">
          <img
            src={subhanPortrait}
            alt="Abdus Subhan"
            className="w-9 h-9 rounded-full object-cover object-top border-2 border-[#22B8F0]/50 shadow-sm"
          />
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-[#191C26] rounded-full" />
        </div>

        {/* Text Details */}
        <div className="text-left flex flex-col">
          <span className="text-[10px] font-mono text-[#22B8F0] uppercase tracking-widest leading-none flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-[#22B8F0]" />
            AI Assistant
          </span>
          <span className="text-xs font-semibold text-[#F8FAFC] tracking-tight leading-snug mt-0.5">
            {isOpen ? 'Close Chat' : 'Ask Subhan AI'}
          </span>
        </div>

        {/* Toggle Icon */}
        <div className="ml-1 text-[#94A3B8] group-hover:text-[#F8FAFC] transition-colors">
          {isOpen ? (
            <X className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          )}
        </div>
      </motion.button>
    </div>
  );
};
