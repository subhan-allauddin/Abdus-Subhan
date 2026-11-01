export interface PersonalInfo {
  name: string;
  initials: string;
  role: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  resume: string;
  projectsCompleted: string;
  clientsSatisfied: string;
}

export interface SkillItem {
  name: string;
  level: number; // 0 to 100
  description?: string;
}

export interface SkillCategory {
  category: string;
  icon: string;
  items: SkillItem[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location?: string;
  period: string;
  status?: string;
  description: string;
  highlights: string[];
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  status?: string;
  stars?: number;
  image?: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  skills: SkillCategory[];
  experience: Experience[];
  projects: Project[];
}

