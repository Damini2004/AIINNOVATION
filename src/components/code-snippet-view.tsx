'use client';

import { useState, useEffect, ComponentType } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Check, Copy, Share2 } from 'lucide-react';
import type { CodeSnippet } from '@/lib/types';
import { Icons } from './icons';
import { cn } from '@/lib/utils';
import { ScrollArea } from './ui/scroll-area';

interface CodeSnippetViewProps {
  snippet: CodeSnippet | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const languageIcons: Record<string, ComponentType<{ className?: string }>> = {
  javascript: Icons.javascript,
  python: Icons.python,
  css: Icons.css,
  typescript: Icons.typescript,
  react: Icons.react,
};

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [hasCopied, setHasCopied] = useState(false);
  const { toast } = useToast();

  const onCopy = () => {
    navigator.clipboard.writeText(code);
    setHasCopied(true);
    toast({ title: 'Copied!', description: 'Code has been copied to your clipboard.' });
  };

  useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => {
        setHasCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [hasCopied]);

  return (
    <div className="relative my-4 rounded-lg bg-background border">
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <span className="text-sm font-semibold text-muted-foreground">{language}</span>
        <Button variant="ghost" size="icon" onClick={onCopy}>
          {hasCopied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          <span className="sr-only">Copy code</span>
        </Button>
      </div>
      <ScrollArea className="h-64">
        <pre className="p-4 text-sm overflow-x-auto">
          <code className="font-code">{code}</code>
        </pre>
      </ScrollArea>
    </div>
  );
}

export function CodeSnippetView({ snippet, open, onOpenChange }: CodeSnippetViewProps) {
  const { toast } = useToast();

  if (!snippet) {
    return null;
  }

  const handleShare = () => {
    const url = `${window.location.origin}${window.location.pathname}?snippet=${snippet.id}`;
    navigator.clipboard.writeText(url);
    toast({
      title: 'Link Copied!',
      description: 'A shareable link has been copied to your clipboard.',
    });
  };

  const LanguageIcon = languageIcons[snippet.language] || languageIcons[snippet.tags[0]?.toLowerCase()] || Icons.logo;


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-headline">{snippet.title}</DialogTitle>
              <DialogDescription className="mt-2">{snippet.description}</DialogDescription>
            </div>
            <LanguageIcon className="h-8 w-8 ml-4 text-muted-foreground" />
          </div>
        </DialogHeader>
        <div className="mt-4">
          <CodeBlock code={snippet.code} language={snippet.language} />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
          <div className="flex flex-wrap gap-2">
            {snippet.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
