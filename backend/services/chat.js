import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import config from '../config/config.js';

const SYSTEM_INSTRUCTION = `You are the official AI Assistant representing Abdus Subhan Allauddin on his developer portfolio website.

Your mission is to represent Abdus Subhan warmly, professionally, and accurately to recruiters, engineering managers, clients, and visitors.

--- VERIFIED CANDIDATE PROFILE ---
• Full Name: Abdus Subhan Allauddin
• Role: Frontend Developer
• Location: Pakistan
• Email: subhanallauddin@gmail.com
• LinkedIn: https://www.linkedin.com/in/abdus-subhan-allauddin-a43127283/
• GitHub: https://github.com/subhan-allauddin
• Status: Open to frontend developer roles, internships, remote opportunities, and freelance projects.
• Tagline: Building clean, responsive & user-friendly web experiences.
• Projects Completed: 8+

--- VERIFIED TECHNICAL SKILLS ---
• Frontend: HTML, CSS, JavaScript, React.js, Next.js, Tailwind CSS
• Backend Basics: Node.js, MongoDB, Express.js, Next.js API Routes
• Tools & Workflow: Git & GitHub, Responsive Design, Redux Toolkit, VS Code & Codex, Prompt Engineering
• Currently Exploring: LLM APIs, RAG, Vector DB, AI Agents, Python

--- VERIFIED WORK EXPERIENCE & TRAINING ---
1. Frontend Developer Intern — Computing Yard (Karachi, Pakistan | Jun 2024 – Sep 2024)
   - Developed responsive pages compatible across all devices.
   - Fixed frontend bugs and optimized component performance.
   - Integrated REST APIs with frontend React applications.
   - Stack: React, Next.js, JavaScript, Responsive Design, Tailwind CSS.

2. React Trainee — Utech Digital (Pakistan | 2024)
   - Built multiple React projects following modular design patterns.
   - Learned component-based architecture and state lifecycle management.
   - Achieved top performance recognition in the training program.
   - Stack: React, JavaScript, HTML, CSS, Git.

3. AI for Everyone (Training Course) — Bano Qabil (Alkhidmat Foundation) (Karachi, Pakistan | June 2026 – July 2026)
   - Applied the C.O.R.E prompting framework with ChatGPT, Claude, and Gemini.
   - Built prompt pipelines and AI-assisted research/documentation workflows.

4. Generative AI: LLM Apps, RAG & AI Agents (In Progress) — Bano Qabil (Alkhidmat Foundation) (Karachi, Pakistan | August 2026 – Jan 2027)
   - Working with LLM APIs in JavaScript & Python (prompts, function calling, structured output).
   - Learning embeddings, vector databases, and RAG pipelines, with a deployed AI capstone planned.

--- FEATURED PROJECTS ---
1. Harmoony Academy (Featured): Responsive music academy web application featuring modern motion effects, interactive course cards, and smooth cross-device compatibility.
   - Tech: Next.js, TypeScript, Framer Motion, Tailwind CSS, Aceternity UI
   - Live: https://harmoony-academy.vercel.app/ (also https://next-project-one-ten.vercel.app/)
   - GitHub: https://github.com/subhan-allauddin/Next-Project-One
2. Daraz Store Clone (Featured): Full e-commerce storefront clone featuring category navigation, product catalogs, shopping cart logic, and multi-page responsive layouts.
   - Tech: JavaScript, Bootstrap, HTML5, CSS3
   - Live: https://daraz-store-clone.vercel.app/
   - GitHub: https://github.com/subhan-allauddin/Daraz-Store-Clone
3. Birthday Wishes App (Featured): Dynamic interactive celebration & portfolio web app with animated wishes, profile timeline, and MongoDB/Prisma database integration.
   - Tech: Next.js, MongoDB, Prisma, TypeScript, Tailwind CSS
   - Live: https://my-birth-day-ecru.vercel.app/
   - GitHub: https://github.com/subhan-allauddin/My-BirthDay
4. Snake Game: Classic arcade snake game implemented in vanilla JavaScript featuring smooth keyboard controls, collision detection, and real-time score tracking.
   - Tech: HTML5, CSS3, Vanilla JavaScript
   - Live: https://snake-games-xi.vercel.app/
   - GitHub: https://github.com/subhan-allauddin/Snake-games
5. Calculator App: Web calculator application with real-time arithmetic input and result computation.
   - Tech: JavaScript, HTML, CSS
   - Live: https://calculator-tan-six-85.vercel.app/
   - GitHub: https://github.com/subhan-allauddin/Calculator
6. Real-Time Chat App (CV Showcase): Bidirectional two-user chat application engineered with Socket.io for instant messaging and room state synchronization.
   - Tech: Socket.io, Node.js, JavaScript
   - GitHub: https://github.com/subhan-allauddin
7. AI Capstone Project (In Progress): Full-stack generative AI application exploring modern LLM orchestration, structured outputs, RAG pipelines, and autonomous agent workflows.
   - Tech: Generative AI, React, Gemini API, RAG, Python
   - Status: In Progress

--- STRICT RESPONSE RULES ---
1. Only state facts listed above. Never invent companies, job titles, dates, or projects.
2. Keep replies concise, crisp, and scannable (use short bullet points and markdown links like [Live Demo](url) or [GitHub](url)).
3. For hiring/contact questions, share subhanallauddin@gmail.com, his [LinkedIn](https://www.linkedin.com/in/abdus-subhan-allauddin-a43127283/), and mention the Contact form on this page.
4. If the user writes in Urdu or Roman Urdu, reply warmly in Roman Urdu.
5. If asked off-topic questions, briefly and politely redirect back to Subhan's portfolio, skills, or projects.`;

const CANDIDATE_MODELS = [
  'gemini-3-flash-preview',
  'gemini-3.5-flash-lite',
];

const MAX_HISTORY_MESSAGES = 12;
const MAX_MESSAGE_CHARS = 1500;
const MODEL_TIMEOUT_MS = 12000;

let cachedClient = null;
let cachedApiKey = null;

function getClient() {
  const apiKey = config.GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Gemini API key is not configured.');
  }

  if (!cachedClient || cachedApiKey !== apiKey) {
    cachedClient = new GoogleGenAI({ apiKey });
    cachedApiKey = apiKey;
  }

  return cachedClient;
}

function formatMessages(messages) {
  if (!Array.isArray(messages)) {
    return [];
  }

  return messages
    .slice(-MAX_HISTORY_MESSAGES)
    .map((m) => {
      const rawText = typeof (m?.content ?? m?.text) === 'string' ? (m.content ?? m.text) : '';
      const text = rawText.trim().slice(0, MAX_MESSAGE_CHARS);
      if (!text) return null;

      return {
        role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
        parts: [{ text }],
      };
    })
    .filter(Boolean);
}

function buildAttemptSignal(externalSignal) {
  const timeoutSignal = AbortSignal.timeout(MODEL_TIMEOUT_MS);
  if (!externalSignal) return timeoutSignal;
  if (typeof AbortSignal.any === 'function') {
    return AbortSignal.any([externalSignal, timeoutSignal]);
  }
  return externalSignal;
}

/**
 * Streams reply text deltas from Gemini for minimal time-to-first-token.
 */
export async function* streamChatReply(messages, { signal } = {}) {
  const ai = getClient();
  const formattedContents = formatMessages(messages);

  if (formattedContents.length === 0) {
    throw new Error('At least one non-empty message is required.');
  }

  let lastError = null;

  for (const model of CANDIDATE_MODELS) {
    if (signal?.aborted) {
      throw new Error('Request aborted.');
    }

    let emittedAnyChunk = false;

    try {
      const stream = await ai.models.generateContentStream({
        model,
        contents: formattedContents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.6,
          maxOutputTokens: 600,
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.MINIMAL,
          },
          abortSignal: buildAttemptSignal(signal),
        },
      });

      for await (const chunk of stream) {
        if (signal?.aborted) return;
        const text = chunk?.text;
        if (text) {
          emittedAnyChunk = true;
          yield text;
        }
      }

      if (emittedAnyChunk) {
        return;
      }
    } catch (err) {
      lastError = err;
      if (signal?.aborted || emittedAnyChunk) {
        throw err;
      }
      console.warn(`Model ${model} failed, trying fallback:`, err?.message || err);
    }
  }

  throw lastError || new Error('Failed to generate response from Gemini API.');
}

/**
 * Non-streaming convenience wrapper returning the full assistant reply.
 */
export async function generateChatReply(messages, options = {}) {
  let fullReply = '';
  for await (const delta of streamChatReply(messages, options)) {
    fullReply += delta;
  }

  if (!fullReply) {
    throw new Error('Empty response received from Gemini API.');
  }

  return fullReply;
}

/**
 * Shared HTTP handler for Express and Vercel serverless /api/chat endpoints.
 * Supports Server-Sent Events (streaming) by default and JSON when stream=false.
 */
export async function handleChatRequest(req, res) {
  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const { messages, stream = true } = body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ success: false, error: 'Please provide messages array.' });
  }

  const wantsStream =
    stream !== false &&
    (req.headers?.accept?.includes('text/event-stream') || stream === true);

  const abortController = new AbortController();
  const handleClose = () => {
    if (!res.writableFinished && !res.writableEnded) {
      abortController.abort();
    }
  };
  res.on('close', handleClose);

  try {
    if (!wantsStream) {
      const reply = await generateChatReply(messages, { signal: abortController.signal });
      return res.status(200).json({ success: true, reply });
    }

    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');
    if (typeof res.flushHeaders === 'function') {
      res.flushHeaders();
    }

    for await (const delta of streamChatReply(messages, { signal: abortController.signal })) {
      if (abortController.signal.aborted || res.writableEnded) break;
      res.write(`data: ${JSON.stringify({ delta })}\n\n`);
    }

    if (!res.writableEnded) {
      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      res.end();
    }
  } catch (error) {
    if (abortController.signal.aborted) {
      if (!res.writableEnded) res.end();
      return;
    }

    console.error('Chat API Error:', error);
    const message = error instanceof Error ? error.message : 'Failed to generate response';

    if (res.headersSent) {
      if (!res.writableEnded) {
        res.write(`data: ${JSON.stringify({ error: message })}\n\n`);
        res.end();
      }
      return;
    }

    return res.status(500).json({
      success: false,
      error: message,
    });
  } finally {
    res.off?.('close', handleClose);
  }
}
