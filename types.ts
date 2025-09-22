
export interface Contact {
  phone: string;
  address: string;
}

export interface TitledContent {
  title: string;
  text: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  date: string;
  points: string[];
}

export interface Experience {
  title: string;
  items: ExperienceItem[];
}

export interface EducationItem {
  degree: string;
  school: string;
  date: string;
}

export interface Education {
  title: string;
  items: EducationItem[];
}

export interface Skills {
  title: string;
  points: string[];
}

export interface PersonalItem {
  label: string;
  value: string;
}

export interface Personal {
  title: string;
  items: PersonalItem[];
}

export interface LanguageData {
  name: string;
  contact: Contact;
  objective: TitledContent;
  experience: Experience;
  education: Education;
  skills: Skills;
  personal: Personal;
}

export interface ResumeData {
  en: LanguageData;
  gu: LanguageData;
}

export type Language = keyof ResumeData;
export type Theme = 'theme-aurora' | 'theme-bento' | 'theme-dark' | 'theme-glass' | 'theme-typographic';
