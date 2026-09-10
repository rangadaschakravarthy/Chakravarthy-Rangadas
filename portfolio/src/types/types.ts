export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  extendedBio: string[];
  location: string;
  email: string;
  github: string;
  linkedin: string;
  resumeUrl?: string;
  availability: string;
  stats: {
    label: string;
    value: string;
  }[];
}

export interface EducationItem {
  id: string;
  year: string;
  degree: string;
  institution: string;
  score: string;
  description: string;
  highlights: string[];
}

export interface SkillItem {
  id: string;
  name: string;
  logoUrl: string;
  level: 'Primary' | 'Strong' | 'Working Knowledge';
  description: string;
  category: 'frontend' | 'backend' | 'databases' | 'languages' | 'tools' | 'cloud';
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  domain: string;
  categories: string[];
  description: string;
  whatIBuilt: string;
  howISolvedIt: string;
  techUsed: string[];
  result: string;
  github?: string;
  liveDemo?: string;
  image?: string;
  featured?: boolean;
}

export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  date?: string;
  description: string;
  iconName?: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  year?: string;
  credentialUrl?: string;
  description?: string;
}

export interface ClubActivityItem {
  id: string;
  title: string;
  organization: string;
  description: string;
  date?: string;
  role?: string;
}

export type AlanAction =
  | { type: "NAVIGATE"; section: string }
  | { type: "THEME"; value: "light" | "dark" | "toggle" }
  | { type: "CONTACT" }
  | { type: "NONE" };

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}
