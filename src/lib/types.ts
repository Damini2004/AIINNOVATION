export type Language = 'javascript' | 'python' | 'css' | 'typescript' | 'html' | 'bash';

export type CodeSnippet = {
  id: string;
  title: string;
  description: string;
  language: Language;
  tags: string[];
  code: string;
};
