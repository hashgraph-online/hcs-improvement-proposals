import { ShowcaseItem } from '../InteractiveShowcase';

export interface TutorialItem extends ShowcaseItem {
  id: string;
  name: string;
  title: string;
  description: string;
  href: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  standard: string;
  category: string;
  tags: string[];
  codeExample?: string;
  prerequisites?: string[];
  learningOutcomes?: string[];
}

export type Tutorial = {
  title: string;
  description: string;
  href: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  standard: string;
  featured?: boolean;
  image?: string;
  tags?: string[];
};

export type TutorialCategory = {
  title: string;
  description: string;
  icon?: string;
  tutorials: Tutorial[];
};