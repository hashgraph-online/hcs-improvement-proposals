export interface Tutorial {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  videoId: string;
  prerequisites: string[];
  description: string;
  code: {
    language: string;
    filename: string;
    content: string;
  }[];
  resources: {
    label: string;
    url: string;
  }[];
  learningPoints: string[];
}
