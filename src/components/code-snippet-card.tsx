'use client';

import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { CodeSnippet } from '@/lib/types';
import { Icons } from './icons';
import { cn } from '@/lib/utils';
import { ComponentType } from 'react';

const languageIcons: Record<string, ComponentType<{ className?: string }>> = {
  javascript: Icons.javascript,
  python: Icons.python,
  css: Icons.css,
  typescript: Icons.typescript,
  react: Icons.react,
};

interface CodeSnippetCardProps {
  snippet: CodeSnippet;
  onSelect: () => void;
  index: number;
}

export function CodeSnippetCard({ snippet, onSelect, index }: CodeSnippetCardProps) {
  const LanguageIcon = languageIcons[snippet.language] || languageIcons[snippet.tags[0]?.toLowerCase()] || Icons.logo;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="h-full"
    >
      <Card
        className="h-full flex flex-col cursor-pointer group transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
        onClick={onSelect}
      >
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">
              {snippet.title}
            </CardTitle>
            <LanguageIcon className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-primary" />
          </div>
          <CardDescription className="line-clamp-2 pt-2">{snippet.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow" />
        <CardFooter>
          <div className="flex flex-wrap gap-2">
            {snippet.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
