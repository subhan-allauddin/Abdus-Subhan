import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  Sparkles,
  Send,
  X,
  RotateCcw,
  Bot,
  User,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const INITIAL_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content: "Hi there! 👋 I'm **Subhan's AI Assistant**.\n\nI can answer questions about his frontend skills, real-world experience, latest projects, and how to hire or get in touch. What would you like to know?",
  timestamp: 'Just now',
};

const SUGGESTED_PROMPTS = [
  { label: "💼 Tell me about Subhan's experience", prompt: "Tell me about Subhan's work experience and current role." },
  { label: "🛠️ What is his core tech stack?", prompt: "What are Subhan's top technical skills and frameworks?" },
  { label: "🚀 Show me his key projects", prompt: "What are some of Subhan's best projects and what did he build?" },
  { label: "📬 How can I contact or hire him?", prompt: "How can I get in touch with Subhan or hire him for a role?" },
];

// Helper to format simple markdown (bold, bullets, links) safely
function renderFormattedMessage(text: string) {
  const lines = text.split('\n');

  return lines.map((line, idx) => {
    // Bullet points
    if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
      const content = line.trim().slice(2);
      return (
        <li key={idx} className="ml-4 list-disc my-1 text-zinc-300">
          {formatInline(content)}
        </li>
      );
    }

    if (!line.trim()) {
      return <div key={idx} className="h-2" />;
    }

    return (
      <p key={idx} className="my-1 leading-relaxed">
        {formatInline(line)}
      </p>
    );
  });
}

function formatInline(str: string): React.ReactNode[] {
  // Regex to split on bold **text** or markdown links [text](url)
  const parts: React.ReactNode[] = [];
  let remaining = str;
  let keyCounter = 0;

  while (remaining.length > 0) {
    // Check for bold **...**
    const boldMatch = remaining.match(/\*\*(.*?)\*\*/);
    // Check for link [...](...)
    const linkMatch = remaining.match(/\[(.*?)\]\((.*?)\)/);

    let firstIndex = -1;
    let matchType: 'bold' | 'link' | null = null;

    if (boldMatch && boldMatch.index !== undefined) {
      firstIndex = boldMatch.index;
      matchType = 'bold';
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
    } else if (matchType === 'link' && linkMatch) {
      parts.push(
        <a
          key={keyCounter++}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 hover:text-cyan-300 underline inline-flex items-center gap-0.5"
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

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    setHasInteracted(true);
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
      // Build messages payload for API (excluding the client-side welcome note)
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
        throw new Error(data.error || 'Failed to fetch response');
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
        content: "Sorry, I ran into an issue connecting to the AI service. You can also reach Subhan directly at **subhanallauddin@gmail.com**!",
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

  const handleReset = () => {
    setMessages([INITIAL_MESSAGE]);
    setHasInteracted(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
      {/* CHAT POPUP WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-[92vw] sm:w-[420px] h-[580px] max-h-[82vh] bg-zinc-950/95 border border-zinc-800 rounded-3xl shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden mb-4 ring-1 ring-cyan-500/20"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 border-b border-zinc-800/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
                    <Bot className="w-5 h-5" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-zinc-900 rounded-full" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white text-sm">Subhan's AI Assistant</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-medium border border-cyan-500/20">
                      Gemini
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Online & Ready to help
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  title="Reset Conversation"
                  className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/60 rounded-xl transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/60 rounded-xl transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm scrollbar-thin scrollbar-thumb-zinc-800">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex-shrink-0 flex items-center justify-center text-white mt-1 shadow-sm">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] px-4 py-3 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-sm shadow-md'
                        : 'bg-zinc-900/90 text-zinc-200 border border-zinc-800 rounded-tl-sm shadow-sm'
                    }`}
                  >
                    {msg.role === 'assistant' ? (
                      <div>{renderFormattedMessage(msg.content)}</div>
                    ) : (
                      <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    )}
                    <span
                      className={`block text-[10px] mt-1.5 ${
                        msg.role === 'user' ? 'text-cyan-100/70 text-right' : 'text-zinc-500'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-xl bg-zinc-800 border border-zinc-700 flex-shrink-0 flex items-center justify-center text-zinc-300 mt-1">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex gap-2.5 items-center justify-start">
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex-shrink-0 flex items-center justify-center text-white shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  </div>
                  <div className="bg-zinc-900 border border-zinc-800 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              {/* Suggested quick chips (shown when user hasn't asked questions yet) */}
              {!hasInteracted && messages.length <= 1 && (
                <div className="pt-2">
                  <p className="text-[11px] font-medium text-zinc-400 mb-2 uppercase tracking-wider">
                    Suggested Questions:
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {SUGGESTED_PROMPTS.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(item.prompt)}
                        className="text-left text-xs px-3.5 py-2.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800/90 text-zinc-300 hover:text-white border border-zinc-800/80 hover:border-cyan-500/40 transition-all flex items-center justify-between group"
                      >
                        <span>{item.label}</span>
                        <ChevronDown className="w-3.5 h-3.5 text-zinc-500 -rotate-90 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-zinc-900/60 border-t border-zinc-800/80">
              <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-2xl px-3 py-1.5 focus-within:border-cyan-500/60 focus-within:ring-2 focus-within:ring-cyan-500/20 transition-all">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything about Subhan..."
                  disabled={isLoading}
                  className="flex-1 bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none disabled:opacity-50"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim() || isLoading}
                  aria-label="Send message"
                  className="w-8 h-8 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:opacity-90 disabled:opacity-30 disabled:hover:opacity-30 text-white flex items-center justify-center transition-opacity flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-zinc-400 text-center mt-2">
                Ask about experience, tech stack, projects, or hiring.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING ACTION BUTTON */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative group flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-medium shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all border border-white/20"
      >
        <span className="relative flex items-center justify-center">
          {isOpen ? (
            <X className="w-5 h-5 transition-transform" />
          ) : (
            <>
              <Bot className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-zinc-950 animate-pulse" />
            </>
          )}
        </span>

        <span className="text-sm font-semibold tracking-wide">
          {isOpen ? 'Close AI' : "Chat with Subhan's AI"}
        </span>

        {/* Outer glowing pulsing ring when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 opacity-30 blur-md group-hover:opacity-60 transition-opacity -z-10 animate-pulse" />
        )}
      </motion.button>
    </div>
  );
};
