import resumeUrl from './ABDUL SUBHAN CV.pdf';
import type { PortfolioData, Project, Experience, SkillCategory, PersonalInfo } from '../types/portfolio';

export type { PortfolioData, Project, Experience, SkillCategory, PersonalInfo };

export const PORTFOLIO_DATA: PortfolioData = {
  personalInfo: {
    name: "Abdus Subhan Allauddin",
    initials: "ASA",
    role: "Frontend Developer",
    tagline: "Building clean, responsive & user-friendly web experiences.",
    bio: "Passionate frontend developer focused on creating responsive, fast, and visually appealing web applications using modern JavaScript frameworks.",
    location: "Pakistan",
    email: "subhanallauddin@gmail.com",
    linkedin: "https://www.linkedin.com/in/abdus-subhan-allauddin-a43127283/",
    github: "https://github.com/subhan-allauddin",
    resume: resumeUrl,
    projectsCompleted: "8+",
    clientsSatisfied: "100%",
  },

  skills: [
    {
      category: "Frontend",
      icon: "Code2",
      items: [
        { name: "HTML", level: 95, description: "Semantic markup, accessibility & web standards" },
        { name: "CSS", level: 90, description: "Flexbox, Grid, Responsive layouts & Animations" },
        { name: "JavaScript", level: 85, description: "ES6+, Async/Await, DOM manipulation & Logic" },
        { name: "React.js", level: 85, description: "Hooks, Component architecture & State management" },
        { name: "Next.js", level: 80, description: "Server components, App router & SEO optimization" },
        { name: "Tailwind CSS", level: 90, description: "Utility-first styling & Responsive design" },
      ]
    },
    {
      category: "Backend Basics",
      icon: "Database",
      items: [
        { name: "Node.js", level: 70, description: "Server runtime, NPM ecosystem & Core modules" },
        { name: "MongoDB", level: 75, description: "Document storage, CRUD operations & Mongoose" },
        { name: "Express.js", level: 65, description: "REST APIs, Routing & Middleware" },
        { name: "Next.js API Routes", level: 70, description: "Server-side API endpoint creation & handling" },
      ]
    },
    {
      category: "Tools & Workflow",
      icon: "Wrench",
      items: [
        { name: "Git & GitHub", level: 80, description: "Version control, branching & collaboration" },
        { name: "Responsive Design", level: 90, description: "Mobile-first approach across all viewports" },
        { name: "Redux Toolkit", level: 70, description: "Global state management & Async thunks" },
        { name: "VS Code & Codex", level: 85, description: "Code editing, extensions & debugging" },
        { name: "Prompt Engineering", level: 75, description: "Crafting effective prompts for modern AI models" },
      ]
    }
  ],

  experience: [
    {
      id: "exp-1",
      role: "Frontend Developer Intern",
      company: "Computing Yard",
      location: "Karachi, Pakistan",
      period: "Jun 2024 - Sep 2024",
      description: "Worked on building responsive web applications and improving UI performance.",
      highlights: [
        "Developed responsive pages compatible across all devices",
        "Fixed frontend bugs and optimized component performance",
        "Integrated REST APIs with frontend React applications"
      ],
      skills: ["React", "Next.js", "JavaScript", "Responsive Design", "Tailwind CSS"]
    },
    {
      id: "exp-2",
      role: "React Trainee",
      company: "Utech Digital",
      location: "Pakistan",
      period: "2024",
      description: "Completed hands-on training in React development and modern frontend practices.",
      highlights: [
        "Built multiple React projects following modular design patterns",
        "Learned component-based architecture and state lifecycle management",
        "Achieved top performance recognition in the training program"
      ],
      skills: ["React", "JavaScript", "HTML", "CSS", "Git"]
    },
    {
      id: "exp-ai-for-everyone",
      role: "AI for Everyone (Training Course)",
      company: "Bano Qabil (Alkhidmat Foundation)",
      location: "Karachi, Pakistan",
      period: "June 2026 - July 2026",
      description: "2-month course on Generative AI covering prompt engineering, AI-assisted productivity and responsible AI use.",
      highlights: [
        "Applied the C.O.R.E prompting framework (Context, Objective, Role, Examples) to get high-quality output from ChatGPT, Claude and Gemini",
        "Used AI tools for research, writing, documentation and automating repetitive tasks",
        "Implemented intelligent prompt pipelines and AI workflow automations"
      ],
      skills: ["Prompt Engineering", "ChatGPT", "Claude", "Gemini", "Generative AI"]
    },
    {
      id: "exp-generative-ai",
      role: "Generative AI: LLM Apps, RAG & AI Agents (In Progress)",
      company: "Bano Qabil (Alkhidmat Foundation)",
      location: "Karachi, Pakistan",
      period: "August 2026 - Jan 2027 (Ongoing)",
      status: "In Progress",
      description: "5-month builder-focused course on building AI applications with LLM APIs, RAG systems and AI agents.",
      highlights: [
        "Learning to work with LLM APIs in JavaScript & Python: prompts, function calling, structured output",
        "Learning embeddings, vector databases and RAG pipelines",
        "Capstone planned: deployed AI-powered application"
      ],
      skills: ["LLM APIs", "RAG", "Vector DB", "AI Agents", "Python"]
    }
  ],

  projects: [
    {
      id: "proj-daraz",
      title: "Daraz Store Clone",
      description: "A comprehensive e-commerce clone of Daraz featuring category navigation, product catalogs, shopping cart logic, and responsive multi-page layout.",
      tags: ["JavaScript", "Bootstrap", "HTML5", "CSS3"],
      liveUrl: "https://daraz-store-clone.vercel.app/",
      githubUrl: "https://github.com/subhan-allauddin/Daraz-Store-Clone",
      featured: true
    },
    {
      id: "proj-1",
      title: "Birthday Wishes App",
      description: "A dynamic web app where users can send and store birthday wishes using MongoDB and Prisma as a database.",
      tags: ["Next.js", "MongoDB", "Prisma", "TypeScript", "Tailwind CSS"],
      liveUrl: "https://my-birth-day-ecru.vercel.app/",
      githubUrl: "https://github.com/subhan-allauddin/My-BirthDay",
      featured: true
    },
    {
      id: "proj-2",
      title: "Music Store Website",
      description: "Responsive music store interface inspired by modern e-commerce layouts with clean UI and mobile responsiveness.",
      tags: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS", "AceternityUI"],
      liveUrl: "https://next-project-one-ten.vercel.app/",
      githubUrl: "https://github.com/subhan-allauddin/Next-Project-One"
    },
    {
      id: "proj-3",
      title: "Snake Game",
      description: "Classic snake game implemented using Vanilla JavaScript with smooth controls and score tracking.",
      tags: ['HTML', 'CSS', 'JavaScript'],
      liveUrl: "https://snake-games-xi.vercel.app/",
      githubUrl: "https://github.com/subhan-allauddin/Snake-games"
    },
    {
      id: "proj-4",
      title: "Calculator App",
      description: "A calculator application with real-time input and result computation.",
      tags: ["JavaScript", "HTML", "CSS"],
      liveUrl: "https://calculator-tan-six-85.vercel.app/",
      githubUrl: "https://github.com/subhan-allauddin/Calculator"
    },
    {
      id: "proj-ai-capstone",
      title: "AI Capstone Project",
      description: "Full-stack generative AI application exploring modern LLM orchestration, structured output, and agent workflows.",
      tags: ["Generative AI", "React", "Gemini API"],
      status: "In Progress"
    }
  ]
};
